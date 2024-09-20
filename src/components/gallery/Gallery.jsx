import * as THREE from "three";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Image as ImageImpl,
  Text,
  Html,
  useTexture,
  useVideoTexture,
  useScroll,
  SpotLight,
} from "@react-three/drei";
import { useControls } from "leva";

function ProjectedImage({
  imageUrl = "",
  intensity = 0,
  isActive,
  ...props
}) {
  const spotLightRef = useRef();

  const videoTexture = useVideoTexture(
    "RuslanaBG.mp4",
    {}
  );

  useFrame(() => {
    if (spotLightRef.current) {
      const currentIntensity =
        spotLightRef.current.intensity;
      const targetIntensity = intensity;
      const lerpedIntensity =
        currentIntensity +
        (targetIntensity - currentIntensity) *
          0.1;
      spotLightRef.current.intensity =
        lerpedIntensity;
      if (lerpedIntensity < 1) {
        spotLightRef.current.intensity = 0;
      }
    }
  });
  const scale = 2;
  useEffect(() => {
    if (videoTexture && videoTexture.image) {
      const videoElement = videoTexture.image;

      const handleCanPlayThrough = () => {
        if (isActive) {
          videoElement.currentTime = 0;
          videoElement.play();
        } else {
          videoElement.pause();
        }
      };

      videoElement.addEventListener(
        "canplaythrough",
        handleCanPlayThrough
      );

      return () => {
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, [isActive, videoTexture]);

  return (
    <SpotLight
      {...props}
      ref={spotLightRef}
      angle={0.5}
      penumbra={1}
      intensity={0}
      distance={20}
      castShadow
      map={videoTexture}
    />
  );
}

function Image({
  c = new THREE.Color(),
  url,
  scale,
  fullName,
  fontSize,
  isClicked,
  pages,
  ...props
}) {
  const imageRef = useRef();
  const groupRef = useRef();
  const [hovered, hover] = useState(false);
  const previousColor = useRef(new THREE.Color());
  const data = useScroll();
  const { height } = useThree(
    (state) => state.viewport
  );

  useFrame(() => {
    const isInsideView = data.curve(
      -props.position[1] / pages,
      1 / pages,
      0.1
    );

    const targetColor = hovered
      ? "white"
      : "#999";
    previousColor.current.copy(c);
    imageRef.current.material.color.lerp(
      c.set(targetColor),
      0.1
    );

    const targetOpacity = isInsideView;
    imageRef.current.material.transparent = true;
    imageRef.current.material.opacity =
      THREE.MathUtils.lerp(
        imageRef.current.material.opacity,
        targetOpacity,
        0.1
      );

    groupRef.current.position.lerp(
      isClicked
        ? new THREE.Vector3(
            props.position[0]
              ? props.position[0] * 6
              : (props.position[0] + 1) * 6,
            props.position[1] * 1.2 * height,
            props.position[2]
          )
        : new THREE.Vector3(
            props.position[0],
            props.position[1] * height,
            props.position[2]
          ),
      0.2
    );
  });

  return (
    <group {...props} ref={groupRef}>
      <ImageImpl
        ref={imageRef}
        url={url}
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
      {hovered &&
        fullName.split(" ").map((item, i) => (
          <Text
            key={i}
            color="#D4D8D8"
            anchorX="center"
            fontSize={fontSize}
            lineHeight={hovered ? 1 : 0}
            font="/BodoniModa_9pt-Regular.woff"
            position={[0, i * 0.2, 0.01]}
          >
            {item}
          </Text>
        ))}
    </group>
  );
}

function Images({ images, isSelected, pages }) {
  const { y, z } = useControls({
    y: {
      value: -11.7,
      min: -30,
      max: 30,
      step: 0.1,
    },
    z: {
      value: 4.3,
      min: -30,
      max: 30,
      step: 0.1,
    },
  });
  const ref = useRef();
  const [isActive, setActive] = useState(false);
  const currentPerson = useRef(null);

  const handleClick = (active) => {
    isSelected(active);
    setActive(active);
    if (active) {
      ref.current.parentElement.classList.add(
        "active"
      );
      ref.current.style.top = "0px";
      ref.current.style.left = "0px";
      ref.current.style.width = "100%";
      ref.current.style.height = "100%";
    } else {
      ref.current.parentElement.classList.remove(
        "active"
      );
      ref.current.style.top = "0px";
      ref.current.style.left = "0px";
      ref.current.style.width = "0%";
      ref.current.style.height = "0%";
    }
  };
  return (
    <>
      <ProjectedImage
        position={[0, y, z]}
        intensity={isActive ? 10000 : 0}
        imageUrl={
          isActive && currentPerson.current.url
        }
        isActive={isActive}
      />

      <Html
        ref={ref}
        as="div"
        wrapperClass="info__container"
      >
        <div
          className="info__content"
          onClick={() => {
            handleClick(false);
            currentPerson.current = null;
          }}
        >
          <span className="exit">
            click anywhere to exit
          </span>
          <div className="title">
            <h1>
              {isActive &&
                currentPerson.current.fullName}
            </h1>
          </div>
          <div className="description">
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Phasellus sit amet quam hendrerit,
              sollicitudin orci eget, imperdiet
              augue. Praesent in justo quis nunc
              dictum aliquam et ut turpis. In
              volutpat lectus eu leo commodo
              blandit. Quisque sit amet massa sit
              amet est pellentesque hendrerit.
              Donec sed orci semper, facilisis dui
              eu, aliquam eros. Maecenas sapien
              dui, maximus nec est eu, egestas
              imperdiet orci. Pellentesque ipsum
              diam, eleifend vel vestibulum ac,
              malesuada in diam. Donec condimentum
              condimentum auctor. Ut nec mattis
              diam, ut faucibus augue. Cras et
              aliquet diam. Nam placerat sapien
              sit amet luctus varius. Mauris quam
              est, euismod vel neque in, porta
              aliquam tellus. Class aptent taciti
              sociosqu ad litora torquent per
              conubia nostra, per inceptos
              himenaeos.
            </p>
          </div>
          <div className="quote">
            <p>
              "usce nec gravida neque. Nulla
              interdum, nibh at pellentesque
              mollis, dui turpis ullamcorper eros,
              nec facilisis lacus erat ut
              mauris.""
            </p>
          </div>
          <div className="time">
            <span>Bielsko-Biała </span>
            <span>14.08.2024</span>
          </div>
        </div>
      </Html>

      <group>
        {images.map((imageData, index) => (
          <Image
            key={index}
            position={[
              imageData.position[0],
              imageData.position[1] - 1.4,
              imageData.position[2],
            ]}
            scale={imageData.scale}
            fontSize={imageData.fontSize}
            fullName={imageData.fullName}
            url={imageData.url}
            onClick={() => {
              handleClick(true);
              currentPerson.current = imageData;
            }}
            pages={pages}
            isClicked={isActive}
          />
        ))}
      </group>
    </>
  );
}

const Gallery = ({
  images,
  isSelected,
  pages,
}) => {
  return (
    <>
      <Images
        pages={pages}
        images={images}
        isSelected={isSelected}
      />
    </>
  );
};

export default Gallery;
