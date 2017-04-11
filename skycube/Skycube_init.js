

function loadjs(fileName){
    
    var fileRef=document.createElement('script')
    fileRef.setAttribute("type","text/javascript")
    fileRef.setAttribute("src", fileName)
    if (typeof fileRef!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileRef)
}

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadalljs(){
	loadjs("../build/three.js");

	loadjs("js/jszip/jszip.min.js");
	loadjs("js/skycube/SC_Common.js");
	loadjs("js/controls/OrbitControls.js");
	loadjs("js/skycube/SC_CubeViewport.js");
	loadjs("js/skycube/SC_Raster.js");
	loadjs("js/skycube/SC_OutputImg.js");
	loadjs("js/skycube/SC_OutHUD.js");
	loadjs("js/skycube/SC_Controller.js");
	loadjs("js/skycube/SC_ViewportHelper.js");


	loadjs("js/skycube/FL/SCFL_CubeViewportHUD.js");
	loadjs("js/skycube/FL/SCFL_OutReviewHUD.js");
	loadjs("js/skycube/FL/SCFL_HUDClose.js");
	loadjs("js/skycube/FL/SCFL_InputFiles.js");
	loadjs("js/skycube/FL/SCFL_GrabAndDropFiles.js");
	loadjs("js/skycube/FL/SCFL_LoadFiles.js");
	loadjs("js/skycube/FL/SCFL_LoadPanorama.js");


	loadjs("../examples/js/libs/dat.gui.min.js");

	//loadjs("js/skycube/SC_MainPage.js");
}






