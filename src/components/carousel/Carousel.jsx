import * as THREE from "three";
import React, { useRef, useState } from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Image as ImageImpl } from "@react-three/drei";

const Carousel = ({ images }) => {
  const { height } = useThree(
    (state) => state.viewport
  );
  const groupRef = useRef();
  const [positionX, setPositionX] = useState(0);
  const [isDragging, setIsDragging] =
    useState(false);
  const [lastX, setLastX] = useState(0);

  useFrame(() => {
    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        positionX,
        0.1
      );
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      setPositionX(positionX + deltaX * 0.01);
      console.log(positionX + deltaX * 0.5);
      setLastX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setLastX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - lastX;
      setPositionX(positionX + deltaX * 0.5);
      setLastX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <group
      position={[0, -4 * height, 2.5]}
      ref={groupRef}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerOut={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {images.map((url, index) => (
        <ImageImpl
          key={index}
          url={url}
          scale={[3, 3, 3]}
          position={[index * 4, 0, 0]}
        />
      ))}
    </group>
  );
};

export default Carousel;
