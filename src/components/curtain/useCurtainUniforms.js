// src/components/Curtain/useCurtainUniforms.js

import { useMemo } from "react";
import { Vector2 } from "three";

const uFoldFactor = 4.6;
const uBrightness = 1.09;
const uColorA = { r: 0, b: 143, g: 9, a: 1 };
const uColorB = { r: 0, b: 19, g: 3, a: 1 };

export const useCurtainUniforms = (props) => {
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
    [uColorA, uColorB, uBrightness, uFoldFactor]
  );
};
