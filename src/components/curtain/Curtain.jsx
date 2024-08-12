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
import gsap from "gsap";
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
    // if (pointer.x < -0.3333) {
    //   gsap.to(matRef.current.uniforms.uProgress, {
    //     value: 0,
    //     onStart: () => {
    //       matRef.current.uTexture1 =
    //         uniforms.uTexture1.value;
    //     },
    //   });
    // } else if (pointer.x < 0.3333) {
    //   gsap.to(matRef.current.uniforms.uProgress, {
    //     value: 1,
    //     onComplete: () => {
    //       matRef.current.uTexture1 =
    //         uniforms.uTexture2.value;
    //     },
    //   });
    // } else if (pointer.x > 0.3333) {
    //   gsap.to(matRef.current.uniforms.uProgress, {
    //     value: 0,
    //   });
    // }
  });

  const repeat = 5;

  const colorMap = useLoader(
    TextureLoader,
    "assets/fabric/colorMap.jpg"
  );
  applyTextureSettings(colorMap);

  const norMap = useLoader(
    TextureLoader,
    "assets/fabric/norMap.jpg"
  );

  applyTextureSettings(norMap);

  const roughMap = useLoader(
    TextureLoader,
    "assets/fabric/roughMap.jpg"
  );

  applyTextureSettings(roughMap);

  const aoMap = useLoader(
    TextureLoader,
    "assets/fabric/aoMap.jpg"
  );

  applyTextureSettings(aoMap);

  const alphaMap = useLoader(
    TextureLoader,
    "assets/fabric/alphaMap.jpg"
  );

  applyTextureSettings(alphaMap);

  const dispMap = useLoader(
    TextureLoader,
    "assets/fabric/dispMap.jpg"
  );

  applyTextureSettings(dispMap);

  return (
    <mesh {...props}>
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
        transparent
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
