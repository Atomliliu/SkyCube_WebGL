#include <sc_common>

varying vec3 vWorldPosition;
varying vec2 vUv;

uniform vec2 vUvFlip;

void main() {

	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = worldPosition.xyz;

	vUv = abs(vUvFlip-uv);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );


}
