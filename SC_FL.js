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

function getCubeTexturesFromLatLong( atlasImgUrl ) {

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

function _getCarteDir( face, texX, texY ) {
	return dir;
}

function _getLPUV( vDir ) {
	return ;
}

function _CarteToLP( dirX, dirY, dirZ ) {
	return uv;
}

function _CarteToLatLong( dirX, dirY, dirZ ) {

}

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
					var xyFace = [((w/sizeFace[0])*2)-1, ((h/sizeFace[1])*2)-1];


					var xyLP = _getLPUV(_getCarteDir(f,xyFace[0],xyFace[1]));
					var uvLP = [(xyLP[0]+1)*0.5, (xyLP[1]+1)*0.5];// -1 to 1 convert to 0 to 1
					uvLP = [uvLP[0]*(canvas.width-1), uvLP[1]*(canvas.height-1)];// 0 to 1 transfer reslution

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


document.getElementById("scream").onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // invert colors
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
};



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
