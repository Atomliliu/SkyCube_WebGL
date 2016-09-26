var textures = getTexturesFromAtlasFile( "textures/cube/sun_temple_stripe.jpg", 6 );

var materials = [];

for ( var i = 0; i < 6; i ++ ) {

	materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );

}

var skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), new THREE.MultiMaterial( materials ) );
skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, - 1 ) );
scene.add( skyBox );
