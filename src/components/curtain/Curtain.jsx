// src/components/Curtain/index.js

import {
  useFrame,
  extend,
} from "@react-three/fiber";
import {
  MeshPhysicalMaterial,
  DoubleSide,
} from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { useRef } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { patchShaders } from "gl-noise/build/glNoise.m";
import gsap from "gsap";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useCurtainUniforms } from "./useCurtainUniforms"; // Import the hook

extend({ CustomShaderMaterial });

const Curtain = ({
  scale = [1, 1, 1],
  ...props
}) => {
  const matRef = useRef();

  // Use the custom hook to get uniforms
  const uniforms = useCurtainUniforms(props);

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
            uniforms.uTexture1.value;
        },
      });
    } else if (pointer.x < 0.3333) {
      gsap.to(matRef.current.uniforms.uProgress, {
        value: 1,
        onComplete: () => {
          matRef.current.uTexture1 =
            uniforms.uTexture2.value;
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
      <planeGeometry
        args={[scale[0], scale[1], 512, 512]}
      />
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
