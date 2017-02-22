//Loading files
//import {SCFL_LoadPanorama} from "SCFL_LoadPanorama.js";

SCFL_LoadFiles = function() {

	var root = this;
	var reader = new FileReader();

	this.files = [];
	this.enabled = true;
	var filesType = [];


	this.rFilesData = [];
	this.rFilesType = [];
	this.rFilesSize = [];
	this.rImgWidth = [];
	this.rImgHeight = [];

	this.rSelData;
	this.rSelType = 1;

	

	

	

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

	function checkType( format ){
		switch (format.toLowerCase()) {
			case "jpg":
				break;
			case "png":
				break;
			case "fbx":
				return 2;
			default:
				return -1;
		}
		return 1;
	}


	function activate() {

	}

	function deactivate() {

		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	function clear() {
		root.files = [];
		var filesType = [];


		root.rFilesData = [];
		root.rFilesType = [];
		root.rFilesSize = [];
		root.rImgWidth = [];
		root.rImgHeight = [];

		root.rSelData = undefined;
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.clear = clear;

	/*function onImgLoadedSize(w,h){
		root.rImgWidth.push(w);
		root.rImgHeight.push(h);

	}

	function NativeImgReader2(file, callback) {
	    reader.onload = function(evt) {
	        var image = new Image();
	        image.onload = function(evt) {
	            var width = this.width;
	            var height = this.height;
	            if (callback) callback(width, height);
	        };
	        root.rFilesData.push(evt.target.result);
	    };
	    reader.readAsDataURL(file);
	}*/

	this.onLoaded = undefined;

	function NativeImgThumbReader(file) {
	    reader.onload = function(evt) {
	        var image = new Image();
	        image.onload = function(evt) {
	            root.rImgWidth.push(this.width);
				root.rImgHeight.push(this.height);
	  			root.rFilesData.push(this);
	  			if (root.onLoaded) root.onLoaded();
	        };
	        image.src = evt.target.result;
	        
	    };
	    reader.readAsDataURL(file);
	}

	function NativeImgReader(file) {
	    reader.onload = function(evt) {
	        var image = new Image();
	        image.onload = function(evt) {
	  			root.rSelData = this;
	  			if (root.onLoaded) root.onLoaded();
	        };
	        image.src = evt.target.result;
	        
	    };
	    reader.readAsDataURL(file);
	}


	this.load = function(fileList, fileExtList){
		clear();
		if (fileList!=undefined && fileList.length > 0){
			if(fileExtList!=undefined && fileList.length == fileExtList.length){
				filesType = fileExtList;
			}
			else{
				for(var i=0;i<fileList.length;i++){
					var fileExt = fileList[i].name.split(".");

					filesType[i] = fileExt[fileExt.length - 1];
				}
			}
			
		}
		else{
			return false;
		}

		//////////////////////////////////
		if(fileList.length > 1){
			//
		}
		else //Single file
		{
			var f = fileList[0];
			var ft = filesType[0];
			var fn = f.name;

			root.rFilesType[0] = checkType(ft);

			if(root.rFilesType[0] == 1){
				/*reader.addEventListener( 'load', function ( event ) {
					root.rfilesData.push(event.target.result);
					root.rfilesSize.push(f.Size);
					console.log("LOADED");

				}, false );

				reader.readAsDataURL( f );*/
				NativeImgReader(f);
				//console.log(root.rImgWidth[0]+'+'+root.rImgHeight[0]);
				return true;
			}
			else{
				//
				console.log("file type not supported!");
			}
			
		}

	}

};




