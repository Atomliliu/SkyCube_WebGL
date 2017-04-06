#include <sc_common>

//Encode HDR to RGBM

uniform sampler2D tSampler;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform float fRange;

void main() {

	//vec4 frag(v2f i) : COLOR 
	//{
		//vec2 UV = vUv;
		vec4 result = texture2D( tSampler, vUv );
		result = EncodeRGBM(result.rgb, fRange);

		gl_FragColor = result;

	//}

}
