import {
  useFrame,
  extend,
} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Color, DoubleSide } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";
import { patchShaders } from "gl-noise/build/glNoise.m";

import gsap from "gsap";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import photo1 from "../../assets/photos/abdallahRazikOmar.jpg";
import photo2 from "../../assets/photos/walidBoussad.jpg";
import photo3 from "../../assets/photos/liubovSavycka.jpg";
extend({ CustomShaderMaterial });

const Curtain = (props) => {
  const matRef = useRef();
  const {
    uHeight,
    uTimeFrequency,
    uPositionFrequency,
    uStrength,
    uWarpTimeFrequency,
    uWarpStrength,
    uWarpPositionFrequency,
    uColorA,
    uColorB,
    uBrightness,
    uOffset,
    uContrast,
  } = useControls({
    uHeight: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uPositionFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uTimeFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uStrength: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },

    uWarpTimeFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uWarpPositionFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uWarpStrength: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uBrightness: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.001,
    },
    uOffset: {
      value: 0,
      min: 0,
      max: 10,
      step: 0.001,
    },
    uContrast: {
      value: 0.1,
      min: 0,
      max: 10,
      step: 0.001,
    },
    uColorA: { r: 0, b: 255, g: 19, a: 1 },
    uColorB: { r: 1, b: 5, g: 30, a: 1 },
  });

  const [
    photo1Texture,
    photo2Texture,
    photo3Texture,
  ] = useTexture([photo1, photo2, photo3]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeight: {
        value: uHeight,
      },
      uTimeFrequency: { value: uTimeFrequency },
      uPositionFrequency: {
        value: uPositionFrequency,
      },
      uStrength: { value: uStrength },
      uWarpTimeFrequency: {
        value: uWarpTimeFrequency,
      },
      uWarpStrength: { value: uWarpStrength },
      uWarpPositionFrequency: {
        value: uWarpPositionFrequency,
      },
      uColorA: {
        value: uColorA,
      },
      uColorB: {
        value: uColorB,
      },
      uBrightness: { value: uBrightness },
      uOffset: { value: uOffset },
      uContrast: { value: uContrast },
      uTexture1: { value: photo1Texture },
      uTexture2: { value: photo2Texture },
      uProgress: { value: 0 },
    }),
    [
      uHeight,
      uTimeFrequency,
      uPositionFrequency,
      uStrength,
      uWarpTimeFrequency,
      uWarpPositionFrequency,
      uWarpStrength,
      uColorA,
      uColorB,
      uBrightness,
      uOffset,
      uContrast,
    ]
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value =
        clock.getElapsedTime();
    }
    if (pointer.x < -0.3333) {
      gsap.to(matRef.current.uniforms.uProgress, {
        value: 0,
        onStart: () => {
          matRef.current.uTexture1 =
            photo1Texture;
        },
      });
    } else if (pointer.x < 0.3333) {
      gsap.to(matRef.current.uniforms.uProgress, {
        value: 1,
        onComplete: () => {
          matRef.current.uTexture1 =
            photo3Texture;
        },
      });
    } else if (pointer.x > 0.3333) {
      gsap.to(matRef.current.uniforms.uProgress, {
        value: 0,
      });
    }
  });

  const colorMap = useLoader(
    TextureLoader,
    "assets/fabric/colorMap.jpg"
  );

  const norMap = useLoader(
    TextureLoader,
    "assets/fabric/norMap.jpg"
  );

  const roughMap = useLoader(
    TextureLoader,
    "assets/fabric/roughMap.jpg"
  );

  return (
    <mesh {...props}>
      <planeGeometry args={[5, 5, 512, 512]} />
      <CustomShaderMaterial
        ref={matRef}
        baseMaterial={MeshPhysicalMaterial}
        vertexShader={patchShaders(vertexShader)}
        map={colorMap}
        normalMap={norMap}
        roughnessMap={roughMap}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
        roughness={0.8}
        metalness={0.5}
        ior={0.8}
        reflectivity={0}
        silent
      />
    </mesh>
  );
};

export default Curtain;
