


function checkCompatible(){
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	  return true;
	} 
	else {
	  alert('The File APIs are not fully supported in this browser.');
	  return false;
	}

	return false;
}

/*var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.3;
controls.enableZoom = true;
controls.enablePan = false;*/

///////////////////////////////////////////////////////////////////////////////
var type = ".jpg,.png";
var minWidth = 800;
var minHeight = 600;
var loader = new SCFL_LoadFiles();
var container;

var Width = window.innerWidth,Height = window.innerHeight;
if(window.innerWidth<minWidth){
	Width = minWidth;
}
if(window.innerHeight<minHeight){
	Height = minHeight;
}

//var width = window.innerWidth;
	//var height = window.innerHeight;

var inputPage = new SCFL_InputFiles("input", type)

var dropZone = new SCFL_GrabAndDropFiles("", type);

var panaorama;

var CM;
var cubeView;
var renderLoop;
var helper;

var loadStatus = false;

var renderer;
var previewCube;
//var previewMode = false;
var outHUD;

var cubeMenu;
var exportHUD;


/////////////////////////////////////////////////////////



inputPage.onLoaded = function(){
	loadStatus = loader.load(inputPage.files);
	if(loadStatus){
		//

	}
}

dropZone.onLoaded = function(){
	loadStatus = loader.load(dropZone.files);
	if(loadStatus){
		//
	}
}

loader.onLoaded = function(){

	test();
}

///////////////////////////TEST////////////////////////////

function test(){
	//console.log(loader.rImgWidth[0]);
	//Image size
	//console.log(loader.rSelData.width);
	init();
	panaorama = new SCFL_LoadPanorama(loader.rSelData, renderer);
	inputPage.hidden();
	panaorama.onRTTUpdated = function(cubeRTTs) {
		// body...
		inputPage.deactivate();
		dropZone.deactivate();
		cubeView = new THREE.SC_CubeViewport(cubeRTTs, Width, Height, 75, renderer);
		cubeView.activate();
		helper = new THREE.SC_ViewportHelper(renderer,cubeView.scene,cubeView.camera);
		//
		//helper.add3DGridPolarSurface(50,16,8,64,0x888888,0xffffff);
		//helper.add3DAxis(50);
		//helper.add3DBox(700,700,700,0xffffff);
		if(renderLoop == undefined){
			animate();
		}
		

		cubeMenu = new SCFL_CubeViewportHUD();
		cubeMenu.initCubeInfo(panaorama.img.width,panaorama.img.height,panaorama.getCubeSize(),panaorama.getPanoramaType());
		
		function cleanCubeViewPage(){
			if (cubeMenu.previewMode){
				previewCube.PreviewOff();
				previewCube.dispose();
			}
			cubeMenu.dispose();
			cubeView.dispose();
			

			cubeMenu = undefined;
			cubeView = undefined;

		}

		function HelperDisableStatus(status){
			if(cubeMenu){
				cubeMenu.uiShowFace.disabled = status;
				cubeMenu.uiShowGrid.disabled = status;
				cubeMenu.uiShowOffset.disabled = status;
			}
			
		}
		cubeMenu.onShowGrid = function(){
			if(cubeMenu.getShowGrid()){
				helper.add3DGridSurface(100,10,0xffffff);
				helper.add3DAxis(50);
			}
			else{
				helper.remove3DGridSurface();
				helper.remove3DAxis();
			}
			
		};
		cubeMenu.onShowOffset = function(){
			if(cubeMenu.getShowOffset()){
				helper.add3DArrow(new THREE.Vector3(0,0,0),cubeView.getCubeFaceDir(50),0xffffff,5);
			}
			else{
				helper.remove3DArrow();
			}
		};
		cubeMenu.onShowFace = function(){
			//console.log("s");
			if(cubeMenu.getShowFace()){
				helper.add3DBox(350,350,350,0xffffff);
			}
			else{
				helper.remove3DBox();
			}
		};


		cubeMenu.onFlipU = function(){
			if(cubeMenu.getFlipU()){
				if(cubeView) cubeView.setFlipSkyBox(-1,1,1);
			}
			else{
				if(cubeView) cubeView.setFlipSkyBox(1,1,1);
			}

			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
		};
		cubeMenu.onFlipV = function(){
			if(cubeMenu.getFlipV()){
				if(cubeView) cubeView.setFlipSkyBox(1,-1,1);
			}
			else{
				if(cubeView) cubeView.setFlipSkyBox(1,1,1);
			}
			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
		};
		cubeMenu.onFlipW = function(){
			if(cubeMenu.getFlipW()){
				if(cubeView) cubeView.setFlipSkyBox(1,1,-1);
			}
			else{
				if(cubeView) cubeView.setFlipSkyBox(1,1,1);
			}
			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
		};




		var helperPreview;
		cubeMenu.onPreviewMode = function(){
			if (cubeMenu.previewMode){
				//renderer.clear();
				CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);
				previewCube = new THREE.SC_OutHUD(CM, Width, Height, renderer.domElement);
				previewCube.PreviewOn(cubeMenu.getPreviewModeIndex(),-cubeMenu.menuWidth*0.5);
				cubeView.disableControls();
				cubeView.asBackground(0.0);
				helper.setHideAll();
				HelperDisableStatus(true);
				var posPlane = previewCube.getPreviewPlanePos();
				posPlane.z += 1;
				helperPreview = new THREE.SC_ViewportHelper(renderer,previewCube.sceneReview,previewCube.cameraHUD);
				helperPreview.add2DGridPreview(Width*2,Height*2,20,15,0x888888,posPlane);
			}
			else{
				previewCube.PreviewOff();
				previewCube.dispose();
				cubeView.enableControls();
				cubeView.asNormal();
				helper.setShowAll();
				HelperDisableStatus(false);
				if(helperPreview) helperPreview.remove2DGridPreview();

				previewCube = undefined;
				helperPreview = undefined;

				//renderer.clear();
			}
			
		};
		//Do export and go to review page select export format
		cubeMenu.onExport = function(){
			if(previewCube!=undefined && previewCube.enabled){
				previewCube.PreviewHiden();
			}
				
			CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);
			//CM = cubeMap;
			outHUD = new THREE.SC_OutHUD(CM, Width, Height, renderer.domElement);
			outHUD.setupHUD();
			outHUD.hidenHUD = function(){outHUDClose.hide();};
			outHUD.shownHUD = function(){outHUDClose.shown();};
			outHUD.onReviewMode = function(){
				exportHUD = new SCFL_OutReviewHUD();
				//? function order
				exportHUD.onBackToSelection = function(){
					exportHUD.dispose();
					exportHUD = undefined;
					outHUD.ReviewBackToHUD();
					//console.log("back");
				};
				//? function order
				exportHUD.activate();

				//Show save info

				function updateInfo(){
					var ResWH = outHUD.getFileSize(exportHUD.getFileSize());
					var extMain = exportHUD.getUIFileType();
					if(outHUD.isPackage) extMain = ".zip";
					
					console.log(exportHUD.getFileName());
					exportHUD.initCubeInfo(ResWH.x,
						ResWH.y,
						outHUD.getTypeName(),
						outHUD.getFileName(exportHUD.getFileName()) + exportHUD.getFileType(),
						extMain,
						outHUD.getSubName(exportHUD.getFileName(),exportHUD.getFileType()));
				}

				updateInfo();
				
				
				

				//Save file to disk
				exportHUD.onSave = function(){
					//console.log(exportHUD.getFileType());
					outHUD.onFileExport(exportHUD.getFileName(),exportHUD.getFileType(),exportHUD.getFileSize());

				};

				exportHUD.onFileType = function(){
					updateInfo();
				};

				exportHUD.onFileSize = function(){
					updateInfo();
				};

				exportHUD.onFileName = function(){
					updateInfo();
				};

				
			};
			outHUD.activate();

			var outHUDClose = new SCFL_HUDClose("",58,"\xAB");
			outHUDClose.onClick = function(){
				outHUD.deactivate();
				if (cubeMenu.previewMode && previewCube != undefined){
					previewCube.PreviewShown();
					cubeView.disableControls();
					cubeView.asBackground(0.0);
					helper.setHideAll();
					HelperDisableStatus(true);
				}
				else{
					cubeView.enableControls();
					cubeView.asNormal();
				}
				
				cubeMenu.show();
			};
			

			//controls.gui.close();
			cubeMenu.hide();
			outHUDClose.activate();


			cubeView.disableControls();
			cubeView.asBackground(0.0);

		};

		cubeMenu.onBackToInput = function(){

			var alertBack = confirm("Back to input page you will lose the current content!");
			if (!alertBack) {
			    return;
			}

			cleanCubeViewPage();
			panaorama.dispose();
			panaorama = undefined;
			stop();

			inputPage.activate();
			dropZone.activate();
		};

		cubeMenu.onChangeCubeLayout = function(){
			cubeMenu.hide();
			cubeView.deactivate();
			if (cubeMenu.previewMode){
				previewCube.deactivate();
			}
			//stop();

			panaorama.layoutOnly = true;
			//User re-import img
			panaorama.onImportStart = function(){
				cleanCubeViewPage();
				//stop();
			};
			//User cancelled layout window
			panaorama.onBackToView = function(){
				cubeMenu.show();
				cubeView.activate();
				if (cubeMenu.previewMode){
					previewCube.activate();
				}
			};
			panaorama.activateModal();
		};

		cubeMenu.onRotateU = function(){
			//cubeView.setCubeQuaternion(new THREE.Vector3( 0, 1, 0 ),cubeMenu.getRotationU());
			cubeView.setCubeRotationY(cubeMenu.getRotationU());
			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
			if (helper){helper.update3DArrow(cubeView.getCubeFaceDir());}
		};
		cubeMenu.onRotateV = function(){
			//cubeView.setCubeQuaternion(new THREE.Vector3( 1, 0, 0 ),cubeMenu.getRotationV());
			cubeView.setCubeRotationX(cubeMenu.getRotationV());
			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
			if (helper){helper.update3DArrow(cubeView.getCubeFaceDir());}
		};
		cubeMenu.onRotateW = function(){
			cubeView.setCubeRotationZ(cubeMenu.getRotationW());
			if (cubeMenu.previewMode){CM=panaorama.updateCube(cubeView.deltaSkyBoxMatrix);}
			if (helper){helper.update3DArrow(cubeView.getCubeFaceDir());}

		};

		cubeMenu.onExposure = function(){

		};

		cubeMenu.activate();

	};

	panaorama.onBackToInput = function(){
		inputPage.shown();
		panaorama.dispose();
		panaorama = undefined;
		stop();
	};

	panaorama.activate();

}



function init() {
	// body...

	container = document.getElementById( 'render' );
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.autoClear = false;//MUst turn it off if you want add multi renders in same buffer
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( Width, Height );
	renderer.setClearColor( 0x000000, 0 ); // the default
	container.appendChild( renderer.domElement );

	
}

function animate() {
	
	renderLoop = requestAnimationFrame( animate );
		
	update();
}


function stop() {
    if (renderLoop) {
       cancelAnimationFrame(renderLoop);
       renderLoop = undefined;
    }
    if(renderer){
    	if(container) container.removeChild(renderer.domElement);
    	renderer.dispose();
    	renderer = undefined;
    }
    


    window.removeEventListener( 'resize', onWindowResize, false );
}

function pause(){
	if (renderLoop) {
       cancelAnimationFrame(renderLoop);
       renderLoop = undefined;
    }
}


function update() {
	if(cubeView !== undefined && cubeView.enabled){
		cubeView.renderView();
	}
	if(previewCube !== undefined && previewCube.enabled){
		previewCube.renderHUD(renderer);
	}

	
	if(outHUD !== undefined && outHUD.enabled){
		outHUD.renderHUD(renderer);
	}

}


function onWindowResize() {

	Width = window.innerWidth,Height = window.innerHeight;
	if(window.innerWidth<minWidth){
		Width = minWidth;
	}
	if(window.innerHeight<minHeight){
		Height = minHeight;
	}

	if(cubeView !== undefined && cubeView.enabled){
		cubeView.onResize(Width,Height);
	}

	if(previewCube !== undefined && previewCube.enabled){
		previewCube.onResize( Width, Height );
	}

	//Update HUD size here
	if(outHUD !== undefined && outHUD.enabled){
		outHUD.onResize( Width, Height );
	}

	if(cubeMenu !== undefined && cubeMenu.enabled && cubeMenu.enabledMenu){
		cubeMenu.onResize( Width, Height );
	}

}


window.onbeforeunload = function() {
		return "Data will be lost if you leave the page, are you sure?";
};





//inputPage.activate();
//dropZone.activate();