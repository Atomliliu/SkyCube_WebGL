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
			if tileArray[i][4] == 0 {
				context.drawImage( imageObj, 
					Math.round(tileArray[i][0]*tileWidth), Math.round(tileArray[i][1]*tileHeight), 
					Math.round(tileArray[i][2]*tileWidth), Math.round(tileArray[i][3]*tileHeight), 0, 0, tileWidth, tileWidth );

			}
			else // 180 degree
			{
				canvas2 = document.createElement( 'canvas' );
				context2 = canvas2.getContext( '2d' );
				canvas2.height = tileWidth;
				canvas2.width = tileWidth;
				context2.drawImage( imageObj, 
					Math.round(tileArray[i][0]*tileWidth), Math.round(tileArray[i][1]*tileHeight), 
					Math.round(tileArray[i][2]*tileWidth), Math.round(tileArray[i][3]*tileHeight), 0, 0, tileWidth, tileWidth );

				context.translate(canvas.width/2,canvas.height/2);
				context.rotate(180*Math.PI/180);
				context.drawImage( context2, -context2.width/2, -context2.height/2);

			}
			



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

function _getCarteDir( face, texU, texV ) {

}

function _CarteToLP( dirX, dirY, dirZ ) {

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

			for (i = 0; i < imgData.data.length; i += 4) {
			}

			//Cube face pixel pos to LP image UV
			var dirRay = _getCarteDir(f,)
			if cubeDir[f]
			_CarteToLP()
		}

		for (i = 0; i < imgData.data.length; i += 4) {
	        imgData.data[i] = 255 - imgData.data[i];
	        imgData.data[i+1] = 255 - imgData.data[i+1];
	        imgData.data[i+2] = 255 - imgData.data[i+2];
	        imgData.data[i+3] = 255;
	    }

		textures[ i ].image = canvas;
		textures[ i ].needsUpdate = true;


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
