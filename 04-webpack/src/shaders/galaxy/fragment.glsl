varying vec3 vColor;
// varying vec2 vUv;
void main(){
    float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;
    strength = clamp(strength, 0.0, 1.0);
    strength = pow(strength, 2.0);
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);  
}