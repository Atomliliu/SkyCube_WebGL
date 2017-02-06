#include <sc_common>

uniform samplerCube tCube;
varying vec3 vWorldPosition;
varying vec2 vUv;

//uniform int nFace;
uniform float fFlip;
//uniform float fOpacity;

void main() {
	vec3 dir = getVecLPCubeMap(vUv, 0);
	vec4 result = textureCube( tCube, vec3( fFlip * dir.x, dir.yz ) );


	gl_FragColor = result;

	//gl_FragColor.a *= fOpacity;

}
