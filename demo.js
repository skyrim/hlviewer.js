Demo = function( file ) {
	this.status = -1;
	this.currentDirectory = -1;
	this.file = file;
	this.parseDemo( file );
}

Demo.prototype.parseDemo = function( file ) {
	var magic = file.readString( 8 );
	if( magic !== "HLDEMO" ) {
		this.status = 0;
		return;
	}
	
	this.status = 1;
	
	this.header = {
		demoProtocol : file.readInt( ),
		networkProtocol : file.readInt( ),
		mapName : file.readString( 260 ),
		modName : file.readString( 260 ),
		mapCrc : file.readInt( ),
		directoryOffset : file.readInt( )
	};
	file.seek( this.header.directoryOffset );
	this.directory = {
		count : file.readInt( ),
		entry : []
	};
	for( var i = 0; i < this.directory.count; ++i ) {
		this.directory.entry.push( {
			id : file.readInt( ),
			name : file.readString( 64 ),
			flags : file.readInt( ),
			cdTrack : file.readInt( ),
			time : file.readFloat( ),
			frames : file.readInt( ),
			offset : file.readInt( ),
			length : file.readInt( )
		} );
	}
	file.seek( this.directory.entry[0].offset );
	
	if( this.callback ) {
		this.callback( );
	}
}
	
Demo.prototype.isTimeForNextMacro = function( time ) {
	if( this.endOfDirectory( ) ) {
		return false;
	}
	
	var file = this.file;
	
	file.skip( 1 );
	var macroTime = file.readFloat( );
	file.skip( -5 );
	
	return ( time >= macroTime );
}
	
Demo.prototype.getMacro = function( ) {
	var file = this.file;
	var macro = { };
	macro.id = file.readByte( );
	this.lastMacro = macro.id;
	macro.time = file.readFloat( );
	macro.frame = file.readInt( );
	switch( macro.id ) {
	case 0:
	case 1:
		file.skip( 4 );
		macro.camera = { };
		macro.camera.position = [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ];
		macro.camera.orientation = [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ];
		file.skip( 436 );
		var length = file.readInt( );
		file.skip( length );
		break;
		
	case 2:
		// beginning of playback directory entry
		break;
	
	case 3:
		file.skip( 64 ); // command
		break;
	
	case 4:
		macro.camera = { };
		macro.camera.origin = [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ];
		macro.camera.orientation = [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ];
		file.skip( 8 );
		break;
	
	case 5:
		// end of directory entry
		break;
	
	case 6:
		file.skip( 84 );
		break;
	
	case 7:
		file.skip( 8 );
		break;
	
	case 8:
		file.skip( 4 );
		var length = file.readInt( );
		file.skip( length + 16 );
		break;
	
	case 9:
		var length = file.readInt( );
		file.skip( length );
		break;
	default:
		console.error( "Unknown demo macro: %d", macro.id );
		break;
	}
	
	return macro;
}
	
Demo.prototype.endOfDirectory = function( ) {
	if( this.currentDirectory < 0 || this.currentDirectory > this.directory.entry.length ) {
		throw "No demo directory has started playing.";
	}
	
	var dirEntry = this.directory.entry[this.currentDirectory];
	if( this.file.offset >= dirEntry.offset + dirEntry.length ) {
		return true;
	}
	
	return false;
}
	
Demo.prototype.playDirectory = function( i ) {
	if( i < 0 || i > this.directory.entry.length ) {
		throw "Invalid directory index.";
	}
	
	this.file.seek( this.directory.entry[i].offset );
	this.currentDirectory = i;
}
	
Demo.prototype.findDirectoryByName = function( name ) {
	for( var i = 0; i < this.directory.entry.length; ++i ) {
		if( this.directory.entry[i].name === name ) {
			return i;
		}
	}
	
	return -1;
}