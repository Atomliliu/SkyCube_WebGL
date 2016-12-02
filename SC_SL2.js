
THREE.SCSL_LL2CUBE2 = {


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

		"uniform sampler2D tSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform int face;",

		"#define A_PI		3.14159265358", //3.1415926535897932384626433832795
		"#define A_1D_PI		0.31830988618", //0.31830988618379067153776752674503
		"#define A_1D6		0.166666666667", //0.16666666666666666666666666666667
		"#define A_2D6		0.333333333333", //0.33333333333333333333333333333333
		"#define A_3D6		0.5",
		"#define A_4D6		0.666666666667", //0.66666666666666666666666666666667
		"#define A_5D6		0.833333333333", //0.83333333333333333333333333333333

		//"#include <packing>",

		//Invead X axis from Unity shader

		"vec3 getVec(vec2 UV, int face){",

	        "vec3 VEC;",
	        "UV.x = UV.x * 2.0 - 1.0;", // Range to -1 to 1
	        "UV.y = UV.y * 2.0 - 1.0;", // Range to -1 to 1

	        "if(face == 0){", //PositiveX	 Right facing side (+x).
				"VEC = vec3(1.0,UV.y,-UV.x);",
			"}",

			"else if(face == 1){", //NegativeX	 Left facing side (-x).
				"VEC = vec3(-1.0,UV.y,UV.x);",
			"}",

			"else if(face == 2){", //PositiveY	 Upwards facing side (+y).
				"VEC = vec3(UV.x,1.0,-UV.y);",
			"}",

			"else if(face == 3){", //NegativeY	 Downward facing side (-y).
				"VEC = vec3(UV.x,-1.0,UV.y);",
			"}",

			"else if(face == 4){", //PositiveZ	 Forward facing side (+z).
				"VEC = vec3(UV.x,UV.y,1.0);",
			"}",

			"else if(face == 5){", //NegativeZ	 Backward facing side (-z).
				"VEC = vec3(-UV.x,UV.y,-1.0);",
			"}",

			"else{",
				"VEC = vec3(0.0,0.0,1.0);",
			"}",

	        "return normalize(VEC);",

	    "}",

	    "vec3 getVec2(vec2 UV){",
			"if (UV.x>=0.0 && UV.x<A_1D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x * 6.0,0.0,1.0);",
				"return getVec(UV2,0);",
			"}",
			"else if (UV.x>=A_1D6 && UV.x<A_2D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp((UV2.x-A_1D6) * 6.0,0.0,1.0);",
				"return getVec(UV2,1);",
			"} ",
			"else if (UV.x>=A_2D6 && UV.x<A_3D6){",
				"vec2 UV2 = UV;",
				"UV2.x = (UV2.x-A_2D6) * 6.0;",
				"return getVec(UV2,2);",
			"} ",
			"else if (UV.x>=A_3D6 && UV.x<A_4D6){",
				"vec2 UV2 = UV;",
				"UV2.x = (UV2.x-A_3D6) * 6.0;",
				"return getVec(UV2,3);",
			"} ",
			"else if (UV.x>=A_4D6 && UV.x<A_5D6){",
				"vec2 UV2 = UV;",
				"UV2.x = (UV2.x-A_4D6) * 6.0;",
				"return getVec(UV2,4);",
			"} ",
			"else if (UV.x>=A_5D6 && UV.x<=1.0){",
				"vec2 UV2 = UV;",
				"UV2.x = (UV2.x-A_5D6) * 6.0;",
				"return getVec(UV2,5);",
			"} ",

			"return vec3(0.0,0.0,1.0);",
			
		"}",


	    "vec2 getLLMapping_VEC2UV(vec3 vec) //Use for create LP map",
		"{",
			"vec2 UV;",

			"UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI",

			"float P = abs(vec.x/vec.z);",
			//float O = 0.0f;

			"if (vec.x >= 0.0) {",
				"if(vec.z == 0.0) {",
					"UV.x = 0.5;",
				"}",
				"else if(vec.z < 0.0) {",
					"UV.x = (A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = atan(P) * A_1D_PI;",
				"}",

			"}",
			"else { // X < 0  //phase",
				"if(vec.z == 0.0) {",
					"UV.x = -0.5;",
				"}",
				"else if(vec.z < 0.0) {",
					"UV.x = -(A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = -atan(P) * A_1D_PI;",
				"}",
			"}",

			"UV.x = (UV.x + 1.0) * 0.5;",

			"return UV;",
		"}",


		"void main() {",

			//"vec4 frag(v2f i) : COLOR ",
			"{",
				//"vec2 UV = vUv;",
				"vec4 result = texture2D( tSampler,  getLLMapping_VEC2UV( getVec(vUv,face) ) );",

				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};


THREE.SCSL_LL2CUBE3 = {


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

		"uniform sampler2D tSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform int face;",



		"void main() {",

			//"vec4 frag(v2f i) : COLOR ",
			"{",
				//"vec2 UV = vUv;",
				"vec4 result = vec4(1.0,0.0,0.0,1.0);",

				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};




THREE.SCSL_LL2CUBE_UI = {


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

		"uniform sampler2D tSampler;",
		"varying vec3 vWorldPosition;",
		"varying vec2 vUv;",

		"uniform int face;",

		"#define A_PI		3.14159265358", //3.1415926535897932384626433832795
		"#define A_1D_PI		0.31830988618", //0.31830988618379067153776752674503
		"#define A_1D6		0.166666666667", //0.16666666666666666666666666666667
		"#define A_2D6		0.333333333333", //0.33333333333333333333333333333333
		"#define A_3D6		0.5",
		"#define A_4D6		0.666666666667", //0.66666666666666666666666666666667
		"#define A_5D6		0.833333333333", //0.83333333333333333333333333333333

		//"#include <packing>",

		//Invead X axis from Unity shader

		"vec3 getVec(vec2 UV, int face){",

	        "vec3 VEC;",
	        "UV.x = UV.x * 2.0 - 1.0;", // Range to -1 to 1
	        "UV.y = UV.y * 2.0 - 1.0;", // Range to -1 to 1

	        "if(face == 0){", //PositiveX	 Right facing side (+x).
				"VEC = vec3(1.0,UV.y,-UV.x);",
			"}",

			"else if(face == 1){", //NegativeX	 Left facing side (-x).
				"VEC = vec3(-1.0,UV.y,UV.x);",
			"}",

			"else if(face == 2){", //PositiveY	 Upwards facing side (+y).
				"VEC = vec3(UV.x,1.0,-UV.y);",
			"}",

			"else if(face == 3){", //NegativeY	 Downward facing side (-y).
				"VEC = vec3(UV.x,-1.0,UV.y);",
			"}",

			"else if(face == 4){", //PositiveZ	 Forward facing side (+z).
				"VEC = vec3(UV.x,UV.y,1.0);",
			"}",

			"else if(face == 5){", //NegativeZ	 Backward facing side (-z).
				"VEC = vec3(-UV.x,UV.y,-1.0);",
			"}",

			"else{",
				"VEC = vec3(0.0,0.0,1.0);",
			"}",

	        "return normalize(VEC);",

	    "}",

	    "vec3 getVec2(vec2 UV){",
			"if (UV.x>=0.0 && UV.x<A_1D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x * 6.0,0.0,1.0);",
				"return getVec(UV2,0);",
			"}",
			"else if (UV.x>=A_1D6 && UV.x<A_2D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x * 6.0 - 1.0,0.0,1.0);",
				"return getVec(UV2,1);",
			"} ",
			"else if (UV.x>=A_2D6 && UV.x<A_3D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x*6.0 - 2.0,0.0,1.0);",
				"return getVec(UV2,2);",
			"} ",
			"else if (UV.x>=A_3D6 && UV.x<A_4D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x * 6.0 - 3.0,0.0,1.0);",
				"return getVec(UV2,3);",
			"} ",
			"else if (UV.x>=A_4D6 && UV.x<A_5D6){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x*6.0 - 4.0,0.0,1.0);",
				"return getVec(UV2,4);",
			"} ",
			"else if (UV.x>=A_5D6 && UV.x<=1.0){",
				"vec2 UV2 = UV;",
				"UV2.x = clamp(UV2.x * 6.0 - 5.0,0.0,1.0);",
				"return getVec(UV2,5);",
			"} ",

			"return vec3(0.0,0.0,1.0);",
			
		"}",

		"vec3 getVec3(vec2 UV){",
			"if (UV.x>=0.0 && UV.x<A_1D6){",
				"return vec3(1.0,0.0,1.0);",
			"}",
			"else if (UV.x>=A_1D6 && UV.x<A_2D6){",
				"return vec3(0.0,0.0,1.0);",
			"} ",
			"else if (UV.x>=A_2D6 && UV.x<A_3D6){",
				"return vec3(0.0,1.0,1.0);",
			"} ",
			"else if (UV.x>=A_3D6 && UV.x<A_4D6){",
				"return vec3(0.0,1.0,0.0);",
			"} ",
			"else if (UV.x>=A_4D6 && UV.x<A_5D6){",
				"return vec3(1.0,1.0,0.0);",
			"} ",
			"else if (UV.x>=A_5D6 && UV.x<=1.0){",
				"return vec3(1.0,0.0,0.0);",
			"} ",

			"return vec3(0.0,0.0,0.0);",
			
		"}",


	    "vec2 getLLMapping_VEC2UV(vec3 vec) //Use for create LP map",
		"{",
			"vec2 UV;",

			"UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI",

			"float P = abs(vec.x/vec.z);",
			//float O = 0.0f;

			"if (vec.x >= 0.0) {",
				"if(vec.z == 0.0) {",
					"UV.x = 0.5;",
				"}",
				"else if(vec.z < 0.0) {",
					"UV.x = (A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = atan(P) * A_1D_PI;",
				"}",

			"}",
			"else { // X < 0  //phase",
				"if(vec.z == 0.0) {",
					"UV.x = -0.5;",
				"}",
				"else if(vec.z < 0.0) {",
					"UV.x = -(A_PI - atan(P)) * A_1D_PI;",
				"}",
				"else {",
					"UV.x = -atan(P) * A_1D_PI;",
				"}",
			"}",

			"UV.x = (UV.x + 1.0) * 0.5;",

			"return UV;",
		"}",


		"void main() {",

			//"vec4 frag(v2f i) : COLOR ",
			"{",
				//"vec2 UV = vUv;",
				"vec4 result = texture2D( tSampler,  getLLMapping_VEC2UV( getVec2(vUv) ) );",
				//"result.rgb = getVec2(vUv);",
				"gl_FragColor = result;",

			"}",

		"}",

	].join( "\n" )

};
