import { useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Scroll, Text } from "@react-three/drei";

const Title = () => {
  const scrollRef = useRef(null);
  const viewport = useThree(
    (state) => state.viewport
  );

  const bottomVal = viewport.height * 1.4;
  const addedTopVal = 0.5;
  const topSecondBreakpoint = viewport.height;
  const mobileBreakpoint = 769;

  useFrame(() => {
    const totalWidth =
      viewport.width * viewport.factor;
    if (
      scrollRef.current.position.y <
      bottomVal - 10 / totalWidth
    ) {
      scrollRef.current.children[0].position.y =
        -scrollRef.current.position.y +
        addedTopVal +
        100 / totalWidth;
    }
    if (
      scrollRef.current.position.y >
        topSecondBreakpoint &&
      scrollRef.current.position.y <
        bottomVal - 100 / totalWidth
    ) {
      scrollRef.current.children[1].position.y =
        -scrollRef.current.position.y;
    }
  });
  return (
    <>
      <Scroll ref={scrollRef}>
        <Text
          color="#d4d8d8"
          anchorX="center"
          anchorY="center"
          position={[0, addedTopVal, 0]}
          fontSize={
            viewport.width * viewport.factor >
            mobileBreakpoint
              ? 1000 /
                (viewport.width * viewport.factor)
              : viewport.width * 0.3
          }
          font="/BodoniModa_18pt-Black.woff"
          receiveShadow
          castShadow
        >
          EURO
        </Text>
        <Text
          color="#d4d8d8"
          anchorX="center"
          anchorY="center"
          position={[0, -topSecondBreakpoint, 0]}
          fontSize={
            viewport.width * viewport.factor >
            mobileBreakpoint
              ? 800 /
                (viewport.width * viewport.factor)
              : viewport.width * 0.24
          }
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
