//

SCFL_CubeViewportHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;
	this.console = undefined;
	this.uiFlipULabel;
	this.uiFlipU;
	this.uiExport;

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
		root.console = new THREE.SC_Controller(divMenu, "menu_console");

		root.uiFlipULabel = root.console.addLabel(divMenu,"menu_content _inline", "", "Flip" );
		root.uiFlipU = root.console.addCheckBox(divMenu,"menu_content _inline", "", false, function(){console.log("chk");});

		root.uiExport = root.console.addButton(divMenu,"menu_content _block", "Export", false, function(){console.log("butt");});
	}

	var initWidth = "auto";
	var initHeight = "auto";

	function openMenu(){
		//;
		initWidth = divMenu.style.width;
		initHeight = divMenu.style.height;

		divMenu.style.width = "250px";
		divMenu.style.height = (root.height.toString()+"px");
		root.uiFlipULabel.style.visibility = "visible";
		root.uiFlipU.style.visibility = "visible";
		root.uiExport.style.visibility = "visible";
		enabledMenu = true;
	}

	function closeMenu(){
		//;
		divMenu.style.width = initWidth;
		divMenu.style.height = initHeight;
		root.uiFlipULabel.style.visibility = "hidden";
		root.uiFlipU.style.visibility = "hidden";
		root.uiExport.style.visibility = "hidden";
		enabledMenu = false;
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
