import { useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Scroll, Text } from "@react-three/drei";
import { useControls } from "leva";

const Title = ({ baseFontSize }) => {
  const scrollRef = useRef(null);
  const { size } = useThree();
  const fontSize =
    (baseFontSize / size.height) * 1000;
  const baseValue = 6;
  const heightAdjustment = Math.max(
    0,
    Math.floor((size.height - 700) / 300) * 3
  );
  const topBreakpoint =
    baseValue + heightAdjustment * 0.1;

  const { textPosX, textPosZ, lowerVal } =
    useControls({
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
      lowerVal: {
        value: (2.9 * 1000) / size.height,
        min: (2.5 * 1000) / size.height - 10,
        max: (2.5 * 1000) / size.height + 10,
      },
    });

  useFrame(() => {
    if (
      scrollRef.current.position.y < topBreakpoint
    ) {
      scrollRef.current.children[0].position.y =
        -scrollRef.current.position.y +
        (0.5 / size.height) * 1000;
    }
    if (
      scrollRef.current.position.y > lowerVal &&
      scrollRef.current.position.y < topBreakpoint
    ) {
      scrollRef.current.children[1].position.y =
        -scrollRef.current.position.y;
    }
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
            -lowerVal,
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
