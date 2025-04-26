import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import Curtain from "./components/curtain/Curtain";
import Crown from "./components/crown/Crown";

import {
  Environment,
  useScroll,
  useTexture,
  SpotLight,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

import Gallery from "./components/gallery/Gallery";
import * as THREE from "three";
import {
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import "./styles.css";
import Description from "./components/description/Description";
import Lights from "./Lights";
import Carousel from "./components/carousel/Carousel";
import Credits from "./components/credits/Credits";
import Title from "./components/title/Title";
import Share from "./components/share/Share";
import Footer from "./components/footer/Footer";
import Event from "./components/event/Event";
import VideoOverlay from "./components/videoOverlay/VideoOverlay";

export default function Experience({
  galleryData,
  carouselData,
  eventsData,
}) {
  const [isSingleColumn, setSingleColumn] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSingleColumn(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener(
      "resize",
      handleResize
    );
    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);
  const enabledPostProcess = true;
  const vignette = false;
  const posX = 0;
  const posY = 0;
  const posZ = -2.7;
  const crownX = 0;
  const crownY = -0.08;
  const crownZ = -2.2;
  const crownScale = 2.17;
  const scaleX = 17.9;
  const scaleY = 18.8;
  const textColor = "#fff";
  const y = 1.1;
  const z = 6;

  const galleryHeight =
    (isSingleColumn
      ? galleryData.length
      : Math.ceil(galleryData.length / 3)) + 3;
  const pages = galleryHeight + 6;
  const singlePageCameraHeight = 4.6;

  const [isLoading, setIsLoading] =
    useState(false);
  const [isActive, setActive] = useState(null);
  const [isScroll, setScroll] = useState(true);
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const rotationSpeed = 0.01;
  const easeFactor = 0.1;

  const videoRef = useRef(null);
  const singleVideoRef = useRef(null);
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
    index,
    single = false
  ) => {
    if (!single) {
      const item = carouselData[index];

      videoRef.current =
        item.videoToDisplay ?? null;
      photoRef.current = item.videoToDisplay
        ? null
        : item.mainImage;
      setScroll(enable);
      setIsLoading(!enable);
      setCurrentIndex(index);
    } else {
      const item = galleryData[index];
      setScroll(enable);
      setIsLoading(!enable);
      singleVideoRef.current = item.video;
    }
  };

  const handleCloseVideo = () => {
    photoRef.current = null;
    videoRef.current = null;
    singleVideoRef.current = null;
    setScroll(true);
    setIsLoading(false);
  };

  const handleNextVideo = () => {
    if (carouselData && carouselData.length > 0) {
      const nextIndex =
        currentIndex !== null &&
        currentIndex < carouselData.length - 1
          ? currentIndex + 1
          : 0;
      setCurrentIndex(nextIndex);

      const nextItem = carouselData[nextIndex];
      videoRef.current =
        nextItem.videoToDisplay ?? null;
      photoRef.current = nextItem.videoToDisplay
        ? null
        : nextItem.mainImage;

      setIsLoading(true);
    }
  };

  const handlePreviousVideo = () => {
    if (carouselData && carouselData.length > 0) {
      const prevIndex =
        currentIndex !== null && currentIndex > 0
          ? currentIndex - 1
          : carouselData.length - 1;
      setCurrentIndex(prevIndex);

      const prevItem = carouselData[prevIndex];
      videoRef.current =
        prevItem.videoToDisplay ?? null;
      photoRef.current = prevItem.videoToDisplay
        ? null
        : prevItem.mainImage;

      setIsLoading(true);
    }
  };

  return (
    <>
      <color
        attach="background"
        args={["#000"]}
      />
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
        imageUrl={isActive && isActive.image.url}
        isActive={isActive}
      />
      {(photoRef.current ||
        videoRef.current ||
        singleVideoRef.current) && (
        <VideoOverlay
          videoSrc={
            videoRef.current ||
            singleVideoRef.current
          }
          photoSrc={photoRef.current}
          isLoading={isLoading}
          onClose={handleCloseVideo}
          onNext={handleNextVideo}
          onPrevious={handlePreviousVideo}
          onLoadComplete={() =>
            setIsLoading(false)
          }
          isSingle={!!singleVideoRef.current}
        />
      )}

      <ScrollControls
        damping={0.5}
        pages={pages}
        enabled={isScroll}
      >
        <Scroll>
          <Gallery
            images={galleryData}
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
        <Share
          galleryHeight={galleryHeight}
          isSingleColumn={isSingleColumn}
        />
        {!isActive && <Title />}
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
                  top: `${
                    galleryHeight
                      ? galleryHeight * 100 + 300
                      : 100
                  }vh`,
                }}
              />
              <Event
                style={{
                  color: textColor,
                  top: `${
                    galleryHeight
                      ? galleryHeight * 100 + 430
                      : 100
                  }vh`,
                }}
                data={eventsData}
              />
              <Carousel
                enableScroll={handleEnableScroll}
                data={carouselData}
                style={{
                  top: `${
                    galleryHeight
                      ? galleryHeight * 100 + 490
                      : 100
                  }vh`,
                }}
              />
              <Footer
                style={{
                  top: `${pages * 100 - 20}vh`,
                }}
              />
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
  const relativePath = imageUrl?.split(
    "/wp-content/uploads/"
  )[1];
  const proxyUrl = `https://lightgray-lapwing-857049.hostingersite.com/proxy-image.php?img=${relativePath}`;

  const texture = useTexture(
    imageUrl ? proxyUrl : "/assets/blank.jpg",
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
