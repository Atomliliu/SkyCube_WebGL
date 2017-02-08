#include <sc_common>

uniform samplerCube tCube;
varying vec3 vWorldPosition;
varying vec2 vUv;

//uniform int nFace;
uniform float fFlip;
uniform float fOpacity;

void main() {
	vec3 dir = getVecSPCubeMap(vUv, 0);
	vec4 result = textureCube( tCube, vec3( fFlip * dir.x, dir.yz ) );
	if (dir == vec3(0.0,0.0,-1.0)) {
		result.w = 0.0;
	}

	gl_FragColor = result;

	gl_FragColor.a *= fOpacity;

}
