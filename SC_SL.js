/**
 * @author Atom / https://github.com/atom
 *
*/


//THREE.ShaderLibs = {

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
		maxRange:	 { type: "f", value: 6 },
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
					//"c_rgbm.rgba = pow(abs(c_rgbm.rgba), vec4(GammaIn));",
					"c_rgbm.r = pow(abs(c_rgbm.r), GammaIn);",
					"c_rgbm.g = pow(abs(c_rgbm.g), GammaIn);",
					"c_rgbm.b = pow(abs(c_rgbm.b), GammaIn);",
					"c_rgbm.a = pow(abs(c_rgbm.a), GammaIn);",
			"}",

			"vec3 result = vec3(DecodeRGBM(c_rgbm, maxRange, luminance));",
			"if(GammaOut !=1.0){",
				//"result.rgb = pow(abs(result.rgb), vec3(GammaOut));",
				"result.r = pow(abs(result.r), GammaOut);",
				"result.g = pow(abs(result.g), GammaOut);",
				"result.b = pow(abs(result.b), GammaOut);",
			"}",

			"gl_FragColor.rgb = result.rgb;",

			"gl_FragColor.a = 1.0;",

		"}",


	].join( "\n" )

};

THREE.SL_LP2CUBE = {
	uniforms: {

		tSampler: 	 { type: "t", value: null },
		face:	 { type: "i", value: 0 },
		//mode:	 { type: "f", value: 0 },

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

		"uniform int face;",
		
		"#define A_PI		3.14159265358//3.1415926535897932384626433832795",
		"#define A_1D_PI		0.31830988618//0.31830988618379067153776752674503",
		"#define A_HalfPI	1.57079632679//1.5707963267948966192313216916398",
		"#define A_SIN45		0.70710678119//0.7071067811865475244008443621048490392848359376884740",


		"vec3 getVec(ivec2 UV, int face){",

		        "vec3 VEC;",
		        "UV = UV * 2 - 1;", // Range to -1 to 1


		        "if(face == 0){", //PositiveX	 Right facing side (+x).
					"VEC = vec3(1.0,UV.y,UV.x);",
				"}",

				"else if(face == 1){", //NegativeX	 Left facing side (-x).
					"VEC = vec3(-1.0,UV.y,-UV.x);",
				"}",

				"else if(face == 2){", //PositiveY	 Upwards facing side (+y).
					"VEC = vec3(-UV.x,1.0,-UV.y);",
				"}",

				"else if(face == 3){", //NegativeY	 Downward facing side (-y).
					"VEC = vec3(-UV.x,-1.0f,UV.y);",
				"}",

				"else if(face == 4){", //PositiveZ	 Forward facing side (+z).
					"VEC = vec3(-UV.x,UV.y,1.0);",
				"}",

				"else if(face == 5){", //NegativeZ	 Backward facing side (-z).
					"VEC = vec3(UV.x,UV.y,-1.0);",
				"}",

				"else{",
					"VEC = vec3(0.0,0.0,1.0);",
				"}",

		        "return normalize(VEC);",

		    "}",
			
		"vec2 getLPMapping_VEC2UV(vec3 vec)", //Use for create LP map
			"{",
				"vec2 UV;",
				"float  th, la, lr, L, P;",

				//UV = UV * 2 - 1; // Range to -1 to 1

				"if(vec.z == 1.0){",
					"UV.x = UV.y = 0.0;",
				"}",

				"else {",
					"th = sqrt(vec.x * vec.x + vec.y * vec.y);",
					"if(vec.z < 0.0f) {",
						"la = asin(th);",
						"lr = (A_PI - la) * A_1D_PI;",
						"UV.y = lr * (vec.y / th);",
						"UV.x = lr * (vec.x / th);",
					"}",

					"else{",
						"la = asin(th);",
						"lr = la * A_1D_PI;",
						"UV.y = lr * (vec.y / th);",
						"UV.x = lr* (vec.x / th);",
					"}",
					
					//lr = pow(L * L + P * P, 0.5f); 
				"}",

				//From -1 to 1 move to 0 to 1 range
				"UV = (UV + 1.0) * 0.5;",

				"if(mode > 0.9){", //sky to cube
					"UV.x = (1.0 - UV.x);",
				"}",

				"return UV;",
			"}",


		"void main() {",

			"{",
				"vec4 result = tex2D( tSampler,  getLPMapping_VEC2UV( getVec(vUv, face) ) );",
				"gl_FragColor = result;",

			"}",

		"}",



	].join( "\n" )

};


THREE.SCSL_LL2CUBE = {


	uniforms: {

		tSampler: 	 { type: "t", value: null },
		face:	 { type: "i", value: 0 },
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

		"uniform int face;",

		"#define A_PI		3.14159265358", //3.1415926535897932384626433832795
		"#define A_1D_PI		0.31830988618", //0.31830988618379067153776752674503


	    "vec3 getVec(vec2 UV, int face){",

	        "vec3 VEC;",
	        "UV = UV * 2 - 1;", // Range to -1 to 1

	        "if(face == 0){", //PositiveX	 Right facing side (+x).
				"VEC = vec3(1.0,UV.y,UV.x);",
			"}",

			"else if(face == 1){", //NegativeX	 Left facing side (-x).
				"VEC = vec3(-1.0,UV.y,-UV.x);",
			"}",

			"else if(face == 2){", //PositiveY	 Upwards facing side (+y).
				"VEC = vec3(-UV.x,1.0,-UV.y);",
			"}",

			"else if(face == 3){", //NegativeY	 Downward facing side (-y).
				"VEC = vec3(-UV.x,-1.0,UV.y);",
			"}",

			"else if(face == 4){", //PositiveZ	 Forward facing side (+z).
				"VEC = vec3(-UV.x,UV.y,1.0);",
			"}",

			"else if(face == 5){", //NegativeZ	 Backward facing side (-z).
				"VEC = vec3(UV.x,UV.y,-1.0);",
			"}",

			"else{",
				"VEC = vec3(0.0,0.0,1.0);",
			"}",

	        "return normalize(VEC);",

	    "}",


	    "ivec2 getLLMapping_VEC2UV(vec3 vec) //Use for create LP map",
		"{",
			"vec2 UV;",

			"UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI",

			"float P = abs(vec.x/vec.z);",
			//float O = 0.0f;

			"if(vec.x >= 0) {",
				"if(vec.z == 0.0f) {",
					"UV.x = 0.5f;",
				"}",
				"else if(vec.z < 0) {",
					"UV.x = (A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = atan(P) * A_1D_PI;",
				"}",

			"}",
			"else { // X < 0  //phase",
				"if(vec.z == 0.0f) {",
					"UV.x = -0.5f;",
				"}",
				"else if(vec.z < 0) {",
					"UV.x = -(A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = -atan(P) * A_1D_PI;",
				"}",
			"}",

			"UV.x = (UV.x + 1.0f) * 0.5f;",

			
			//"if(mode > 0.9f){ //sky to cube",
			//	"UV.x = (1.0f - UV.x);",
			//"}",

			
			//{r}=\sqrt{x^2 + y^2 + z^2} 、
			//{\theta}=\arctan \left( \frac{\sqrt{x^2 + y^2}}{z} \right)=\arccos \left( {\frac{z}{\sqrt{x^2 + y^2 + z^2}}} \right) 、
			//{\phi}=\arctan \left( {\frac{y}{x}} \right) 

			"return UV;",
		"}",


		"void main() {",

			//"vec4 frag(v2f i) : COLOR ",
			"{",
				//"vec2 UV = vUv;",
				"vec4 result = tex2D( tSampler,  getLLMapping_VEC2UV( getVec(vUv, face) ) );",

				//"if(_Gamma !=1.0f)",
				//"{",
				//	"result.rgb = pow(result.rgb, _Gamma);",
				//"}",

				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};


THREE.SCSL_DP2CUBE = {


	uniforms: {
		tSampler: 	 { type: "t", value: null },
		face:	 { type: "i", value: 0 },
	},


	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"void main() {",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}",


	].join( "\n" ),

	fragmentShader: [

		
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform sampler2D tSampler;",
		"uniform int face;",

		//"#define A_PI		3.14159265358 //3.1415926535897932384626433832795",
		//"#define A_1D_PI		0.31830988618 //0.31830988618379067153776752674503",


	    "vec3 getVec(vec2 UV, int face){",

			// Move it to Libs
			"vec3 VEC;",
			"UV = -(UV * 2 - 1);",// Range from 0 to 1 to 1 to -1 (since in unity UV is invert by directX UV)


   			"if(face == 0){", //PositiveX	 Right facing side (+x).
				"VEC = vec3(1.0,UV.y,UV.x);",
			"}",

			"else if(face == 1){", //NegativeX	 Left facing side (-x).
				"VEC = vec3(-1.0,UV.y,-UV.x);",
			"}",

			"else if(face == 2){", //PositiveY	 Upwards facing side (+y).
				"VEC = vec3(-UV.x,1.0,-UV.y);",
			"}",

			"else if(face == 3){", //NegativeY	 Downward facing side (-y).
				"VEC = vec3(-UV.x,-1.0,UV.y);",
			"}",

			"else if(face == 4){", //PositiveZ	 Forward facing side (+z).
				"VEC = vec3(-UV.x,UV.y,1.0);",
			"}",

			"else if(face == 5){", //NegativeZ	 Backward facing side (-z).
				"VEC = vec3(UV.x,UV.y,-1.0);",
			"}",

			"else{",
				"VEC = vec3(0.0,0.0,1.0);",
			"}",

   			"return normalize(VEC);",

	    "}",



	    "vec2 getDPUVByVec(vec3 vec){",
			"vec2 uv;",
			"if(vec.z < 0){", // Front
				"uv = vec.xy/(1 - vec.z);",
				"uv = (uv + 1) * 0.5;", // Range from -1 to 1 to 0 to 1
				"uv.x *= 0.5;", // Move to left in texture
			"}",
			"else{", // Back
				"vec.y = -vec.y;",
				"uv = - vec.xy/(1 + vec.z);",
				"uv = (uv + 1) * 0.5;", // Range from -1 to 1 to 0 to 1
				//uv.y = -uv.y;
				"uv.x = (uv.x * 0.5) + 0.5;", // Move to right in texture
			"}",

			"return uv;",
		"}",



		"void main() {",
			"{",
				"vec4 result = tex2D( tSampler,  getDPUVByVec( getVec(vUv, face) ) );",
				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};




THREE.SCSL_CUBE2DP = {


	uniforms: {
		tCubeSampler: 	 { type: "t", value: null },
		face:	 { type: "i", value: 0 },
	},


	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",
		"varying vec3 vReflect;",

		"void main() {",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"vWorldPosition = worldPosition.xyz;",
			"vUv = uv;",

			//"vReflect = reflect( I, worldNormal );",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}",


	].join( "\n" ),

	fragmentShader: [

		
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",
		"varying vec3 vReflect;",

		"uniform samplerCube tCubeSampler;",
		"uniform int face;",

		//"#define A_PI		3.14159265358 //3.1415926535897932384626433832795",
		//"#define A_1D_PI		0.31830988618 //0.31830988618379067153776752674503",

		// Move it to Libs
		"vec3 getVecByDPUV(vec2 uv){",
			"float A;",
			"vec3 vec;",
			"if(uv.x < 0.5){",
				"uv.x = uv.x * 2.0;",
				"uv = uv * 2 - 1;", // Range from 0 to 1 to 1 to -1 (since in unity UV is invert by directX UV)
				"uv *= 1.2;",
				"A = uv.x * uv.x + uv.y * uv.y + 1;",
				"vec = vec3(2*uv.x,2*uv.y,(A-2));", // -1+s^2+t^2 = A-2
				"return (vec/A);",
			"}",
			"else {",
				"uv.x = uv.x * 2.0 - 1.0;",

				"uv = uv * 2 - 1; ",// Range from 0 to 1 to 1 to -1 (since in unity UV is invert by directX UV)
				"uv *= 1.2;",
				"A = uv.x * uv.x + uv.y * uv.y + 1;",
				"vec = vec3(2*uv.x,-2*uv.y,(A-2));", // -1+s^2+t^2 = A-2
				"return (-vec/A);",
			"}",
		"}",


		"void main() {",
			"{",
				"vec4 result = textureCube( tCubeSampler,  getVecByDPUV( vUv ) );",
				"gl_FragColor = result;",
			"}",

		"}",

	].join( "\n" )

};









THREE.SCSL_CUBE2LL = {


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
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}",


	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform float face;",

		"#define A_PI		3.14159265358 //3.1415926535897932384626433832795",
		"#define A_1D_PI		0.31830988618 //0.31830988618379067153776752674503",


	    "vec3 getVec(vec2 UV, float face){",

	        "vec3 VEC;",
	        "UV = UV * 2 - 1; // Range to -1 to 1",

	        "if(face == 0.0){ //PositiveX	 Right facing side (+x).",
				"VEC = vec3(1.0,UV.y,UV.x);",
			"}",

			"else if(face == 1.0){ //NegativeX	 Left facing side (-x).",
				"VEC = vec3(-1.0,UV.y,-UV.x);",
			"}",

			"else if(face == 2.0){ //PositiveY	 Upwards facing side (+y).",
				"VEC = vec3(-UV.x,1.0,-UV.y);",
			"}",

			"else if(face == 3.0){ //NegativeY	 Downward facing side (-y).",
				"VEC = vec3(-UV.x,-1.0,UV.y);",
			"}",

			"else if(face == 4.0){ //PositiveZ	 Forward facing side (+z).",
				"VEC = vec3(-UV.x,UV.y,1.0);",
			"}",

			"else if(face == 5.0){ //NegativeZ	 Backward facing side (-z).",
				"VEC = vec3(UV.x,UV.y,-1.0);",
			"}",

			"else{",
				"VEC = vec3(0.0,0.0,1.0);",
			"}",

	        "return normalize(VEC);",

	    "}",


	    "vec2 getSphericalMapping_VEC2UV(vec3 vec) //Use for create LP map",
		"{",
			"vec2 UV;",

			"UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI",

			"float P = abs(vec.x/vec.z);",
			//float O = 0.0f;

			"if(vec.x >= 0) {",
				"if(vec.z == 0.0f) {",
					"UV.x = 0.5f;",
				"}",
				"else if(vec.z < 0) {",
					"UV.x = (A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = atan(P) * A_1D_PI;",
				"}",

			"}",
			"else { // X < 0  //phase",
				"if(vec.z == 0.0f) {",
					"UV.x = -0.5f;",
				"}",
				"else if(vec.z < 0) {",
					"UV.x = -(A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = -atan(P) * A_1D_PI;",
				"}",
			"}",

			"UV.x = (UV.x + 1.0f) * 0.5f;",

			
			//"if(mode > 0.9f){ //sky to cube",
			//	"UV.x = (1.0f - UV.x);",
			//"}",

			
			//{r}=\sqrt{x^2 + y^2 + z^2} 、
			//{\theta}=\arctan \left( \frac{\sqrt{x^2 + y^2}}{z} \right)=\arccos \left( {\frac{z}{\sqrt{x^2 + y^2 + z^2}}} \right) 、
			//{\phi}=\arctan \left( {\frac{y}{x}} \right) 

			"return UV;",
		"}",


		"void main() {",

			//"vec4 frag(v2f i) : COLOR ",
			"{",
				//"vec2 UV = vUv;",
				"vec4 result = tex2D( tSampler,  getSphericalMapping_VEC2UV( getVec(vUv, face) ) );",

				//"if(_Gamma !=1.0f)",
				//"{",
				//	"result.rgb = pow(result.rgb, _Gamma);",
				//"}",

				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};
