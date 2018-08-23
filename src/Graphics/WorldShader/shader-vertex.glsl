#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 texCoord;
attribute vec2 texCoord2;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vTexCoord = texCoord;
  vLightmapCoord = texCoord2;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}