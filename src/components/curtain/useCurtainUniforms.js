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
      value: 4.6,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uBrightness: {
      value: 1.09,
      min: 0,
      max: 3,
      step: 0.001,
    },

    uColorA: { r: 0, b: 143, g: 9, a: 1 },
    uColorB: { r: 0, b: 19, g: 3, a: 1 },
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
