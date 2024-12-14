import React from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

const VideoOverlay = ({
  videoSrc,
  photoSrc,
  isLoading,
  onClose,
  onNext,
  onPrevious,
  onLoadComplete,
}) => {
  return (
    <Html
      as="div"
      wrapperClass="video__container"
    >
      <div
        style={overlayStyles}
        className="video-overlay"
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            muted
            autoPlay
            style={{
              width: "auto",
              height: "80%",
            }}
          ></video>
        ) : (
          <>
            {isLoading && (
              <div className="loading__screen">
                <span className="loader"></span>
              </div>
            )}
            <img
              src={photoSrc}
              style={{
                display: isLoading
                  ? "none"
                  : "block",
                width: "auto",
                height: "80%",
              }}
              onLoad={onLoadComplete}
              onError={onLoadComplete}
              alt="photo display"
            />
          </>
        )}

        <button
          className="exit"
          onClick={onClose}
        >
          <img src={"back.png"} alt="Exit" />
          <span>exit</span>
        </button>

        <button
          className="moveBtn next"
          onClick={onNext}
        >
          <img src={"back.png"} alt="Next" />
        </button>
        <button
          className="moveBtn previous"
          onClick={onPrevious}
        >
          <img src={"back.png"} alt="Previous" />
        </button>
      </div>
    </Html>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

VideoOverlay.propTypes = {
  videoSrc: PropTypes.string || PropTypes.bool,
  photoSrc: PropTypes.string,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onLoadComplete: PropTypes.func.isRequired,
};

export default VideoOverlay;
