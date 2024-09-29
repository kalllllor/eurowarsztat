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
import { Film } from "../icons/Film";

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

function Images({
  images,
  isSelected,
  pages,
  enableScroll,
}) {
  const ref = useRef();
  const [isActive, setActive] = useState(false);
  const currentPerson = useRef(null);

  const handleClick = (active, imageData) => {
    isSelected(imageData);
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
      <Html
        ref={ref}
        as="div"
        wrapperClass="info__container"
      >
        <div className="info__wrapper">
          <div className="info__content">
            <button
              className="exit"
              onClick={() => {
                handleClick(false, null);
                currentPerson.current = null;
              }}
            >
              <img src={"back.png"} />
              <span>exit</span>
            </button>
            <div className="title">
              <h1>
                {isActive &&
                  currentPerson.current.fullName}
              </h1>
            </div>
            <div className="description">
              <p>
                Psycholożka rozwoju dziecka i
                pielęgniarka. Przyjechała do
                Polski ponad 25 lat temu,
                aktualnie pracuje jako opiekunka
                dzieci. Lubi czytać prawo,
                prywatnie interweniowała w sprawie
                prawa pracy znajomych z Ukrainy.
                Jest jedną z założycielek Komisji
                Pracownic i Pracowników Domowych w
                ramach Inicjatywy Pracowniczej.
              </p>
            </div>
            <div className="quote">
              <p>
                “W Europie powinni zauważyć
                pracowniczek szarej strefy, które
                są niewidoczne”
              </p>
            </div>
            <div className="time">
              <span>Bielsko-Biała </span>
              <span>14.08.2024</span>
            </div>
          </div>
          <div className="icons__container">
            <div
              className="film"
              onClick={() =>
                enableScroll(
                  false,
                  currentPerson.current.video
                )
              }
            >
              <img src={"play3.png"} />
              <span className="tooltip">
                Click to open the video
              </span>
            </div>
          </div>
        </div>
      </Html>

      <group>
        {images.map((imageData, index) => (
          <Image
            key={index}
            position={[
              imageData.position[0],
              imageData.position[1] - 1.5,
              imageData.position[2],
            ]}
            scale={imageData.scale}
            fontSize={imageData.fontSize}
            fullName={imageData.fullName}
            url={imageData.url}
            onClick={() => {
              handleClick(true, imageData);
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
  enableScroll,
}) => {
  return (
    <>
      <Images
        pages={pages}
        images={images}
        isSelected={isSelected}
        enableScroll={enableScroll}
      />
    </>
  );
};

export default Gallery;
