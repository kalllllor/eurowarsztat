import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Scroll, Text } from "@react-three/drei";
import { useControls } from "leva";

const Title = ({ fontSize }) => {
  const scrollRef = useRef(null);

  useFrame(() => {
    if (scrollRef.current.position.y < 1.8) {
      scrollRef.current.children[0].position.y =
        -scrollRef.current.position.y;
    }
  });

  const { textPosX, textPosZ } = useControls({
    textPosX: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
    textPosZ: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
  });

  return (
    <>
      <Scroll ref={scrollRef}>
        <Text
          color="white"
          anchorX="center"
          anchorY="center"
          position={[textPosX, 0, textPosZ]}
          fontSize={fontSize}
          font="/BodoniModaSC.woff"
          receiveShadow
          castShadow
        >
          EUROWARSZTAT
        </Text>
      </Scroll>
    </>
  );
};

export default Title;
