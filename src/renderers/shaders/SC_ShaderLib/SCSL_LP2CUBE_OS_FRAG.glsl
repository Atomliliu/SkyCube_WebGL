//Over sample version
#include <sc_common>

uniform sampler2D tSampler;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform float fPixelSize;
uniform int nFace;
uniform int nSamples;

void main() {

	//vec4 frag(v2f i) : COLOR 
	//{
		//vec2 UV = vUv;
		vec4 result;
		vec2 vP = getLPMapping_VEC2UV( getVec(vUv,nFace),0 );
		int nS = int(float(nSamples) * getPolarCoordTansor(vP));
		if(nS==0) {
			result = texture2D( tSampler,  getLPMapping_VEC2UV( getVec(vUv,nFace),0 ) );
			gl_FragColor = result;
		}
		else{
			for(int n=0;n<_MaxSample;n++){
				if (n >= nS) break;
				float step = sqrt(float(nS));
				float x = mod(float(n),step);
				float y = (float(n)-x)/step;
				vec2 vShift = vec2(((x-step*0.5)/step)*fPixelSize, ((y-step*0.5)/step)*fPixelSize);
				
				result += texture2D( tSampler,  getLPMapping_VEC2UV( getVec(vUv+vShift,nFace),0 ) );
			}
			

			gl_FragColor = result/vec4(float(nS));
		}
		

	//}

}
