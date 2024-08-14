import { useRef, useState } from "react";
import Curtain from "./components/curtain/Curtain";
import Crown from "./components/crown/Crown";

import { Perf } from "r3f-perf";
import {
  GizmoHelper,
  GizmoViewport,
  Environment,
  Float,
  useScroll,
  Html,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import Gallery from "./components/gallery/Gallery";
import * as THREE from "three";
import {
  ScrollControls,
  Scroll,
  Text,
  OrbitControls,
} from "@react-three/drei";
import "./styles.css";
import Description from "./components/description/Description";
import list from "./assets/data.json";
import Lights from "./Lights";

export default function Experience() {
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
    enabledPostProcess: true,

    posX: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posY: {
      value: 0.5,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posZ: {
      value: 1.0,
      min: -40,
      max: 40,
      step: 0.01,
    },
    scaleX: {
      value: 10,
      min: -0,
      max: 20,
      step: 0.01,
    },
    scaleY: {
      value: 10,
      min: 0,
      max: 20,
      step: 0.01,
    },
    rotateX: {
      value: 0,
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
  const data = useRef(list.data);

  const rotationSpeed = 0.01;
  const easeFactor = 0.1;

  const [isActive, setActive] = useState(false);

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
      {/* <OrbitControls makeDefault /> */}
      <Lights intensity={isActive ? 0 : 100} />
      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
      >
        <GizmoViewport
          labelColor="white"
          axisHeadScale={1}
        />
      </GizmoHelper>

      <Environment
        files="/studio.hdr"
        environmentIntensity={1}
        environmentRotation={[0, 0, 0]}
      />
      <axesHelper />
      <ScrollControls damping={0.5} pages={4}>
        <Scroll>
          <Gallery
            images={data.current}
            isSelected={(active) =>
              setActive(active)
            }
          />
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
              <Crown position={[0, -0.6, 0.7]} />
            </Float>
          </group>
        </Scroll>
        <Scroll>
          <Text
            color="white"
            anchorX="center"
            anchorY="center"
            position={[0, 1.5, 2.5]}
            fontSize={1}
            font="/bebas-neue-v9-latin-regular.woff"
            receiveShadow
            castShadow
          >
            EUROWARSZTAT
          </Text>
        </Scroll>
        <Scroll html>
          <Description />
        </Scroll>
      </ScrollControls>

      <Curtain
        position={[posX, posY, posZ]}
        scale={[scaleX, scaleY, 1]}
        rotation={[rotateX, rotateY, rotateZ]}
      />
      <fog
        attach="fog"
        args={["#202025", 0, 80]}
      />

      {enabledPostProcess && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            luminanceSmoothing={10}
          />

          <Vignette
            eskil={false}
            offset={0.1}
            darkness={1.1}
          />
        </EffectComposer>
      )}
    </>
  );
}
