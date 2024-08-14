import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

function MovingSpot({
  vec = new THREE.Vector3(),
  intensity,
  ...props
}) {
  const light = useRef();
  useEffect(() => {
    light.current.target.lookAt(
      new THREE.Vector3(0, 0, 10)
    );
  }, []);
  const viewport = useThree(
    (state) => state.viewport
  );
  console.log(intensity);
  const {
    penumbra,
    distance,
    angle,
    attenuation,
    anglePower,
    decay,
  } = useControls({
    penumbra: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
    distance: {
      value: 21,
      min: 0,
      max: 100,
      step: 0.1,
    },
    angle: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.001,
    },
    attenuation: {
      value: 27,
      min: 0,
      max: 40,
      step: 0.001,
    },
    anglePower: {
      value: 16.5,
      min: 0,
      max: 40,
      step: 0.01,
    },
    decay: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.001,
    },
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={penumbra}
      distance={distance}
      angle={angle}
      attenuation={attenuation}
      anglePower={anglePower}
      intensity={intensity}
      decay={decay}
      {...props}
    />
  );
}

export default function Lights({ intensity }) {
  return (
    <group position={[0, 0, 5]}>
      <MovingSpot
        color="#fff"
        intensity={intensity}
        position={[-2, 3, 0]}
      />
      <MovingSpot
        color="#fff"
        intensity={intensity}
        position={[2, 3, 0]}
      />
    </group>
  );
}
