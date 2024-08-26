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
import Header from "./components/header/Header";
import { Mail } from "./components/icons/Mail";
import { Facebook } from "./components/icons/Faceboook";
import { Instagram } from "./components/icons/Instagram";
const App = () => {
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
            position: [0.0, 0, 3],
          }}
          // camera={{ position: [0.0, 0, -3] }}
        >
          <Experience />
        </Canvas>
        <div className="header__creator">
          <span>Marta Romankiv</span>
        </div>
        <div className="header__socials">
          <Mail />
          <Facebook />
          <Instagram />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
