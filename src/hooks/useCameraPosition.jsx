import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const useCameraPosition = (camX, camY, camZ) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(camX, camY, camZ);
  }, [camX, camY, camZ, camera]);
};

export default useCameraPosition;
