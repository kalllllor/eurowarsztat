import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Environment,
} from "@react-three/drei";

const App = () => {
  return (
    <Canvas
      camera={{ position: [0.0, 0.0, 8.0] }}
    >
      <OrbitControls makeDefault />
      <Experience />

      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
      >
        <GizmoViewport
          labelColor="white"
          axisHeadScale={1}
        />
      </GizmoHelper>
      <Environment files="./assets/studio.hdr" />
    </Canvas>
  );
};

export default App;
