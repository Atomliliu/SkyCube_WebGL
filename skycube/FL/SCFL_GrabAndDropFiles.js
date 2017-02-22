//Grab and Drop
//import {SCFL_LoadPanorama} from "SCFL_LoadPanorama.js";

SCFL_GrabAndDropFiles = function ( idName, typeName ) {

	var root = this;
	this.div = undefined;
	this.files;

	//var common = new SCFL_Common();
	
	this.enabled = true;

	var loadType = [];
	
	var typeIsRight = false;

	//Move it to THREE
	function type2Array(){
		loadType = typeName.split(",");
	}

	if(typeName != undefined && typeName != ""){
		type2Array();
	}

	//Move it to THREE
	function checkTypeAvailable( fileCheck, fileTypeArray ){
		var fileExt = fileCheck.name.split(".");

		var fe = fileTypeArray.indexOf("." + fileExt[fileExt.length - 1]);
		//var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1);
		//var fileExt = filename.split('.').pop();

		//console.log(fileExt[fileExt.length - 1]);
		if (fe >= 0) {return true;}
		else {return false;}
	}

	//Move it to THREE
	function checkTypeAvailableInFiles( filesArray, fileTypeArray ){
		for (var i = 0; i< filesArray.length; i++) {
	    	var f = filesArray[i];
	    	
	    	if (checkTypeAvailable(f,fileTypeArray)){
	    		return true;
	    	}
	    }
	    return false;
	}

	//Move it to THREE
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

	function createDropZone(){
		div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.background = "#555555";
		//div.style.color = "white";
		//div.innerHTML = "";
		div.style.visibility = "hidden";
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
		//return div;
	}

	function removeDropZone(){
		if(div !== undefined && div.id === "_DropZone"){
			document.body.removeChild(div);
			div = undefined;
		}
	}

	function showZone() {
		if(div !== undefined && div.id === "_DropZone"){
    		div.style.visibility = "visible";
    	}
	}

	function hideZone() {
		if(div !== undefined && div.id === "_DropZone"){
	   		div.style.visibility = "hidden";
	   	}
	}

	function removeZone() {
	    removeDropZone();
	}


	function onDragEnter(event){
		//event.stopPropagation();
		//event.preventDefault();
		showZone();
	}

	function onDragLeave(event){
		hideZone();
	}

	function onDragStart(event){
	    //event.dataTransfer.setData('application/node type', this);
	    event.dataTransfer.setData('text/plain', 'anything');  
	    //console.log("dragstart:", event);
	}

	this.onLoaded = undefined;

	function onFileDrop(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    //console.log(loadType.length);

	    root.files = event.dataTransfer.files; // FileList object.

		if(loadType.length >= 1){
			
		    if(checkTypeAvailableInFiles(root.files, loadType)){
		    	if(root.onLoaded) {root.onLoaded();}
	    		//if(cbFunc) {
	    		//	cbFunc(root.files);
	    		//}
	    		//console.log("good");
	    	}
			else{
				//Alert Window for Filr type
				//console.log("file type not supported!");
			}
		}
		
		

	    // files is a FileList of File objects. List some properties.
	    //var output = [];
	    for (var i = 0, f; f = root.files[i]; i++) {
	      /*output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	                  f.size, ' bytes, last modified: ',
	                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
	                  '</li>');*/
	    }
	    //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	    hideZone();
	}

	function onDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

	}
	

	function activate() {
		createDropZone();

		window.addEventListener('dragenter', onDragEnter, false );
		div.addEventListener('dragleave', onDragLeave, false );
		div.addEventListener('dragstart', onDragStart, false );

		div.addEventListener('dragover', onDragOver, false);
		div.addEventListener('drop', onFileDrop, false);

		//div.addEventListener('dragend');
	}

	function deactivate() {
		window.removeEventListener( 'dragenter', onDragEnter, false );
		div.removeEventListener('dragleave', onDragLeave, false );
		div.removeEventListener('dragstart', onDragStart, false );

		div.removeEventListener('dragover', onDragOver, false);
		div.removeEventListener('drop', onFileDrop, false);

		removeZone();
		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
};

