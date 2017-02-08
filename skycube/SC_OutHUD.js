



THREE.SC_OutHUD = function ( cubeMap, width, height ) {

	//Object3D.call( this );

	this.type = 'SC_OutHUD';

	this.enabled = true;

	//var options = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBFormat };

	//this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );

	/*var OutHUD_Data = {

		UI_Shaders:
		UI_Materials:
		Out_Shaders:

	};*/


	var UI_ShaderNames = [
		"ENV2DP_HUD",
		"ENV2HCC_HUD",
		"ENV2LL_HUD",
		"ENV2SP_HUD",
		"ENV2CUBEFACE_HUD",
		"ENV2LP_HUD",
		"ENV2HCUBE_HUD",
		"ENV2VCC_HUD",
		"ENV2VCUBE_HUD"
	 ];
	var Out_ShaderNames = [
		"ENV2DP",
		"ENV2HCC",
		"ENV2LL",
		"ENV2SP",
		"ENV2CUBEFACE",
		"ENV2LP",
		"ENV2HCUBE",
		"ENV2VCC",
		"ENV2VCUBE"
	 ];

	//
	var UI_IconsSizeX = [
		1.0,
		1.0,
		1.0,
		1.0,
		0.7,
		1.0,
		1.0,
		0.75,
		0.16666666666666666666666666666667
	];

	var UI_IconsSizeY = [
		0.5,
		0.75,
		0.5,
		1.0,
		0.7,
		1.0,
		0.16666666666666666666666666666667,
		1.0,
		1.0
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

	var layoutNum = new THREE.Vector2(0,0);
	var iconSize = 1.0;
	var iconEdgeSize = new THREE.Vector2(0,0);
	var iconMinGap = 8.0;

	var boxUIGeo = new THREE.BoxGeometry( 1, 1, 1 );
	var boxUIMats = [];
	var boxUIFaceIndex = [0,1,2,3,4,5];
	//var boxUIMesh;

	
	
	// Create also a custom scene for HUD.
	this.sceneHUD = new THREE.Scene();

	//Init
	//Need update size first
	var boxUIShader = THREE.ShaderLib[ "ENV2CUBEFACE_HUD" ];
	
	function setupBoxUI(index){
		//Init box materials (3) +x +y +z
		for ( var i = 0; i < boxUIFaceIndex.length; i ++ ) {
			var boxUIUniforms = THREE.UniformsUtils.clone( boxUIShader.uniforms );
			boxUIUniforms.tCube.value = cubeMap;
			boxUIUniforms.nFace.value = boxUIFaceIndex[i];
			boxUIUniforms.fOpacity.value = 1.0;
			boxUIMats.push( new THREE.ShaderMaterial({uniforms: boxUIUniforms,
						vertexShader: boxUIShader.vertexShader,
						fragmentShader: boxUIShader.fragmentShader,
						transparent: true,
						opacity: 0}));
			//boxUIMats[i].transparent = true;
			//boxUIMats[i].opacity = 0.0;

		}

		UI_Materials[index] = new THREE.MultiMaterial( boxUIMats );
		

		//boxUIMesh = new Mesh( boxUIGeo, new MultiMaterial( boxUIMats ) );
		UI_IconPlane[index] = new THREE.Mesh( boxUIGeo, UI_Materials[index]);
		UI_IconPlane[index].rotation.x = 0.5;
		UI_IconPlane[index].rotation.y = 0.707106; // cos 45
		//Better use push replace [index]

	}
	

	

	for ( var i = 0; i < UI_ShaderNames.length; i ++ ) {
		if(UI_ShaderNames[i] == "ENV2CUBEFACE_HUD"){
			UI_Shaders[i] = THREE.ShaderLib[ UI_ShaderNames[i] ];
			setupBoxUI(i);
			
			//this.sceneHUD.add( UI_IconPlane[i] );

		}
		else{
			UI_Shaders[i] = THREE.ShaderLib[ UI_ShaderNames[i] ];
			var uniformsUI = THREE.UniformsUtils.clone( UI_Shaders[i].uniforms );
			uniformsUI.tCube.value = cubeMap;
			//uniformsUI.fOpacity.value = 0.5;

			UI_Materials[i] = new THREE.ShaderMaterial({uniforms: uniformsUI,
						vertexShader: UI_Shaders[i].vertexShader,
						fragmentShader: UI_Shaders[i].fragmentShader});

			UI_Materials[i].transparent = true;
			UI_Materials[i].opacity = 0.0;

			//Out_Shaders[i] = ShaderLib[ Out_ShaderNames[i] ];

			//UI_IconPos[i] = new Vector2(0,0);
			UI_IconPlane[i] = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), UI_Materials[i] );
			//UI_IconPlane[i] = new Mesh( new PlaneGeometry( iconSize*UI_IconsSizeX[i], iconSize*UI_IconsSizeY[i] ), UI_Materials[i] );
			//UI_IconPlane[i].position.x = UI_IconPos[i].x;
			//UI_IconPlane[i].position.y = UI_IconPos[i].y;

			//console.log(UI_IconPlane[i].position);
		}
		this.sceneHUD.add( UI_IconPlane[i] );
		
		
	}

	updateHUDSize();
	updateIconPlaneSize();

	// Create the camera and set the viewport to match the screen dimensions.
	this.cameraHUD = new THREE.OrthographicCamera(-UI_width/2, UI_width/2, UI_height/2, -UI_height/2, 0, iconSize+50 );



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
		console.log(iconEdgeSize);

		iconSize = Math.min(iconEdgeSize.x,iconEdgeSize.y) - iconMinGap;
		if (iconSize <= 4) return; // Too small to render it
		console.log(iconSize);

		//Setup position (0,0) is left bottom
		var index = 0;
		for ( var iy = 0; iy < layoutNum.y; iy ++ ) {
			for ( var ix = 0; ix < layoutNum.x; ix ++ ) {
				UI_IconPos[index] = new THREE.Vector2(0,0);

				UI_IconPos[index].x = Math.round(iconEdgeSize.x * (ix + 0.5) - (UI_width*0.5));
				UI_IconPos[index].y = Math.round(iconEdgeSize.y * (iy + 0.5) - (UI_height*0.5));
				index++;
			}
			
		}
	}

	function updateIconPlaneSize(){
		if(UI_IconPlane.length == UI_IconPos.length) {
			for ( var i = 0; i < UI_IconPlane.length; i ++ ) {
				//UI_IconPlane[i].position.x = UI_IconPos[i].x;
				//UI_IconPlane[i].position.y = UI_IconPos[i].y;

				UI_IconPlane[i].position.copy( new THREE.Vector3(UI_IconPos[i].x, UI_IconPos[i].y, 0));
				
				if(i==4){
					UI_IconPlane[i].scale.copy( new THREE.Vector3(iconSize*UI_IconsSizeX[i], iconSize*UI_IconsSizeY[i],iconSize*UI_IconsSizeX[i]) );
					UI_IconPlane[i].position.z = -iconSize;//-iconSize*UI_IconsSizeX[i];
					//console.log(UI_IconPlane[i].position);
					//console.log(UI_IconPlane[i].scale);
					//console.log(UI_IconPlane[i].geometry);
				}
				else{
					UI_IconPlane[i].scale.copy( new THREE.Vector3(iconSize*UI_IconsSizeX[i], iconSize*UI_IconsSizeY[i],1) );
				}
				
			}
		}
		
	}

	//Update HUD rendering
	this.updateHUD = function ( renderer, width, height ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		if ((UI_width != width) || (UI_height != height)){
			UI_width = Math.abs(width);
			UI_height = Math.abs(height);

			updateHUDSize();
			updateIconPlaneSize();

			//-UI_width/2, UI_width/2, UI_height/2, -UI_height/2, 0, 100
			this.cameraHUD.left = -UI_width/2;
			this.cameraHUD.right = UI_width/2;
			this.cameraHUD.top = UI_height/2;
			this.cameraHUD.bottom  = -UI_height/2;
			this.cameraHUD.far = iconSize+10;
			//this.cameraHUD.updateProjectionMatrix ();
		}
		

		renderer.render( this.sceneHUD, this.cameraHUD );

	};


};

//SC_OutHUD.prototype = Object.create( Object3D.prototype );
//SC_OutHUD.prototype.constructor = SC_OutHUD;


//export { SC_OutHUD };


