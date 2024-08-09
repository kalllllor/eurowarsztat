// src/components/Curtain/useCurtainUniforms.js

import { useMemo } from "react";
import { Vector2 } from "three";
import { useControls } from "leva";
import { useTexture } from "@react-three/drei";
import photo1 from "../../assets/photos/abdallahRazikOmar.jpg";
import photo2 from "../../assets/photos/walidBoussad.jpg";
import photo3 from "../../assets/photos/liubovSavycka.jpg";

export const useCurtainUniforms = (props) => {
  const {
    uFoldFactor,
    uFreqX1,
    uFreqX2,
    uTimeFactorX1,
    uTimeFactorX2,
    uAmpX1,
    uAmpX2,
    uNoiseX1,
    uNoiseX2,
    uNoiseAmpX1,
    uNoiseAmpX2,
    uFreqY1,
    uFreqY2,
    uTimeFactorY1,
    uTimeFactorY2,
    uAmpY1,
    uAmpY2,
    uNoiseY1,
    uNoiseY2,
    uNoiseAmpY1,
    uNoiseAmpY2,
    uFreqZ1,
    uFreqZ2,
    uTimeFactorZ1,
    uTimeFactorZ2,
    uAmpZ1,
    uAmpZ2,
    uNoiseZ1,
    uNoiseZ2,
    uNoiseAmpZ1,
    uNoiseAmpZ2,
    uHeight,
    uBrightness,
    uOffset,
    uContrast,
    uColorA,
    uColorB,
  } = useControls({
    uFoldFactor: {
      value: 2,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uFreqX1: {
      value: 1,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uFreqX2: {
      value: 1,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uTimeFactorX1: {
      value: 0.1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uTimeFactorX2: {
      value: 0.1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uAmpX1: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uAmpX2: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uNoiseX1: {
      value: 2,
      min: 0,
      max: 5,
      step: 0.01,
    },
    uNoiseX2: {
      value: 2,
      min: 0,
      max: 5,
      step: 0.01,
    },
    uNoiseAmpX1: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },
    uNoiseAmpX2: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },

    uFreqY1: {
      value: 2,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uFreqY2: {
      value: 4,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uTimeFactorY1: {
      value: 0.7,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uTimeFactorY2: {
      value: 0.5,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uAmpY1: {
      value: 0.1,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uAmpY2: {
      value: 0.05,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uNoiseY1: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    uNoiseY2: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    uNoiseAmpY1: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },
    uNoiseAmpY2: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },

    uFreqZ1: {
      value: 1,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uFreqZ2: {
      value: 1,
      min: 1,
      max: 10,
      step: 0.01,
    },
    uTimeFactorZ1: {
      value: 0.1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uTimeFactorZ2: {
      value: 0.1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    uAmpZ1: {
      value: 0.1,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uAmpZ2: {
      value: 0.1,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    uNoiseZ1: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    uNoiseZ2: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    uNoiseAmpZ1: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },
    uNoiseAmpZ2: {
      value: 0.1,
      min: 0.001,
      max: 0.2,
      step: 0.001,
    },

    uHeight: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uBrightness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uOffset: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uContrast: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uColorA: { r: 0, b: 255, g: 19, a: 1 },
    uColorB: { r: 1, b: 5, g: 30, a: 1 },
  });

  const [
    photo1Texture,
    photo2Texture,
    photo3Texture,
  ] = useTexture([photo1, photo2, photo3]);

  return useMemo(
    () => ({
      uTime: { value: 0 },
      uHeight: { value: uHeight },
      uColorA: { value: uColorA },
      uColorB: { value: uColorB },
      uBrightness: { value: uBrightness },
      uOffset: { value: uOffset },
      uContrast: { value: uContrast },
      uTexture1: { value: photo1Texture },
      uTexture2: { value: photo2Texture },
      uProgress: { value: 0 },
      uResolution: {
        value: new Vector2(
          props.scale ? props.scale[0] : 1,
          props.scale ? props.scale[1] : 1
        ),
      },
      uFoldFactor: { value: uFoldFactor },
      uFreqX1: { value: uFreqX1 },
      uFreqX2: { value: uFreqX2 },
      uTimeFactorX1: { value: uTimeFactorX1 },
      uTimeFactorX2: { value: uTimeFactorX2 },
      uAmpX1: { value: uAmpX1 },
      uAmpX2: { value: uAmpX2 },
      uNoiseX1: { value: uNoiseX1 },
      uNoiseX2: { value: uNoiseX2 },
      uNoiseAmpX1: { value: uNoiseAmpX1 },
      uNoiseAmpX2: { value: uNoiseAmpX2 },

      uFreqY1: { value: uFreqY1 },
      uFreqY2: { value: uFreqY2 },
      uTimeFactorY1: { value: uTimeFactorY1 },
      uTimeFactorY2: { value: uTimeFactorY2 },
      uAmpY1: { value: uAmpY1 },
      uAmpY2: { value: uAmpY2 },
      uNoiseY1: { value: uNoiseY1 },
      uNoiseY2: { value: uNoiseY2 },
      uNoiseAmpY1: { value: uNoiseAmpY1 },
      uNoiseAmpY2: { value: uNoiseAmpY2 },

      uFreqZ1: { value: uFreqZ1 },
      uFreqZ2: { value: uFreqZ2 },
      uTimeFactorZ1: { value: uTimeFactorZ1 },
      uTimeFactorZ2: { value: uTimeFactorZ2 },
      uAmpZ1: { value: uAmpZ1 },
      uAmpZ2: { value: uAmpZ2 },
      uNoiseZ1: { value: uNoiseZ1 },
      uNoiseZ2: { value: uNoiseZ2 },
      uNoiseAmpZ1: { value: uNoiseAmpZ1 },
      uNoiseAmpZ2: { value: uNoiseAmpZ2 },
    }),
    [
      uHeight,
      uColorA,
      uColorB,
      uBrightness,
      uOffset,
      uContrast,
      photo1Texture,
      photo2Texture,
      uFoldFactor,
      uFreqX1,
      uFreqX2,
      uTimeFactorX1,
      uTimeFactorX2,
      uAmpX1,
      uAmpX2,
      uNoiseX1,
      uNoiseX2,
      uNoiseAmpX1,
      uNoiseAmpX2,
      uFreqY1,
      uFreqY2,
      uTimeFactorY1,
      uTimeFactorY2,
      uAmpY1,
      uAmpY2,
      uNoiseY1,
      uNoiseY2,
      uNoiseAmpY1,
      uNoiseAmpY2,
      uFreqZ1,
      uFreqZ2,
      uTimeFactorZ1,
      uTimeFactorZ2,
      uAmpZ1,
      uAmpZ2,
      uNoiseZ1,
      uNoiseZ2,
      uNoiseAmpZ1,
      uNoiseAmpZ2,
    ]
  );
};
