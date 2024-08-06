import { useEffect, useRef } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  SpotLight,
  SpotLightShadow,
  useDepthBuffer,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
function MovingSpot({
  vec = new THREE.Vector3(),
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
  useFrame((state) => {
    if (light.current) {
      light.current.penumbra = penumbra;
      light.current.distance = distance;
      light.current.angle = angle;
      light.current.intensity = intensity;
      light.current.decay = decay;
      light.current.target.position.lerp(
        vec.set(
          0,
          0,
          -(state.pointer.y * viewport.width) /
            5 -
            5
        ),
        0.9
      );

      light.current.target.updateMatrixWorld();
    }
  });
  const {
    penumbra,
    distance,
    angle,
    attenuation,
    anglePower,
    intensity,
    decay,
  } = useControls({
    penumbra: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
    distance: {
      value: 19.5,
      min: 0,
      max: 100,
      step: 0.1,
    },
    angle: {
      value: 0.75,
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
    intensity: {
      value: 100,
      min: 0,
      max: 100,
      step: 0.001,
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

export default function Lights() {
  const depthBuffer = useDepthBuffer({
    frames: 1,
  });

  return (
    <group position={[0, 0, 5]}>
      <MovingSpot
        color="#fff"
        position={[-2, 3, 0]}
      />
      <MovingSpot
        color="#fff"
        position={[2, 3, 0]}
      />
      <pointLight
        position={[0, 6, 1]}
        intensity={100}
        color="#FFD700"
      />
      <pointLight
        position={[0, 6, -15]}
        intensity={100}
        color="#FFD700"
      />
    </group>
  );
}
