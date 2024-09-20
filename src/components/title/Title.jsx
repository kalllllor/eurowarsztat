import { useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Scroll, Text } from "@react-three/drei";
import { useControls } from "leva";

const Title = ({ baseFontSize }) => {
  const scrollRef = useRef(null);
  const { viewport, size } = useThree();
  const fontSize =
    (baseFontSize / size.height) * 1000;

  useFrame(() => {
    if (scrollRef.current.position.y < 6.3) {
      scrollRef.current.children[0].position.y =
        -scrollRef.current.position.y + 0.5;
    }
    if (
      scrollRef.current.position.y >
        (2.5 * 1000) / size.height &&
      scrollRef.current.position.y < 6.3
    ) {
      scrollRef.current.children[1].position.y =
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
          font="/BodoniModa_18pt-Black.woff"
          receiveShadow
          castShadow
        >
          EURO
        </Text>
        <Text
          color="white"
          anchorX="center"
          anchorY="center"
          position={[
            textPosX,
            (-2.5 * 1000) / size.height,
            textPosZ,
          ]}
          fontSize={fontSize * 0.8}
          font="/BodoniModa_18pt-SemiBoldItalic.woff"
          receiveShadow
          castShadow
        >
          warsztat
        </Text>
      </Scroll>
    </>
  );
};

export default Title;
