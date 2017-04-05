

THREE.SC_OutputImg = function ( render, width, height ) {
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );

	canvas.width = width;
	canvas.height = height;
	root = this;
	this.blobData;
	this.urlData;

	this.toDataFinished;
	this.toFileFinished;

	this.OutputRT2PNGJPGData = function( render, rtOutput, name, type ){
		var fileName = name;
		var fileType = type;
		var format = 'image/png';
		var pixels = new Uint8Array( 4 * rtOutput.width * rtOutput.height );
		render.readRenderTargetPixels( rtOutput, 0, 0, rtOutput.width, rtOutput.height, pixels );

		var imageData = new ImageData( new Uint8ClampedArray( pixels ), rtOutput.width, rtOutput.height );
		//console.log(imageData);
		ctx.putImageData( imageData, 0, 0 );
		if(fileType === undefined || (fileType != ".png" && fileType != ".jpg")) fileType = ".png";
		format = fileType.substring(1,fileType.length);
		if (format == "jpg") format = 'jpeg';
		format = 'image/' + format;


		if(fileName === undefined || fileName == "") fileName = 'cubemap-' + document.title + '-' + Date.now() + fileType;
		else {fileName = fileName + fileType;}
		
		canvas.toBlob( function( blob ) {
			root.blobData = blob;
			root.urlData = URL.createObjectURL(blob);
			if(root.toDataFinished) root.toDataFinished(fileName,blob);
			//if(root.toDataFinished) root.toDataFinished(fileName,root.urlData);

		}, format );

		return fileName;
	}

	this.OutputRT2PNGJPGFile = function( render, rtOutput, name, type ){
		var fileName = name;
		var fileType = type;
		var format = 'image/png';
		var pixels = new Uint8Array( 4 * rtOutput.width * rtOutput.height );
		render.readRenderTargetPixels( rtOutput, 0, 0, rtOutput.width, rtOutput.height, pixels );
		//console.log(rtOutput.width);
		//console.log(rtOutput.height);

		var imageData = new ImageData( new Uint8ClampedArray( pixels ), rtOutput.width, rtOutput.height );
		//console.log(imageData);
		ctx.putImageData( imageData, 0, 0 );
		if(fileType === undefined || (fileType != ".png" && fileType != ".jpg")) fileType = ".png";
		format = fileType.substring(1,fileType.length);
		if (format == "jpg") format = 'jpeg';
		format = 'image/' + format;

		if(fileName === undefined || fileName == "") fileName = 'cubemap-' + document.title + '-' + Date.now() +fileType;
		else {fileName = fileName + fileType;}
		
		canvas.toBlob( function( blob ) {
			
			var url = URL.createObjectURL(blob);
			

			var anchor = document.createElement( 'a' );
			anchor.href = url;
			anchor.setAttribute("download", fileName);
			anchor.className = "download-js-link";
			anchor.innerHTML = "downloading...";
			anchor.style.display = "none";
			document.body.appendChild(anchor);
			setTimeout(function() {
				anchor.click();
				document.body.removeChild(anchor);
			}, 1 );

			if(root.toFileFinished) root.toFileFinished();

		}, format );

		return fileName;
		//console.log(format);
	}


};

THREE.SC_OutputImg.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_OutputImg.prototype.constructor = THREE.SC_OutputImg;
