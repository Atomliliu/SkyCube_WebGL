//

SCFL_HUDClose = function ( idname, size, symbol ) {

	this.enabled = false;

	//if(size === undefined) size = 32;
	var root = this;
	var scc = new THREE.SC_Common();
	var div;

	this.onClick;

	if (symbol === undefined) symbol = '\xD7';

	function setupCloseIcon() {
		var body;
		if(idname !== undefined && idname != ""){
			body = document.getElementById(idName)
		}
		else{
			body = document.body;
		}
		div = document.createElement("div");
		div.id = "_close";
		div.setAttribute("class", "close-global");

		var span = document.createElement("span");
		span.setAttribute("class", "close");
		if(size !== undefined) span.setAttribute("style", 'font-size:' + size.toString()+'px');
		var closeIcon = document.createTextNode(symbol);
		span.appendChild(closeIcon);

		div.appendChild(span);

		body.appendChild(div);

		span.onclick = function() {
			root.deactivate();
		    if(root.onClick) {root.onClick()};
		};
	}


	

	function activate() {
		this.enabled = true;
		setupCloseIcon();
		shown();

	}

	function shown(){
		div.style.display = "block";
	}

	function hide(){
		div.style.display = "none";
	}

	function deactivate() {
		div.style.display = "none";
		scc.removeCildren(div);
		document.body.removeChild(div);
		this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.hide = hide;
	this.shown = shown;
};

