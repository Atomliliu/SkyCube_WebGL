//

SCFL_OutReviewHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;
	this.console = undefined;

	this.uiFileFormat;
	this.uiFileNameLabel;
	this.uiFileName;
	this.uiExport;

	var UI_FileNames = [
		"PNG",
		"JPG",
		"TGA",
		"TIFF",
		"HDR"
	];

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var scc = new THREE.SC_Common();
	var divMenu = undefined;
	var backicon;
	var enabledMenu = false;

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

		/*
		var divIcon = document.createElement("div");
		divIcon.setAttribute("class", "menu_icon");
		divIcon.onclick=function(){
			this.classList.toggle("change"); 
			if (enabledMenu) {closeMenu();}
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
		*/
		
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
		//if(root.onBackToSelection)
		backicon.onclick = root.onBackToSelection;

		//Menu
		root.console = new THREE.SC_Controller(divMenu, "menu_console");


		root.uiFileFormat = root.console.addList(divMenu,{id: "filetype", css: "menu_content _inline", texts:UI_FileNames, values: UI_FileNames});
		root.console.addSpace(divMenu,1);

		root.uiFileNameLabel = root.console.addLabel(divMenu,"menu_content _inline", "filename", "File Name" );
		root.uiFileName = root.console.addText(divMenu, {id: "filename",css: "menu_content _inline", value: "x", callBack: root.onFileName});
		root.console.addSpace(divMenu,1);

		
		//root.uiExposureLabel = root.console.addLabel(divMenu,"menu_content", "exposure", "Exposure" );
		//root.uiExposure = root.console.addRange(divMenu, {id: "exposure",css: "menu_content _inline", value: 0, min:-16, max:16, callBack: function(){console.log(root.uiExposure.value);}});

		
		root.uiExport = root.console.addButton(setupBlock("_buttom"), {css: "menu_content _block button buttonLoad menu_button", value: "Save", callBack: root.onExport});

	}

	//Over writeable callback functions
	this.onBackToSelection;
	this.onChangeCubeLayout;
	this.onExport;

	this.onFileName = function(){
		return root.uiRotateU.value;
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

	function openMenu(){
		//;
		initWidth = divMenu.style.width;
		initHeight = divMenu.style.height;

		divMenu.style.width = "250px";
		divMenu.style.height = (root.height.toString()+"px");
		/*
		root.uiFlipULabel.style.visibility = "visible";
		root.uiFlipU.style.visibility = "visible";
		root.uiExport.style.visibility = "visible";*/

		visibleMenu("visible");
		enabledMenu = true;
	}

	function closeMenu(){
		//;
		divMenu.style.width = initWidth;
		divMenu.style.height = initHeight;

		/*
		root.uiFlipULabel.style.visibility = "hidden";
		root.uiFlipU.style.visibility = "hidden";
		root.uiExport.style.visibility = "hidden";*/

		visibleMenu("hidden");
		enabledMenu = false;
	}


	//this.onRTTUpdated = undefined;




	function activate() {

		setupMenuTab();
		setupMenu();
		openMenu();

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

