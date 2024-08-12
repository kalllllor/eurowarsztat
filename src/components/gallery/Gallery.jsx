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
  useScroll,
  Image as ImageImpl,
  Text,
  Html,
  Billboard,
} from "@react-three/drei";

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
      0.01
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

function Images({ images }) {
  const { height } = useThree(
    (state) => state.viewport
  );
  const ref = useRef();

  const [isActive, setActive] = useState(false);
  const currentPerson = useRef(null);

  const handleClick = (active) => {
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
        <div className="info__content">
          <h1 onClick={() => handleClick(false)}>
            {currentPerson.current &&
              currentPerson.current.fullName}
          </h1>
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

const Gallery = ({ images }) => {
  return (
    <>
      <Images images={images} />
    </>
  );
};

export default Gallery;
