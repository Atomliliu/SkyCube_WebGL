function pick( mouse, camera, scene, INTERSECTED )
{
	// find intersections
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 );

		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}


}



0
down vote
accepted
When you declare var mouse = new THREE.Vector2(), it means that you create a vector with values {x:0, y:0} (which means that your mouse positioned in the center of the screen). Then you initialize the scene with init(), setting there the cube, and then you start rendering with animate().

Now, your mouse in the center of the scneen and on every render (in your render() function) you check for intersection. It means that while your mouse in the middle of the screen you'll have positive result of intersection. When you click somewhere out of the cube, you set a new point of your mouse, thus intersection result is negative.

As you want to interact with mouse clicking, then it's better to move the block of code which checks intersection from render() to onDocumentMouseDown(event).

// find intersections
raycaster.setFromCamera( mouse, camera );
var intersects = raycaster.intersectObjects( scene.children );
if ( intersects.length > 0 ) {
  if ( INTERSECTED != intersects[ 0 ].object ) {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = intersects[ 0 ].object;
    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    INTERSECTED.material.emissive.setHex( 0xff0000 );
     console.log(intersects.length);
  }
} else {
  if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
  INTERSECTED = null;
}
