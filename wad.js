Game.prototype.extractTexturesFromWad = function( file ) {
	file.skip( 4 ); // magic
	var numberOfTextures = file.readUInt( );
	var offsetOfLumpsList = file.readUInt( );
	
	file.seek( offsetOfLumpsList );
	
	var temp;
	var textures = [ ];
	for( var i = 0; i < numberOfTextures; ++i ) {
		temp = {
			offset: file.readUInt( ),
			
			compressedSize: file.readUInt( ),
			fullSize: file.readUInt( ),
			
			type: file.readByte( ),
			
			compressionType: file.readByte( ),
			
			padding: file.readUShort( ),
			
			name: file.readString( 16 )
		};
		
		for( var j = 0, mapTextureCount = this.mapData.textures.count; j < mapTextureCount; ++j ) {
			if( temp.name.toLowerCase( ) === this.mapData.textures.miptex[j].name.toLowerCase( ) ) {
				temp.replaceIndex = j;
				textures.push( temp );
			}
		}
	}
	
	for( var i = 0, textureCount = textures.length; i < textureCount; ++i ) {
		file.seek( textures[i].offset );
		
		if( textures[i].type === 0x40 || textures[i].type === 0x43 ) {
			file.skip( 16 ); // name
		}
		
		textures[i].width = file.readUInt( );
		textures[i].height = file.readUInt( );
		
		if( textures[i].type === 0x46 ) {
			file.skip( 1032 ); // rowcount (4 bytes), rowheight (4 bytes), chars (4*256 bytes)
		}
		
		if( textures[i].type === 0x40 || textures[i].type === 0x43 ) {
			file.skip( 16 ); // mipmapOffsets (4 uints)
		}
		
		var width = textures[i].width;
		var height = textures[i].height;
		
		textures[i].pixel = file.readArray( width * height, File.prototype.readUByte );
		
		if( textures[i].type === 0x40 || textures[i].type === 0x43 ) {
			file.skip( ( width * height / 4 ) + ( width * height / 16 ) + ( width * height / 64 ) );
		}
		
		file.skip( 2 );
		if( textures[i].type === 0x40 || textures[i].type === 0x43 ) {
			textures[i].palette = new Array( 256 );
			for( var j = 0; j < 256; ++j ) {
				textures[i].palette[j] = file.readArray( 3, File.prototype.readUByte );
			}
		}
		file.skip( 2 );
		
		var texture = textures[i];
		var pixelCount = textures[i].pixel.length;
		var data = new Uint8Array( pixelCount * 4 );
		var r, g, b;
		for( var j = 0; j < pixelCount; ++j ) {
			r = texture.palette[texture.pixel[j]][0];
			g = texture.palette[texture.pixel[j]][1];
			b = texture.palette[texture.pixel[j]][2];
			data[4 * j + 0] = r;
			data[4 * j + 1] = g;
			data[4 * j + 2] = b;
			if( r === 0 && g === 0 && b === 255 ) {
				data[4 * j + 3] = 0;
			}
			else {
				data[4 * j + 3] = 255;
			}
		}
		
		this.mapData.textures.miptex[texture.replaceIndex].width = texture.width;
		this.mapData.textures.miptex[texture.replaceIndex].height = texture.height;
		this.mapData.textures.miptex[texture.replaceIndex].data = data;
		this.mapData.textures.miptex[texture.replaceIndex].unavailable = false;
	}
}