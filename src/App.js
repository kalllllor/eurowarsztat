import React, {
  Suspense,
  useEffect,
} from "react";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import Experience from "./Experience";
import { useControls } from "leva";

const App = () => {
  const { camX, camY, camZ } = useControls({
    camX: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
    camY: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
    camZ: {
      value: 3,
      min: -3,
      max: 3,
      step: 0.01,
    },
  });
  const CameraController = ({
    camX,
    camY,
    camZ,
  }) => {
    const { camera } = useThree();

    useEffect(() => {
      camera.position.set(camX, camY, camZ);
    }, [camX, camY, camZ, camera]);

    return null;
  };
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="loading__screen">
            Loading
          </div>
        }
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{
            fov: 75,
            position: [camX, camY, camZ],
          }}
        >
          <CameraController
            camX={camX}
            camY={camY}
            camZ={camZ}
          />
          <Experience />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
