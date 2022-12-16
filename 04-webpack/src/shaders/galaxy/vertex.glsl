uniform float uSize;
uniform float uTime;

attribute vec3 aRandom;
attribute float aScale;

varying vec3 vColor;
varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    angle = angle + uTime * 0.2;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.xyz += aRandom;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vColor = color;
    vUv = uv;

    float scale = 1.0 / -viewPosition.z;
    gl_PointSize = uSize * aScale * scale;

}