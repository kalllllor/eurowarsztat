import { useGLTF } from "@react-three/drei";

function Model() {
  const gltf = useGLTF(
    "../../assets/SheenChair.glb"
  );

  return <primitive object={gltf.scene} />;
}

const Chair = () => {
  return <Model />;
};

export default Chair;
