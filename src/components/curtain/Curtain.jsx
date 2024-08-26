// src/components/Curtain/index.js

import {
  useFrame,
  extend,
} from "@react-three/fiber";
import {
  MeshPhysicalMaterial,
  DoubleSide,
  RepeatWrapping,
} from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { useRef } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { patchShaders } from "gl-noise/build/glNoise.m";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useCurtainUniforms } from "./useCurtainUniforms";

extend({ CustomShaderMaterial });

const applyTextureSettings = (texture) => {
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.flipY = false;
  texture.repeat.set(2, 2);
};

const Curtain = ({
  scale = [1, 1, 1],
  ...props
}) => {
  const matRef = useRef();

  const uniforms = useCurtainUniforms(props);

  useFrame((state) => {
    const { clock, pointer } = state;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  const [
    colorMap,
    norMap,
    roughMap,
    aoMap,
    alphaMap,
    dispMap,
  ] = useLoader(TextureLoader, [
    "assets/fabric/colorMap.jpg",
    "assets/fabric/norMap.jpg",
    "assets/fabric/roughMap.jpg",
    "assets/fabric/aoMap.jpg",
    "assets/fabric/alphaMap.jpg",
    "assets/fabric/dispMap.jpg",
  ]);

  [
    colorMap,
    norMap,
    roughMap,
    aoMap,
    alphaMap,
    dispMap,
  ].forEach((item) => applyTextureSettings(item));

  return (
    <mesh {...props} receiveShadow>
      <planeGeometry
        args={[scale[0], scale[1], 1024, 1024]}
      />
      <CustomShaderMaterial
        ref={matRef}
        baseMaterial={MeshPhysicalMaterial}
        vertexShader={patchShaders(vertexShader)}
        map={colorMap}
        normalMap={norMap}
        roughnessMap={roughMap}
        aoMap={aoMap}
        alphaMap={alphaMap}
        displacementMap={dispMap}
        displacementScale={0.01}
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
