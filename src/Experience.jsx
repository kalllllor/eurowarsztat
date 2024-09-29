import {
  useEffect,
  useRef,
  useState,
} from "react";
import Curtain from "./components/curtain/Curtain";
import Crown from "./components/crown/Crown";

import { Perf } from "r3f-perf";
import {
  GizmoHelper,
  GizmoViewport,
  Environment,
  Float,
  useScroll,
  Html,
  useTexture,
  SpotLight,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import Gallery from "./components/gallery/Gallery";
import * as THREE from "three";
import {
  ScrollControls,
  Scroll,
  Text,
  OrbitControls,
} from "@react-three/drei";
import "./styles.css";
import Description from "./components/description/Description";
import list from "./assets/data.json";
import Lights from "./Lights";
import Carousel from "./components/carousel/Carousel";
import Credits from "./components/credits/Credits";
import Title from "./components/title/Title";
import Share from "./components/share/Share";
import Footer from "./components/footer/Footer";

export default function Experience() {
  const {
    debug,
    enabledPostProcess,
    vignette,
    posX,
    posY,
    posZ,
    crownX,
    crownY,
    crownZ,
    crownScale,
    scaleX,
    scaleY,
    floatSpeed,
    rotationIntensity,
    floatIntensity,
    floatingRange,
    fontSize,
    textColor,
    x,
    y,
    z,
  } = useControls({
    debug: false,
    enabledPostProcess: true,
    vignette: false,
    posX: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posY: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.01,
    },
    posZ: {
      value: -2.7,
      min: -40,
      max: 40,
      step: 0.01,
    },
    crownX: {
      value: 0,
      min: -3,
      max: 3,
      step: 0.01,
    },
    crownY: {
      value: -0.08,
      min: -3,
      max: 3,
      step: 0.01,
    },
    crownZ: {
      value: -2.2,
      min: -4,
      max: 3,
      step: 0.01,
    },
    crownScale: {
      value: 2.17,
      min: 1,
      max: 3,
      step: 0.01,
    },

    scaleX: {
      value: 17.9,
      min: -0,
      max: 20,
      step: 0.01,
    },
    scaleY: {
      value: 18.8,
      min: 0,
      max: 20,
      step: 0.01,
    },
    floatSpeed: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
    },
    rotationIntensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    floatIntensity: {
      value: 0.7,
      min: 0,
      max: 3,
      step: 0.1,
    },
    floatingRange: {
      value: [0, 0.95],
      min: 0,
      max: 3,
      step: 0.1,
    },
    fontSize: {
      value: 0.55,
      min: 0,
      max: 1,
      step: 0.01,
    },
    textColor: "#fff",
    x: {
      value: 0,
      min: -30,
      max: 30,
      step: 0.1,
    },
    y: {
      value: 1.1,
      min: -30,
      max: 30,
      step: 0.1,
    },
    z: {
      value: 6,
      min: -30,
      max: 30,
      step: 0.1,
    },
  });
  const data = useRef(list.data);
  const pages = 11;
  const rotationSpeed = 0.01;
  const easeFactor = 0.1;

  const [isActive, setActive] = useState(null);
  const [isScroll, setScroll] = useState(true);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const targetRotation = useRef(
    new THREE.Vector3()
  );

  useFrame(({ pointer, scene }) => {
    if (scene) {
      targetRotation.current.y =
        THREE.MathUtils.lerp(
          targetRotation.current.y,
          pointer.x * Math.PI * 2,
          easeFactor
        );

      scene.environmentRotation.y +=
        rotationSpeed;

      scene.environmentRotation.y +=
        (targetRotation.current.y -
          scene.environmentRotation.y) *
        easeFactor;

      const targetIntensity = isScroll ? 0.5 : 0;
      scene.environmentIntensity +=
        (targetIntensity -
          scene.environmentIntensity) *
        easeFactor;
    }
  });

  const handleIsSelected = (person) => {
    setActive(person);
  };

  const handleEnableScroll = (
    enable,
    videoUrl,
    photoUrl = null
  ) => {
    videoRef.current = videoUrl;
    photoRef.current = photoUrl;
    setScroll(enable);
  };

  const handleCloseVideo = () => {
    photoRef.current = null;
    videoRef.current = null;
    setScroll(true);
  };

  return (
    <>
      {debug && <Perf position="top-left" />}
      <color
        attach="background"
        args={["#000"]}
      />
      {/* <OrbitControls makeDefault /> */}
      <Lights
        intensity={
          isActive || !isScroll ? 0 : 1000
        }
      />
      <Environment
        files="/studio.jpg"
        environmentIntensity={vignette ? 2 : 0.5}
        environmentRotation={[0, 0, 0]}
      />
      <ProjectedImage
        position={[0, y, z]}
        intensity={isActive ? 10000 : 0}
        imageUrl={isActive && isActive.url}
        isActive={isActive}
      />

      {photoRef.current && (
        <Html
          as="div"
          wrapperClass="video__container"
        >
          <div
            className="video-overlay"
            style={overlayStyles}
          >
            <img
              src={photoRef.current}
              style={{
                width: "auto",
                height: "80%",
              }}
            ></img>
            <button
              className="exit"
              onClick={handleCloseVideo}
            >
              <img src={"back.png"} />
              <span>exit</span>
            </button>
          </div>
        </Html>
      )}

      {videoRef.current && !photoRef.current && (
        <Html
          as="div"
          wrapperClass="video__container"
        >
          <div
            className="video-overlay"
            style={overlayStyles}
          >
            <video
              src={videoRef.current}
              controls
              muted
              autoPlay
              style={{
                width: "auto",
                height: "80%",
              }}
            ></video>

            <button
              className="exit"
              onClick={handleCloseVideo}
            >
              <img src={"back.png"} />
              <span>exit</span>
            </button>
          </div>
        </Html>
      )}
      <ScrollControls
        damping={0.5}
        pages={pages}
        enabled={isScroll}
      >
        <Scroll>
          <Gallery
            images={data.current}
            isSelected={handleIsSelected}
            pages={pages}
            enableScroll={handleEnableScroll}
          />
          <group
            position={[0, 0, 3]}
            rotation-x={-Math.PI * 0.05}
          >
            <Crown
              position={[crownX, crownY, crownZ]}
              scale={[
                crownScale,
                crownScale,
                crownScale,
              ]}
            />
          </group>
        </Scroll>
        <Share />
        {!isActive && (
          <Title baseFontSize={fontSize} />
        )}
        <Scroll html>
          {!isActive && (
            <>
              <Description
                style={{
                  color: textColor,
                }}
              />
              <Credits
                style={{
                  color: textColor,
                }}
              />
              <Carousel
                enableScroll={handleEnableScroll}
              />
              <Footer />
            </>
          )}
        </Scroll>
      </ScrollControls>

      <Curtain
        position={[posX, posY, posZ]}
        scale={[scaleX, scaleY, 1]}
        rotation={[0, 0, 0]}
      />
      <fog
        attach="fog"
        args={["#202025", 0, 80]}
      />

      {enabledPostProcess && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            luminanceSmoothing={10}
          />
          {vignette && (
            <Vignette
              eskil={false}
              offset={0.5}
              darkness={1.1}
            />
          )}
        </EffectComposer>
      )}
    </>
  );
}

function ProjectedImage({
  imageUrl = "",
  intensity = 0,
  isActive,
  ...props
}) {
  const spotLightRef = useRef();
  const data = useScroll();

  const texture = useTexture(
    imageUrl || "/assets/photos/blank.jpg",
    (item) => {
      spotLightRef.current.shadow.mapSize.width = 1440;
      spotLightRef.current.shadow.mapSize.height = 1800;
      spotLightRef.current.shadow.focus = 1.2;

      spotLightRef.current.lookAt(
        new THREE.Vector3(3, 0, 0)
      );
    }
  );

  useFrame(() => {
    if (spotLightRef.current) {
      const currentIntensity =
        spotLightRef.current.intensity;
      const targetIntensity = intensity;
      const lerpedIntensity =
        currentIntensity +
        (targetIntensity - currentIntensity) *
          0.1;
      spotLightRef.current.intensity =
        lerpedIntensity;
      if (lerpedIntensity < 1) {
        spotLightRef.current.intensity = 0;
      }
    }
  });

  return (
    <SpotLight
      {...props}
      ref={spotLightRef}
      angle={0.5}
      penumbra={1}
      intensity={0}
      distance={0}
      castShadow
      map={texture}
    />
  );
}

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const closeButtonStyles = {
  position: "absolute",
  top: "30px",
  right: "58px",
  fontSize: "48px",
  color: "#fff",
  background: "none",
  border: "none",
  cursor: "pointer",
};
