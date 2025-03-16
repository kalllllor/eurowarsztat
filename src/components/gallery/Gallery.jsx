import * as THREE from "three";
import {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Image as ImageImpl,
  Text,
  Html,
  useScroll,
} from "@react-three/drei";

import { Play } from "../icons/Play";

function Image({
  c = new THREE.Color(),
  url,
  scale,
  fullName,
  fontSize,
  isClicked,
  pages,
  height,
  isSingleColumn,
  ...props
}) {
  const imageRef = useRef();
  const groupRef = useRef();
  const [hovered, hover] = useState(false);
  const previousColor = useRef(new THREE.Color());
  const data = useScroll();

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
      {(hovered || isSingleColumn) &&
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
  const { height } = useThree(
    (state) => state.viewport
  );
  const [isSingleColumn, setSingleColumn] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSingleColumn(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener(
      "resize",
      handleResize
    );
    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const itemsPerRow = isSingleColumn ? 1 : 3;
  const spacingX = isSingleColumn ? 0 : 1.5;
  const spacingY = isSingleColumn ? 1 : 1;
  const topY = 3;

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
            {isActive &&
              currentPerson.current.fullname && (
                <div className="title">
                  <h1>
                    {
                      currentPerson.current
                        .fullname
                    }
                  </h1>
                </div>
              )}
            <div className="description">
              <p>
                {isActive &&
                  currentPerson.current
                    .description}
              </p>
              {isActive &&
                currentPerson.current.video && (
                  <div className="icons__container">
                    <div
                      className="film"
                      onClick={() =>
                        enableScroll(
                          false,
                          currentPerson.current
                            .index,
                          true
                        )
                      }
                    >
                      <Play />
                      <span className="tooltip">
                        Click to open the video
                      </span>
                    </div>
                  </div>
                )}
            </div>
            {isActive &&
              currentPerson.current.quote
                ?.length && (
                <div className="quote">
                  <p>
                    {currentPerson.current.quote}
                  </p>
                </div>
              )}
            {isActive &&
              currentPerson.current.quoteSecond
                ?.length && (
                <div className="quote">
                  <p>
                    {
                      currentPerson.current
                        .quoteSecond
                    }
                  </p>
                </div>
              )}
            {isActive && (
              <div className="time">
                {["place", "date"].map(
                  (key) =>
                    currentPerson.current[
                      key
                    ] && (
                      <span key={key}>
                        {
                          currentPerson.current[
                            key
                          ]
                        }
                      </span>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </Html>
      <group>
        {images.map((imageData, index) => {
          const row = Math.floor(
            index / itemsPerRow
          );
          const col = index % itemsPerRow;
          const modulo6 = index % 6;
          let zIndex = 0;
          switch (modulo6) {
            case 0:
              zIndex = -0.2;
              break;
            case 1:
              zIndex = 0.5;
              break;
            case 2:
              zIndex = 0.3;
              break;
            case 3:
              zIndex = 0.2;
              break;
            case 4:
              zIndex = -0.5;
              break;
            case 5:
              zIndex = 0;
              break;
          }

          const position = isSingleColumn
            ? [0, -topY - row * spacingY, 0]
            : [
                col * spacingX -
                  ((itemsPerRow - 1) * spacingX) /
                    2,
                -topY - row * spacingY,
                zIndex,
              ];

          return (
            <Image
              key={index}
              position={position}
              scale={[
                isSingleColumn ? 2 : 1.2,
                2.4,
                1.2,
              ]}
              fontSize={0.15}
              fullName={imageData.fullname}
              url={
                imageData.image.url ??
                "/assets/blank.jpg"
              }
              onClick={() => {
                handleClick(true, imageData);
                currentPerson.current = {
                  index,
                  ...imageData,
                };
              }}
              pages={pages}
              isClicked={isActive}
              height={height}
              isSingleColumn={isSingleColumn}
            />
          );
        })}
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
