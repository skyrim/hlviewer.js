var $ = require('jquery');
var THREE = require('three');

var Wad = require('./wad.js');
var File = require('./file.js');
var ResourceManager = require('./resource_manager.js');
var Demo = require('./demo.js');
var AudioSystem = require('./audio-system.js');
var Common = require('./common.js');

function Game() {
    this.entities = null;
    this.textures = [];
    this.models = [];

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.mouse = {
        click: false,
        leftClick: false,
        rightClick: false,
        position: [0, 0],
        delta: [0, 0]
    };

    this.keyboard = {
        key: new Array(256)
    };
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

Game.prototype.findEntity = function (key, value) {
    var i, entity,
        entities = this.entities,
        entityCount = entities.length;

    if (value) {
        for (i = 0; i < entityCount; ++i) {
            entity = entities[i];
            if (entity[key] && entity[key] === value) {
                return entity;
            }
        }
    } else {
        for (i = 0; i < entityCount; ++i) {
            entity = entities[i];
            if (entity[key]) {
                return entity;
            }
        }
    }

    return null;
};

Game.prototype.findEntities = function (key, value) {
    var i, entity,
        entities = this.entities,
        entityCount = entities.length,
        result = [];

    if (value) {
        for (i = 0; i < entityCount; ++i) {
            entity = entities[i];
            if (entity[key] === value) {
                result.push(entity);
            }
        }
    } else {
        for (i = 0; i < entityCount; ++i) {
            entity = entities[i];
            if (entity[key]) {
                result.push(entity);
            }
        }
    }

    return result;
};

Game.prototype.loadTextures = function (bsp) {
    var textures = new Array(bsp.textures.count);
    for (var i = 0, textureCount = bsp.textures.count; i < textureCount; ++i) {
        var texture = bsp.textures.miptex[i];

        if (!Common.isPowerOfTwo(texture.width) || !Common.isPowerOfTwo(texture.height)) {
            var nw = Common.nextHighestPowerOfTwo(texture.width);
            var nh = Common.nextHighestPowerOfTwo(texture.height);
            texture.resizeRatio[0] = nw / texture.width;
            texture.resizeRatio[1] = nh / texture.height;
            texture.data = Common.resizeTexture(texture.data, texture.width, texture.height, nw, nh);
            texture.width = nw;
            texture.height = nh;
        }

        textures[i] = new THREE.DataTexture(texture.data, texture.width, texture.height, THREE.RGBAFormat);
        textures[i].name = texture.name;
        textures[i].wrapS = THREE.RepeatWrapping;
        textures[i].wrapT = THREE.RepeatWrapping;
        textures[i].repeat.y = -1;
        textures[i].magFilter = THREE.LinearFilter;
        textures[i].minFilter = THREE.LinearFilter;
        textures[i].needsUpdate = true;
    }

    return textures;
};

Game.prototype.loadDemo = function (demo) {
    this.demoFile = new File(Game.PATH_REPLAYS + demo + '.dem');
    this.demoFile.addEventListener('load', this.onLoadDemo.bind(this));
    this.resourceManager.addResource(this.demoFile);
    this.resourceManager.addEventListener('loadAll', this.onLoadAll.bind(this));
};

Game.prototype.onLoadDemo = function (event) {
    var file = event.data.file;
    this.demo = new Demo(file);

    this.loadMap(this.demo.header.mapName);
};

Game.prototype.loadMap = function (map) {
    this.mapFile = new File(Game.PATH_MAPS + map + '.bsp');
    this.mapFile.addEventListener('load', this.onLoadMap.bind(this));
    this.resourceManager.addResource(this.mapFile);
};

Game.prototype.onLoadMap = function (event) {
    var file = event.data.file;
    this.mapData = this.parseMap(file);

    if (this.mapData.textures.hasExternal && this.mapData.entities[0].wad !== undefined) {
        var wad = this.mapData.entities[0].wad[0].split('\\').pop();
        this.loadWad(wad);
    }
};

Game.prototype.loadWad = function (wad) {
    var file = new File(Game.PATH_WADS + wad);
    file.addEventListener('load', this.onLoadWad.bind(this));
    this.resourceManager.addResource(file);

    if (this.wadFiles === undefined) {
        this.wadFiles = [];
    }
    this.wadFiles.push(file);
};

Game.prototype.onLoadWad = function (event) {
    var i, file = event.data.file;

    var entries = Wad.getFileList(file);
    for (i = 0; i < entries.length; ++i) {
        if (entries[i].type !== 0x43) {
            continue;
        }

        for (var j = 0; j < this.mapData.textures.count; ++j) {
            if (this.mapData.textures.miptex[j].name.toLowerCase() === entries[i].name.toLowerCase()) {
                var texture = Wad.getTexture(file, entries[i].offset);
                this.mapData.textures.miptex[j].width = texture.width;
                this.mapData.textures.miptex[j].height = texture.height;
                this.mapData.textures.miptex[j].data = texture.data[0];
                this.mapData.textures.miptex[j].unavailable = false;
            }
        }
    }

    for (i = 0; i < this.mapData.textures.count; ++i) {
        if (!this.mapData.textures.miptex[i].unavailable) {
            continue;
        }

        var wad = this.mapData.entities[0].wad[this.wadFiles.length];
        if (wad !== undefined) {
            wad = wad.split('\\').pop();
            this.loadWad(wad);
        }
        break;
    }
};

Game.prototype.onLoadAll = function () {
    this.setupScene();
    this.replayController.load(this.demo);
    this.hud.replay.show();
};

Game.prototype.setupScene = function () {
    var i, j, k, modelCount, faceCount, edgeCount, materialCount, textureCount;
    var map = this.mapData;
    this.entities = map.entities;

    var textures = this.loadTextures(map);

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);

    var models = new Array(map.models.length);
    
    for (i = 0, modelCount = map.models.length; i < modelCount; ++i) {
        var model = map.models[i];
        var entity = i ? this.findEntity("modelindex", i) : this.entities[0];

        var geometry = new THREE.Geometry();
        var materials = [];

        var temp = [0, 0, 0];
        var edgeIndex, v, vert0, vert1, vert2;
        for (j = 0, faceCount = model.faceCount; j < faceCount; ++j) {
            var face = map.faces[model.firstFace + j];
            var texinfo = map.texinfo[face.textureInfo];
            var texture = map.textures.miptex[texinfo.miptex];

            var edges = [];
            for (k = 0, edgeCount = face.edgeCount; k < edgeCount; ++k) {
                edges.push(map.surfedges[face.firstEdge + k]);
            }

            var materialFound = -1;
            for (k = 0, materialCount = materials.length; k < materialCount; ++k) {
                if (materials[k].name === texture.name) {
                    materialFound = k;
                    break;
                }
            }
            if (materialFound === -1) {
                var textureFound;
                for (k = 0, textureCount = textures.length; k < textureCount; ++k) {
                    if (textures[k].name === texture.name) {
                        textureFound = k;
                        break;
                    }
                }
                materials.push(new THREE.MeshLambertMaterial({
                    name: texture.name,
                    map: textures[textureFound]
                }));
                materialFound = materials.length - 1;
                if (texture.name[0] === "{") {
                    materials[materialFound].transparent = true;
                }

                if (entity) {
                    if (INVISIBLE_ENTITIES.indexOf(entity["classname"]) > -1) {
                        materials[materialFound].visible = false;
                    }
                    else if (entity["rendermode"]) {
                        switch (entity["rendermode"]) {
                            case 2:
                                materials[materialFound].transparent = true;
                                if (entity["renderamt"] === undefined) {
                                    materials[materialFound].opacity = 0;
                                    materials[materialFound].visible = false;
                                }
                                else {
                                    materials[materialFound].opacity = entity["renderamt"] / 255;
                                }
                                break;

                            case 4:
                                materials[materialFound].transparent = true;
                                break;

                            case 5:
                                materials[materialFound].blending = THREE.AdditiveBlending;
                                materials[materialFound].transparent = true;
                                break;
                        }
                    }
                }
            }

            edgeIndex = edges[0];
            v = edgeIndex > 0 ? 0 : 1;
            temp[0] = map.edges[Math.abs(edgeIndex)][v];
            vert0 = map.vertices[temp[0]];
            geometry.vertices.push(new THREE.Vector3(vert0[0], vert0[1], vert0[2]));
            var uv0 = [
                ( vert0[0] * texinfo.vS[0] ) + ( vert0[1] * texinfo.vS[1] ) + ( vert0[2] * texinfo.vS[2] ) + texinfo.fSShift,
                ( vert0[0] * texinfo.vT[0] ) + ( vert0[1] * texinfo.vT[1] ) + ( vert0[2] * texinfo.vT[2] ) + texinfo.fTShift
            ];

            edgeIndex = edges[1];
            v = edgeIndex > 0 ? 0 : 1;
            temp[1] = map.edges[Math.abs(edgeIndex)][v];
            vert1 = map.vertices[temp[1]];
            geometry.vertices.push(new THREE.Vector3(vert1[0], vert1[1], vert1[2]));
            var uv1 = [
                ( vert1[0] * texinfo.vS[0] ) + ( vert1[1] * texinfo.vS[1] ) + ( vert1[2] * texinfo.vS[2] ) + texinfo.fSShift,
                ( vert1[0] * texinfo.vT[0] ) + ( vert1[1] * texinfo.vT[1] ) + ( vert1[2] * texinfo.vT[2] ) + texinfo.fTShift
            ];

            for (k = 2; k < edges.length; k++) {
                edgeIndex = edges[k];
                v = edgeIndex > 0 ? 0 : 1;
                temp[2] = map.edges[Math.abs(edgeIndex)][v];
                vert2 = map.vertices[temp[2]];
                geometry.vertices.push(new THREE.Vector3(vert2[0], vert2[1], vert2[2]));
                var uv2 = [
                    ( vert2[0] * texinfo.vS[0] ) + ( vert2[1] * texinfo.vS[1] ) + ( vert2[2] * texinfo.vS[2] ) + texinfo.fSShift,
                    ( vert2[0] * texinfo.vT[0] ) + ( vert2[1] * texinfo.vT[1] ) + ( vert2[2] * texinfo.vT[2] ) + texinfo.fTShift
                ];

                // Stefan S.: Notice the order 0, 2, 1. There's something wrong with vertex winding.
                var omg = geometry.vertices.length;
                geometry.faces.push(new THREE.Face3(omg - k - 1, omg - 1, omg - 2));
                geometry.faces[geometry.faces.length - 1].materialIndex = materialFound;
                var w = texture.width / texture.resizeRatio[0];
                var h = texture.height / texture.resizeRatio[1];
                geometry.faceVertexUvs[0].push([
                    new THREE.Vector2(uv0[0] / w, uv0[1] / h * -1),
                    new THREE.Vector2(uv2[0] / w, uv2[1] / h * -1),
                    new THREE.Vector2(uv1[0] / w, uv1[1] / h * -1)
                ]);

                temp[1] = temp[2];
                vert1 = vert2;
                uv1 = uv2;
            }
        }

        models[i] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        if (entity.origin !== undefined) {
            models[i].position.x = entity.origin[0];
            models[i].position.y = entity.origin[1];
            models[i].position.z = entity.origin[2];
        }
        this.scene.add(models[i]);
    }

    // TODO: Find out the default ambient light level.
    // Hint: Entity #0 (classname: "worldspawn") has light attribute.
    this.scene.add(new THREE.AmbientLight(0xc8c8c8));

    var player_start = this.findEntity("classname", "info_player_start")["origin"];
    this.camera.position.x = player_start[0];
    this.camera.position.y = player_start[1];
    this.camera.position.z = player_start[2];
};

Game.prototype.parseMap = function (file) {
    var i, j, count, planeCount, textureCount, pixelCount, texinfo,
        version = file.readUInt();
    if (version !== 30) {
        console.error("Unknown .bsp map file format version: %d", version);
        return;
    }

    const LUMP_ENTITIES = 0;
    const LUMP_PLANES = 1;
    const LUMP_TEXTURES = 2;
    const LUMP_VERTICES = 3;
    //const LUMP_VISIBILITY = 4;
    //const LUMP_NODES = 5;
    const LUMP_TEXINFO = 6;
    const LUMP_FACES = 7;
    //const LUMP_LIGHTING = 8;
    //const LUMP_CLIPNODES = 9;
    //const LUMP_LEAVES = 10;
    //const LUMP_MARKSURFACES = 11;
    const LUMP_EDGES = 12;
    const LUMP_SURFEDGES = 13;
    const LUMP_MODELS = 14;

    var lumps = new Array(15);
    for (i = 0; i < 15; ++i) {
        lumps[i] = {
            offset: file.readUInt(),
            length: file.readUInt()
        }
    }

    // ENTITIES
    file.seek(lumps[LUMP_ENTITIES].offset);
    var entities = this.parseEntities(file.readString());

    // PLANES
    file.seek(lumps[LUMP_PLANES].offset);
    var planes = new Array(lumps[LUMP_PLANES].length / 20);
    for (i = 0, planeCount = planes.length; i < planeCount; ++i) {
        planes[i] = {
            normal: [file.readFloat(), file.readFloat(), file.readFloat()],
            dist: file.readFloat(),
            type: file.readUInt()
        };
    }

    // TEXTURES
    file.seek(lumps[LUMP_TEXTURES].offset);
    var textures = {};
    textures.hasExternal = false;
    textures.count = file.readUInt();
    textures.offsets = new Array(textures.count);
    for (i = 0, textureCount = textures.count; i < textureCount; ++i) {
        textures.offsets[i] = file.readUInt();
    }

    textures.miptex = new Array(textures.count);
    var colorTable = new Array(256);
    for (i = 0, textureCount = textures.count; i < textureCount; ++i) {
        if (textures.offsets[i] === -1 || textures.offsets[i] === 4294967295) {
            textures.miptex[i] = {
                name: "invalid",
                width: 1,
                height: 1,
                resizeRatio: [1, 1],
                offsets: [0, 0, 0, 0],
                data: new Uint8Array([0, 0, 0, 0])
            };

            continue;
        }

        file.seek(lumps[LUMP_TEXTURES].offset + textures.offsets[i]);
        textures.miptex[i] = {
            name: file.readString(16),
            width: file.readUInt(),
            height: file.readUInt(),
            resizeRatio: [1, 1],
            offsets: [file.readUInt(), file.readUInt(), file.readUInt(), file.readUInt()]
        };

        if (textures.miptex[i].offsets[0] === 0) {
            textures.hasExternal = true;
            textures.miptex[i].unavailable = true;
            textures.miptex[i].width = 16;
            textures.miptex[i].height = 16;
            textures.miptex[i].data = new Uint8Array(16 * 16 * 4);

            for (var x = 0; x < 16; ++x) {
                for (var y = 0; y < 16; ++y) {
                    if (x % 8 === 0) {
                        textures.miptex[i].data[4 * (x * 16 + y)] = 255;
                        textures.miptex[i].data[4 * (x * 16 + y) + 1] = 128;
                        textures.miptex[i].data[4 * (x * 16 + y) + 2] = 0;
                        textures.miptex[i].data[4 * (x * 16 + y) + 3] = 255;

                        continue;
                    }
                    else if (y % 8 === 0) {
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

        file.seek(lumps[LUMP_TEXTURES].offset + textures.offsets[i] + textures.miptex[i].offsets[3] + ( textures.miptex[i].width / 8 * textures.miptex[i].height / 8 ) + 2);
        for (j = 0; j < 256; ++j) {
            colorTable[j] = [file.readUByte(), file.readUByte(), file.readUByte()];
        }

        file.seek(lumps[LUMP_TEXTURES].offset + textures.offsets[i] + textures.miptex[i].offsets[0]);
        textures.miptex[i].data = new Uint8Array(textures.miptex[i].width * textures.miptex[i].height * 4);
        var colorIndex;
        for (j = 0, pixelCount = textures.miptex[i].width * textures.miptex[i].height; j < pixelCount; ++j) {
            colorIndex = file.readUByte();

            if (colorTable[colorIndex] === undefined) {
                console.error(colorIndex);
                console.error(textures.miptex[i].offsets[0]);
                console.error(file.offset);
                console.error(file.length);
            }

            if (colorTable[colorIndex][0] == 0 &&
                colorTable[colorIndex][1] == 0 &&
                colorTable[colorIndex][2] == 255) {
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
    file.seek(lumps[LUMP_MODELS].offset);
    var models = new Array(lumps[LUMP_MODELS].length / 64);
    for (i = 0, count = models.length; i < count; ++i) {
        models[i] = {
            mins: [file.readFloat(), file.readFloat(), file.readFloat()],
            maxs: [file.readFloat(), file.readFloat(), file.readFloat()],
            origin: [file.readFloat(), file.readFloat(), file.readFloat()],
            headNodes: [file.readInt(), file.readInt(), file.readInt(), file.readInt()],
            visLeaves: file.readInt(),
            firstFace: file.readInt(),
            faceCount: file.readInt()
        };
    }

    // FACES
    file.seek(lumps[LUMP_FACES].offset);
    var faces = new Array(lumps[LUMP_FACES].length / 20);
    for (i = 0, count = faces.length; i < count; ++i) {
        faces[i] = {
            plane: file.readShort(),
            planeSide: file.readShort(),
            firstEdge: file.readInt(),
            edgeCount: file.readShort(),
            textureInfo: file.readShort(),
            styles: [file.readByte(), file.readByte(), file.readByte(), file.readByte()],
            lightmapOffset: file.readInt()
        };
    }

    // EDGES
    file.seek(lumps[LUMP_EDGES].offset);
    var edges = new Array(lumps[LUMP_EDGES].length / 4);
    for (i = 0, count = edges.length; i < count; ++i) {
        edges[i] = [file.readShort(), file.readShort()];
    }

    // SURFEDGES
    file.seek(lumps[LUMP_SURFEDGES].offset);
    var surfedges = new Array(lumps[LUMP_SURFEDGES].length / 4);
    for (i = 0, count = surfedges.length; i < count; ++i) {
        surfedges[i] = file.readInt();
    }

    // VERTICES
    file.seek(lumps[LUMP_VERTICES].offset);
    var vertices = new Array(lumps[LUMP_VERTICES].length / 12);
    for (i = 0, count = vertices.length; i < count; ++i) {
        vertices[i] = [file.readFloat(), file.readFloat(), file.readFloat()];
    }

    // TEXTURE INFO
    file.seek(lumps[LUMP_TEXINFO].offset);
    texinfo = new Array(lumps[LUMP_TEXINFO].length / 40);
    for (i = 0, textureCount = texinfo.length; i < textureCount; ++i) {
        texinfo[i] = {
            vS: [file.readFloat(), file.readFloat(), file.readFloat()],
            fSShift: file.readFloat(),
            vT: [file.readFloat(), file.readFloat(), file.readFloat()],
            fTShift: file.readFloat(),
            miptex: file.readInt(),
            flags: file.readInt()
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
};

Game.prototype.parseEntities = function (string) {
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var i, j, k, length,
        entities = [],
        entries = string.match(/{[^}]+}/g);

    for (i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var entity = {};

        var p = entry.substring(2, entry.length - 2);
        var q = p.split("\n");

        for (j = 0; j < q.length; j++) {
            var pivot = q[j].indexOf(" ");
            var key = q[j].substring(1, pivot - 1);
            var value = q[j].substring(pivot + 2, q[j].length - 1);
            if (value.indexOf("\"") > -1) {
                value = value.replace("\"", "");
            }

            if (key === "wad") {
                value = value.split(";");
                value.pop();
            }
            else if (key === "model") {
                if (value[0] === '*') {
                    entity["modelindex"] = parseInt(value.substring(1));
                }
            }
            else if (value.indexOf(" ") > -1) {
                value = value.split(" ");

                var numericValues = 0;
                length = value.length;
                for (k = 0; k < length; ++k) {
                    if (isNumber(value[k])) {
                        ++numericValues;
                    }
                }
                if (numericValues == length) {
                    for (k = 0, length = value.length; k < length; ++k) {
                        value[k] = parseFloat(value[k]);
                    }
                }
            }
            else if (isNumber(value)) {
                value = parseFloat(value);
            }

            entity[key] = value;
        }

        entities.push(entity);
    }

    return entities;
};

/**
 * Main loop
 */
Game.prototype.loop = function () {
    requestAnimationFrame(this.loop.bind(this));

    if (this.replayController.started) {
        if (!this.replayController.paused) {
            var currentTime = (new Date()).getTime();
            var deltaTime = ( currentTime - this.replayController.startTime ) / 1000;

            var macro;
            while (this.demo.isTimeForNextMacro(deltaTime)) {
                macro = this.demo.getMacro();
            }

            if (macro) {
                switch (macro.id) {
                    case 0:
                    case 1:
                        this.camera.position.x = macro.camera.position[0];
                        this.camera.position.y = macro.camera.position[1];
                        this.camera.position.z = macro.camera.position[2];

                        this.camera.rotation.x = (90 - macro.camera.orientation[0]) * 0.0174;
                        this.camera.rotation.z = (0.0174 * macro.camera.orientation[1]) - 1.57;

                        break;

                    case 5:
                        this.replayController.stop();
                        break;
                }
            }

            this.hud.replay.update();
        }
    }
    else {
        if (this.mouse.click) {
            var mX = this.mouse.delta[1] / 100;
            var mY = this.mouse.delta[0] / 100;

            var x = this.camera.rotation.x - mX;
            x = Math.max(0.05, Math.min(3.09, x));
            var y = this.camera.rotation.z - mY;

            this.camera.rotation.x = x;
            this.camera.rotation.z = y;
        }

        if (this.keyboard.key['W'.charCodeAt(0)] && this.keyboard.key['S'.charCodeAt(0)]) {
        }
        else if (this.keyboard.key['W'.charCodeAt(0)]) {
            this.camera.position.y += Math.cos(this.camera.rotation.z) * 10;
            this.camera.position.x -= Math.sin(this.camera.rotation.z) * 10;
        }
        else if (this.keyboard.key['S'.charCodeAt(0)]) {
            this.camera.position.y -= Math.cos(this.camera.rotation.z) * 10;
            this.camera.position.x += Math.sin(this.camera.rotation.z) * 10;
        }

        if (this.keyboard.key['A'.charCodeAt(0)] && this.keyboard.key['D'.charCodeAt(0)]) {
        }
        else if (this.keyboard.key['A'.charCodeAt(0)]) {
            this.camera.position.y += Math.cos(this.camera.rotation.z + 1.57) * 10;
            this.camera.position.x -= Math.sin(this.camera.rotation.z + 1.57) * 10;
        }
        else if (this.keyboard.key['D'.charCodeAt(0)]) {
            this.camera.position.y += Math.cos(this.camera.rotation.z - 1.57) * 10;
            this.camera.position.x -= Math.sin(this.camera.rotation.z - 1.57) * 10;
        }

        if (this.keyboard.key['R'.charCodeAt(0)] && this.keyboard.key['F'.charCodeAt(0)]) {
        }
        else if (this.keyboard.key['R'.charCodeAt(0)]) {
            this.camera.position.z += 10;
        }
        else if (this.keyboard.key['F'.charCodeAt(0)]) {
            this.camera.position.z -= 10;
        }

        this.mouse.delta[0] = 0;
        this.mouse.delta[1] = 0;
    }

    if (this.scene) {
        this.renderer.render(this.scene, this.camera);
    }
};

Game.prototype.mousedown = function (e) {
    e.preventDefault();

    this.mouse.click = true;
};

Game.prototype.mouseup = function (e) {
    e.preventDefault();

    this.mouse.click = false;
};

Game.prototype.mousemove = function (e) {
    e.preventDefault();

    this.mouse.delta[0] = e.pageX - this.mouse.position[0];
    this.mouse.delta[1] = e.pageY - this.mouse.position[1];

    this.mouse.position[0] = e.pageX;
    this.mouse.position[1] = e.pageY;
};

Game.prototype.keydown = function (e) {
    e.preventDefault();

    this.keyboard.key[e.which] = true;
};

Game.prototype.keyup = function (e) {
    e.preventDefault();

    this.keyboard.key[e.which] = false;
};

/**
 * Initializes stuff
 */
Game.prototype.init = function () {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 8128);
    this.camera.rotation.x = 1.57;
    this.camera.rotation.order = "ZXY";

    var canvas = $('#screen')[0];

    this.renderer = new THREE.WebGLRenderer({canvas: canvas});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    $(document).mousedown(this.mousedown.bind(this));
    $(document).mouseup(this.mouseup.bind(this));
    $(document).mousemove(this.mousemove.bind(this));
    $(document).keydown(this.keydown.bind(this));
    $(document).keyup(this.keyup.bind(this));

    this.resourceManager = new ResourceManager();

    this.replayController = new Demo.Controller();

    this.hud = {};

    this.audio = new AudioSystem();
    var f = new File(Game.PATH_SOUNDS + 'pl_step1.wav');
    f.addEventListener('load', this.onLoadSound.bind(this));
};

Game.prototype.onLoadSound = function (event) {
    this.audio.addSound(event.data.file);
};


Game.PATH_IMAGES = 'res/images/';
Game.PATH_SOUNDS = 'res/sounds/';
Game.PATH_MAPS = 'res/maps/';
Game.PATH_WADS = 'res/wads/';
Game.PATH_REPLAYS = 'res/replays/';
Game.RESIZE_DELAY = 200;

module.exports = Game;