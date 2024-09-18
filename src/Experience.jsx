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
import Credits from "./components/credits/Credits";
import Title from "./components/title/Title";

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
  const { height } = useThree(
    (state) => state.viewport
  );

  const {
    debug,
    enabledPostProcess,
    vignette,
    posX,
    posY,
    posZ,
    crownX,
    crownY,
    crownZ,
    crownScale,
    scaleX,
    scaleY,
    floatSpeed,
    rotationIntensity,
    floatIntensity,
    floatingRange,
    fontSize,
    textColor,
  } = useControls({
    debug: false,
    enabledPostProcess: true,
    vignette: false,
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
      value: -2.7,
      min: -40,
      max: 40,
      step: 0.01,
    },
    crownX: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
    crownY: {
      value: -0.4,
      min: -3,
      max: 3,
      step: 0.01,
    },
    crownZ: {
      value: -2.2,
      min: -4,
      max: 3,
      step: 0.01,
    },
    crownScale: {
      value: 1.62,
      min: 1,
      max: 3,
      step: 0.01,
    },

    scaleX: {
      value: 17.9,
      min: -0,
      max: 20,
      step: 0.01,
    },
    scaleY: {
      value: 18.8,
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
      value: 0.7,
      min: 0,
      max: 3,
      step: 0.1,
    },
    floatingRange: {
      value: [0, 0.95],
      min: 0,
      max: 3,
      step: 0.1,
    },
    fontSize: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.01,
    },
    textColor: "#fff",
  });
  const data = useRef(list.data);
  const pages = 8;
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
      <Lights intensity={isActive ? 10 : 1000} />
      <Environment
        files="/studio.jpg"
        environmentIntensity={vignette ? 2 : 0.5}
        environmentRotation={[0, 0, 0]}
      />

      <ScrollControls damping={0.5} pages={pages}>
        <Scroll>
          <Gallery
            images={data.current}
            isSelected={(active) =>
              setActive(active)
            }
            pages={pages}
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
              <Crown
                position={[
                  crownX,
                  crownY,
                  crownZ,
                ]}
                scale={[
                  crownScale,
                  crownScale,
                  crownScale,
                ]}
              />
            </Float>
          </group>
          <Credits />
          <Text
            color="#D4D8D8"
            anchorX="center"
            anchorY="center"
            position={[0, -4.7 * height, 0]}
            fontSize={0.3}
            font="/BodoniModa_9pt-SemiBoldItalic.woff"
            receiveShadow
            castShadow
          >
            Podziel się swoją wizją
          </Text>
          <Text
            color="#D4D8D8"
            anchorX="center"
            anchorY="center"
            position={[0, -4.77 * height, 0]}
            fontSize={0.3}
            font="/BodoniModa_9pt-SemiBoldItalic.woff"
            receiveShadow
            castShadow
          >
            Europy! Zabierz swój głos!
          </Text>
          <Text
            color="#D4D8D8"
            anchorX="center"
            anchorY="center"
            position={[0, -4.87 * height, 0]}
            fontSize={0.1}
            font="/d.woff"
            receiveShadow
            castShadow
          >
            Dołącz do projektu zgłaszając chęć
            udziału na adres mailowy:
            euroworkshop.contact@gmail.com
          </Text>
        </Scroll>
        <Title fontSize={fontSize} />

        {!isActive && (
          <Scroll html>
            <Description
              style={{
                color: textColor,
              }}
            />
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
          {vignette && (
            <Vignette
              eskil={false}
              offset={0.5}
              darkness={1.1}
            />
          )}
        </EffectComposer>
      )}
    </>
  );
}
