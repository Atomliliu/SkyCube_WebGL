//

SCFL_CubeViewportHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var divMenu = undefined;
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
		
		document.body.appendChild(divMenu);

		
	}

	function setupMenu() {
		if(divMenu === undefined) return false;
	}

	function openMenu(){
		//;
		document.getElementById("cubeMenu").style.width = "250px";
		document.getElementById("cubeMenu").style.height = (root.height.toString()+"px");
		enabledMenu = true;
	}

	function closeMenu(){
		//;
		document.getElementById("cubeMenu").style.width = "auto";
		document.getElementById("cubeMenu").style.height = "auto";
		enabledMenu = false;
	}

	//this.onRTTUpdated = undefined;




	function activate() {

		setupMenuTab();
		//if(divModal === undefined){
		//	loadjscssfile("js/skycube/CSS/SC_InputPanoramaFormatModal.css","css");
		//}
		
		//checkFormatType();
		//setupFormatWindow();
		//shown();

	}

	function shown(){
		divMenu.style.display = "block";
	}

	function hide(){
		divMenu.style.display = "none";
	}

	function deactivate() {
		hide();
		//removeElements(divModal);
		//document.body.removeChild(divModal);
		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};

