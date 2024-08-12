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
} from "@react-three/drei";

function Image({
  c = new THREE.Color(),
  url,
  scale,
  fullName,
  fontSize,
  ...props
}) {
  const data = useScroll();
  const imageRef = useRef();
  const textRef = useRef();
  const [hovered, hover] = useState(false);
  const previousColor = useRef(new THREE.Color());

  useFrame(() => {
    const targetColor = hovered
      ? "white"
      : "#999";

    if (
      !previousColor.current.equals(
        c.set(targetColor)
      )
    ) {
      previousColor.current.copy(c);
      imageRef.current.material.color.lerp(
        c.set(targetColor),
        hovered ? 1 : 1
      );
    }
  });
  return (
    <group {...props}>
      <ImageImpl
        ref={imageRef}
        url={url}
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
      {hovered && (
        <Text
          ref={textRef}
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

function Images({ images, onImageClick }) {
  const { height } = useThree(
    (state) => state.viewport
  );

  return (
    <group>
      {images.map((imageData, index) => (
        <Image
          key={index} // Use index or a unique id if available in imageData
          position={[
            imageData.position[0],
            imageData.position[1] * height,
            imageData.position[2],
          ]}
          scale={imageData.scale}
          fontSize={imageData.fontSize}
          fullName={imageData.fullName}
          url={imageData.url}
          onClick={() =>
            onImageClick(images[index])
          }
        />
      ))}
    </group>
  );
}

const Gallery = ({ images, onImageClick }) => {
  return (
    <Images
      images={images}
      onImageClick={onImageClick}
    />
  );
};

export default Gallery;
