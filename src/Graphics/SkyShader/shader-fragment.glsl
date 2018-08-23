#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D diffuse;

varying vec2 vTexCoord;

void main(void) {
  vec4 diffuseColor = texture2D(diffuse, vTexCoord);
  gl_FragColor = vec4(diffuseColor.rgb, 1.0);
}