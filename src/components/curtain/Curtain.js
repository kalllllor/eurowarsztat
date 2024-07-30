import {
  useFrame,
  extend,
} from "@react-three/fiber";
import {
  MeshPhysicalMaterial,
  MeshToonMaterial,
} from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Color, DoubleSide } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
extend({ CustomShaderMaterial });

const Curtain = () => {
  const matRef = useRef();
  const geoRef = useRef();
  const {
    uPositionFrequency,
    uTimeFrequency,
    uStrength,

    uWarpTimeFrequency,
    uWarpStrength,
    uWarpPositionFrequency,
    uColorA,
    uColorB,
  } = useControls({
    uPositionFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uTimeFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uStrength: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },

    uWarpTimeFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uWarpPositionFrequency: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
    uWarpStrength: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.001,
    },
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPositionFrequency: {
        value: uPositionFrequency,
      },
      uTimeFrequency: { value: uTimeFrequency },
      uStrength: { value: uStrength },
      uWarpTimeFrequency: {
        value: uWarpTimeFrequency,
      },
      uWarpStrength: { value: uWarpStrength },
      uWarpPositionFrequency: {
        value: uWarpPositionFrequency,
      },
      uColorA: {
        value: new Color(0x0000ff),
      },
      uColorB: {
        value: new Color(0xff0000),
      },
    }),
    [
      uPositionFrequency,
      uTimeFrequency,
      uStrength,
      uWarpTimeFrequency,
      uWarpPositionFrequency,
      uWarpStrength,
      uColorA,
      uColorB,
    ]
  );

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uPositionFrequency.value =
        uPositionFrequency;
      matRef.current.uniforms.uTimeFrequency.value =
        uTimeFrequency;
      matRef.current.uniforms.uStrength.value =
        uStrength;
      matRef.current.uniforms.uWarpTimeFrequency.value =
        uWarpTimeFrequency;
      matRef.current.uniforms.uWarpStrength.value =
        uWarpStrength;
      matRef.current.uniforms.uWarpPositionFrequency.value =
        uWarpPositionFrequency;
    }
  }, [
    uPositionFrequency,
    uTimeFrequency,
    uStrength,

    uWarpTimeFrequency,
    uWarpPositionFrequency,
    uWarpStrength,
    uColorA,
    uColorB,
  ]);

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current = mergeVertices(
        geoRef.current
      );

      geoRef.current.computeTangents();
      console.log(geoRef.current.attributes);
    }
  }, [geoRef]);

  useFrame((state) => {
    const { clock } = state;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <icosahedronGeometry args={[2.5, 128]} />
      <CustomShaderMaterial
        ref={matRef}
        baseMaterial={MeshPhysicalMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
        silent
      />
    </mesh>
  );
};

export default Curtain;
