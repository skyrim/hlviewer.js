#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D diffuse;
uniform sampler2D lightmap;
uniform float opacity;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

void main(void) {
  vec4 diffuseColor = texture2D(diffuse, vTexCoord);
  vec4 lightColor = texture2D(lightmap, vLightmapCoord);

  gl_FragColor = vec4(diffuseColor.rgb * lightColor.rgb, diffuseColor.a * opacity);
}