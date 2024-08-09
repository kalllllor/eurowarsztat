import { useEffect, useRef } from "react";
import Curtain from "./components/curtain/Curtain";
import Chair from "./components/chair/Chair";
import Crown from "./components/crown/Crown";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import {
  GizmoHelper,
  GizmoViewport,
  Environment,
  OrbitControls,
  Float,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useState } from "react";
import { useControls } from "leva";
import Gallery from "./components/gallery/Gallery";
import { Vector3 } from "three";
import * as THREE from "three";
import {
  ScrollControls,
  Scroll,
  Text,
} from "@react-three/drei";
export default function Experience() {
  const { scene, camera } = useThree();
  console.log(camera);
  const {
    debug,
    enabledPostProcess,
    posX,
    posY,
    posZ,
    scaleX,
    scaleY,

    rotateX,
    rotateY,
    rotateZ,
  } = useControls({
    debug: false,
    enabledPostProcess: false,

    posX: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posY: {
      value: 6.78,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posZ: {
      value: -19.86,
      min: -40,
      max: 0,
      step: 0.01,
    },
    scaleX: {
      value: 5.73,
      min: -0,
      max: 20,
      step: 0.01,
    },
    scaleY: {
      value: 9.3,
      min: 0,
      max: 20,
      step: 0.01,
    },
    rotateX: {
      value: -0.35,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    rotateY: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    rotateZ: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
  });

  const rotationSpeed = 0.01;
  const easeFactor = 0.1;

  const targetRotation = useRef(
    new THREE.Vector3()
  );

  useFrame(({ pointer, scene }) => {
    if (scene) {
      targetRotation.current.y =
        THREE.MathUtils.lerp(
          targetRotation.current.y,
          pointer.x * Math.PI * 2,
          easeFactor
        );

      scene.environmentRotation.y +=
        rotationSpeed;

      scene.environmentRotation.y +=
        (targetRotation.current.y -
          scene.environmentRotation.y) *
        easeFactor;
    }
  });

  return (
    <>
      {debug && <Perf position="top-left" />}
      <color
        attach="background"
        args={["#000"]}
      />
      <OrbitControls makeDefault />

      {/* <Lights /> */}
      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
      >
        <GizmoViewport
          labelColor="white"
          axisHeadScale={1}
        />
      </GizmoHelper>
      {/* <Lights /> */}
      <Environment
        files="/studio.hdr"
        environmentIntensity={1}
        environmentRotation={[0, 0, 0]}
      />
      <axesHelper />
      <ScrollControls damping={0.5} pages={4}>
        <Scroll>
          <Gallery />
          <group
            position={[0, 0, 3]}
            rotation-x={-Math.PI * 0.05}
          >
            <Float
              speed={0.5}
              rotationIntensity={1}
              floatIntensity={0.5}
              floatingRange={[0, 0.2]}
            >
              <Crown position={[0, -0.3, 0.7]} />
            </Float>
          </group>
        </Scroll>
        <Scroll>
          <Text
            color="white"
            anchorX="center"
            anchorY="center"
            position={[0, 2.5, 0]}
            fontSize={1}
            font="/bebas-neue-v9-latin-regular.woff"
          >
            EUROWARSZTAT
          </Text>
        </Scroll>
      </ScrollControls>
      <Curtain
        position={[posX, posY, posZ]}
        scale={[scaleX, scaleY, 1]}
        rotation={[rotateX, rotateY, rotateZ]}
      />
      {/* <fog
        attach="fog"
        args={["#202025", 0, 80]}
      /> */}
      {/* <mesh
        receiveShadow
        position={[0, -2.3, 0]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh> */}

      {enabledPostProcess && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            luminanceSmoothing={10}
          />

          <Vignette
            eskil={false}
            offset={0.4}
            darkness={1.1}
          />
        </EffectComposer>
      )}
    </>
  );
}
