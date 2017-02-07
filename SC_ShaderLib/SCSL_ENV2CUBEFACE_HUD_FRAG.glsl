#include <sc_common>

uniform samplerCube tCube;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform int nFace;
uniform float fFlip;
uniform float fOpacity;

void main() {
	vec4 result = vec4(0);
	if (nFace >= 0){
		vec3 dir = getVecSplitCubeMap(vUv, nFace, 0);
		result = textureCube( tCube, vec3( fFlip * dir.x, dir.yz ) );
	}
	

	gl_FragColor = result;

	gl_FragColor.a *= fOpacity;

}
