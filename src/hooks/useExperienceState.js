import { useControls } from "leva";
import { useState } from "react";

export default function useExperienceState() {
  const [totalHeight, setTotalHeight] =
    useState(0);

  const {
    debug,
    vignette,
    enabledPostProcess,
    posX,
    posY,
    posZ,
    scaleX,
    scaleY,
    fontSize,
    textColor,
  } = useControls({
    debug: false,
    enabledPostProcess: true,
    vignette: false,
    posX: { value: 0, min: -20, max: 20 },
    posY: { value: 0, min: -20, max: 20 },
    posZ: { value: -2.7, min: -40, max: 40 },
    scaleX: { value: 17.9, min: 0, max: 20 },
    scaleY: { value: 18.8, min: 0, max: 20 },
    fontSize: { value: 0.55, min: 0, max: 1 },
    textColor: "#fff",
  });

  return {
    debug,
    vignette,
    enabledPostProcess,
    scrollState: {
      posX,
      posY,
      posZ,
      scaleX,
      scaleY,
      fontSize,
      textColor,
    },
    totalHeight,
    handleTotalHeight: setTotalHeight,
  };
}
