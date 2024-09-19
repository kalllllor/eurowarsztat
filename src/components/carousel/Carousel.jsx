import * as THREE from "three";
import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Image as ImageImpl,
  useVideoTexture,
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

const Carousel = () => {
  const { height } = useThree(
    (state) => state.viewport
  );
  const groupRef = useRef();
  const [positionX, setPositionX] = useState(0);
  const [isDragging, setIsDragging] =
    useState(false);
  const [lastX, setLastX] = useState(0);

  const totalWidth = (images.length - 1) * 4;

  useFrame(() => {
    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        positionX,
        0.1
      );
  });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setLastX(e.clientX);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
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

  return (
    <group
      position={[0, -8 * height, 0]}
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
          item={item}
          position={[index * 4, 0, 0]}
        />
      ))}
    </group>
  );
};

const ImageOrVideo = ({ item, position }) => {
  const [isVideoLoaded, setIsVideoLoaded] =
    useState(false);
  const [isVideoPlaying, setIsVideoPlaying] =
    useState(false);
  const [isSoundOn, setIsSoundOn] =
    useState(false);
  const videoRef = useRef(null);

  const videoTexture = item.video
    ? useVideoTexture(item.video, {})
    : null;
  console.log(videoTexture);
  useEffect(() => {
    if (videoTexture && videoTexture.image) {
      const videoElement = videoTexture.image;
      const handleCanplaythrough = () => {
        console.log(1);
        setIsVideoLoaded(true);
      };

      videoElement.addEventListener(
        "canplaythrough",
        handleCanplaythrough
      );

      return () => {
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanplaythrough
        );
      };
    }
  }, [videoTexture]);

  const handleClick = () => {
    if (isVideoLoaded && videoRef.current) {
      const videoElement = videoRef.current;

      if (!isVideoPlaying) {
        videoElement.play();
        setIsVideoPlaying(true);
      } else {
        setIsSoundOn((prev) => !prev);
        videoElement.muted = !isSoundOn;
      }
    }
  };

  return (
    <>
      {!isVideoLoaded && (
        <ImageImpl
          url={item.photo}
          scale={[3, 3, 3]}
          position={position}
          onClick={handleClick}
        />
      )}
      {isVideoLoaded && (
        <mesh
          position={position}
          onClick={handleClick}
        >
          <planeGeometry
            attach="geometry"
            args={[3, 3]}
          />
          <meshStandardMaterial
            attach="material"
            map={videoTexture}
          />
        </mesh>
      )}
    </>
  );
};

export default Carousel;
