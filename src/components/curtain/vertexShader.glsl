uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;
uniform vec2 uResolution;

attribute vec4 tangent;

varying float vWobble;
uniform float uHeight;
varying float vHeight;
varying vec3 vNorm;
varying vec2 vUv;


uniform float uFreqX1;
uniform float uFreqX2;
uniform float uTimeFactorX1;
uniform float uTimeFactorX2;
uniform float uAmpX1;
uniform float uAmpX2;
uniform float uNoiseX1;
uniform float uNoiseX2;
uniform float uNoiseAmpX1;
uniform float uNoiseAmpX2;

uniform float uFreqY1;
uniform float uFreqY2;
uniform float uTimeFactorY1;
uniform float uTimeFactorY2;
uniform float uAmpY1;
uniform float uAmpY2;
uniform float uNoiseY1;
uniform float uNoiseY2;
uniform float uNoiseAmpY1;
uniform float uNoiseAmpY2;

uniform float uFreqZ1;
uniform float uFreqZ2;
uniform float uTimeFactorZ1;
uniform float uTimeFactorZ2;
uniform float uAmpZ1;
uniform float uAmpZ2;
uniform float uNoiseZ1;
uniform float uNoiseZ2;
uniform float uNoiseAmpZ1;
uniform float uNoiseAmpZ2;

uniform float uFoldFactor;

#include ../utils/simplexNoise4d.glsl

vec3 displace(vec3 point) {

  vec3 p = point;

  p.y += uTime * 2.0;

  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.4, 1.0, 5, false, false);

  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);
  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);
  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);

  vec3 n = vec3(0.0);


      n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 0.5), fbmOpts));
      n += gln_GerstnerWave(p, A, uTime).xzy;
      n += gln_GerstnerWave(p, B, uTime).xzy * 0.5;
      n += gln_GerstnerWave(p, C, uTime).xzy * 0.25;
      n += gln_GerstnerWave(p, D, uTime).xzy * 0.2;


  vHeight = n.y;

  return point + n;
}  

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}

float getWobble(vec3 position)
{
    vec3 warpedPosition = position;
    warpedPosition += simplexNoise4d(
        vec4(
            position * uWarpPositionFrequency,
            uTime * uWarpTimeFrequency
        )
    ) * uWarpStrength;

    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency, // XYZ
        uTime * uTimeFrequency         // W
    )) * uStrength;
}

float offset(float p){
  return 5.0*pow(p,3.0);
}

float F(float q, float p, float radius){
  return simplexNoise4d(vec4(radius*cos(3.14*q),radius*sin(3.14*q),1.0*p, 0.));
}

vec3 waveGenerator(vec3 newPos) {
    vec3 newPosition = newPos;
    float foldFactor = (1.0 - uv.y) * uFoldFactor;
    float radius = 1.;
    float spreadVal = 0.2;
    float devideFactor = 10.;
    newPosition.y += sin(newPos.x * 10. + uTime * 1.5) * 0.003 * (foldFactor * .5);
    newPosition.y += cos(newPos.x * 10. + uTime * 1.5) * 0.003 * (foldFactor * .5);

    float waveVal = (cos(newPos.x * 1. + .5 * uTime) * 0.1 + 0.1) * foldFactor;
    newPosition.x += newPosition.x * (1.0 - newPos.y) * waveVal * .1;
    newPosition.z += sin(newPos.x * 64. / devideFactor - 1.5 * uTime) * 0.05 * (newPos.y - 1.0) * 1. * foldFactor * waveVal;
    newPosition.z += cos(newPos.x * 128. / devideFactor - 1.5 * uTime) * 0.05 * (newPos.y - 1.0) * 0.05 * foldFactor * waveVal;
    newPosition.z += cos(newPos.x * 256. / devideFactor - 1.5 * uTime) * 0.5 * (newPos.y - 1.0) * 0.05 * foldFactor * waveVal;
    newPosition.z += cos(newPos.x * 128. / devideFactor - 1.5) * 0.01 * (foldFactor + 0.5);

    newPosition.z += waveVal * .5;
    vHeight = newPosition.z + spreadVal;
    return newPosition;
}


vec3 recalcNormals(vec3 newPos, vec3 normal) {
  float offset = 0.001;
  vec3 tangent = orthogonal(normal);
  vec3 bitangent = normalize(cross(normal, tangent));
  vec3 neighbour1 = position + tangent * offset;
  vec3 neighbour2 = position + bitangent * offset;

  // float wobble1 = getWobble(neighbour1);
  // float wobble2 = getWobble(neighbour2);

  // neighbour1 += wobble1 * normal;
  // neighbour2 += wobble2 * normal;

  vec3 displacedNeighbour1 = waveGenerator(neighbour1);
  vec3 displacedNeighbour2 = waveGenerator(neighbour2);

  vec3 displacedTangent = displacedNeighbour1 - newPos;
  vec3 displacedBitangent = displacedNeighbour2 - newPos;

  return normalize(cross(displacedTangent, displacedBitangent));
}

vec2 normalizeCanvasCoords(vec2 position, vec2 resolution) {
    vec2 normalized = position / resolution;
  
    return normalized * 2.0 - 1.0;
}

void main() {


  // float wobble = getWobble(position);
  // csm_Position += wobble*normal;
  csm_Position = waveGenerator(position);
  csm_Normal = recalcNormals(csm_Position, normal);
  vNorm = csm_Normal;
  vUv = uv;
}