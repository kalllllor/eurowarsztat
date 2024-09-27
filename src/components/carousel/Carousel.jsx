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

const Carousel = () => {
  const slider = useRef(null);
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);
  const [selectedVideo, setSelectedVideo] =
    useState(null); // To handle the video player

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

  const handleImageClick = (videoUrl) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl); // Open video player
    }
  };

  // Close Video Player
  const handleCloseVideo = () => {
    setSelectedVideo(null);
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
              handleImageClick(item.video)
            }
          ></div>
        ))}
      </div>

      {selectedVideo && (
        <div
          className="video-overlay"
          style={overlayStyles}
        >
          <video
            src={selectedVideo}
            controls
            autoPlay
            style={{
              width: "auto",
              height: "80%",
            }}
          ></video>
          <button
            onClick={handleCloseVideo}
            style={closeButtonStyles}
          >
            Close Video
          </button>
        </div>
      )}
    </div>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const closeButtonStyles = {
  position: "absolute",
  top: "60px",
  right: "30px",
  fontSize: "24px",
  color: "#fff",
  background: "none",
  border: "none",
  cursor: "pointer",
};

export default Carousel;
