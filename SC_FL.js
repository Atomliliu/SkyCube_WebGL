function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

	var textures = [];

	for ( var i = 0; i < tilesNum; i ++ ) {

		textures[ i ] = new THREE.Texture();

	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.height;

		for ( var i = 0; i < textures.length; i ++ ) {

			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas
			textures[ i ].needsUpdate = true;

		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}



function getCubeTexturesFromHStrip( atlasImgUrl, tilesNum ) {

	var textures = [];

	for ( var i = 0; i < tilesNum; i ++ ) {

		textures[ i ] = new THREE.Texture();

	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.height;

		for ( var i = 0; i < textures.length; i ++ ) {

			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas
			textures[ i ].needsUpdate = true;

		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}

//PositiveX	Right facing side (+x).
//NegativeX	Left facing side (-x).
//PositiveY	Upwards facing side (+y).
//NegativeY	Downward facing side (-y).
//PositiveZ	Forward facing side (+z).
//NegativeZ	Backward facing side (-z).

const NUM_0D6 = 0;
const NUM_1D6 = 0.16666666666666666666666666666667;
const NUM_2D6 = 0.33333333333333333333333333333333;
const NUM_3D6 = 0.5;
const NUM_4D6 = 0.66666666666666666666666666666667;
const NUM_5D6 = 0.83333333333333333333333333333333;
const NUM_6D6 = 1;

const NUM_1D3 = 0.33333333333333333333333333333333;
const NUM_2D3 = 0.66666666666666666666666666666667;

const A_PI		3.14159265358//3.1415926535897932384626433832795
const A_1D_PI	0.31830988618//0.31830988618379067153776752674503
const A_HalfPI	1.57079632679//1.5707963267948966192313216916398
const A_SIN45	0.70710678119//0.7071067811865475244008443621048490392848359376884740

//[x,y,width,height,rotated]
var CubeArrayHStrip = [
  [NUM_0D6, 0, NUM_1D6, 1, 0],
  [NUM_1D6, 0, NUM_1D6, 1, 0],
  [NUM_2D6, 0, NUM_1D6, 1, 0],
  [NUM_3D6, 0, NUM_1D6, 1, 0],
  [NUM_4D6, 0, NUM_1D6, 1, 0],
  [NUM_5D6, 0, NUM_1D6, 1, 0]
];

var CubeArrayNvidiaHStrip = [
  [NUM_0D6, 0, NUM_1D6, 1, 0],
  [NUM_1D6, 0, NUM_1D6, 1, 0],
  [NUM_2D6, 0, NUM_1D6, 1, 0],
  [NUM_3D6, 0, NUM_1D6, 1, 0],
  [NUM_4D6, 0, NUM_1D6, 1, 0],
  [NUM_5D6, 0, NUM_1D6, 1, 0]
];

var CubeArrayHCross = [
  [0.5, NUM_1D3, 0.25, NUM_1D3, 0],
  [0, NUM_1D3, 0.25, NUM_1D3, 0],
  [0.25, 0, 0.25, NUM_1D3, 0],
  [0.25, NUM_2D3, 0.25, NUM_1D3, 0],
  [0.25, NUM_1D3, 0.25, NUM_1D3, 0],
  [0.75, NUM_1D3, 0.25, NUM_1D3, 0]
];

var CubeArrayVCross = [
  [NUM_2D3, 0.25, NUM_1D3, 0.25, 0],
  [0, 0.25, NUM_1D3, 0.25, 0],
  [NUM_1D3, 0, NUM_1D3, 0.25, 0],
  [NUM_1D3, 0.5, NUM_1D3, 0.25, 0],
  [NUM_1D3, 0.25, NUM_1D3, 0.25, 0],
  [NUM_1D3, 0.75, NUM_1D3, 0.25, 0]
];




function getTexturesFromAtlasFile( atlasImgUrl, tileArray ) {

	var textures = [];
	var tilesNum = tileArray.length;

	for ( var i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.width;
		var tileHeight = imageObj.height;

		for ( var i = 0; i < textures.length; i ++ ) {

			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( imageObj, 
				Math.round(tileArray[i][1]*tileWidth), Math.round(tileArray[i][2]*tileHeight), 
				Math.round(tileArray[i][3]*tileWidth), Math.round(tileArray[i][4]*tileHeight), 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;

		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}



function _Col8bitToFloat( nCol ){
	return nCol/255.0;
}

function _ColFloatTo8bit( fCol ){
	return Math.round(fCol*255.0);
}

function _Normalize(vX, vY, vZ, scale = 1) {
  var norm = Math.sqrt(vX * vX + vY * vY + vZ * vZ);
  var result = [vX,vY,vZ];
  if (norm != 0) {
    result[0] = scale * vX / norm;
    result[1] = scale * vY / norm;
    result[2] = scale * vZ / norm;
  }

  return result;
}

function _getCarteDir( face, texU, texV ) {

	var dir = [0,0,0];
	// Range to -1 to 1
   	texU = texU * 2.0 - 1.0;
   	texV = texV * 2.0 - 1.0; 


	switch( face ) {
    	case 0 : //PositiveX   Right facing side (+x).
			dir[0] = -1.0;
			dir[1] = texV;
			dir[2] = -texU;
		break;

		case 1 : //NegativeX   Left facing side (-x).
			dir[0] = 1.0;
			dir[1] = texV;
			dir[2] = texU;
		break;

		case 2 : //PositiveY   Upwards facing side (+y).
			dir[0] = -texU;
			dir[1] = -1.0;
			dir[2] = texV;
		break;

		case 3 : //NegativeY   Downward facing side (-y).
			dir[0] = -texU;
			dir[1] = 1.0;
			dir[2] = -texV;
		break;

		case 4 : //PositiveZ   Forward facing side (+z).
			//VEC = new FLOAT3(-UV.x,UV.y,1.0f);
			dir[0] = -texU;
			dir[1] = texV;
			dir[2] = 1.0;
		break;

		case 5 : //NegativeZ   Backward facing side (-z).
			//VEC = new FLOAT3(UV.x,UV.y,-1.0f);
			dir[0] = texU;
			dir[1] = texV;
			dir[2] = -1.0;

		default : 
			//VEC = new FLOAT3( 0.0f, 0.0f, 1.0f );
			dir[0] = 0.0;
			dir[1] = 0.0;
			dir[2] = 1.0;
		break;
   	}

	return _Normalize(dir[0],dir[1],dir[2]);
}

function _getLatLongUV( vDir ){
	
	var uv = [0,0];

	uv[1] = Math.acos(-vDir[1]) * A_1D_PI; // y = 1 to -1, v = 0 to PI
	float P = Math.abs(vDir[0]/vDir[2]);

	if(vDir[0] >= 0) {
		if(vDir[2] == 0.0) {
			vDir[0] = 0.5;
		}
		else if(vDir[2] < 0) {
			uv[0] = (A_PI - Math.atan(P)) * A_1D_PI;
		}
		else {
			uv[0] = Math.atan(P) * A_1D_PI;
		}

	}
	else { // X < 0  //phase
		if(vDir[2] == 0.0) {
			uv[0] = -0.5;
		}
		else if(vDir[2] < 0) {
			uv[0] = -(A_PI - Math.atan(P)) * A_1D_PI;
		}
		else {
			uv[0] = -Math.atan(P) * A_1D_PI;
		}
	}

	uv[0] = (uv[0] + 1.0) * 0.5;

	return uv;
}


function _getLPUV( vDir ) {
	float th, la, lr, L, P;
	var uv = [0,0];
	if(vDir[2] == 1.0f){
		uv[0] = uv[1] = 0.0;
	}

	else {
		th = Math.sqrt(vDir[0] * vDir[0] + vDir[1] * vDir[1]);
		if(vDir[2] < 0.0) {
			la = Math.asin(th);
			lr = (A_PI - la) * A_1D_PI;
			UV.y = lr * (vDir[1] / th);
			UV.x = lr * (vDir[0] / th);
		}

		else{
			la = Math.asin(th);
			lr = la * A_1D_PI;
			UV.y = lr * (vDir[1] / th);
			UV.x = lr * (vDir[0] / th);
		}
		
		//lr = pow(L * L + P * P, 0.5f); 
	}

	//From -1 to 1 move to 0 to 1 range
	uv[0] = (uv[1] + 1.0) * 0.5;
	uv[1] = (uv[1] + 1.0) * 0.5;
	return uv;
}

function _getLPDir( texU, texV ) {
	var vDir = [0,0,0];

	// Range to -1 to 1
   	texU = texU * 2.0 - 1.0;
   	texV = texV * 2.0 - 1.0; 

   	float lr = Math.sqrt(texU * texU + texV * texV);
	if(lr == 0.0){
		vDir[0] = 0.0;
		vDir[1] = 0.0;
		vDir[2] = 1.0;
	}

	else if(lr <= 1.0){
		float la = A_PI * lr; // 0-1 to range 0-Pi
		float th = Math.sin(la);
		vDir[0] = (texU/lr)*th;
		vDir[1] = (texV/lr)*th;
		vDir[2] = Math.cos(la);
	}
	else{//Back
		vDir[0] = 0.0;
		vDir[1] = 0.0;
		vDir[2] = -1.0;
	}

	return vDir;

}





//function _CarteToLP( dirX, dirY, dirZ ) {
//	return uv;
//}

//function _CarteToLatLong( dirX, dirY, dirZ ) {

//}

function getCubeTexturesFromLP( atlasImgUrl ) {

	var textures = [];
	//var tilesNum = tileArray.length;

	for ( var i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.width;
		var tileHeight = imageObj.height;

		//Get LP image in
		canvas = document.createElement( 'canvas' );
		context = canvas.getContext( '2d' );
		canvas.height = tileWidth;
		canvas.width = tileWidth;
		context.drawImage( imageObj, 0, 0);
		//Get image data for each pixel
		var imgData = context.getImageData(0, 0, canvas.width, canvas.height); 



		//
		var canvCube, ctxCube;
		canvCube = document.createElement( 'canvasCube' );
		ctxCube = canvCube.getContext( '2d' );
		canvCube.height = canvCube.width = tileWidth/2;

		var imgFace = ctxCube.getImageData(0, 0, canvCube.width, canvCube.height); 

		//Direction for 6 faces
		var cubeDir = [
		  [NUM_0D6, 0, NUM_1D6, 1],
		  [NUM_1D6, 0, NUM_1D6, 1],
		  [NUM_2D6, 0, NUM_1D6, 1],
		  [NUM_3D6, 0, NUM_1D6, 1],
		  [NUM_4D6, 0, NUM_1D6, 1],
		  [NUM_5D6, 0, NUM_1D6, 1]
		];

		
		for (var f = 0; f < cubeDir.length; f += 1){
			var index = 0;
			for (var h = 0; h < canvCube.height; h++) {
				for (var w = 0; w < canvCube.width; w++) {
					index = 4 * (h * canvCube.width + w);

					var sizeFace = [(canvCube.width-1), (canvCube.height-1)];
					var xyFace = [w/sizeFace[0], h/sizeFace[1]];


					var uvLP = _getLPUV(_getCarteDir(f,xyFace[0],xyFace[1]));
					//var uvLP = [(xyLP[0]+1)*0.5, (xyLP[1]+1)*0.5];// -1 to 1 convert to 0 to 1
					uvLP = [Math.round(uvLP[0]*(canvas.width-1)), Math.round(uvLP[1]*(canvas.height-1))];// 0 to 1 transfer reslution

					var indexLP = 4 * (uvLP[1] * canvas.width + uvLP[0]);// index pixels in image data
					//

					imgFace.data[index] = imgData.data[indexLP]; //R
			        imgFace.data[index+1] = imgData.data[indexLP+1]; //G
			        imgFace.data[index+2] = imgData.data[indexLP+2]; //B
			        imgFace.data[index+3] = imgData.data[indexLP+3]; //A
				}
			}
			canvas.putImageData(imgFace, 0, 0);

			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;	
		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}


function getCubeTexturesFromLatLong( atlasImgUrl ) {

	var textures = [];
	//var tilesNum = tileArray.length;

	for ( var i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.width;
		var tileHeight = imageObj.height;

		//Get LP image in
		canvas = document.createElement( 'canvas' );
		context = canvas.getContext( '2d' );
		canvas.height = tileWidth;
		canvas.width = tileWidth;
		context.drawImage( imageObj, 0, 0);
		//Get image data for each pixel
		var imgData = context.getImageData(0, 0, canvas.width, canvas.height); 



		//
		var canvCube, ctxCube;
		canvCube = document.createElement( 'canvasCube' );
		ctxCube = canvCube.getContext( '2d' );
		canvCube.height = canvCube.width = tileWidth/2;

		var imgFace = ctxCube.getImageData(0, 0, canvCube.width, canvCube.height); 

		//Direction for 6 faces
		var cubeDir = [
		  [NUM_0D6, 0, NUM_1D6, 1],
		  [NUM_1D6, 0, NUM_1D6, 1],
		  [NUM_2D6, 0, NUM_1D6, 1],
		  [NUM_3D6, 0, NUM_1D6, 1],
		  [NUM_4D6, 0, NUM_1D6, 1],
		  [NUM_5D6, 0, NUM_1D6, 1]
		];

		
		for (var f = 0; f < cubeDir.length; f += 1){
			var index = 0;
			for (var h = 0; h < canvCube.height; h++) {
				for (var w = 0; w < canvCube.width; w++) {
					index = 4 * (h * canvCube.width + w);

					var sizeFace = [(canvCube.width-1), (canvCube.height-1)];
					var xyFace = [w/sizeFace[0], h/sizeFace[1]];


					var uvLL = _getLatLongUV(_getCarteDir(f,xyFace[0],xyFace[1]));
					//var uvLL = [(xyLL[0]+1)*0.5, (xyLL[1]+1)*0.5];// -1 to 1 convert to 0 to 1
					uvLL = [Math.round(uvLL[0]*(canvas.width-1)), Math.round(uvLL[1]*(canvas.height-1))];// 0 to 1 transfer reslution

					var indexLL = 4 * (uvLL[1] * canvas.width + uvLL[0]);// index pixels in image data
					//

					imgFace.data[index] = imgData.data[indexLL]; //R
			        imgFace.data[index+1] = imgData.data[indexLL+1]; //G
			        imgFace.data[index+2] = imgData.data[indexLL+2]; //B
			        imgFace.data[index+3] = imgData.data[indexLL+3]; //A
				}
			}
			canvas.putImageData(imgFace, 0, 0);

			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;	
		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}




function RasterByShader( imgUrl, shaderMaterial, matMap, sX, sY ) {

	var textures = [];
	var tilesNum = tileArray.length;

	for ( var i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}

	var imageObj = new Image();

	imageObj.onload = function() {

		var canvas, context;
		var tileWidth = imageObj.width;
		var tileHeight = imageObj.height;

		for ( var i = 0; i < textures.length; i ++ ) {

			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( imageObj, 
				Math.round(tileArray[i][1]*tileWidth), Math.round(tileArray[i][2]*tileHeight), 
				Math.round(tileArray[i][3]*tileWidth), Math.round(tileArray[i][4]*tileHeight), 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;

		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}
