//

SCFL_CubeViewportHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;
	this.console = undefined;
	var menuWidth = 250;

	this.uiCubeFormat;
	this.uiFlipULabel;
	this.uiPreviewMode;
	this.uiFlipU;
	this.uiExport;
	this.uiRotateU;
	this.uiRotateV;
	this.menuWidth = menuWidth;

	this.previewMode = false;
	var UI_PreviewMode = [
		"3D View",
		"HC",
		"LL",
		"LP"
	];

	var tranTime = "0.0s";
	var minMenuHeight = 600;
	var minControllerHeight = 300;

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var scc = new THREE.SC_Common();
	var divMenu = undefined;
	var divControllers;
	var backicon;
	this.enabledMenu = false;

	var root = this; 
	this.width;
	this.height;
	if(width == undefined){
		this.width = window.innerWidth;
	}
	else{
		this.width = width;
	}

	if(height == undefined){
		this.height = window.innerHeight;
	}
	else{
		this.height = height;
	}


	function setupMenuTab() {
		divMenu = document.createElement("div");
		divMenu.id = "cubeMenu";
		divMenu.setAttribute("class", "menu");
		tranTime = divMenu.style.transition;

		var divIcon = document.createElement("div");
		divIcon.setAttribute("class", "menu_icon");
		divIcon.onclick=function(){
			this.classList.toggle("change"); 
			if (root.enabledMenu) {closeMenu();}
			else {openMenu();}
		};

		var divIcon1 = document.createElement("div");
		var divIcon2 = document.createElement("div");
		var divIcon3 = document.createElement("div");

		divIcon1.setAttribute("class", "bar1");
		divIcon2.setAttribute("class", "bar2");
		divIcon3.setAttribute("class", "bar3");

		divIcon.appendChild(divIcon1);
		divIcon.appendChild(divIcon2);
		divIcon.appendChild(divIcon3);

		divMenu.appendChild(divIcon);
		
		document.body.appendChild(divMenu);

		
	}

	function setupBlock(css){
		var divBlock = document.createElement("div");
		
		if(css) divBlock.setAttribute("class", css);
		divMenu.appendChild(divBlock);
		return divBlock;
	}

	function setupMenu() {
		if(divMenu === undefined) return false;
		//Back icon
		backicon = setupBlock("menu_backicon");
		backicon.innerHTML = "\xAB";
		backicon.onclick = root.onBackToInput;

		//Menu
		root.console = new THREE.SC_Controller(divMenu, "menu_console");
		
		//root.uiCubeFormat = root.console.addList(divControllers,{id: "flip", "menu_content _inline"})
		//root.console.addSpace(divControllers,2);

		root.uiExport = root.console.addButton(divMenu, {css: "menu_content _block buttonLoad menu_button", value: "Change Cube Layout", callBack: root.onChangeCubeLayout});
		//root.console.addSpace(divMenu,1);

		root.uiPreviewMode = root.console.addList(divMenu,{id: "preview_mode", css: "menu_content _inline", texts:UI_PreviewMode, values: UI_PreviewMode, callBack: root.updatePreviewMode});
		//root.console.addSpace(divMenu,1);

		divControllers = setupBlock("menu_controller");
		root.uiFlipU = root.console.addCheckBox(divControllers, {id: "flip", css: "menu_content _inline", checked: false, callBack: function(){console.log("chk");}});
		root.uiFlipULabel = root.console.addLabel(divControllers,"menu_content _inline", "flip", "Mirror" );
		root.console.addSpace(divControllers,2);
		
		root.uiRotateULabel = root.console.addLabel(divControllers,"menu_content _inline", "rotate_u", "Rotate U" );
		root.uiRotateU = root.console.addRange(divControllers, {id: "rotate_u",css: "menu_content _inline", value: 0, min:-180, max:180, callBack: root.onRotateU});
		root.console.addSpace(divControllers,1);

		root.uiRotateVLabel = root.console.addLabel(divControllers,"menu_content", "rotate_v", "Rotate V" );
		root.uiRotateV = root.console.addRange(divControllers, {id: "rotate_v",css: "menu_content _inline", value: 0, min:-180, max:180, callBack: root.onRotateV});
		root.console.addSpace(divControllers,2);

		
		root.uiShowFace = root.console.addCheckBox(divControllers, {id: "showface", css: "menu_content _inline", checked: false, callBack: function(){console.log("chk");}});
		root.uiShowFaceLabel = root.console.addLabel(divControllers,"menu_content _inline", "showface", "Show Face" );
		root.console.addSpace(divControllers,1);

		root.uiExposureLabel = root.console.addLabel(divControllers,"menu_content", "exposure", "Exposure" );
		root.uiExposure = root.console.addRange(divControllers, {id: "exposure",css: "menu_content _inline", value: 0, min:-16, max:16, callBack: function(){console.log(root.uiExposure.value);}});
		

		root.console.addSpace(divMenu,2);
		
		root.uiExport = root.console.addButton(setupBlock(), {css: "menu_content _block button buttonLoad menu_button", value: "Export", callBack: root.onExport});

	}

	//Over writeable callback functions
	this.onBackToInput;
	this.onChangeCubeLayout;
	this.onExport;

	this.onRotateU;
	this.onRotateV;

	this.onPreviewMode;
	this.getPreviewModeIndex = function(){
		return root.uiPreviewMode.selectedIndex;
	};
	this.getPreviewModeValue = function(){
		return root.uiPreviewMode.options[root.getPreviewModeIndex()].value;
	};
	this.updatePreviewMode = function(){
		if (root.getPreviewModeIndex()>0) root.previewMode = true;
		else root.previewMode = false;
		if (root.onPreviewMode) root.onPreviewMode();
		//console.log("mode");
	};
	
	

	this.getRotationU = function(){
		return root.uiRotateU.value;
	};
	this.getRotationV = function(){
		return root.uiRotateV.value;
	};


	var initWidth = "auto";
	var initHeight = "auto";


	function visibleMenu(vis){
		var opa = 0.0;
		if(vis == "visible") opa = 1.0;
		for(var n=0;n<root.console.controllers.length;n++){
			root.console.controllers[n].style.visibility = vis;
			root.console.controllers[n].style.opacity = opa;
		}

		backicon.style.visibility = vis;
		backicon.style.opacity = opa;
	}

	var diffSpace = 400;

	function openMenu(){
		//;
		divMenu.style.transition = tranTime;
		initWidth = divMenu.style.width;
		initHeight = divMenu.style.height;

		console.log(root.height);

		if(root.height < minMenuHeight){
			//root.uiExport.parentElement.setAttribute("style", "position: absolute;");
			divMenu.style.width = menuWidth.toString() + "px";
			divMenu.style.height = (minMenuHeight.toString()+"px");
			divControllers.style.height = ((minMenuHeight-diffSpace).toString()+"px");

			//root.onResize();
		}
		else{
			divMenu.style.width = menuWidth.toString() + "px";
			divMenu.style.height = (root.height.toString()+"px");
			divControllers.style.height = ((root.height-diffSpace).toString()+"px");
		}

		
		/*
		root.uiFlipULabel.style.visibility = "visible";
		root.uiFlipU.style.visibility = "visible";
		root.uiExport.style.visibility = "visible";*/



		visibleMenu("visible");
		root.enabledMenu = true;
	}

	function closeMenu(){
		//;
		divMenu.style.transition = tranTime;
		divMenu.style.width = initWidth;
		divMenu.style.height = initHeight;

		/*
		root.uiFlipULabel.style.visibility = "hidden";
		root.uiFlipU.style.visibility = "hidden";
		root.uiExport.style.visibility = "hidden";*/

		visibleMenu("hidden");
		root.enabledMenu = false;
	}

	this.uiExportLastTop;
	this.onResize=function(w,h){

		root.width = window.innerWidth;
		root.height = window.innerHeight;
		if(w) root.width = w;
		if(h) root.height = h;

		//var tranTime = divMenu.style.transition;

		divMenu.style.transition = "0.0s";

		//divMenu.setAttribute("style","-webkit-transition:0.0s;");

		divMenu.style.height = (root.height.toString()+"px");
		divControllers.style.height = ((root.height-diffSpace).toString()+"px");

		//divMenu.style.transition = tranTime;
		//divMenu.setAttribute("style",("-webkit-transition:"+tranTime+";"));

		/*if(root.height < minMenuHeight){
			//
			root.uiExportLastTop = root.uiExport.parentElement.offsetTop;

			//if(root.uiExportLastTop< minMenuHeight-root.uiExport.parentElement.clientHeight){
				//root.uiExportLastTop = minMenuHeight-root.uiExport.parentElement.clientHeight;
			//}

			root.uiExport.parentElement.setAttribute("style", "position: absolute;");
			var fixTop = "top:"+root.uiExportLastTop.toString()+"px;";

			root.uiExport.parentElement.setAttribute("style", fixTop);


		}
		else{
			root.uiExport.parentElement.removeAttribute("style");
		}*/

	}


	//this.onRTTUpdated = undefined;




	function activate() {

		setupMenuTab();
		setupMenu();

		//if(divModal === undefined){
		//	loadjscssfile("js/skycube/CSS/SC_InputPanoramaFormatModal.css","css");
		//}
		
		//checkFormatType();
		//setupFormatWindow();
		//shown();
		this.enabled = true;
	}

	function shown(){
		divMenu.style.display = "block";
	}

	function hide(){
		divMenu.style.display = "none";
	}

	function deactivate() {
		//hide();
		scc.removeCildren(divMenu);
		document.body.removeChild(divMenu);
		this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.shown = shown;
	this.hide = hide;

};

/*animation
function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
*/
