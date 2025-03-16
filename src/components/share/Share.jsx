import { useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Scroll, Text } from "@react-three/drei";

const Share = ({
  galleryHeight,
  singlePageCameraHeight,
}) => {
  const scrollRef = useRef(null);
  const { height } = useThree(
    (state) => state.viewport
  );

  useFrame(() => {
    if (
      scrollRef.current.position.y >
        height * galleryHeight &&
      scrollRef.current.position.y <
        height * (galleryHeight + 2)
    ) {
      scrollRef.current.children[0].children[0].position.y =
        -scrollRef.current.position.y +
        height * galleryHeight;
      scrollRef.current.children[0].children[1].position.y =
        -scrollRef.current.position.y +
        height * galleryHeight -
        0.35;
    }
    if (
      scrollRef.current.position.y >
        height * (galleryHeight + 1) - 0.8 &&
      scrollRef.current.position.y <
        height * (galleryHeight + 2)
    ) {
      scrollRef.current.children[0].children[2].position.y =
        -scrollRef.current.position.y +
        height * galleryHeight -
        0.8;
    }
  });

  return (
    <Scroll ref={scrollRef}>
      <group
        position={[0, -galleryHeight * height, 0]}
      >
        <Text
          color="#D4D8D8"
          anchorX="center"
          anchorY="center"
          position={[0, 0, 0]}
          fontSize={0.3}
          font="/BodoniModa_9pt-SemiBoldItalic.woff"
          receiveShadow
          castShadow
        >
          Podziel się swoją wizją
        </Text>
        <Text
          color="#D4D8D8"
          anchorX="center"
          anchorY="center"
          position={[0, -0.35, 0]}
          fontSize={0.3}
          font="/BodoniModa_9pt-SemiBoldItalic.woff"
          receiveShadow
          castShadow
        >
          Europy! Zabierz swój głos!
        </Text>
        <Text
          color="#D4D8D8"
          anchorX="center"
          anchorY="center"
          position={[0, -height, 0]}
          fontSize={0.1}
          font="/d.woff"
          receiveShadow
          castShadow
        >
          Dołącz do projektu zgłaszając chęć
          udziału na adres mailowy:
          euroworkshop.contact@gmail.com
        </Text>
      </group>
    </Scroll>
  );
};

export default Share;
