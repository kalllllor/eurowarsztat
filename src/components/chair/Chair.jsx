import React from "react";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Chair = (props) => {
  const { nodes } = useLoader(
    GLTFLoader,
    "chair-draco.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const colorMap = useLoader(
    TextureLoader,
    "assets/table/diffMap.jpg"
  );
  const aoMap = useLoader(
    TextureLoader,
    "assets/table/aoMap.jpg"
  );
  const dispMap = useLoader(
    TextureLoader,
    "assets/table/dispMap.jpg"
  );
  const norMap = useLoader(
    TextureLoader,
    "assets/table/norMap.jpg"
  );
  const roughMap = useLoader(
    TextureLoader,
    "assets/table/roughMap.jpg"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.chair.geometry}
        receiveShadow
        castShadow
      >
        <meshPhysicalMaterial
          color="#222"
          map={colorMap}
          aoMap={aoMap}
          normalMap={norMap}
          roughnessMap={roughMap}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
};

export default Chair;
