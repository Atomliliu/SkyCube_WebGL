//Grab and Drop

THREE.SC_GrabAndDropFiles = function ( cubeMap, width, height, domElement ) {

	var div;
	function showDropZone2(){
		div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.background = "#555555";
		//div.style.color = "white";
		//div.innerHTML = "";
		div.style.visibility = "visible";
		div.style.opacity = "0.5";
		div.style.position = "absolute";
		div.style.margin = "auto";
		div.style.top= "0";
		div.style.right= "0";
		div.style.bottom= "0";
		div.style.left= 0;
		div.style.textAlign = "center";
		div.style.outline= "4px dashed #ffffff";
    	div.style.outlineOffset= "-15px";

		document.body.appendChild(div);
	}
};
