#include <sc_common>

uniform samplerCube tCube;
varying vec3 vWorldPosition;
varying vec2 vUv;

//uniform int nFace;
uniform float fFlip;

void main() {
	vec3 dir = getVecHCrossCubeMap(vUv);
	vec4 result = textureCube( tCube, vec3( fFlip * dir.x, dir.yz ) );

	//vec4 result = texture2D( tSampler,  getLLMapping_VEC2UV( getVec(vUv,nFace) ) );

	gl_FragColor = result;

	//gl_FragColor.a *= opacity;

}
