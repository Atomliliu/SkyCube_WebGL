



THREE.SC_OutHUD = function ( cubeMap, width, height, domElement ) {

	//Object3D.call( this );

	//this.type = 'SC_OutHUD';
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.enabled = false;
	this.reviewMode = false;

	var root = this; // for Events Func


	//var options = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBFormat };

	//this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );

	/*var OutHUD_Data = {

		UI_Shaders:
		UI_Materials:
		Out_Shaders:

	};*/

	var Out_Size = 1024;
	var Out_Width = 0;
	var Out_Height = 0;

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

	//
	var Out_SizeScale = [
		4.0,
		4.0,
		4.0,
		4.0,
		1.0,
		4.0,
		6.0,
		4.0,
		6.0
	];

	var UI_Shaders = [];
	var UI_Materials = [];
	var Out_Shaders;

	var UI_IconPos = [];
	var UI_IconPlane = [];

	var reviewPlane;
	var planeDis = 10;

	var InitOpacity = 0.5;
	var InitSaturation = 0.5;

	var HighLitOpacity = 1.0;
	var HighLitSaturation = 1.0;

	var UI_width = Math.abs(width);
	var UI_height = Math.abs(height);

	var layoutNum = new THREE.Vector2(0,0);
	var iconSize = 1.0;
	var iconEdgeSize = new THREE.Vector2(0,0);
	var iconMinGap = 64.0;
	var iconPadding= new THREE.Vector2(40,32);

	var boxUIGeo = new THREE.BoxGeometry( 1, 1, 1 );
	var boxUIMats = [];
	var boxUIFaceIndex = [0,1,2,3,4,5];
	//var boxUIMesh;

	var mouse = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();
	var panStart = new THREE.Vector2();
	var panEnabled = false;

	var raycaster = new THREE.Raycaster();
	var selected = null, hovered = null;
	var outShaderName = "";
	var INTERSECTED;
	//var div;

	//function getSelOutShaderName(){
	//	return outShaderName;
	//}

	function getSelOutSize() {
		var outSize = new THREE.Vector3(0,0,0);//X ratio, Y ratio, Scale
		if(selected != null && outShaderName != ""){
			var index = Out_ShaderNames.indexOf(outShaderName);//findIndex(getSelOutShaderName);
			//console.log(outShaderName);
			//console.log(index);
			if(index != undefined){
				outSize.x = UI_IconsSizeX[index];
				outSize.y = UI_IconsSizeY[index];
				outSize.z = Out_SizeScale[index];
			}
			
		}
		return outSize;
	}

	this.hidenHUD;
	this.shownHUD;

	function previewBackToHUD(){
		domElement.removeEventListener( 'wheel', onDocumentMouseWheel, false );
		domElement.style.cursor = 'auto';
		root.reviewMode = false;
		if(root.shownHUD) root.shownHUD();
	}

	function HUDToReview() {
		
		initReview();
		domElement.addEventListener( 'wheel', onDocumentMouseWheel, false );
		domElement.style.cursor = 'pointer';
		root.reviewMode=true;
		if(root.hidenHUD) root.hidenHUD();
	}


	function activate() {

		domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
		root.enabled = true;

	}

	function deactivate() {

		domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		domElement.removeEventListener( 'mousedown', onDocumentMouseDown, false );
		domElement.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		root.enabled = false;

	}

	function dispose() {

		deactivate();

	}

	
	
	// Create also a custom scene for HUD.
	this.sceneHUD = new THREE.Scene();
	this.sceneReview = new THREE.Scene();

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
		UI_Materials[index].name = Out_ShaderNames[index]; //output shader name
		

		//boxUIMesh = new Mesh( boxUIGeo, new MultiMaterial( boxUIMats ) );
		UI_IconPlane[index] = new THREE.Mesh( boxUIGeo, UI_Materials[index]);
		UI_IconPlane[index].rotation.x = 0.5;
		UI_IconPlane[index].rotation.y = 0.707106; // cos 45
		//Better use push replace [index]

	}
	
	function initHUD(){
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
				UI_Materials[i].name = Out_ShaderNames[i]; //output shader name

				//Out_Shaders[i] = ShaderLib[ Out_ShaderNames[i] ];

				//UI_IconPos[i] = new Vector2(0,0);
				UI_IconPlane[i] = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), UI_Materials[i] );
				//UI_IconPlane[i] = new Mesh( new PlaneGeometry( iconSize*UI_IconsSizeX[i], iconSize*UI_IconsSizeY[i] ), UI_Materials[i] );
				//UI_IconPlane[i].position.x = UI_IconPos[i].x;
				//UI_IconPlane[i].position.y = UI_IconPos[i].y;

				//console.log(UI_IconPlane[i].position);
			}
			root.sceneHUD.add( UI_IconPlane[i] );
			
			
		}

	}


	function initReview(){
		if(!selected) {root.reviewMode=false; console.log("null"); return;}
		var index = Out_ShaderNames.indexOf(outShaderName);//findIndex(getSelOutShaderName); //selected.material.name
		var pSize = (UI_width>=UI_height)?UI_height:UI_width;
		if(selected.material.type == "MultiMaterial"){

		}
		else{
			reviewPlane = new THREE.Mesh( new THREE.PlaneGeometry( pSize*UI_IconsSizeX[index], pSize*UI_IconsSizeY[index] ), selected.material );
			var maxSize = (UI_width>=UI_height)?UI_width:UI_height;
			//reviewPlane.position.x -= (maxSize - pSize)/2.0;
			reviewPlane.position.z = -planeDis;
			root.sceneReview.add( reviewPlane );
			//console.log(selected.material.name);
		} 
	}
	

	
	initHUD();
	
	updateHUDSize();
	updateIconPlaneSize();

	// Create the camera and set the viewport to match the screen dimensions.
	this.cameraHUD = new THREE.OrthographicCamera(-UI_width/2, UI_width/2, UI_height/2, -UI_height/2, 0, iconSize+50 );//?

	activate();
	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;




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

		var UI_Panel = new THREE.Vector2((UI_width-iconPadding.x*2),(UI_height-iconPadding.y*2));

		iconEdgeSize.x = Math.floor(UI_Panel.x/layoutNum.x);
		iconEdgeSize.y = Math.floor(UI_Panel.y/layoutNum.y);
		//console.log(iconEdgeSize);

		iconSize = Math.min(iconEdgeSize.x,iconEdgeSize.y) - iconMinGap;
		if (iconSize <= 16) return; // Too small to render it
		//console.log(iconSize);

		//Setup position (0,0) is left bottom
		var index = 0;
		for ( var iy = 0; iy < layoutNum.y; iy ++ ) {
			for ( var ix = 0; ix < layoutNum.x; ix ++ ) {
				UI_IconPos[index] = new THREE.Vector2(0,0);

				UI_IconPos[index].x = Math.round(iconEdgeSize.x * (ix + 0.5) - (UI_Panel.x*0.5));
				UI_IconPos[index].y = Math.round(iconEdgeSize.y * (iy + 0.5) - (UI_Panel.y*0.5));
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
	this.updateHUD = function ( width, height ) {

		if ( root.cameraHUD.parent === null ) root.cameraHUD.updateMatrixWorld();

		if ((UI_width != width) || (UI_height != height)){
			UI_width = Math.abs(width);
			UI_height = Math.abs(height);

			updateHUDSize();
			updateIconPlaneSize();

			//-UI_width/2, UI_width/2, UI_height/2, -UI_height/2, 0, 100
			root.cameraHUD.left = -UI_width/2;
			root.cameraHUD.right = UI_width/2;
			root.cameraHUD.top = UI_height/2;
			root.cameraHUD.bottom  = -UI_height/2;
			root.cameraHUD.far = iconSize*2;
			root.cameraHUD.updateProjectionMatrix ();
		}
		

	};

	this.renderHUD = function (renderer) {
		if(root.enabled == true){
			if(root.reviewMode == true){
				renderer.render( root.sceneReview, root.cameraHUD );
				//console.log("new plane");
			}
			else{
				renderer.render( root.sceneHUD, root.cameraHUD );
			}
			
		}
		
	};





	


	function RaycasterSetup( MouseCoords, CamRay, SceneRay )
	{
		// find intersections
		raycaster.setFromCamera( MouseCoords, CamRay );

		//var intersects = 
		return raycaster.intersectObjects( SceneRay.children );
	}


	function setupMultiMat(mats, paraName, paraVal){
		for (var i = 0; i < mats.materials.length; i++) {
			mats.materials[i].uniforms[paraName].value = paraVal;
		}
	}

	function pan(deltaX, deltaY)
	{
		var element = root.domElement === document ? root.domElement.body : root.domElement;
		var offset = new THREE.Vector2(deltaX,deltaY);
		//?if (offset.x curZoom*reviewPlane) //limitation
		reviewPlane.position.x +=  offset.x;
		reviewPlane.position.y -=  offset.y;
	}


	function onDocumentMouseMove( event ) {
		event.preventDefault();
		//?innerWidth to element.clientWidth
		mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

		if(root.reviewMode){
			//domElement.style.cursor = 'pointer';
			if(panEnabled){
				panEnd.set( event.clientX, event.clientY );
				panDelta.subVectors( panEnd, panStart );
				domElement.style.cursor = 'move';
				pan( panDelta.x, panDelta.y );
				panStart.copy( panEnd );
			}
			
			return;
		}
		
		//console.log(HDR_EV.sceneHUD);
		var intersects = RaycasterSetup(mouse, root.cameraHUD, root.sceneHUD);
		if ( intersects.length > 0 ) {
			

			if ( INTERSECTED != intersects[ 0 ].object ) {
				
				INTERSECTED = intersects[ 0 ].object;

				//cursor changed by hover
				if ( hovered !== INTERSECTED ) {

					root.dispatchEvent( { type: 'hoveron', object: INTERSECTED } );

					domElement.style.cursor = 'pointer';
					hovered = INTERSECTED;

				}
				if(intersects[ 0 ].object.material.type == "MultiMaterial"){
					
					if ( INTERSECTED ) setupMultiMat(INTERSECTED.material,"fOpacity",1.0);

					setupMultiMat(INTERSECTED.material,"fOpacity",0.5)
				}
				else{
					if ( INTERSECTED ) INTERSECTED.material.uniforms.fOpacity.value = 1.0;

					INTERSECTED.material.uniforms.fOpacity.value = 0.5;
				}

				

			}
		} 
		else {
			if ( hovered !== null ) {

				root.dispatchEvent( { type: 'hoveroff', object: hovered } );

				domElement.style.cursor = 'auto';
				hovered = null;

			}
			if ( INTERSECTED ) {
				if(INTERSECTED.material.type == "MultiMaterial"){
					setupMultiMat(INTERSECTED.material,"fOpacity",1.0);
				}
				else{
					INTERSECTED.material.uniforms.fOpacity.value = 1.0;
				}
			}
			
			INTERSECTED = null;
		}


	}

	var exportSelected = false;

	function onDocumentMouseDown( event ) {
		event.preventDefault();

		if(root.reviewMode){
			panStart.set( event.clientX, event.clientY );
			panEnabled = true;
		}
		else{
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

			var intersects = RaycasterSetup(mouse, root.cameraHUD, root.sceneHUD);
			//console.log(intersects.length);
			if ( intersects.length > 0 ) {
				var picked = intersects[ 0 ].object;
				if(picked.material.type == "MultiMaterial"){
					setupMultiMat(picked.material,"fOpacity",1.0)
				}
				else{
					picked.material.uniforms.fOpacity.value = 1.0;
				}
				outShaderName = picked.material.name;
				selected = picked;
				exportSelected = true;
			}
		}
		
	
	}

	//console.log( 'handleMouseMovePan' );

	this.onReviewMode;
	this.previewBackToHUD = previewBackToHUD;


	function onDocumentMouseUp( event ) {

		event.preventDefault();

		if(root.reviewMode){
			
			panEnabled = false;
			domElement.style.cursor = 'pointer';
			
		}
		else{
			domElement.style.cursor = 'auto';
			if(exportSelected){
				HUDToReview();
				if(root.onReviewMode) root.onReviewMode();
				exportSelected = false;
			}
		}
	}

	var zoomSpeed = 1.0;
	var minZoom = 1.0;
	var maxZoom = 4.0;
	var curZoom = 1.0;
	function getZoomScale() {
		return Math.pow( 0.95, zoomSpeed );
	}

	function scale(deltaScale){
		reviewPlane.scale.set(deltaScale,deltaScale,1.0);
	}

	function onDocumentMouseWheel( event ){
		event.preventDefault();
		event.stopPropagation();
		curZoom = reviewPlane.scale.x;
		if(root.reviewMode){
			if ( event.deltaY < 0 ) {
				//console.log(event.deltaY);
				//zoom-out
				curZoom = Math.max( minZoom, Math.min( maxZoom,curZoom / getZoomScale()));
			} else if ( event.deltaY > 0 ) {
				//zoom-in
				curZoom = Math.max( minZoom, Math.min( maxZoom,curZoom * getZoomScale()));
			}
			scale(curZoom);
		}
	}



	function onExport(){
		//Do export here
		if(outShaderName != ""){
			Out_Shaders = THREE.ShaderLib[ outShaderName ];
			var uniformsOut = THREE.UniformsUtils.clone( Out_Shaders.uniforms );
			uniformsOut.tCube.value = cubeMap;
			uniformsOut.vUvFlip.value = new THREE.Vector2(0,1);//Canvas is top-lift texture coordinate

			var Out_Mat = new THREE.ShaderMaterial({uniforms: uniformsOut,
						vertexShader: Out_Shaders.vertexShader,
						fragmentShader: Out_Shaders.fragmentShader});

			Out_Mat.transparent = false;

			var whRatio = getSelOutSize();
			if (whRatio.x != 0.0 && whRatio.y!=0.0){
				Out_Width = Math.round(whRatio.x * Out_Size * whRatio.z);
				Out_Height = Math.round(whRatio.y * Out_Size * whRatio.z);

				var Out = new THREE.SC_OutputImg(renderer,Out_Width,Out_Height);
				var rtt = new THREE.SC_Raster(renderer,Out_Width,Out_Height);
				rtt.RTT(Out_Mat);
				
				Out.OutputRT2PNG(renderer,rtt.rtRTT);
				hudSnackbarExport();
				console.log("Export!");
			}
			else{
				console.log("Size is wrong!");
			}
		}

	}

	var scc = new THREE.SC_Common();
	scc.loadjscssfile("js/skycube/CSS/SC_ExportPage.css","css");

	function hudSnackbarExport(){
		var div = document.createElement("div");
		div.id = "snackbar";
		div.innerHTML = "Test";
    	div.className = "show";
    	document.body.appendChild(div);
    	setTimeout(function(){ div.className = div.className.replace("show", ""); }, 3000);
	}


	this.hudSnackbarExport = hudSnackbarExport;

};

THREE.SC_OutHUD.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_OutHUD.prototype.constructor = THREE.SC_OutHUD;

//SC_OutHUD.prototype = Object.create( Object3D.prototype );
//SC_OutHUD.prototype.constructor = SC_OutHUD;


//export { SC_OutHUD };


