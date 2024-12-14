import { useRef, useState } from "react";

export default function useCarouselHandlers(
  carouselData
) {
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const handleEnableScroll = (enable, index) => {
    const item = carouselData[index];
    videoRef.current =
      item.videoToDisplay ?? null;
    photoRef.current = item.videoToDisplay
      ? null
      : item.mainImage;
  };

  const handleCloseVideo = () => {
    videoRef.current = null;
    photoRef.current = null;
  };

  const handleNextVideo = () => {
    const nextIndex =
      (currentIndex + 1) % carouselData.length;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousVideo = () => {
    const prevIndex =
      currentIndex > 0
        ? currentIndex - 1
        : carouselData.length - 1;
    setCurrentIndex(prevIndex);
  };

  return {
    videoRef,
    photoRef,
    handleEnableScroll,
    handleCloseVideo,
    handleNextVideo,
    handlePreviousVideo,
  };
}
