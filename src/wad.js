var File = require('./file.js');

/**
 * @param {int} offset
 * @param {int} diskSize
 * @param {int} size
 * @param {int} type
 * @param {boolean} compression
 * @param {string} name
 * @constructor
 */
function WadFileDescriptor(offset, diskSize, size, type, compression, name) {
    this.offset = offset;
    this.diskSize = diskSize;
    this.size = size;
    this.type = type;
    this.compression = compression;
    this.name = name;
}

/**
 * @param {File} file
 * @returns {WadFileDescriptor}
 */
function readAndCreateTextureInfo(file) {
    var nFilePos = file.readUInt();
    var nDiskSize = file.readUInt();
    var nSize = file.readUInt();
    var nType = file.readByte();
    var bCompression = file.readByte();
    file.skip(2); // unused
    var szName = file.readString(16);

    return new WadFileDescriptor(nFilePos, nDiskSize, nSize, nType, bCompression, szName);
}

/**
 * Returns array of all files contained in a given WAD file.
 *
 * @param {File} file
 * @return {Array}
 */
function getFileList(file) {
    var initialOffset = file.offset;

    file.offset = 0;
    file.skip(4); // magic
    var count = file.readUInt();
    file.offset = file.readUInt();

    var textureInfoArray = [];
    for (var i = 0; i < count; ++i) {
        textureInfoArray.push(readAndCreateTextureInfo(file));
    }

    file.offset = initialOffset;

    return textureInfoArray;
}

/**
 * @param {File} file
 * @return {Object}
 */
function getTexture(file, offset) {
    var initialOffset = file.offset;

    file.offset = offset;

    var name = file.readString(16);
    var width = file.readInt();
    var height = file.readInt();
    var data = new Array(4);
    data[0] = new Uint8Array(4 * width * height);
    data[1] = new Uint8Array(4 * width * height / 4);
    data[2] = new Uint8Array(4 * width * height / 16);
    data[3] = new Uint8Array(4 * width * height / 64);

    file.skip(16 + ((85 * width * height) / 64) + 2);

    var palette = file.readArray(768, File.prototype.readUByte);

    file.skip( - (((85 * width * height) / 64) + 2 + 768));

    var i, paletteRef = 0;
    for (i = 0; i < (4 * width * height); i += 4) {
        paletteRef = file.readUByte();

        var r = palette[3 * paletteRef];
        var g = palette[3 * paletteRef + 1];
        var b = palette[3 * paletteRef + 2];

        data[0][i    ] = r;
        data[0][i + 1] = g;
        data[0][i + 2] = b;
        // TODO: Remove, refactor? I dunno.
        if (r === 0 && g === 0 && b === 255)
            data[0][i + 3] = 0;
        else
            data[0][i + 3] = 255;
    }
    for (i = 0; i < (4 * width * height / 4); i += 4) {
        paletteRef = file.readUByte();
        data[1][i    ] = palette[3 * paletteRef];
        data[1][i + 1] = palette[3 * paletteRef + 1];
        data[1][i + 2] = palette[3 * paletteRef + 2];
        data[1][i + 3] = 255;
    }
    for (i = 0; i < (4 * width * height / 16); i += 4) {
        paletteRef = file.readUByte();
        data[2][i    ] = palette[3 * paletteRef];
        data[2][i + 1] = palette[3 * paletteRef + 1];
        data[2][i + 2] = palette[3 * paletteRef + 2];
        data[2][i + 3] = 255;
    }
    for (i = 0; i < (4 * width * height / 64); i += 4) {
        paletteRef = file.readUByte();
        data[3][i    ] = palette[3 * paletteRef];
        data[3][i + 1] = palette[3 * paletteRef + 1];
        data[3][i + 2] = palette[3 * paletteRef + 2];
        data[3][i + 3] = 255;
    }

    file.offset = initialOffset;

    return {
        name: name,
        width: width,
        height: height,
        data: data
    };
}

module.exports = {
    WadFileDescriptor: WadFileDescriptor,

    getFileList: getFileList,
    getTexture: getTexture
};