import React, {
  Suspense,
  useEffect,
} from "react";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import Experience from "./Experience";
import useFetchGalleryData from "./hooks/useFetchGalleryData"; // Import the custom hook

const App = () => {
  const {
    galleryData,
    carouselData,
    eventsData,
    error,
    loading,
  } = useFetchGalleryData(
    "https://lightgray-lapwing-857049.hostingersite.com/index.php/wp-json/wp/v2/posts?_fields=acf&acf_format=standard&per_page=100"
  );

  const camX = 0;
  const camY = 0;
  const camZ = 3;

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
