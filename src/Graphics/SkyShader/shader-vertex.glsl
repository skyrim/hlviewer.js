#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 texCoord;

varying vec2 vTexCoord;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vTexCoord = texCoord;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1);
}