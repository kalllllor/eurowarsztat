import React, { useEffect, useRef } from "react";
import {
  NearestFilter,
  LinearMipMapLinearFilter,
  RepeatWrapping,
} from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useControls } from "leva";

const applyTextureSettings = (texture) => {
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.flipY = false;
  texture.repeat.set(5, 5);
};

const Crown = (props) => {
  const matRef = useRef();
  const { crownColor } = useControls({
    crownColor: "#ffcf40",
  });

  const { nodes } = useLoader(
    GLTFLoader,
    "crown-draco.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const colorMap = useLoader(
    TextureLoader,
    "assets/crown/colorMap.jpg"
  );
  applyTextureSettings(colorMap);

  const aoMap = useLoader(
    TextureLoader,
    "assets/crown/aoMap.jpg"
  );
  applyTextureSettings(aoMap);

  const dispMap = useLoader(
    TextureLoader,
    "assets/crown/colorMap.jpg"
  );
  applyTextureSettings(dispMap);

  const norMap = useLoader(
    TextureLoader,
    "assets/crown/norMap.jpg"
  );
  applyTextureSettings(norMap);

  const roughMap = useLoader(
    TextureLoader,
    "assets/crown/roughMap.jpg"
  );
  applyTextureSettings(roughMap);

  const metalMap = useLoader(
    TextureLoader,
    "assets/crown/metalMap.jpg"
  );
  applyTextureSettings(metalMap);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.crown.geometry}
        receiveShadow
        castShadow
        dispose={null}
      >
        <meshPhysicalMaterial
          ref={matRef}
          displacementScale={0.1}
          color={crownColor}
          map={colorMap}
          aoMap={aoMap}
          normalMap={norMap}
          roughnessMap={roughMap}
          metalnessMap={metalMap}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export default Crown;
