uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

attribute vec4 tangent;

varying float vWobble;
uniform float uHeight;
varying float vHeight;
varying vec3 vNorm;
varying vec2 vUv;

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

vec3 waveGenerator(vec3 newPos) {
    vec3 newPosition = newPos;
    float foldFactor = (1.0 - uv.y) * 2.0;
    float spreadVal = 0.2;
    newPosition.x += sin(newPos.y * 10.0 + uTime * 2.0) * 0.01 * foldFactor;
    newPosition.x += cos(newPos.y * 5.0 + uTime * 2.0) * 0.01 * foldFactor;
    newPosition.z += cos(newPos.y * 5.0 + uTime * 2.0) * 0.1 * foldFactor;
    newPosition.y += sin(newPos.x * 2.0 + uTime) * 0.1;
    newPosition.y += sin(newPos.x * 4.0 + uTime * 0.5) * 0.05;
    newPosition.z += sin(newPos.y * 3.0 + uTime * 0.7) * 0.1;
    newPosition.z += sin(newPos.y * 5.0 + uTime * 0.3) * 0.05;
    newPosition.y += simplexNoise4d(vec4(newPos + uTime, 0.0)) * 0.01;
    newPosition.z += sin(newPos.y * 2.0 + uTime * 0.2) *foldFactor * .3 + (1.5 * foldFactor);
    newPosition.z += simplexNoise4d(vec4(newPos * 5.0 + uTime, 0.0)) * 0.01;
    newPosition.x += simplexNoise4d(vec4(newPos * 5.0 + uTime + 100., 0.0)) * 0.01;
    newPosition.x += simplexNoise4d(vec4(newPos * 2.0 + uTime + 100., 0.0)) * 0.01;
    // newPosition.z += sin(distance(uv.xy, vec2(0.5)) * 100. + ) * spreadVal;
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

void main() {
  
  // float wobble = getWobble(position);
  // csm_Position += wobble*normal;
  csm_Position = waveGenerator(position);
  csm_Normal = recalcNormals(csm_Position, normal);
  vNorm = csm_Normal;
  vUv = uv;
}