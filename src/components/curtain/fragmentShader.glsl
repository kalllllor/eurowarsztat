varying float vHeight;
varying vec3 vNorm;
varying vec2 vUv;

uniform vec3 uColorA;
uniform vec3 uColorB;

uniform float uBrightness;

precision mediump float;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;

vec3 calcColor() {
  float mask = (pow(vHeight, 2.) - 0.) * .1;
  vec3 diffuseColor = mix(uColorA/255., uColorB/255., .5);
  diffuseColor *= uBrightness;
  return diffuseColor;
}

void main()
{ 
  csm_DiffuseColor = vec4(calcColor(), 1.0);
}