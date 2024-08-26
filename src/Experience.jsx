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
import Carousel from "./components/carousel/Carousel";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img7.jpg",
  "/img8.jpg",
];

export default function Experience() {
  const {
    debug,
    enabledPostProcess,
    posX,
    posY,
    posZ,
    scaleX,
    scaleY,
    floatSpeed,
    rotationIntensity,
    floatIntensity,
    floatingRange,
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
      value: 0,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posZ: {
      value: -1.2,
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
    floatSpeed: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
    },
    rotationIntensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    floatIntensity: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
    },
    floatingRange: {
      value: [0, 0.2],
      min: 0,
      max: 3,
      step: 0.1,
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
      <Environment
        files="/studio.jpg"
        environmentIntensity={5}
        environmentRotation={[0, 0, 0]}
      />
      <axesHelper />
      <ScrollControls damping={0.5} pages={5}>
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
              speed={floatSpeed}
              rotationIntensity={
                rotationIntensity
              }
              floatIntensity={floatIntensity}
              floatingRange={floatingRange}
            >
              <Crown position={[0, -0.3, -1.4]} />
            </Float>
          </group>
        </Scroll>
        <Scroll>
          <Text
            color="white"
            anchorX="center"
            anchorY="center"
            position={[0, 1.5, 0]}
            fontSize={1}
            font="/bebas-neue-v9-latin-regular.woff"
            receiveShadow
            castShadow
          >
            EUROWARSZTAT
          </Text>
        </Scroll>
        {!isActive && (
          <Scroll html>
            <Description />
          </Scroll>
        )}

        <Scroll>
          <Carousel images={images} />
        </Scroll>
      </ScrollControls>

      <Curtain
        position={[posX, posY, posZ]}
        scale={[scaleX, scaleY, 1]}
        rotation={[0, 0, 0]}
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
