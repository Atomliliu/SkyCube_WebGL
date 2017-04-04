//

SCFL_OutReviewHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;
	this.console = undefined;

	this.files;

	this.uiFileFormat;
	this.uiFileSize;
	this.uiFileName;
	this.uiFileButton;
	this.uiSave;

	var UI_FileType = [
		"PNG",
		"JPG"
	];


	var UI_FileSize = [
		128,
		256,
		512,
		1024,
		2048,
		4096
	];

	var extNames = [
		".png",
		".jpg"
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

	function setupBlock(css,parent){
		var divBlock = document.createElement("div");
		
		if(css) divBlock.setAttribute("class", css);

		if(parent) parent.appendChild(divBlock);
		else divMenu.appendChild(divBlock);
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

		root.console.addLabel(divMenu,"menu_content _inline _fontSS", "filetype", "File Format: " );
		root.uiFileFormat = root.console.addList(divMenu,{id: "filetype", css: "menu_postfixcontent _inlineblock menu_list", texts:UI_FileType, values: extNames, callBack: root.onFileType});
		root.console.addSpace(divMenu,1);

		root.console.addLabel(divMenu,"menu_content _inline _fontSS", "filesize", "File Size:   " );
		root.uiFileSize = root.console.addList(divMenu,{id: "filesize", css: "menu_postfixcontent _inlineblock menu_list", texts:UI_FileSize, values: UI_FileSize, callBack: root.onFileSize});
		root.console.addSpace(divMenu,1);
		root.console.addBreak(divMenu);
		//root.console.addSpace(divMenu,1);

		root.console.addLabel(divMenu,"menu_content _inline _fontSS", "filename", "File Name:" );
		root.uiFileName = root.console.addText(divMenu, {id: "filename",css: "menu_content _inlineblock menu_text menu_widthL", value: "", callBack: root.onFileName});
		//root.uiFileButton = root.console.addButton(divMenu, {css: "menu_content _block buttonLoad menu_button", value: "Select a file", callBack: root.onFileNameSel});
		root.console.addSpace(divMenu,2);

		
		//root.uiExposureLabel = root.console.addLabel(divMenu,"menu_content", "exposure", "Exposure" );
		//root.uiExposure = root.console.addRange(divMenu, {id: "exposure",css: "menu_content _inline", value: 0, min:-16, max:16, callBack: function(){console.log(root.uiExposure.value);}});
		
		root.uiSave = root.console.addButton(setupBlock("_buttom"), {css: "menu_content _block button buttonLoad menu_button _fontM", value: "Save", callBack: root.onSave});


		//Setup file input
		/*var input = document.createElement("input");
		input.type=type;
		input.id="file";
		input.required = true;
		root.uiFileButton.appendChild(input);
		label.addEventListener('change', onFileSelect, false );*/
	}

	//Over writeable callback functions
	this.onBackToSelection;
	this.onFileType=function(){

	};
	this.onFileSize=function(){

	};
	this.onFileName=function(){

	};
	this.onSave;

	this.getFileName = function(){
		return root.uiFileName.value;
	};


	this.getFileType = function(){
		return root.uiFileFormat[root.uiFileFormat.selectedIndex].value;
	};

	this.getFileSize = function(){
		return root.uiFileSize[root.uiFileSize.selectedIndex].value;
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

