

THREE.SC_Controller = function ( dom, width, height ) {
	var root = this;
	this.enabled = true;
	this.controllers = [];
	/* Outermost DOM Element*/
	this.domElement = document.createElement('div');
	dom.appendChild(this.domElement);

	function addElement(parentDom, elemName, classType, callBack){
		var cb = document.createElement(elemName);
    	cb.setAttribute('type', classType);

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(cb);
    	cb.onchange = callBack;
    	root.controllers.push(cb);
	}

	this.CheckBox = function (parentDom, classType, callBack){
		if (classType==undefined) classType='checkbox';
		addElement(parentDom, "input", classType, callBack);
		
	};

};

THREE.SC_Controller.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_Controller.prototype.constructor = THREE.SC_Controller;
