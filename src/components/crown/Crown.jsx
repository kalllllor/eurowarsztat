import React, { useEffect, useRef } from "react";
import {
  useLoader,
  useFrame,
} from "@react-three/fiber"; // Import useFrame
import {
  NearestFilter,
  LinearMipMapLinearFilter,
  RepeatWrapping,
} from "three";
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
  const crownRef = useRef(); // Reference for the mesh/group
  const { crownColor } = useControls({
    crownColor: "#d8ac27",
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

  useFrame(() => {
    if (crownRef.current) {
      crownRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group
      ref={crownRef}
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.crown.geometry}
        receiveShadow
        castShadow
        dispose={null}
      >
        <meshPhysicalMaterial
          ref={matRef}
          color={crownColor}
          map={colorMap}
          aoMap={aoMap}
          normalMap={norMap}
          roughnessMap={roughMap}
          metalnessMap={metalMap}
          roughness={1}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
};

export default Crown;
