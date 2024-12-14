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
import useFetchGalleryData from "./hooks/useFetchGalleryData"; // Import the custom hook

const App = () => {
  const {
    galleryData,
    carouselData,
    eventsData,
    error,
    loading,
  } = useFetchGalleryData(
    "https://serwer2458198.home.pl/autoinstalator/wordpress/index.php/wp-json/wp/v2/posts?_fields=acf&acf_format=standard&per_page=100"
  );

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

  if (loading) {
    return (
      <div className="loading__screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <Experience
            galleryData={galleryData}
            carouselData={carouselData}
            eventsData={eventsData}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
