import { useRef, useEffect } from "react";

export const useDraggableSlider = () => {
  const slider = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);

  useEffect(() => {
    const handleMouseDown = (e) => {
      isDown.current = true;
      startX.current =
        e.pageX - slider.current.offsetLeft;
      scrollLeft.current =
        slider.current.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
    };

    const handleMouseUp = () => {
      isDown.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x =
        e.pageX - slider.current.offsetLeft;
      const walk = x - startX.current;
      slider.current.scrollLeft =
        scrollLeft.current - walk;
    };

    const sliderElement = slider.current;
    if (sliderElement) {
      sliderElement.addEventListener(
        "mousedown",
        handleMouseDown
      );
      sliderElement.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
      sliderElement.addEventListener(
        "mouseup",
        handleMouseUp
      );
      sliderElement.addEventListener(
        "mousemove",
        handleMouseMove
      );

      return () => {
        sliderElement.removeEventListener(
          "mousedown",
          handleMouseDown
        );
        sliderElement.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        sliderElement.removeEventListener(
          "mouseup",
          handleMouseUp
        );
        sliderElement.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }
  }, []);

  return slider;
};
