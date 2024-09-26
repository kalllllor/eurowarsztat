import { useEffect, useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

function MovingSpot({ intensity, ...props }) {
  const light = useRef();
  useFrame(() => {
    light.current.intensity =
      THREE.MathUtils.lerp(
        light.current.intensity,
        intensity,
        0.1
      );
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={21}
      angle={0.3}
      attenuation={27}
      anglePower={16.5}
      intensity={1000}
      decay={2}
      {...props}
    />
  );
}

export default function Lights({ intensity }) {
  return (
    <group position={[0, 0, 10]}>
      <MovingSpot
        color="#fff"
        intensity={intensity}
        position={[-2, 2, 1]}
      />
      <MovingSpot
        color="#fff"
        intensity={intensity}
        position={[2, 2, 1]}
      />
    </group>
  );
}
