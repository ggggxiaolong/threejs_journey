uniform float u_time;
uniform vec2 u_frequency;

#define PI 3.14159265359

attribute float aRandom;
varying vec2 v_uv;
varying float v_elevation;
// varying vec4 v_position;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * PI * u_frequency.x + modelPosition.y * u_frequency.y - u_time) * 0.2;
    modelPosition.z = elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelPosition;
    gl_Position = projectPosition;
    // v_position = projectPosition;
    v_uv = uv;
    v_elevation = elevation;
}