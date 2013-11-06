ResourceManager = function( ) {
	this._loaded = 0;
	this.resources = [ ];
	this.listener = document.createElement( 'div' );
	this.listener.addEventListener( 'loadAll', this._onResourceLoadAll.bind( this ) );
	
	$( window ).on( 'resize', function( ) {
		var element = $( '#loading' );
		element.css( 'margin-left', ( element.width( ) * -0.5 ) + 'px' );
	} );
}

ResourceManager.prototype.addResource = function( resource ) {
	this.resources.push( resource );
	resource.addEventListener( 'load', this._onResourceLoad.bind( this ) );
	resource.addEventListener( 'progress', this._onResourceProgress.bind( this ) );
	
	var element = $( '#loading' );
	element.append( $( '<p/>' ).attr( 'class', 'loading-resource res' + ( this.resources.length - 1 ) )
					.append( $( '<p/>' ).attr( 'class', 'loading-resource-name' ).html( resource.path ) )
					.append( $( '<p/>' ).attr( 'class', 'loading-resource-status' ).html( 'downloading' ) ) )
		.css( 'margin-left', ( element.width( ) * -0.5 ) + 'px' )
		.fadeIn( 500 );
}

ResourceManager.prototype._onResourceLoad = function( event ) {
	++this._loaded;
	
	var loadEvent = new Event( 'load' );
	loadEvent.data = { };
	loadEvent.data.file = event.data;
	this.listener.dispatchEvent( loadEvent );
	
	if( this._loaded === this.resources.length ) {
		var loadAllEvent = new Event( 'loadAll' );
		this.listener.dispatchEvent( loadAllEvent );
	}
}

ResourceManager.prototype._onResourceProgress = function( event ) {
	var id = this.resources.indexOf( event.data.file );
	if( id < 0 ) {
		return;
	}
	
	if( event.lengthComputable ) {
		var percentComplete = event.loaded / event.total;
		$( '#loading p.res' + id + ' .loading-resource-status' ).html( Math.round( percentComplete * 100 ) + '%'  );
	}
}

ResourceManager.prototype._onResourceLoadAll = function( event ) {
	setTimeout( function( ) {
		$( '#loading' ).fadeOut( 1000, function( ) {
			$( '#loading p' ).remove( );
		} );
	}, 3000 );
}

ResourceManager.prototype.addEventListener = function( type, callback ) {
	this.listener.addEventListener( type, callback );
}

ResourceManager.prototype.removeEventListener = function( type, callback ) {
	this.listener.removeEventListener( type, callback );
}

ResourceManager.prototype.unloadAll = function( ) {
	game.entities = null;
	game.scene = new THREE.Scene( );
	game.models = [ ];
	game.textures = [ ];
}