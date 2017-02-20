//Grab and Drop

THREE.SC_GrabAndDropFiles = function ( idName ) {

	var div = undefined;
	this.showDropZone = function (){
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
		div.style.left= "0";
		div.style.textAlign = "center";
		div.style.outline= "4px dashed #ffffff";
    	div.style.outlineOffset= "-15px";
    	div.id = "_DropZone";

		document.body.appendChild(div);
		//document.getElementById("myList").appendChild(node); 
	}

	this.removeDropZone = function(){
		if(div !== undefined && div.id === "_DropZone"){
			document.body.removeChild(div);
			div = undefined;
		}
	}
};
