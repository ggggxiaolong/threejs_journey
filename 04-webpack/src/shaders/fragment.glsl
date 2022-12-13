#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color;
uniform sampler2D u_texture;

varying vec2 v_uv;
varying float v_elevation;
// varying vec4 v_position;
// varying float vRandom;

#define PI 3.14159265359

// vec3 colorA = vec3(0.149, 0.141, 0.912);
// vec3 colorB = vec3(1.000, 0.833, 0.224);

// float plot(vec2 st, float pct) {
//     return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
// }

// vec3 hsb2rgb( in vec3 c ){
//     vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
//                              6.0)-3.0)-1.0,
//                      0.0,
//                      1.0 );
//     rgb = rgb*rgb*(3.0-2.0*rgb);
//     return c.z * mix(vec3(1.0), rgb, c.y);
// }

void main() {
    // vec2 st = v_uv;
    // vec3 color = vec3(0.5);
    // vec2 bl = smoothstep(vec2(0.0, 0.0) ,vec2(0.1), st);
    // float pct = bl.x * bl.y;
    // vec2 tr = smoothstep(vec2(1.0, 1.0),vec2(0.1),1.0-st);
    // pct *= tr.x * tr.y;
    // color = vec3(pct);
    vec4 color = texture2D(u_texture, v_uv);
    color.xyz *= v_elevation * 0.5 + 0.9;
    gl_FragColor = color;
    // gl_FragColor = ;
}