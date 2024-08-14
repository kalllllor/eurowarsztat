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
  SpotLight,
} from "@react-three/drei";

function ProjectedImage({
  imageUrl = "",
  intensity = 0,
  ...props
}) {
  const spotLightRef = useRef();

  const texture = useTexture(
    imageUrl || "/assets/photos/blank.jpg"
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

  return (
    <SpotLight
      {...props}
      ref={spotLightRef}
      angle={0.3}
      penumbra={1}
      intensity={0}
      distance={20}
      castShadow
      map={texture}
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
  ...props
}) {
  const imageRef = useRef();
  const groupRef = useRef();
  const [hovered, hover] = useState(false);
  const previousColor = useRef(new THREE.Color());

  useFrame(() => {
    const targetColor = hovered
      ? "white"
      : "#999";

    previousColor.current.copy(c);
    imageRef.current.material.color.lerp(
      c.set(targetColor),
      0.1
    );
    groupRef.current.position.lerp(
      isClicked
        ? new THREE.Vector3(
            props.position[0]
              ? props.position[0] * 6
              : (props.position[0] + 1) * 3,
            props.position[1] * 1.2,
            props.position[2]
          )
        : new THREE.Vector3(
            props.position[0],
            props.position[1],
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
      {hovered && (
        <Text
          color="white"
          anchorX="center"
          fontSize={fontSize}
          lineHeight={hovered ? 1 : 0}
          font="/bebas-neue-v9-latin-regular.woff"
        >
          {fullName}
        </Text>
      )}
    </group>
  );
}

function Images({ images, isSelected }) {
  const { height } = useThree(
    (state) => state.viewport
  );
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
        position={[0, -10, 10]}
        intensity={isActive ? 10000 : 0}
        imageUrl={
          isActive && currentPerson.current.url
        }
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
            <span>Bielsko-Biała</span>
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
              imageData.position[1] * height,
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
            isClicked={isActive}
          />
        ))}
      </group>
    </>
  );
}

const Gallery = ({ images, isSelected }) => {
  return (
    <>
      <Images
        images={images}
        isSelected={isSelected}
      />
    </>
  );
};

export default Gallery;
