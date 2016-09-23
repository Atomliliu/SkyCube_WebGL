/**
 * @author Atom / https://github.com/atom
 *
*/

THREE.SL_RGBM_ENCODE = {

	uniforms: {

		tHDRSampler: 	 { type: "t", value: null },
		maxRange:	 { type: "f", value: 8 },
		//EV:			 { type: "f", value: 0 },
		_GammaIn:     { type: "f", value: 1 },
		_GammaOut:    { type: "f", value: 1 },

		//sunPosition: 	 { type: "v3", value: new THREE.Vector3() }

	},

	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"void main() {",

			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",

			//"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}",

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tHDRSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		//"uniform float luminance;",
		"uniform float maxRange;",
		//"uniform float EV;",

		"uniform float _GammaIn;",
		"uniform float _GammaOut;",

		"vec4 EncodeRGBM(vec3 rgb, float maxRange)",
		"{",
		    "float maxRGB = max(rgb.x,max(rgb.g,rgb.b));",
		    "float M = maxRGB / maxRange;",
		    "M = ceil(M * 255.0) / 255.0;",
		    "return vec4(rgb / (M * maxRange), M);",
		"}",


		"void main() ",
		"{",
			"vec4 c_hdr = texture2D(tHDRSampler, vUv);",
			//"//c_rgbm.a =1.0;",
			"if(_GammaIn !=1.0){",
					"c_hdr.rgb = pow(abs(c_hdr.rgb), vec4(_GammaIn));",
			"}",

			"vec4 result = vec4(EncodeRGBM(c_hdr.rgb, maxRange));",
			"if(_GammaOut !=1.0){",
				"result.rgba = pow(abs(result.rgba), vec4(_GammaOut));",
				//"result.g = pow(abs(result.g), _GammaOut);",
				//"result.b = pow(abs(result.b), _GammaOut);",
				//"result.a = pow(abs(result.a), _GammaOut);",
			"}",

			"gl_FragColor = result;",


		"}",


	].join( "\n" )

};




THREE.SL_RGBM_DECODE = {

	uniforms: {

		tRGBMSampler: 	 { type: "t", value: null },
		luminance:	 { type: "f", value: 1 },
		maxRange:	 { type: "f", value: 8 },
		//EV:			 { type: "f", value: 0 },
		GammaIn:     { type: "f", value: 1 },
		GammaOut:    { type: "f", value: 1 },

		//sunPosition: 	 { type: "v3", value: new THREE.Vector3() }

	},

	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"void main() {",

			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",

			//"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}",

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tRGBMSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform float luminance;",
		"uniform float maxRange;",
		//"uniform float EV;",

		"uniform float GammaIn;",
		"uniform float GammaOut;",



		"vec3 DecodeRGBM(vec4 rgbm, float maxRange, float lum)",
		"{",
			"return rgbm.rgb * (rgbm.a * maxRange) * lum;",
		"}",


		"void main() ",
		"{",
			"vec4 c_rgbm = texture2D(tRGBMSampler, vUv);",
			//"//c_rgbm.a =1.0;",
			"if(GammaIn !=1.0){",
					"c_rgbm.rgba = pow(abs(c_rgbm.rgba), vec4(GammaIn));",
					//"c_rgbm.g = pow(abs(c_rgbm.g), GammaIn);",
					//"c_rgbm.b = pow(abs(c_rgbm.b), GammaIn);",
					//"c_rgbm.a = pow(abs(c_rgbm.a), GammaIn);",
			"}",

			"vec3 result = vec3(DecodeRGBM(c_rgbm, maxRange, luminance));",
			"if(GammaOut !=1.0){",
				"result.rgb = pow(abs(result.rgb), vec3(GammaOut));",
				//"result.g = pow(abs(result.g), GammaOut);",
				//"result.b = pow(abs(result.b), GammaOut);",
			"}",

			"gl_FragColor.rgb = result.rgb;",

			"gl_FragColor.a = 1.0;",

		"}",


	].join( "\n" )

};

THREE.SL_LP2CUBE = {
	uniforms: {

		tSampler: 	 { type: "t", value: null },
		face:	 { type: "f", value: 0 },
		mode:	 { type: "f", value: 0 },

	},


	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"void main() {",

			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",

			//"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}",

	].join( "\n" ),


	fragmentShader: [

		"uniform sampler2D tRGBMSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform float luminance;",
		"uniform float maxRange;",
		//"uniform float EV;",

		"uniform float GammaIn;",
		"uniform float GammaOut;",



		"vec3 DecodeRGBM(vec4 rgbm, float maxRange, float lum)",
		"{",
			"return rgbm.rgb * (rgbm.a * maxRange) * lum;",
		"}",


		"void main() ",
		"{",
			"vec4 c_rgbm = texture2D(tRGBMSampler, vUv);",
			//"//c_rgbm.a =1.0;",
			"if(GammaIn !=1.0){",
					"c_rgbm.rgba = pow(abs(c_rgbm.rgba), vec4(GammaIn));",
					//"c_rgbm.g = pow(abs(c_rgbm.g), GammaIn);",
					//"c_rgbm.b = pow(abs(c_rgbm.b), GammaIn);",
					//"c_rgbm.a = pow(abs(c_rgbm.a), GammaIn);",
			"}",

			"vec3 result = vec3(DecodeRGBM(c_rgbm, maxRange, luminance));",
			"if(GammaOut !=1.0){",
				"result.rgb = pow(abs(result.rgb), vec3(GammaOut));",
				//"result.g = pow(abs(result.g), GammaOut);",
				//"result.b = pow(abs(result.b), GammaOut);",
			"}",

			"gl_FragColor.rgb = result.rgb;",

			"gl_FragColor.a = 1.0;",

		"}",


	].join( "\n" )

};


THREE.SCSL_LatLong2Cube = {


	uniforms: {

		tSampler: 	 { type: "t", value: null },
		face:	 { type: "f", value: 0 },
	},


	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"void main() {",

			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",
			//"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}",


	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform float face;",

		"#define A_PI		3.14159265358 //3.1415926535897932384626433832795"
		"#define A_1D_PI		0.31830988618 //0.31830988618379067153776752674503"


	    "vec3 GetVec(vec2 UV, float face){"

	        "vec3 VEC;"
	        "UV = UV * 2 - 1; // Range to -1 to 1"

	        "if(face == 0.0){ //PositiveX	 Right facing side (+x)."
				"VEC = vec3(1.0,UV.y,UV.x);"
			"}"

			"else if(face == 1.0){ //NegativeX	 Left facing side (-x)."
				"VEC = vec3(-1.0,UV.y,-UV.x);"
			"}"

			"else if(face == 2.0){ //PositiveY	 Upwards facing side (+y)."
				"VEC = vec3(-UV.x,1.0,-UV.y);"
			"}"

			"else if(face == 3.0){ //NegativeY	 Downward facing side (-y)."
				"VEC = vec3(-UV.x,-1.0,UV.y);"
			"}"

			"else if(face == 4.0){ //PositiveZ	 Forward facing side (+z)."
				"VEC = vec3(-UV.x,UV.y,1.0);"
			"}"

			"else if(face == 5.0){ //NegativeZ	 Backward facing side (-z)."
				"VEC = vec3(UV.x,UV.y,-1.0);"
			"}"

			"else{"
				"VEC = vec3(0.0,0.0,1.0);"
			"}"

	        "return normalize(VEC);"

	    "}"


	    "fixed2 GetSphericalMapping_VEC2UV(float3 vec, float mode) //Use for create LP map"
		"{"
			"fixed2 UV;"

			"UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI"

			"float P = abs(vec.x/vec.z);"
			//float O = 0.0f;

			"if(vec.x >= 0) {"
				"if(vec.z == 0.0f) {"
					"UV.x = 0.5f;"
				"}"
				"else if(vec.z < 0) {"
					"UV.x = (A_PI - atan(P)) * A_1D_PI;"
				"}"
				"else {"
					"UV.x = atan(P) * A_1D_PI;"
				"}"

			"}"
			"else { // X < 0  //phase"
				"if(vec.z == 0.0f) {"
					"UV.x = -0.5f;"
				"}"
				"else if(vec.z < 0) {"
					"UV.x = -(A_PI - atan(P)) * A_1D_PI;"
				"}"
				"else {"
					"UV.x = -atan(P) * A_1D_PI;"
				"}"
			"}"

			"UV.x = (UV.x + 1.0f) * 0.5f;"

			
			"if(mode > 0.9f){ //sky to cube"
				"UV.x = (1.0f - UV.x);"
			"}"

			
			//{r}=\sqrt{x^2 + y^2 + z^2} 、
			//{\theta}=\arctan \left( \frac{\sqrt{x^2 + y^2}}{z} \right)=\arccos \left( {\frac{z}{\sqrt{x^2 + y^2 + z^2}}} \right) 、
			//{\phi}=\arctan \left( {\frac{y}{x}} \right) 

			"return UV;"
		"}"


		"void main() {",

			"vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",
			"vec4 refractedColor = vec4( 1.0 );",

			"refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;",
			"refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;",
			"refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;",

			"gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",

		"}"

	].join( "\n" )

};

Shader "Hidden/Skycube/INT/SC_Spherical2Cube" {

	
	Subshader 
	{
		Pass 
		{
			ZTest Always Cull Off ZWrite Off lighting off
			Fog { Mode off }      
			CGPROGRAM



			#pragma vertex vert
			#pragma fragment frag
			#pragma target 3.0
			#include "UnityCG.cginc"
			//#include "Assets/Shaders/Atom_Common_Libs.cginc"

			

			sampler2D _MainTex;
			//half _MaxRange;
			half _Gamma;

			//samplerCUBE _Cube;
			float _Face;
			float _Mode;

			#define A_PI		3.14159265358//3.1415926535897932384626433832795
			#define A_1D_PI		0.31830988618//0.31830988618379067153776752674503


		    float3 GetVec(fixed2 UV, float face){

		        float3 VEC;
		        UV = UV * 2 - 1; // Range to -1 to 1

		        if(face == 0.0f){ //PositiveX	 Right facing side (+x).
					VEC = float3(1.0,UV.y,UV.x);
				}

				else if(face == 1.0f){ //NegativeX	 Left facing side (-x).
					VEC = float3(-1.0f,UV.y,-UV.x);
				}

				else if(face == 2.0f){ //PositiveY	 Upwards facing side (+y).
					VEC = float3(-UV.x,1.0f,-UV.y);
				}

				else if(face == 3.0f){ //NegativeY	 Downward facing side (-y).
					VEC = float3(-UV.x,-1.0f,UV.y);
				}

				else if(face == 4.0f){ //PositiveZ	 Forward facing side (+z).
					VEC = float3(-UV.x,UV.y,1.0f);
				}

				else if(face == 5.0f){ //NegativeZ	 Backward facing side (-z).
					VEC = float3(UV.x,UV.y,-1.0f);
				}

				else{
					VEC = float3(0.0f,0.0f,1.0f);
				}

		        return normalize(VEC);

		    }


			fixed2 GetSphericalMapping_VEC2UV(float3 vec, float mode) //Use for create LP map
			{
				fixed2 UV;

				UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI

				float P = abs(vec.x/vec.z);
				//float O = 0.0f;

				if(vec.x >= 0) {
					if(vec.z == 0.0f) {
						UV.x = 0.5f;
					}
					else if(vec.z < 0) {
						UV.x = (A_PI - atan(P)) * A_1D_PI;
					}
					else {
						UV.x = atan(P) * A_1D_PI;
					}

				}
				else { // X < 0  //phase
					if(vec.z == 0.0f) {
						UV.x = -0.5f;
					}
					else if(vec.z < 0) {
						UV.x = -(A_PI - atan(P)) * A_1D_PI;
					}
					else {
						UV.x = -atan(P) * A_1D_PI;
					}
				}

				UV.x = (UV.x + 1.0f) * 0.5f;

				
				if(mode > 0.9f){ //sky to cube
					UV.x = (1.0f - UV.x);
				}

				
				//{r}=\sqrt{x^2 + y^2 + z^2} 、
				//{\theta}=\arctan \left( \frac{\sqrt{x^2 + y^2}}{z} \right)=\arccos \left( {\frac{z}{\sqrt{x^2 + y^2 + z^2}}} \right) 、
				//{\phi}=\arctan \left( {\frac{y}{x}} \right) 

				return UV;
			}
			

			struct v2f {
				float4 pos : POSITION;
				float2 uv  : TEXCOORD0;
			};

			



			float4 frag(v2f i) : COLOR 
			{
				//float2 UV = float2( 1 - i.uv.x , i.uv.y);
				float2 UV = i.uv;
				float4 result = tex2D( _MainTex,  GetSphericalMapping_VEC2UV( GetVec(UV, _Face), _Mode) );
				//float4 result = tex2D( _MainTex,  i.uv);
				//float4 result = texCUBE (_Cube, GetSphericalMapping_UV2VEC(i.uv, _Mode));
				//float4 result = float4(((float3)GetSphericalMapping_UV2VEC(i.uv) + 1)*0.5,1.0);//texCUBE (_Cube, (float3)GetSphericalMapping_UV2VEC(i.uv));
				if(_Gamma !=1.0f)
				{
					result.rgb = pow(result.rgb, _Gamma);
				}

				return result;

			}

	    ENDCG
	  	}

	}

Fallback off
}
