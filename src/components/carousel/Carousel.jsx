import * as THREE from "three";
import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Html,
  Image as ImageImpl,
  useAspect,
  useVideoTexture,
  useTexture,
  Billboard,
} from "@react-three/drei";

const images = [
  {
    photo: "carousel/Marianna.jpg",
    video: "carousel/Marianna.mp4",
  },
  {
    photo: "carousel/Natalia.jpg",
    video: "carousel/Natalia.mp4",
  },
  {
    photo: "carousel/Olena.jpg",
    video: "carousel/Olena.mp4",
  },
  {
    photo: "carousel/1.jpg",
    video: "",
  },
  {
    photo: "carousel/2.jpg",
    video: "",
  },
  {
    photo: "carousel/3.jpg",
    video: "",
  },
  {
    photo: "carousel/4.jpg",
    video: "",
  },
  {
    photo: "carousel/5.jpg",
    video: "",
  },
  {
    photo: "carousel/6.jpg",
    video: "",
  },
  {
    photo: "carousel/7.jpg",
    video: "",
  },
  {
    photo: "carousel/8.jpg",
    video: "",
  },
];

const Carousel = ({ enableScroll }) => {
  const { height } = useThree(
    (state) => state.viewport
  );
  const groupRef = useRef();
  const [positionX, setPositionX] = useState(0);
  const [isDragging, setIsDragging] =
    useState(false);
  const [lastX, setLastX] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] =
    useState(false);
  const [activeIndex, setActiveIndex] =
    useState(null);

  const totalWidth = (images.length - 1) * 4;

  useFrame(() => {
    if (!isVideoPlaying) {
      groupRef.current.position.x =
        THREE.MathUtils.lerp(
          groupRef.current.position.x,
          positionX,
          0.1
        );
    }
  });

  const handlePointerDown = (e) => {
    if (!isVideoPlaying) {
      setIsDragging(true);
      setLastX(e.clientX);
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging && !isVideoPlaying) {
      const deltaX = e.clientX - lastX;
      let newPositionX =
        positionX + deltaX * 0.01;

      newPositionX = Math.max(
        newPositionX,
        -totalWidth
      );
      newPositionX = Math.min(newPositionX, 0);

      setPositionX(newPositionX);
      setLastX(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsVideoPlaying(true);
    enableScroll(false);
  };

  const handleClose = () => {
    setIsVideoPlaying(false);
    setActiveIndex(null);
    enableScroll(true);
  };

  return (
    <group
      position={[0, -8.5 * height, 0]}
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {images.map((item, index) => (
        <ImageOrVideo
          key={index}
          index={index}
          item={item}
          position={[index * 2.5, 0, 0]}
          isVideoPlaying={isVideoPlaying}
          activeIndex={activeIndex}
          handleClickCallback={handleClick}
          handleCloseCallback={handleClose}
        />
      ))}
    </group>
  );
};

const ImageOrVideo = ({
  item,
  position,
  index,
  isVideoPlaying,
  activeIndex,
  handleClickCallback,
  handleCloseCallback,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const size = useAspect(1080, 1920).map(
    (item) => item / 4
  );

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleClick = () => {
    if (item.video) {
      handleClickCallback(index);
    }
  };

  return (
    <>
      {!isVideoPlaying && (
        <ImageImpl
          castShadow
          url={item.photo}
          scale={size}
          position={position}
          onClick={handleClick}
        />
      )}
      {isVideoPlaying &&
        activeIndex === index && (
          <Billboard follow={true}>
            <mesh scale={size}>
              <planeGeometry />
              <Suspense
                fallback={
                  <FallbackMaterial
                    url={item.photo}
                  />
                }
              >
                <VideoMaterial
                  url={item.video}
                  isMuted={isMuted}
                />
              </Suspense>
            </mesh>

            <Html
              as="div"
              wrapperClass="carousel__container"
            >
              <button
                onClick={handleCloseCallback}
              >
                X
              </button>
              <button onClick={handleMuteToggle}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </Html>
          </Billboard>
        )}
    </>
  );
};

function VideoMaterial({ url, isMuted }) {
  const texture = useVideoTexture(url, {
    muted: isMuted,
  });
  useEffect(() => {
    if (texture.image) {
      texture.image.muted = isMuted;
    }
  }, [isMuted, texture.image]);

  useEffect(() => {
    return () => (
      (texture.image.muted = true),
      (texture.image.currentTime = 0)
    );
  }, []);

  return (
    <meshBasicMaterial
      map={texture}
      toneMapped={false}
    />
  );
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return (
    <meshBasicMaterial
      map={texture}
      toneMapped={false}
    />
  );
}

export default Carousel;
