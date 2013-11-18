function displayTexture( texture ) {
	var textureContainer = document.createElement( "div" );
	var textureCanvas = document.createElement( "canvas" );
	textureCanvas.width = texture.width;
	textureCanvas.height = texture.height;
	var textureCanvasContext = textureCanvas.getContext( "2d" );
	var textureCanvasImageData = textureCanvasContext.createImageData( textureCanvas.width, textureCanvas.height );
	for( var j = 0, size = textureCanvas.width * textureCanvas.height; j < size; ++j ) {
		textureCanvasImageData.data[4 * j + 0] = texture.data[4 * j + 0];
		textureCanvasImageData.data[4 * j + 1] = texture.data[4 * j + 1];
		textureCanvasImageData.data[4 * j + 2] = texture.data[4 * j + 2];
		textureCanvasImageData.data[4 * j + 3] = 255;
	}
	
	textureCanvasContext.putImageData( textureCanvasImageData, 0, 0 );
	$( "body" ).append( textureCanvas );//.append( "<br>" );
}

/**
 * Check whether the given thing is a number.
 * @param	{*}			n	The thing.
 * @return	{boolean}		True if the thing is a number.
 */
function isNumber( n ) {
	return !isNaN( parseFloat( n ) ) && isFinite( n );
}

/**
 * Resizes the image. Usefull to convert NPOT to POT textures, which WebGL supports.
 * @params	{Uint8Array}	imagedata		Array containing pixel data of image in RGBA format.
 * @params	{number}		width			
 * @params	{number}		height			
 * @params	{number}		newWidth		
 * @params	{number}		newHeight		
 * @return	{Uint8Array}					Image data of the resized image.
 */
function resizeTexture( data, w, h, nw, nh ) {
	var c = document.createElement( "canvas" );
	var ctx = c.getContext( "2d" );
	c.width = w;
	c.height = h;
	
	var nc = document.createElement( "canvas" );
	var nctx = nc.getContext( "2d" );
	nc.width = nw;
	nc.height = nh;
	
	var cid = ctx.createImageData( w, h );
	for( var i = 0, size = w * h * 4; i < size; i += 4 ) {
		cid.data[i] = data[i];
		cid.data[i + 1] = data[i + 1];
		cid.data[i + 2] = data[i + 2];
		cid.data[i + 3] = data[i + 3];
	}
	ctx.putImageData( cid, 0, 0 );
	
	nctx.drawImage( c, 0, 0, nw, nh );
	
	return new Uint8Array( nctx.getImageData( 0, 0, nw, nh ).data );
}

/**
 * Check whether the number given is the power of two.
 * @param	{number}	x	Number to be checked.
 * @return	{boolean}		Is the number power of two.
 */
function isPowerOfTwo( x ) {
	return ( x & ( x - 1 ) ) == 0;
}

/**
 * Given the number it returns the closest bigger number
 * that is the power of two.
 * @param	{number}	x	Number.
 * @return	{number}		Closest, bigger, power of two number.
 */
function nextHighestPowerOfTwo( x ) {
	--x;
	for( var i = 1; i < 32; i <<= 1 ) {
		x = x | x >> i;
	}
	return x + 1;
}

var INVISIBLE_ENTITIES = [
	"target_cdaudio",
	"trigger_auto",
	"trigger_autosave",
	"trigger_camera",
	"trigger_cdaudio",
	"trigger_changelevel",
	"trigger_changetarget",
	"trigger_counter",
	"trigger_endsection",
	"trigger_gravity",
	"trigger_hurt",
	"trigger_monsterjump",
	"trigger_multiple",
	"trigger_once",
	"trigger_push",
	"trigger_relay",
	"trigger_teleport",
	"trigger_transition",
	"func_bomb_target",
	"func_buyzone",
	"func_ladder"
];

/**
 * Searches for entity with given key-value pair.
 * There may be more than one entities with this key-value pair,
 * but this function returns only the first one.
 * Use findEntities function to get all entities.
 * @param	{string}		key		Entity attribute name.
 * @param	{*}				value	Entity attribute value.
 * @return	{Object|null}			Returns the found entity or null.
 */
Game.prototype.findEntity = function( key, value ) {
	var entities = this.entities;
	var entityCount = entities.length;
	
	if( value ) {
		for( var i = 0; i < entityCount; ++i ) {
			var entity = entities[i];
			if( entity[key] && entity[key] === value ) {
				return entity;
			}
		}
	}
	else {
		for( var i = 0; i < entityCount; ++i ) {
			var entity = entities[i];
			if( entity[key] ) {
				return entity;
			}
		}
	}
	
	return null;
}

/**
 * Searches for entities by key or key-value, depending whether
 * the second argument is passed.
 * @param	{String}	key		Entity attribute name.
 * @param	{*}			value	Entity attribute value.
 *								Do not pass the parameter to include all values.
 * @return	{Array}				Array with zero or more entities.
 */
Game.prototype.findEntities = function( key, value ) {
	var entities = this.entities;
	var entityCount = entities.length;
	var result = [ ];
	
	if( value ) {
		for( var i = 0; i < entityCount; ++i ) {
			var entity = entities[i];
			if( entity[key] === value ) {
				result.push( entity );
			}
		}
	}
	else {
		for( var i = 0; i < entityCount; ++i ) {
			var entity = entities[i];
			if( entity[key] ) {
				result.push( entity );
			}
		}
	}
	
	return result;
}

/**
 * Takes textures from QHLBSP object and puts them in Game.textures array.
 * @param	{QHLBSP}	Map object from which the textures are to be taken.
 */
Game.prototype.loadTextures = function( bsp ) {
	var textures = new Array( bsp.textures.count );
	for( var i = 0, textureCount = bsp.textures.count; i < textureCount; ++i ) {
		var texture = bsp.textures.miptex[i];
		
		// Stefan S.: WebGL supports only textures with power of two dimensions. Bellow, I resize the texture
		// to the power of two and save the ratio between original and new dimension.
		// Those ratios are later used when I'm doing UV mapping.
		if( !isPowerOfTwo( texture.width ) || !isPowerOfTwo( texture.height ) ) {
			var nw = nextHighestPowerOfTwo( texture.width );
			var nh = nextHighestPowerOfTwo( texture.height );
			texture.resizeRatio[0] = nw / texture.width;
			texture.resizeRatio[1] = nh / texture.height;
			texture.data = resizeTexture( texture.data, texture.width, texture.height, nw, nh );
			texture.width = nw;
			texture.height = nh;
		}
		
		textures[i] = new THREE.DataTexture( texture.data, texture.width, texture.height, THREE.RGBAFormat );
		textures[i].name = texture.name;
		textures[i].wrapS = THREE.RepeatWrapping;
		textures[i].wrapT = THREE.RepeatWrapping;
		textures[i].needsUpdate = true;
	}
	
	return textures;
}


Game.prototype.loadDemo = function( demo ) {
	this.demoFile = new File( Game.PATH_REPLAYS + demo + '.dem' );
	this.demoFile.addEventListener( 'load', this.onLoadDemo.bind( this ) );
	this.resourceManager.addResource( this.demoFile );
	this.resourceManager.addEventListener( 'loadAll', this.onLoadAll.bind( this ) );
}

Game.prototype.onLoadDemo = function( event ) {
	var file = event.data.file;
	this.demo = new Demo( file );
	
	this.loadMap( this.demo.header.mapName );
}

Game.prototype.loadMap = function( map ) {
	this.mapFile = new File( Game.PATH_MAPS + map + '.bsp' );
	this.mapFile.addEventListener( 'load', this.onLoadMap.bind( this ) );
	this.resourceManager.addResource( this.mapFile );
	//this.resourceManager.addEventListener( 'loadAll', this.onLoadAll.bind( this ) ); //?
}

Game.prototype.onLoadMap = function( event ) {
	var file = event.data.file;
	this.mapData = this.parseMap( file );
	
	if( this.mapData.textures.hasExternal && this.mapData.entities[0].wad !== undefined ) {
		var wad = this.mapData.entities[0].wad[0].split( '\\' ).pop( );
		this.loadWad( wad );
	}
}

Game.prototype.loadWad = function( wad ) {
	var file = new File( Game.PATH_WADS + wad );
	file.addEventListener( 'load', this.onLoadWad.bind( this ) );
	this.resourceManager.addResource( file );
	
	if( this.wadFiles === undefined ) {
		this.wadFiles = [ ];
	}
	this.wadFiles.push( file );
}

Game.prototype.onLoadWad = function( event ) {
	var file = event.data.file;
	this.extractTexturesFromWad( file );
	
	var textures = this.mapData.textures;
	for( var i = 0, textureCount = textures.count; i < textureCount; ++i ) {
		var miptex = textures.miptex[i];
		if( miptex.unavailable ) {
			var wad = this.mapData.entities[0].wad[this.wadFiles.length];
			if( wad !== undefined ) {
				wad = wad.split( '\\' ).pop( );
				this.loadWad( wad );
			}
			break;
		}
	}
}

Game.prototype.onLoadAll = function( event ) {
	this.setupScene( );
	this.replayController.load( this.demo );
	this.hud.replay.show( );
}

Game.prototype.setupScene = function( ) {
	var map = this.mapData;
	console.log(  );
	this.entities = map.entities;
	/*for( var i = 1, modelCount = map.models.length; i < modelCount; ++i ) { // skip 0 because it is the map
		var entity = this.findEntity( 'model', '*' + i );
		if( entity === null ) {
			continue;
		}
		
		entity['mins'] = map.models[i].mins;
		entity['maxs'] = map.models[i].maxs;
		if( entity['origin'] === undefined ) {
			entity["origin"] = [
				entity['mins'][0] + ( entity['maxs'][0] - entity['mins'][0] ) / 2,
				entity['mins'][1] + ( entity['maxs'][1] - entity['mins'][1] ) / 2,
				entity['mins'][2] + ( entity['maxs'][2] - entity['mins'][2] ) / 2
			];
		}
	}*/
	
	var textures = this.loadTextures( map );
	
	this.scene = new THREE.Scene( );
	this.scene.add( this.camera );
	
	var models = new Array( map.models.length );
	// TODO: Edit ugly code in this loop
	for( var i = 0, modelCount = map.models.length; i < modelCount; ++i ) {
		var model = map.models[i];
		var entity = i ? this.findEntity( "modelindex", i ) : this.entities[0];
		
		var geometry = new THREE.Geometry( );
		var materials = [ ];
		
		// TODO: Get a list of entities that are not visible (like trigger_multiple, info_player_start, ... )
		// and set their material's visibility to false.
		
		var temp = [0, 0, 0];
		var edgeIndex, v, vert0, vert1, vert2;
		for( var j = 0, faceCount = model.faceCount; j < faceCount; ++j ) {
			var face = map.faces[model.firstFace + j];
			var texinfo = map.texinfo[face.textureInfo];
			var texture = map.textures.miptex[texinfo.miptex];
			
			// Stefan S.: "aaatrigger" textures is used only in editors and should not be shown in game.
			// Stefan S.: Above statement is almost correct. It is not that aaatrigger is not shown in game,
			// it is that entities of certain type/classname are not visible ever in game, e.g. trigger_multiple.
			// Other entities may also be invisible, but thats determined by rendermode and other attributes.
			//if( texture.name === "aaatrigger" ) {
			//	console.log( entity["classname"] );
			//}
			
			var edges = [ ];
			for( var k = 0, edgeCount = face.edgeCount; k < edgeCount; ++k ) {
				edges.push( map.surfedges[face.firstEdge + k] );
			}
			
			var materialFound = -1;
			for( var k = 0, materialCount = materials.length; k < materialCount; ++k ) {
				if( materials[k].name === texture.name ) {
					materialFound = k;
					break;
				}
			}
			if( materialFound === -1 ) {
				var textureFound;
				for( var k = 0, textureCount = textures.length; k < textureCount; ++k ) {
					if( textures[k].name === texture.name ) {
						textureFound = k;
						break;
					}
				}
				materials.push( new THREE.MeshLambertMaterial( {
					name: texture.name,
					map: textures[textureFound]
				} ) );
				materialFound = materials.length - 1;
				if( texture.name[0] === "{" ) {
					materials[materialFound].transparent = true;
				}
				
				// Stefan S.: Sky textures are not actually textures,
				// but some kind of a portal to a scene that contains only a sky box.
				// TODO: This.
				//if( texture.name === "sky" ) {
				//	materials[materialFound].visible = false;
				//}
				
				// Stefan S.: This is awfull.
				if( entity ) {
					if( INVISIBLE_ENTITIES.indexOf( entity["classname"] ) > -1 ) {
						materials[materialFound].visible = false;
					}
					else if( entity["rendermode"] ) {
						// Stefan S.: I couldn't figure out transparency.
						// I think it has to do something with the render order.
						// Try for example kz_exn_ezjungle.bsp and look at the transparent stuff.
						switch( entity["rendermode"] ) {
						case 2:
							materials[materialFound].transparent = true;
							//materials[materialFound].depthWrite = false; // almost made it work
							if( entity["renderamt"] === undefined ) {
								materials[materialFound].opacity = 0;
								materials[materialFound].visible = false;
							}
							else {
								materials[materialFound].opacity = entity["renderamt"] / 255;
							}
							break;
						
						case 4:
							materials[materialFound].transparent = true;
							//materials[materialFound].depthWrite = false; // almost made it work
							break;
						
						case 5:
							materials[materialFound].blending = THREE.AdditiveBlending;
							materials[materialFound].transparent = true;
							//materials[materialFound].depthWrite = false; // almost made it work
							break;
						}
					}
				}
			}
			
			edgeIndex = edges[0];
			v = edgeIndex > 0 ? 0 : 1;
			temp[0] = map.edges[Math.abs(edgeIndex)][v];
			vert0 = map.vertices[temp[0]];
			geometry.vertices.push( new THREE.Vector3( vert0[0], vert0[1], vert0[2] ) );
			var uv0 = [
				( vert0[0] * texinfo.vS[0] ) + ( vert0[1] * texinfo.vS[1] ) + ( vert0[2] * texinfo.vS[2] ) + texinfo.fSShift,
				( vert0[0] * texinfo.vT[0] ) + ( vert0[1] * texinfo.vT[1] ) + ( vert0[2] * texinfo.vT[2] ) + texinfo.fTShift,
			];

			edgeIndex = edges[1];
			v = edgeIndex > 0 ? 0 : 1;
			temp[1] = map.edges[Math.abs(edgeIndex)][v];
			vert1 = map.vertices[temp[1]];
			geometry.vertices.push( new THREE.Vector3( vert1[0], vert1[1], vert1[2] ) );
			var uv1 = [
				( vert1[0] * texinfo.vS[0] ) + ( vert1[1] * texinfo.vS[1] ) + ( vert1[2] * texinfo.vS[2] ) + texinfo.fSShift,
				( vert1[0] * texinfo.vT[0] ) + ( vert1[1] * texinfo.vT[1] ) + ( vert1[2] * texinfo.vT[2] ) + texinfo.fTShift,
			];

			for( var k = 2; k < edges.length; k++ ) {
				edgeIndex = edges[k];
				v = edgeIndex > 0 ? 0 : 1;
				temp[2] = map.edges[Math.abs(edgeIndex)][v];
				vert2 = map.vertices[temp[2]];
				geometry.vertices.push( new THREE.Vector3( vert2[0], vert2[1], vert2[2] ) );
				var uv2 = [
					( vert2[0] * texinfo.vS[0] ) + ( vert2[1] * texinfo.vS[1] ) + ( vert2[2] * texinfo.vS[2] ) + texinfo.fSShift,
					( vert2[0] * texinfo.vT[0] ) + ( vert2[1] * texinfo.vT[1] ) + ( vert2[2] * texinfo.vT[2] ) + texinfo.fTShift,
				];
				
				// TODO: Replace "sky" texture with entity[0].sky texture
				
				// Stefan S.: Notice the order 0, 2, 1. There's something wrong with vertex winding.
				var omg = geometry.vertices.length;
				geometry.faces.push( new THREE.Face3( omg - k - 1, omg - 1, omg - 2 ) );
				geometry.faces[geometry.faces.length - 1].materialIndex = materialFound;
				var w = texture.width / texture.resizeRatio[0];
				var h = texture.height / texture.resizeRatio[1];
				geometry.faceVertexUvs[0].push( [
					new THREE.Vector2( uv0[0] / w, uv0[1] / h * -1 ),
					new THREE.Vector2( uv2[0] / w, uv2[1] / h * -1 ),
					new THREE.Vector2( uv1[0] / w, uv1[1] / h * -1 )
				] );

				temp[1] = temp[2];
				vert1 = vert2;
				uv1 = uv2;
			}
		}
		
		models[i] = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		if( entity.origin !== undefined ) {
			models[i].position.x = entity.origin[0];
			models[i].position.y = entity.origin[1];
			models[i].position.z = entity.origin[2];
		}
		this.scene.add( models[i] );
	}
	
	// TODO: Find out the default ambient light level.
	// Hint: Entity #0 (classname: "worldspawn") has light attribute.
	this.scene.add( new THREE.AmbientLight( 0xc8c8c8 ) );
	
	var player_start = this.findEntity( "classname", "info_player_start" )["origin"];
	this.camera.position.x = player_start[0];
	this.camera.position.y = player_start[1];
	this.camera.position.z = player_start[2];
}

Game.prototype.parseMap = function( file ) {
	var version = file.readUInt( );
	if( version !== 30 ) {
		console.error( "Unknown .bsp map file format version: %d", version );
		return;
	}
	
	const LUMP_ENTITIES		= 0;
	const LUMP_PLANES		= 1;
	const LUMP_TEXTURES		= 2;
	const LUMP_VERTICES		= 3;
	const LUMP_VISIBILITY	= 4;
	const LUMP_NODES		= 5;
	const LUMP_TEXINFO		= 6;
	const LUMP_FACES		= 7;
	const LUMP_LIGHTING		= 8;
	const LUMP_CLIPNODES	= 9;
	const LUMP_LEAVES		= 10;
	const LUMP_MARKSURFACES	= 11;
	const LUMP_EDGES		= 12;
	const LUMP_SURFEDGES	= 13;
	const LUMP_MODELS		= 14;
	
	var lumps = Array( 15 );
	for( var i = 0; i < 15; ++i ) {
		lumps[i] = {
			offset: file.readUInt( ),
			length: file.readUInt( )
		}
	}
	
	// ENTITIES
	file.seek( lumps[LUMP_ENTITIES].offset );
	var entities = this.parseEntities( file.readString( ) );
	
	// PLANES
	file.seek( lumps[LUMP_PLANES].offset );
	var planes = new Array( lumps[LUMP_PLANES].length / 20 );
	for( var i = 0, planeCount = planes.length; i < planeCount; ++i ) {
		planes[i] = {
			normal: [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ],
			dist: file.readFloat( ),
			type: file.readUInt( )
		};
	}
	
	// TEXTURES
	file.seek( lumps[LUMP_TEXTURES].offset );
	var textures = { };
	textures.hasExternal = false;
	textures.count = file.readUInt( );
	textures.offsets = new Array( textures.count );
	for( var i = 0, textureCount = textures.count; i < textureCount; ++i ) {
		textures.offsets[i] = file.readUInt( );
	}
	
	textures.miptex = new Array( textures.count );
	var colorTable = new Array( 256 );
	for( var i = 0, textureCount = textures.count; i < textureCount; ++i ) {
		if( textures.offsets[i] === -1 || textures.offsets[i] === 4294967295 ) {
			textures.miptex[i] = {
				name: "invalid",
				width: 1,
				height: 1,
				resizeRatio: [1, 1],
				offsets: [0, 0, 0, 0],
				data: new Uint8Array( [0, 0, 0, 0] )
			};
			
			continue;
		}
		
		file.seek( lumps[LUMP_TEXTURES].offset + textures.offsets[i] );
		textures.miptex[i] = {
			name: file.readString( 16 ),
			width: file.readUInt( ),
			height: file.readUInt( ),
			resizeRatio: [1, 1], // Stefan S.: This will be needed later.
			offsets: [file.readUInt( ), file.readUInt( ), file.readUInt( ), file.readUInt( )]
		};
		
		// Quaker: If offset is zero, it means the texture in stored in some .wad file.
		if( textures.miptex[i].offsets[0] === 0 ) {
			textures.hasExternal = true;
			//console.log( textures.miptex[i].name );
			// Quaker: Create black dummy texture.
			textures.miptex[i].unavailable = true;
			textures.miptex[i].width = 16;
			textures.miptex[i].height = 16;
			textures.miptex[i].data = new Uint8Array( 16 * 16 * 4 );
			
			for( var x = 0; x < 16; ++x ) {
				for( var y = 0; y < 16; ++y ) {
					if( x % 8 === 0 ) {
						textures.miptex[i].data[4 * (x * 16 + y)] = 255;
						textures.miptex[i].data[4 * (x * 16 + y) + 1] = 128;
						textures.miptex[i].data[4 * (x * 16 + y) + 2] = 0;
						textures.miptex[i].data[4 * (x * 16 + y) + 3] = 255;
						
						continue;
					}
					else if( y % 8 === 0 ) {
						textures.miptex[i].data[4 * (x * 16 + y)] = 255;
						textures.miptex[i].data[4 * (x * 16 + y) + 1] = 128;
						textures.miptex[i].data[4 * (x * 16 + y) + 2] = 0;
						textures.miptex[i].data[4 * (x * 16 + y) + 3] = 255;
						
						continue;
					}
					
					textures.miptex[i].data[4 * (x * 16 + y)] = 250;
					textures.miptex[i].data[4 * (x * 16 + y) + 1] = 250;
					textures.miptex[i].data[4 * (x * 16 + y) + 2] = 250;
					textures.miptex[i].data[4 * (x * 16 + y) + 3] = 255;
				}
			}
			
			continue;
		}
		
		// say whaaaaaaaa!?
		file.seek( lumps[LUMP_TEXTURES].offset + textures.offsets[i] + textures.miptex[i].offsets[3] + ( textures.miptex[i].width / 8 * textures.miptex[i].height / 8 ) + 2 );
		// Quaker: Read this texture's color table which is located after all 4 miptextures.
		for( var j = 0; j < 256; ++j ) {
			colorTable[j] = [file.readUByte( ), file.readUByte( ), file.readUByte( )];
		}
		
		// Quaker: Get only the original texture, because we don't need tiny textures. It's not 1998.
		file.seek( lumps[LUMP_TEXTURES].offset + textures.offsets[i] + textures.miptex[i].offsets[0] );
		textures.miptex[i].data = new Uint8Array( textures.miptex[i].width * textures.miptex[i].height * 4 );
		var colorIndex;
		for( var j = 0, pixelCount = textures.miptex[i].width * textures.miptex[i].height; j < pixelCount; ++j ) {
			colorIndex = file.readUByte( );
			
			if( colorTable[colorIndex] === undefined ) {
				console.error( colorIndex );
				console.error( textures.miptex[i].offsets[0] );
				console.error( file.offset );
				console.error( file.length );
			}
			
			// Quaker: Pure blue color (0,0,255) must be replaced with transparent pixels.
			if( colorTable[colorIndex][0] == 0 && 
				colorTable[colorIndex][1] == 0 &&
				colorTable[colorIndex][2] == 255 ) {
				textures.miptex[i].data[4 * j] = 0;
				textures.miptex[i].data[4 * j + 1] = 0;
				textures.miptex[i].data[4 * j + 2] = 0;
				textures.miptex[i].data[4 * j + 3] = 0;
			}
			else {
				textures.miptex[i].data[4 * j] = colorTable[colorIndex][0];
				textures.miptex[i].data[4 * j + 1] = colorTable[colorIndex][1];
				textures.miptex[i].data[4 * j + 2] = colorTable[colorIndex][2];
				textures.miptex[i].data[4 * j + 3] = 255;
			}
		}
	}
	
	// MODELS
	file.seek( lumps[LUMP_MODELS].offset );
	var models = Array( lumps[LUMP_MODELS].length / 64 );
	for( var i = 0, count = models.length; i < count; ++i ) {
		models[i] = {
			mins: [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ],
			maxs: [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ],
			origin: [ file.readFloat( ), file.readFloat( ), file.readFloat( ) ],
			headNodes: [ file.readInt( ), file.readInt( ), file.readInt( ), file.readInt( ) ],
			visLeaves: file.readInt( ),
			firstFace: file.readInt( ),
			faceCount: file.readInt( )
		};
	}
	
	// FACES
	file.seek( lumps[LUMP_FACES].offset );
	var faces = Array( lumps[LUMP_FACES].length / 20 );
	for( var i = 0, count = faces.length; i < count; ++i ) {
		faces[i] = {
			plane: file.readShort( ),
			planeSide: file.readShort( ),
			firstEdge: file.readInt( ),
			edgeCount: file.readShort( ),
			textureInfo: file.readShort( ),
			styles: [ file.readByte( ), file.readByte( ), file.readByte( ), file.readByte( ) ],
			lightmapOffset: file.readInt( )
		};
	}
	
	// EDGES
	file.seek( lumps[LUMP_EDGES].offset );
	var edges = Array( lumps[LUMP_EDGES].length / 4 );
	for( var i = 0, count = edges.length; i < count; ++i ) {
		edges[i] = [ file.readShort( ), file.readShort( ) ];
	}
	
	// SURFEDGES
	file.seek( lumps[LUMP_SURFEDGES].offset );
	var surfedges = Array( lumps[LUMP_SURFEDGES].length / 4 );
	for( var i = 0, count = surfedges.length; i < count; ++i ) {
		surfedges[i] = file.readInt( );
	}
	
	// VERTICES
	file.seek( lumps[LUMP_VERTICES].offset );
	var vertices = Array( lumps[LUMP_VERTICES].length / 12 );
	for( var i = 0, count = vertices.length; i < count; ++i ) {
		vertices[i] = [file.readFloat( ), file.readFloat( ), file.readFloat( )];
	}
	
	// TEXTURE INFO
	file.seek( lumps[LUMP_TEXINFO].offset );
	texinfo = new Array( lumps[LUMP_TEXINFO].length / 40 );
	for( var i = 0, textureCount = texinfo.length; i < textureCount; ++i ) {
		texinfo[i] = {
			vS: [file.readFloat( ), file.readFloat( ), file.readFloat( )],
			fSShift: file.readFloat( ),
			vT: [file.readFloat( ), file.readFloat( ), file.readFloat( )],
			fTShift: file.readFloat( ),
			miptex: file.readInt( ),
			flags: file.readInt( )
		};
	}
	
	return {
		entities: entities,
		planes: planes,
		textures: textures,
		texinfo: texinfo,
		models: models,
		faces: faces,
		edges: edges,
		surfedges: surfedges,
		vertices: vertices
	};
}

/**
 * Parses string which contains information about all initial entities on the map
 * and generates an array of entity objects. Objects contain key-value pairs of
 * attribute and of that attribute.
 * @param	{string}			string	String to be parsed.
 * @return	{Array.<Object>}	Array of entity objects
 */
Game.prototype.parseEntities = function( string ) {
	// Stefan S.: I have copied the code for entity properties parsing from another code, but it didn't work in some cases.
	// So, I modified it a little until it started working on all maps. I'm not proud of some of the things I did.
	
	var entities = [ ];
	var entries = string.match( /{[^}]+}/g );

	for( var i = 0; i < entries.length; i++ ) {
		var entry = entries[i];
		var entity = { };
		
		var p = entry.substring( 2, entry.length - 2 );
		var q = p.split( "\n" );
		
		for( var j = 0; j < q.length; j++ ) {
			// Stefan S.: Wtf!?
			var pivot = q[j].indexOf( " " );
			var key = q[j].substring( 1, pivot - 1 );
			var value = q[j].substring( pivot + 2, q[j].length - 1 );
			if( value.indexOf( "\"" ) > -1 ) {
				value = value.replace( "\"", "" );
			}
			
			// Stefan S.: Parse a little more. This will make things easier later.
			if( key === "wad" ) {
				value = value.split( ";" );
				value.pop( );
			}
			else if( key === "model" ) {
				if( value[0] === '*' ) {
					entity["modelindex"] = parseInt( value.substring( 1 ) );
				}
			}
			else if( value.indexOf( " " ) > -1 ) {
				value = value.split( " " );
				
				 // Stefan S.: Check array if all strings actually represent numbers. If yes convert string array to number array.
				var numericValues = 0;
				var length = value.length;
				for( var k = 0; k < length; ++k ) {
					if( isNumber( value[k] ) ) {
						++numericValues;
					}
				}
				if( numericValues == length ) {
					for( var k = 0, length = value.length; k < length; ++k ) {
						value[k] = parseFloat( value[k] );
					}
				}
			}
			else if( isNumber( value ) ) {
				value = parseFloat( value );
			}
			
			entity[key] = value;
		}

		entities.push( entity );
	}
	
	return entities;
}

/**
 * Main loop
 */
Game.prototype.loop = function( ) {
	requestAnimationFrame( this.loop.bind( this ) );
	
	if( this.replayController.started ) {
		if( !this.replayController.paused ) {
			var currentTime = (new Date( )).getTime( );
			var deltaTime = ( currentTime - this.replayController.startTime ) / 1000;
			
			var macro;
			while( this.demo.isTimeForNextMacro( deltaTime ) ) {
				macro = this.demo.getMacro( );
				
				if( macro.id === 3 && macro.command === '+use' ) {
					console.log( this.camera.position );
				}
			}
			
			switch( macro.id ) {
				case 0:
				case 1:
					this.camera.position.x = macro.camera.position[0];
					this.camera.position.y = macro.camera.position[1];
					this.camera.position.z = macro.camera.position[2];
					
					this.camera.rotation.y = ( 0.0174 * macro.camera.orientation[1] ) - 1.57;
					
					break;
					
				case 5:
					this.replayController.stop( );
					break;
			}
			
			this.hud.replay.update( );
		}
	}
	else {
		if( this.mouse.click ) {
			this.camera.rotation.y -= this.mouse.delta[0] / 100;
		}
		
		if( this.keyboard.key['W'.charCodeAt(0)] && this.keyboard.key['S'.charCodeAt(0)] ) {
		}
		else if( this.keyboard.key['W'.charCodeAt(0)] ) {
			this.camera.position.y += Math.cos( this.camera.rotation.y ) * 10;
			this.camera.position.x -= Math.sin( this.camera.rotation.y ) * 10;
		}
		else if( this.keyboard.key['S'.charCodeAt(0)] ) {
			this.camera.position.y -= Math.cos( this.camera.rotation.y ) * 10;
			this.camera.position.x += Math.sin( this.camera.rotation.y ) * 10;
			//this.camera.position.z += Math.cos( this.camera.rotation.x ) * 20;
		}
		
		if( this.keyboard.key['A'.charCodeAt(0)] && this.keyboard.key['D'.charCodeAt(0)] ) {
		}
		else if( this.keyboard.key['A'.charCodeAt(0)] ) {
			this.camera.position.y += Math.cos( this.camera.rotation.y + 1.57 ) * 10;
			this.camera.position.x -= Math.sin( this.camera.rotation.y + 1.57 ) * 10;
		}
		else if( this.keyboard.key['D'.charCodeAt(0)] ) {
			this.camera.position.y += Math.cos( this.camera.rotation.y - 1.57 ) * 10;
			this.camera.position.x -= Math.sin( this.camera.rotation.y - 1.57 ) * 10;
		}
		
		if( this.keyboard.key['R'.charCodeAt(0)] && this.keyboard.key['F'.charCodeAt(0)] ) {
		}
		else if( this.keyboard.key['R'.charCodeAt(0)] ) {
			this.camera.position.z += 10;
		}
		else if( this.keyboard.key['F'.charCodeAt(0)] ) {
			this.camera.position.z -= 10;
		}
		
		this.mouse.delta[0] = 0;
		this.mouse.delta[1] = 0;
	}

	if( this.scene !== undefined ) {
		this.renderer.render( this.scene, this.camera );
	}
}

Game.prototype.mousedown = function( e ) {
	e.preventDefault( );
	
	this.mouse.click = true;
}

Game.prototype.mouseup = function( e ) {
	e.preventDefault( );

	this.mouse.click = false;
}

Game.prototype.mousemove = function( e ) {
	e.preventDefault( );
	
	this.mouse.delta[0] = e.pageX - this.mouse.position[0];
	this.mouse.delta[1] = e.pageY - this.mouse.position[1];
	
	this.mouse.position[0] = e.pageX;
	this.mouse.position[1] = e.pageY;
}

Game.prototype.keydown = function( e ) {
	e.preventDefault( );
	
	this.keyboard.key[e.which] = true;
}

Game.prototype.keyup = function( e ) {
	e.preventDefault( );

	this.keyboard.key[e.which] = false;
}

/**
 * Initializes stuff
 */
Game.prototype.init = function( ) {
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 8128 );
	this.camera.rotation.x = 1.57;
	this.renderer = new THREE.WebGLRenderer( );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.clock = new THREE.Clock( );
	
	$( document ).mousedown( this.mousedown.bind( this ) );
	$( document ).mouseup( this.mouseup.bind( this ) );
	$( document ).mousemove( this.mousemove.bind( this ) );
	$( document ).keydown( this.keydown.bind( this ) );
	$( document ).keyup( this.keyup.bind( this ) );
	
	this.resourceManager = new ResourceManager( );
	
	this.replayController = new Demo.Controller( );
	
	this.hud = { };
	this.hud.replay = new UI.Replay( this.replayController );
	
	this.audio = new AudioSystem( );
	var f = new File( Game.PATH_SOUNDS + 'pl_step1.wav' );
	f.addEventListener( 'load', this.onLoadSound.bind( this ) );
}

Game.prototype.onLoadSound = function( event ) {
	this.audio.addSound( event.data.file );
}

AudioSystem = function( ) {
	if( typeof AudioContext !== "undefined" ) {
		this.context = new AudioContext( );
	} else if( typeof webkitAudioContext !== "undefined" ) {
		this.context = new webkitAudioContext( );
	} else {
		console.log( 'Audio not supported by the browser.' );
	}
	this.sounds = { };
}

AudioSystem.prototype.addSound = function( file ) {
	var path = file.path;
	var filename = path.split( '/' ).pop( );
	this.sounds[filename] = file;
}

AudioSystem.prototype.play = function( file ) {
	var source = this.context.createBufferSource( );
	source.buffer = this.context.createBuffer( file.data, true );
	source.connect( this.context.destination );
	source.start( 0 );
}

/*Game.prototype.loadMap = function( map ) {
	if( this.mapFile !== undefined && !this.mapFile.isOpen( ) ) {
		this.mapFile.cancel( );
	}
	if( this.demoFile !== undefined && !this.demoFile.isOpen( ) ) {
		this.demoFile.cancel( );
	}
	this.resourceManager.unloadAll( );
	this.demo = null;
	this.demoController.stop( );
	this.entities = null;
	this.scene = new THREE.Scene( );
	this.models.length = 0;
	this.textures.length = 0;

	this.mapFile = new File( 'maps/' + map + '.bsp' );
	this.mapFile.addEventListener( 'load', this.onLoadMap.bind( this ) );
	this.resourceManager.addResource( this.mapFile );
}

Game.prototype.loadDemo = function( demo ) {
	this.demoFile = new File( 'demos/' + demo + '.dem' );
	this.demoFile.addEventListener( 'load', this.onLoadDemo.bind( this ) );
	this.resourceManager.addResource( this.demoFile );

	this.resourceManager.addEventListener( 'loadAll', this.onLoadAll.bind( this ) );
}*/

function Game( ) {
	this.entities;
	this.textures = [ ];
	this.models = [ ];
	
	this.scene;
	this.camera;
	this.renderer;
	this.controls;
	this.clock;
	
	this.mouse = {
		click: false,
		leftClick: false,
		rightClick: false,
		position: [0, 0],
		delta: [0, 0]
	};
	
	this.keyboard = {
		key: Array( 256 )
	};
}

Game.PATH_IMAGES = 'res/images/';
Game.PATH_SOUNDS = 'res/sounds/';
Game.PATH_MAPS = 'res/maps/';
Game.PATH_WADS = 'res/wads/';
Game.PATH_REPLAYS = 'res/replays/';
Game.RESIZE_DELAY = 200;

/**
 * Entry point.
 */
$( function( ) {
	game = new Game( );
	game.init( );
	game.loop( );

	// I wrote the code on this page as fast as I could just to make it work.
	// I do not accept any responsibility for this shit.
	mapsAndDemos = {
		"bkm_tbt_londonstation": "bkm_tbt_londonstation_eclipzh_0017.57",
		"cg_gridblock": "cg_gridblock_LEWLY_0334.39",
		"clintmo_bhoptoon": "clintmo_bhoptoon_aLeee_0033.61",
		"clintmo_longjumper": "clintmo_longjumper_VNS_0058.82",
		"kz_bkz_egyptbhop": "kz_bkz_egyptbhop_eightbO_0215.09",
		"kz_cellblock": "kz_cellblock_LEWLY_0319.70",
		"kz_cellblock_hard": "kz_cellblock_hard_LEWLY_0324.06",
		"kz_cfl_jost_ez": "kz_cfl_jost_ez_ajuhhhhh_0626.67",
		"kz_cg_lavacliff": "kz_cg_lavacliff_Nukk_0229.04",
		"kz_ea_canals": "kz_ea_canals_LEWLY_0305.37",
		"kz_ea_harbor": "kz_ea_harbor_Toffifee_0240.29",
		"kz_ep_gigablock_b01": "kz_ep_gigablock_b01_kayne_0206.57",
		"kz_kzfr_kubz": "kz_kzfr_kubz_Toffifee_0350.03",
		"kz_kzfr_rabbithighway": "kz_kzfr_rabbithighway[-1337]_Flibo_0322.32",
		"kz_kzno_travel": "kz_kzno_travel_pizza^_0339.07",
		"kz_kzse_natureblock": "kz_kzse_natureblock[hard]_VertikO_0401.68",
		"kz_luonto": "kz_luonto_kayne_0325.93",
		"kz_m3_xmas_b00": "kz_m3_xmas_b00_ajuhhhhh_0105.52",
		"kz_man_nasa": "kz_man_nasa_pl1_0122.38",
		"kz_man_owtcity": "kz_man_owtcity_kayne_0316.37",
		"kz_man_temple": "kz_man_temple_kropeq_0540.53",
		"kz_shrubhop_ez": "kz_shrubhop_ez_toytoy_0059.27",
		"kz_spain": "kz_spain_Toffifee_0303.36",
		"kz_summercliff2": "kz_summercliff2_pizza^_0502.41",
		"kz_underblock_ez": "kz_underblock_ez_Toffifee_0817.73",
		"kz_xj_communityblock": "kz_xj_communityblock_Spider1_2441.44",
		"kz_xj_ezbrickjump": "kz_xj_ezbrickjump_VNS_0159.54",
		"kzfr_bhop_backalley": "kzfr_bhop_backalley_Beginner_0016.93",
		"kzfr_bhop_leetyard": "kzfr_bhop_leetyard_Beginner_0020.82",
		"kzm_fineblock": "kzm_fineblock_DeathClaw_0236.75",
		"kzlt_village": "kzlt_village_VNS_0155.21",
		"kzra_crystal_palace": "kzra_crystal_palace_kropeq_0354.48",
		"nobkz_mst_honduras": "nobkz_mst_honduras_HitMan_1306.70",
		"ph_k_after": "ph_k_after_eclipzh_0319.96",
		"prochallenge_bhop": "prochallenge_bhop_kayne_0144.64",
		"risk_treasure_island": "risk_treasure_island_DeathClaw_0224.89",
		"zr_hetablock": "zr_hetablock[hard]_3B_0119.61"
	};

	$( function( ) {
		var maps = Object.keys( mapsAndDemos );
		var accum = "";
		for( var i = 0, size = maps.length; i < size; ++i ) {
			accum += '<li><a href="#' + maps[i] + '">' + mapsAndDemos[maps[i]] + '</a></li>';
		}
		$( 'ul#demo_list' ).append( accum );
	} );

	resizeTimeout = 0;
	$( window ).on( 'resize', function( event ) {
		if( game === undefined ) {
			return;
		}
		
		if( resizeTimeout !== 0 ) {
			clearTimeout( resizeTimeout );
		}
		
		resizeTimeout = setTimeout( function( ) {
			game.renderer.setSize( window.innerWidth, window.innerHeight );
			game.camera.aspect = window.innerWidth / window.innerHeight;
			game.camera.updateProjectionMatrix( );
		}, Game.RESIZE_DELAY );
	} );

	$( window ).on( 'hashchange', function( event ) {
		if( location.hash.length === 0 ) {
			return;
		}
		
		var map = location.hash.slice( 1 );
		if( mapsAndDemos[map] === undefined ) {
			return;
		}
		
		game.loadDemo( mapsAndDemos[map] );
	} );
	$( window ).trigger( 'hashchange' );
} );

UI = { };
UI.FADE_DELAY = 300;
UI.Replay = function( replayController ) {
	this.controller = replayController;
	this._srcStart = Game.PATH_IMAGES + 'start.png';
	this._srcPause = Game.PATH_IMAGES + 'pause.png';
	this._srcStop = Game.PATH_IMAGES + 'stop.png';
	
	const height = '30px';
	
	this.container = document.createElement( 'div' );
	this.container.style.position = 'absolute';
	this.container.style.display = 'none';
	this.container.style.left = '0px';
	this.container.style.right = '0px';
	this.container.style.bottom = '0px';
	this.container.style.background = 'rgba(255, 255, 255, 0.8)';
	this.container.style.borderRadius = '2px';
	this.container.style.padding = '10px 4px 4px 4px';
	this.container.style.height = height;
	
	this.playButton = document.createElement( 'img' );
	this.playButton.src = this._srcStart;
	this.playButton.style.width = height;
	$( this.playButton ).on( 'click', this._onClickPlay.bind( this ) );
	
	this.stopButton = document.createElement( 'img' );
	this.stopButton.src = this._srcStop;
	this.stopButton.style.width = height;
	$( this.stopButton ).on( 'click', this._onClickStop.bind( this ) );
	
	this.progressBar = document.createElement( 'div' );
	this.progressBar.style.position = 'absolute';
	this.progressBar.style.top = '0px';
	this.progressBar.style.left = '0px';
	this.progressBar.style.display = 'block';
	this.progressBar.style.width = '100%';
	this.progressBar.style.height = '6px';
	
	this.progressBarLine = document.createElement( 'p' );
	this.progressBarLine.style.position = 'absolute';
	this.progressBarLine.style.left = '0px';
	this.progressBarLine.style.top = '0px';
	this.progressBarLine.style.background = 'rgba(64, 64, 64, 0.7)';
	this.progressBarLine.style.height = '100%';
	this.progressBarLine.style.width = '0%';
	this.progressBarLine.style.fontSize = '0px';
	this.progressBarLine.innerHTML = '&nbsp';
	
	this.container.appendChild( this.playButton );
	this.container.appendChild( this.stopButton );
	this.progressBar.appendChild( this.progressBarLine );
	this.container.appendChild( this.progressBar );
	document.body.appendChild( this.container );
	
	$( this.progressBar ).on( 'click', this._onClickProgressBar.bind( this ) );
	
	$( this.container ).hover(
		function( ) {
			 $( this ).stop( ).animate( {'opacity': 1} );
		},
		function( ) {
			 $( this ).stop( ).animate( {'opacity': 0} );
		}
	);
}
UI.Replay.prototype.toggle = function( ) {
	$( this.container ).fadeToggle( UI.FADE_DELAY );
}
UI.Replay.prototype._onClickPlay = function( event ) {
	this.controller.play( );
	this.playButton.src = this.controller.paused ? this._srcStart : this._srcPause;
}
UI.Replay.prototype._onClickStop = function( event ) {
	this.controller.stop( );
	this.playButton.src = this._srcStart;
}
UI.Replay.prototype._onClickProgressBar = function( event ) {
	var x = event.pageX - $( this.progressBar ).offset( ).left;
	var percent = x / $( this.progressBar ).width( );
	this.controller.seekPercent( percent );
}
UI.Replay.prototype.show = function( ) {
	$( this.container ).fadeIn( UI.FADE_DELAY );
}
UI.Replay.prototype.hide = function( ) {
	$( this.container ).fadeOut( UI.FADE_DELAY );
}
UI.Replay.prototype.update = function( ) {
	if( this.controller.started ) {
		if( this.controller.paused ) {
			this.playButton.src = this._srcStart;
		}
		else {
			this.playButton.src = this._srcPause;
		}
	}
	else {
		this.playButton.src = this._srcStart;
	}
	
	var progress = 0;
	if( this.controller.paused ) {
		progress = ( ( this.controller.pauseTime - this.controller.startTime ) / 1000 ) / this.controller.length * 100;
		
	}
	else {
		progress = ( ( (new Date( )).getTime( ) - this.controller.startTime ) / 1000 ) / this.controller.length * 100;
	}
	this.progressBarLine.style.width = progress + '%';
}