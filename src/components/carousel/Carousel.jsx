import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import { Html } from "@react-three/drei";
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
  { photo: "carousel/1.jpg", video: "" },
  { photo: "carousel/2.jpg", video: "" },
  { photo: "carousel/3.jpg", video: "" },
  { photo: "carousel/4.jpg", video: "" },
  { photo: "carousel/5.jpg", video: "" },
];

const Carousel = ({ enableScroll }) => {
  const slider = useRef(null);
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener(
        "mousedown",
        one
      );
      sliderRef.addEventListener(
        "mousedown",
        two
      );
      sliderRef.addEventListener(
        "mouseleave",
        three
      );
      sliderRef.addEventListener("mouseup", four);
      sliderRef.addEventListener(
        "mousemove",
        five
      );

      return () => {
        sliderRef.removeEventListener(
          "mousedown",
          one
        );
        sliderRef.removeEventListener(
          "mousedown",
          two
        );
        sliderRef.removeEventListener(
          "mouseleave",
          three
        );
        sliderRef.removeEventListener(
          "mouseup",
          four
        );
        sliderRef.removeEventListener(
          "mousemove",
          five
        );
      };
    }
  }, []);

  function one(e) {
    isDown.current = true;
    startX.current =
      e.pageX - slider.current.offsetLeft;
    scrollLeft.current =
      slider.current.scrollLeft;
  }

  function two(e) {
    isDown.current = true;
    startX.current =
      e.pageX - slider.current.offsetLeft;
    scrollLeft.current =
      slider.current.scrollLeft;
  }

  function three() {
    isDown.current = false;
  }

  function four() {
    isDown.current = false;
  }

  function five(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft =
      scrollLeft.current - walk;
  }

  const handleImageClick = (
    videoUrl,
    photoUrl
  ) => {
    enableScroll(false, videoUrl, photoUrl);
  };

  return (
    <div className="carousel__container">
      <div
        className="carousel__items"
        ref={slider}
        style={{
          gap: "10px",
          padding: "20px",
        }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="carousel__item"
            style={{
              background: `url(${item.photo}) center center / cover no-repeat`,
            }}
            onClick={() =>
              item.video
                ? handleImageClick(item.video)
                : handleImageClick(
                    item.video,
                    item.photo
                  )
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
