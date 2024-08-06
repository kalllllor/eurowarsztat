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
  ScrollControls,
  Scroll,
  useScroll,
  Image as ImageImpl,
  Text,
  Billboard,
} from "@react-three/drei";

function Image({
  c = new THREE.Color(),
  url,
  scale,
  fullName,
  ...props
}) {
  const data = useScroll();
  const imageRef = useRef();
  const textRef = useRef();
  const [hovered, hover] = useState(false);
  const textScale = scale.length
    ? 1 / scale[2]
    : 1 / scale;

  useFrame(() => {
    imageRef.current.material.color.lerp(
      c.set(hovered ? "white" : "#ccc"),
      hovered ? 0.4 : 0.05
    );
  });

  useLayoutEffect(() => {
    if (imageRef.current && textRef.current) {
      textRef.current.position.setY(
        -imageRef.current.scale.y / 2 -
          0.1 * imageRef.current.scale.y
      );
    }
  }, [hovered]);

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
          fontSize={textScale / 2}
          lineHeight={hovered ? 1 : 0}
          font="/bebas-neue-v9-latin-regular.woff"
        >
          {fullName}
        </Text>
      )}
    </group>
  );
}

function Images() {
  const { width, height } = useThree(
    (state) => state.viewport
  );
  const data = useScroll();
  const group = useRef();
  useFrame(() => {
    // group.current.children[0].material.zoom =
    //   1 + data.range(0, 1 / 3) / 3;
    // group.current.children[1].material.zoom =
    //   1 + data.range(0, 1 / 3) / 3;
    // group.current.children[2].material.zoom =
    //   1 + data.range(1.15 / 3, 1 / 3) / 3;
    // group.current.children[3].material.zoom =
    //   1 + data.range(1.15 / 3, 1 / 3) / 2;
    // group.current.children[4].material.zoom =
    //   1 + data.range(1.25 / 3, 1 / 3) / 1;
    // group.current.children[5].material.zoom =
    //   1 + data.range(1.8 / 3, 1 / 3) / 3;
    // group.current.children[5].material.grayscale =
    //   1 - data.range(1.6 / 3, 1 / 3);
    // group.current.children[6].material.zoom =
    //   1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
  });

  return (
    <group ref={group}>
      <Image
        position={[-1, -height, 1]}
        scale={[2, 4, 1]}
        fullName="Abdallah Razik Omar"
        url="/assets/photos/abdallahRazikOmar.jpg"
      />
      <Image
        position={[2, -height, 2]}
        scale={3}
        fullName="Liubov Savycka"
        url="/assets/photos/liubovSavycka.jpg"
      />
      <Image
        position={[-2.3, -height * 2, 2]}
        scale={[1, 3, 1]}
        fullName="Liudmyla Kabanina"
        url="/assets/photos/liudmylaKabanina.jpg"
      />
      <Image
        position={[-0.6, -height * 2, 3]}
        scale={[1, 2, 1]}
        fullName="Liza Konovalova"
        url="/assets/photos/lizaKonovalova.jpg"
      />

      <Image
        position={[0.75, -height * 2, 3.5]}
        scale={1.5}
        fullName="Natalia Hladysh"
        url="/assets/photos/nataliaHladysh.jpg"
      />
      <Image
        position={[0, -height * 2.5, 2.5]}
        scale={[1.5, 3, 1]}
        fullName="Ruslana Poberezhnyk"
        url="/assets/photos/ruslanaPoberezhnyk.jpg"
      />
      <Image
        position={[0, -height * 3.5, 2.5]}
        scale={[1.5, 3, 1]}
        fullName="Walid Boussad"
        url="/assets/photos/walidBoussad.jpg"
      />
    </group>
  );
}

const Gallery = () => {
  return <Images />;
};

export default Gallery;
