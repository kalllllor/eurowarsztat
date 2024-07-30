import { Abstract } from "lamina/vanilla";

class CustomLayer extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_colorA = "#124dd8";
  static u_colorB = "#2bffe7";
  static u_cloudTint = "#001741";
  static u_gain = 0.5;
  static u_lacunarity = 2.0;
  static u_time = 0.0;

  // Define your fragment shader just like you already do!
  // Only difference is, you must return the final color of this layer
  static fragmentShader = `   
  uniform float u_time;
  uniform float u_lacunarity;
  uniform float u_gain;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  uniform vec3 u_cloudTint;

  varying vec2 v_Uv;

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec2 fade(vec2 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  // Classic Perlin noise
  float cnoise(vec2 P)
  {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
  
    vec4 i = permute(permute(ix) + iy);
  
    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
    vec4 gy = abs(gx) - 0.5 ;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
  
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
  
    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
  
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
  
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
  }

  float fbm(vec2 st) {
    const int OCTAVES = 5;
    // Initial values
    float value = 0.0;
    float amplitude = 0.6;
    // float frequency = 0.5;
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
      value += amplitude * abs(cnoise(st));
      st *= u_lacunarity;
      amplitude *= u_gain;
    }
    return value;
}
  
  void main() {
    vec3 f_color = vec3(0.0);
    vec2 st = v_Uv * 0.250;
    float speed = 0.1;
    float f_time = u_time * speed;

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00 * f_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0 * q + vec2(1.7,9.2)+ 0.15 * f_time );
    r.y = fbm( st + 1.0 * q + vec2(8.3,2.8)+ 0.126 * f_time);

      float f = fbm(st+r);

      f_color = mix(vec3(u_colorA),
                  vec3(u_colorB),
                  clamp((f*f)*4.0,0.0,1.0));

      f_color = mix(f_color,
                  u_cloudTint,
                  clamp(length(q),0.0,1.0));

      f_color *= mix(f_color,
                  u_colorA,
                  clamp(length(r.x),0.0,1.0));


    vec4 f_colorfrag = vec4(.0, .0, 1.0, 1.0);
    return f_colorfrag;
  }
  `;

  // Optionally Define a vertex shader!
  // Same rules as fragment shaders, except no blend modes.
  // Return a non-projected vec3 position.
  static vertexShader = `   
  // SDF
float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return length(max(d,0.0));
}

float sdCappedCylinder( vec3 p, float h, float r )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

// SDF Operators
float opSmoothSubtraction( float d1, float d2, float k ) {
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h); }

// Noise
vec2 random(vec2 st)
{
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st)
{
    vec2 f = fract(st);
    vec2 i = floor(st);
    
    vec2 u = f * f * f * (f * (f * 6. - 15.) + 10.);
    
    float r = mix( mix( dot( random(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return r * .5 + .5;
}

float fbm(vec2 st)
{
    float value = 0.;
    float amplitude = .5;
    float frequency = 0.;
    
    for (int i = 0; i < 8; i++)
    {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    
    return value;
}

// Noise and FBM (as seen on iq tutorials)
const mat3 m3  = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64 );
const mat3 m3i = mat3( 0.00, -0.80, -0.60,
                       0.80,  0.36, -0.48,
                       0.60, -0.48,  0.64 );
const mat2 m2 = mat2(  0.80,  0.60,
                      -0.60,  0.80 );
const mat2 m2i = mat2( 0.80, -0.60,
                       0.60,  0.80 );

float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float hash1( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * 443.8975);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}
    

varying vec2 v_Uv;
uniform float u_time;

void main() {
    v_Uv = uv;
    vec3 newPosition = position;
    float foldFactor = (1.0 - uv.y);
    float windFactor = 1.0 / (uv.y*uv.y);
    // Create folds at the top
    newPosition.z += sin(position.x * 30.0) * 0.07 * uv.y;
    newPosition.x += sin(position.y * 10.0 + u_time * 2.0) * 0.01 * foldFactor;
    newPosition.z += cos(position.y * 15.0 + u_time * 2.0) * 0.01 * foldFactor * 2.;
    // Add additional sin waves for more realistic animation
    newPosition.y += sin(position.x * 2.0 + u_time) * 0.03 * foldFactor;
    newPosition.y += sin(position.x * 4.0 + u_time * 0.5) * 0.05 * foldFactor;
    newPosition.z += (sin(position.y * 3.0 + u_time * 0.7) * 0.2 + .3) * foldFactor;
    newPosition.z += sin(position.y * 5.0 + u_time * 0.3) * 0.01;
    // Add noise for a more natural look
    newPosition.y += noise(position.xy * 5.0 + u_time) * 0.1 * foldFactor;
    newPosition.z += noise(position.xy * 5.0 + u_time) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    return newPosition;
}
  `;

  constructor(props) {
    // You MUST call 'super' with the current constructor as the first argument.
    // Second argument is optional and provides non-uniform parameters like blend mode, name and visibility.
    super(CustomLayer, {
      name: "CustomLayer",
      ...props,
    });
  }
}

export default CustomLayer;
