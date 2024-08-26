// src/components/Curtain/useCurtainUniforms.js

import { useMemo } from "react";
import { Vector2 } from "three";
import { useControls } from "leva";

export const useCurtainUniforms = (props) => {
  const {
    uFoldFactor,
    uBrightness,
    uOffset,
    uContrast,
    uColorA,
    uColorB,
  } = useControls({
    uFoldFactor: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uBrightness: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.001,
    },

    uColorA: { r: 0, b: 255, g: 19, a: 1 },
    uColorB: { r: 1, b: 5, g: 30, a: 1 },
  });

  return useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: uColorA },
      uColorB: { value: uColorB },
      uBrightness: { value: uBrightness },
      uProgress: { value: 0 },
      uResolution: {
        value: new Vector2(
          props.scale ? props.scale[0] : 1,
          props.scale ? props.scale[1] : 1
        ),
      },
      uFoldFactor: { value: uFoldFactor },
    }),
    [
      uColorA,
      uColorB,
      uBrightness,
      uOffset,
      uContrast,
      uFoldFactor,
    ]
  );
};
