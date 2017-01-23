#include <sc_common>

uniform sampler2D tSampler;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform int nFace;

void main() {

	//vec4 frag(v2f i) : COLOR 
	//{
		//vec2 UV = vUv;
		vec4 result = texture2D( tSampler,  getLLMapping_VEC2UV( getVec(vUv,nFace) ) );

		gl_FragColor = result;

	//}

}
