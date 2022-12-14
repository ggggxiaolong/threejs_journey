#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
varying float vElevation;

#define PI 3.14159265359

void main() {
  vec3 color = mix(uDepthColor, uSurfaceColor, vElevation * uColorMultiplier + uColorOffset);
    gl_FragColor = vec4(color, 1.0);
}