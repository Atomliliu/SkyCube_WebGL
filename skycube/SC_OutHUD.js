import { Object3D } from '../core/Object3D';
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget';
import { ShaderMaterial } from '../materials/ShaderMaterial';
import { UniformsUtils } from '../renderers/shaders/UniformsUtils';
import { ShaderLib } from '../renderers/shaders/ShaderLib';
//import { _Math } from '../math/Math';

import { Mesh } from '../objects/Mesh';
import { BoxGeometry } from '../geometries/BoxGeometry';
import { PlaneGeometry } from '../geometries/PlaneGeometry';

import { LinearFilter, NearestFilter, RGBFormat } from '../constants';
import { Vector2 } from '../math/Vector2';
import { Vector3 } from '../math/Vector3';
import { OrthographicCamera } from '../cameras/OrthographicCamera';
import { Scene } from '../scenes/Scene';







function SC_OutHUD( cubeMap, width, height ) {

	Object3D.call( this );

	this.type = 'SC_OutHUD';

	//var options = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBFormat };

	//this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );

	/*var OutHUD_Data = {

		UI_Shaders:
		UI_Materials:
		Out_Shaders:

	};*/


	var UI_ShaderNames = [
		"ENV2VCUBE_HUD",
		"ENV2VCC_HUD",
		"ENV2LP_HUD",
		"ENV2CUBEFACE_HUD",
		"ENV2SP_HUD",
		"ENV2LL_HUD",
		"ENV2HCC_HUD",
		"ENV2DP_HUD"
	 ];
	var Out_ShaderNames = [
		"ENV2VCUBE",
		"ENV2VCC",
		"ENV2LP",
		"ENV2CUBEFACE",
		"ENV2SP",
		"ENV2LL",
		"ENV2HCC",
		"ENV2DP"
	 ];

	//
	var UI_IconsSizeX = [
		0.16666666666666666666666666666667,
		0.75,
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		1.0
	];

	var UI_IconsSizeY = [
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		0.5,
		0.75,
		0.5
	];

	var UI_Shaders = [];
	var UI_Materials = [];
	//var Out_Shaders = [];

	var UI_IconPos = [];
	var UI_IconPlane = [];

	var InitOpacity = 0.5;
	var InitSaturation = 0.5;

	var HighLitOpacity = 1.0;
	var HighLitSaturation = 1.0;

	var UI_width = Math.abs(width);
	var UI_height = Math.abs(height);

	var layoutNum = new Vector2(0,0);
	var iconSize = 1.0;
	var iconEdgeSize = new Vector2(0,0);
	var iconMinGap = 2.0;

	
	// Create the camera and set the viewport to match the screen dimensions.
	this.cameraHUD = new OrthographicCamera(-UI_width/2, UI_width/2, UI_height/2, -UI_height/2, 0, 30 );

	// Create also a custom scene for HUD.
	this.sceneHUD = new Scene();

	//Init
	//Need update size first
	updateHUDSize();

	for ( var i = 0; i < UI_ShaderNames.length; i ++ ) {
		UI_Shaders[i] = ShaderLib[ UI_ShaderNames[i] ];
		var uniformsUI = UniformsUtils.clone( UI_Shaders[i].uniforms );
		uniformsUI.tCube.value = cubeMap;
		//uniformsUI.fOpacity.value = 0.5;

		UI_Materials[i] = new ShaderMaterial({uniforms: uniformsUI,
					vertexShader: UI_Shaders[i].vertexShader,
					fragmentShader: UI_Shaders[i].fragmentShader});

		UI_Materials[i].transparent = true;
		UI_Materials[i].opacity = 0.0;

		//Out_Shaders[i] = ShaderLib[ Out_ShaderNames[i] ];

		//UI_IconPos[i] = new Vector2(0,0);
		UI_IconPlane[i] = new Mesh( new PlaneGeometry( iconSize*UI_IconsSizeX[i], iconSize*UI_IconsSizeY[i] ), UI_Materials[i] );
		UI_IconPlane[i].position.x = UI_IconPos[i].x;
		UI_IconPlane[i].position.y = UI_IconPos[i].y;

		this.sceneHUD.add( UI_IconPlane[i] );
	}

	


	this.highlitHUD = function ( matSelected ) {
		matSelected.uniforms.fOpacity.value = HighLitOpacity;
	};


	this.resetHUD = function ( matSelected ) {
		matSelected.uniforms.fOpacity.value = InitOpacity;
	};

	function updateHUDSize(){
		var smallerSide = Math.floor(Math.sqrt(UI_ShaderNames.length)); //Smaller number for short side
		var largerSide = Math.ceil(UI_ShaderNames.length/smallerSide); //Larger side number
		if (UI_width >= UI_height){
			layoutNum.x = largerSide;
			layoutNum.y = smallerSide;
		}
		else {
			layoutNum.x = smallerSide;
			layoutNum.y = largerSide;
		}

		iconEdgeSize.x = Math.floor(UI_width/layoutNum.x);
		iconEdgeSize.y = Math.floor(UI_height/layoutNum.y);

		iconSize = Math.min(iconEdgeSize.x,iconEdgeSize.y) - iconMinGap;
		if (iconSize <= 4) return; // Too small to render it


		//Setup position
		for ( var i = 0; i < UI_ShaderNames.length; i ++ ) {
			UI_IconPos[i] = new Vector2(0,0);
			UI_IconPos[i].x = Math.round(iconEdgeSize.x * ((i-1) + 0.5) - (UI_width*0.5));
			UI_IconPos[i].y = Math.round(iconEdgeSize.y * ((i-1) + 0.5) - (UI_height*0.5));
		}
	}

	function updateIconPlaneSize(){
		if(UI_IconPlane.length == UI_IconPos.length) {
			for ( var i = 0; i < UI_IconPlane.length; i ++ ) {
				UI_IconPlane[i].position.x = UI_IconPos[i].x;
				UI_IconPlane[i].position.y = UI_IconPos[i].y;
			}
		}
		
	}

	//Update HUD rendering
	this.updateHUD = function ( renderer, width, height ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		UI_width = Math.abs(width);
		UI_height = Math.abs(height);

		updateHUDSize();
		updateIconPlaneSize();

		renderer.render( scene, cam );

	};


}

SC_OutHUD.prototype = Object.create( Object3D.prototype );
SC_OutHUD.prototype.constructor = SC_OutHUD;


export { SC_OutHUD };


