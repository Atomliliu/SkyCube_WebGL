
/*
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

*/

//(function() {
    var prot = ("https:"===document.location.protocol?"https://":"http://");

    var scripts = [
        "../build/three.js",

		"js/jszip/jszip.min.js",
		"js/skycube/SC_Common.js",
		"js/controls/OrbitControls.js",
		"js/skycube/SC_CubeViewport.js",
		"js/skycube/SC_Raster.js",
		"js/skycube/SC_OutputImg.js",
		"js/skycube/SC_OutHUD.js",
		"js/skycube/SC_Controller.js",
		"js/skycube/SC_ViewportHelper.js",


		"js/skycube/FL/SCFL_CubeViewportHUD.js",
		"js/skycube/FL/SCFL_OutReviewHUD.js",
		"js/skycube/FL/SCFL_HUDClose.js",
		"js/skycube/FL/SCFL_InputFiles.js",
		"js/skycube/FL/SCFL_GrabAndDropFiles.js",
		"js/skycube/FL/SCFL_LoadFiles.js",
		"js/skycube/FL/SCFL_LoadPanorama.js",


		"../examples/js/libs/dat.gui.min.js",

		"js/skycube/SC_MainPage.js"
    ];

    function completed() { run();console.log('completed'); }  // FIXME: remove logs

    function checkStateAndCall(path, callback) {
        var _success = false;
        return function() {
            if (!_success && (!this.readyState || (this.readyState == 'complete'))) {
                _success = true;
                console.log(path, 'is ready'); // FIXME: remove logs
                callback();
            }
        };
    }

    function asyncLoadScripts(files) {
        function loadNext() { // chain element
            if (!files.length) completed();
            var path = files.shift();
            var scriptElm = document.createElement('script');
            scriptElm.type = 'text/javascript';
            scriptElm.async = true;
            scriptElm.src = path;//prot+path;
            scriptElm.onload = scriptElm.onreadystatechange = checkStateAndCall(path, loadNext); // load next file in chain when
                                                   // this one will be ready 
            var headElm = document.head || document.getElementsByTagName('head')[0];
            headElm.appendChild(scriptElm);
        }
        loadNext(); // start a chain
    }

    
//})();

function run(){

	window.addEventListener( 'resize', onWindowResize, false );

	inputPage.activate();
	dropZone.activate();
}




