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

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={21}
      angle={0.6}
      attenuation={27}
      anglePower={16.5}
      intensity={intensity}
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
