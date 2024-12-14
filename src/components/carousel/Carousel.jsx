import React from "react";
import { useDraggableSlider } from "../../hooks/useDraggableSlider";

const Carousel = ({
  enableScroll,
  data,
  ...props
}) => {
  const slider = useDraggableSlider();

  const handleImageClick = (
    videoUrl,
    photoUrl
  ) => {
    enableScroll(false, videoUrl, photoUrl);
  };

  return (
    <div
      className="carousel__container"
      {...props}
    >
      <div
        className="carousel__items"
        ref={slider}
        style={{
          gap: "10px",
          padding: "20px",
        }}
      >
        {data.map(({ mainImage }, index) => (
          <div
            key={index}
            className="carousel__item"
            style={{
              background: `url(${mainImage}) center center / cover no-repeat`,
            }}
            onClick={() =>
              handleImageClick(index)
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
