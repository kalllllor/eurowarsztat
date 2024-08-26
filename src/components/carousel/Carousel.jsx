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
      position={[0, -4 * height, 0]}
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
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
