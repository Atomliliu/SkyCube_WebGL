

THREE.SC_OutputImg = function ( render, width, height ) {
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );

	canvas.width = width;
	canvas.height = height;

	this.OutputRT2PNG = function( render, rtOutput ){

		var pixels = new Uint8Array( 4 * rtOutput.width * rtOutput.height );
		render.readRenderTargetPixels( rtOutput, 0, 0, rtOutput.width, rtOutput.height, pixels );
		//console.log(rtOutput.width);
		//console.log(rtOutput.height);

		var imageData = new ImageData( new Uint8ClampedArray( pixels ), rtOutput.width, rtOutput.height );
		//console.log(imageData);
		ctx.putImageData( imageData, 0, 0 );

		
		canvas.toBlob( function( blob ) {

			var url = URL.createObjectURL(blob);
			var fileName = 'pano-' + document.title + '-' + Date.now() + '.png';
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

		}, 'image/png' );
	}


};

THREE.SC_OutputImg.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_OutputImg.prototype.constructor = THREE.SC_OutputImg;
