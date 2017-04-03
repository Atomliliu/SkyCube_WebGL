import { LineSegments } from '../objects/LineSegments';
import { VertexColors } from '../constants';
import { LineBasicMaterial } from '../materials/LineBasicMaterial';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { BufferGeometry } from '../core/BufferGeometry';
import { Color } from '../math/Color';
import { Vector3 } from '../math/Vector3';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function SC_2DGridHelper( sizeX,sizeY, divX,divY, color, pos ) {
	pos = (pos !== undefined ? pos: new Vector3(0,0,0));
	sizeX = sizeX || 4;
	sizeY = sizeY || 4;
	divX = divX || 4;
	divY = divY || 4;
	color = new Color( color !== undefined ? color : 0x888888 );

	var centerX = divX / 2;
	var centerY = divY / 2;
	var stepX = sizeX / divX;
	var stepY = sizeY / divY;
	var halfSizeX = sizeX / 2 + pos.x;
	var halfSizeY = sizeY / 2 + pos.y;

	var vertices = [], colors = [];

	//X direction lines
	var j =0;
	for ( var i = 0, k = - halfSizeX; i <= divX; i ++, k += stepX ) {

		vertices.push( - halfSizeX, k, pos.z, halfSizeX, k, pos.z );
		color.toArray( colors, j ); j += 3;
		color.toArray( colors, j ); j += 3;
	}
	//Y direction lines
	for ( var i = 0, k = - halfSizeY; i <= divY; i ++, k += stepY ) {

		vertices.push( k, - halfSizeY, pos.z, k, halfSizeY, pos.z);
		color.toArray( colors, j ); j += 3;
		color.toArray( colors, j ); j += 3;
	}

	var geometry = new BufferGeometry();
	geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

	var material = new LineBasicMaterial( { vertexColors: VertexColors } );

	LineSegments.call( this, geometry, material );

}

SC_2DGridHelper.prototype = Object.create( LineSegments.prototype );
SC_2DGridHelper.prototype.constructor = SC_2DGridHelper;

export { SC_2DGridHelper };