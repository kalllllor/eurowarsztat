varying float vHeight;
varying vec3 vNorm;
varying vec2 vUv;

uniform vec3 uColorA;
uniform vec3 uColorB;

uniform float uOffset;
uniform float uContrast;
uniform float uBrightness;

precision mediump float;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;

vec3 calcColor() {
  float mask = (pow(vHeight, 2.) - uOffset) * uContrast;
  vec3 diffuseColor = mix(uColorA/255., uColorB/255., .5);
  diffuseColor *= uBrightness;
  return diffuseColor;
}

// void main() {

//   csm_DiffuseColor = vec4(0., 0.0, 1, 1.0);   
// }

  
  // mat2 rotate(float a) {
  //   float s = sin(a);
  //   float c = cos(a);
  //   return	mat2(c, -s, s, c);
  // }
  
  void main()
  { 
    // vec2 uvDivided = fract(vUv*vec2(30.,1.));
    // vec2 uvDisplaced1 = vUv + rotate(3.14)*uvDivided*vec2(uProgress*vUv.x/4., 0. ) * 0.5;
    // vec2 uvDisplaced2 = vUv + rotate(3.14)*uvDivided*vec2((1.- uProgress)*vUv.x/4., 0. ) * 0.5;

    // vec4 img1 = texture2D(uTexture1, uvDisplaced1);
    // vec4 img2 = texture2D(uTexture2, uvDisplaced2);
    // csm_DiffuseColor = mix(img1, img2, uProgress);
    // float strength = sin(distance(vUv, vec2(0.5)) * 100.);
    // if(vUv.x > 0.2 && vUv.x < 0.8 && vUv.y > 0.2 && vUv.y < 0.8) {
    //   vec4 t = texture2D(uTexture1, vUv*2.0 - 0.5);
    //   csm_DiffuseColor = t;
    // }
    csm_DiffuseColor = vec4(calcColor(), 1.0);
  }