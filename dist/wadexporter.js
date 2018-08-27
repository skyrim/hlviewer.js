/*!
 * The MIT License (MIT)
 * 
 * Copyright (c) 2018 Stefan Stojković
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/WadExporter/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Parsers/Util.ts":
/*!*****************************!*\
  !*** ./src/Parsers/Util.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function paletteToRGBA(pixels, palette) {
    const rgba = new Uint8Array(pixels.length * 4);
    const len = pixels.length;
    for (let i = 0; i < len; ++i) {
        rgba[i * 4] = palette[pixels[i] * 3];
        rgba[i * 4 + 1] = palette[pixels[i] * 3 + 1];
        rgba[i * 4 + 2] = palette[pixels[i] * 3 + 2];
        rgba[i * 4 + 3] = 255;
    }
    return rgba;
}
exports.paletteToRGBA = paletteToRGBA;
function paletteWithLastTransToRGBA(pixels, palette) {
    const rgba = new Uint8Array(pixels.length * 4);
    const len = pixels.length;
    for (let i = 0; i < len; ++i) {
        if (pixels[i] === 255) {
            rgba[i * 4 + 3] = 0;
        }
        else {
            rgba[i * 4] = palette[pixels[i] * 3];
            rgba[i * 4 + 1] = palette[pixels[i] * 3 + 1];
            rgba[i * 4 + 2] = palette[pixels[i] * 3 + 2];
            rgba[i * 4 + 3] = 255;
        }
    }
    return rgba;
}
exports.paletteWithLastTransToRGBA = paletteWithLastTransToRGBA;


/***/ }),

/***/ "./src/Parsers/Wad.ts":
/*!****************************!*\
  !*** ./src/Parsers/Wad.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Parsers/Util.ts");
function parseDecal(r) {
    const name = r.nstr(16);
    const width = r.ui();
    const height = r.ui();
    r.skip(4 * 4);
    const pixelCount = width * height;
    const pixels = r.arrx(pixelCount, Reader_1.ReaderDataType.UByte);
    r.skip(21 * (pixelCount / 64));
    r.skip(2);
    const palette = r.arrx(768, Reader_1.ReaderDataType.UByte);
    const data = name[0] === '{'
        ? Util_1.paletteWithLastTransToRGBA(pixels, palette)
        : Util_1.paletteToRGBA(pixels, palette);
    return {
        type: 'decal',
        name,
        width,
        height,
        data
    };
}
function parseCache(_r, metadata) {
    return {
        type: 'cache',
        name: metadata.name
    };
}
function parseTexture(r) {
    const name = r.nstr(16);
    const width = r.ui();
    const height = r.ui();
    r.skip(4 * 4);
    const pixelCount = width * height;
    const pixels = r.arrx(pixelCount, Reader_1.ReaderDataType.UByte);
    r.skip(21 * (pixelCount / 64));
    r.skip(2);
    const palette = r.arrx(768, Reader_1.ReaderDataType.UByte);
    const data = name[0] === '{'
        ? Util_1.paletteWithLastTransToRGBA(pixels, palette)
        : Util_1.paletteToRGBA(pixels, palette);
    return {
        type: 'texture',
        name,
        width,
        height,
        data
    };
}
function parseFont(r, metadata) {
    const width = r.ui();
    const height = r.ui();
    const rowCount = r.ui();
    const rowHeight = r.ui();
    const glyphs = [];
    for (let i = 0; i < 256; ++i) {
        glyphs.push({
            offset: r.us(),
            width: r.us()
        });
    }
    const pixelCount = width * height;
    const pixels = r.arrx(pixelCount, Reader_1.ReaderDataType.UByte);
    r.skip(2);
    const palette = r.arrx(256 * 3, Reader_1.ReaderDataType.UByte);
    return {
        type: 'font',
        name: metadata.name,
        width,
        height,
        rowCount,
        rowHeight,
        glyphs,
        data: Util_1.paletteToRGBA(pixels, palette)
    };
}
function parseUnknown(r, metadata) {
    return {
        type: 'unknown',
        name: metadata.name,
        data: r.arrx(metadata.length, r.ub.bind(r))
    };
}
function parseEntry(r, metadata) {
    r.seek(metadata.offset);
    switch (metadata.type) {
        case 0x40: {
            return parseDecal(r);
        }
        case 0x42: {
            return parseCache(r, metadata);
        }
        case 0x43: {
            return parseTexture(r);
        }
        case 0x46: {
            return parseFont(r, metadata);
        }
        default: {
            return parseUnknown(r, metadata);
        }
    }
}
class Wad {
    constructor(entries) {
        this.entries = entries;
    }
    static parse(buffer) {
        const r = new Reader_1.Reader(buffer);
        const magic = r.nstr(4);
        if (magic !== 'WAD3') {
            throw new Error('Invalid WAD file format');
        }
        const entryCount = r.ui();
        const directoryOffset = r.ui();
        r.seek(directoryOffset);
        const entriesMetadata = [];
        for (let i = 0; i < entryCount; ++i) {
            const entry = {
                offset: r.ui(),
                diskLength: r.ui(),
                length: r.ui(),
                type: r.b(),
                isCompressed: r.b(),
                name: ''
            };
            r.skip(2);
            entry.name = r.nstr(16);
            entriesMetadata.push(entry);
        }
        const entries = entriesMetadata.map(e => parseEntry(r, e));
        return new Wad(entries);
    }
}
exports.Wad = Wad;


/***/ }),

/***/ "./src/Reader.ts":
/*!***********************!*\
  !*** ./src/Reader.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReaderDataType;
(function (ReaderDataType) {
    ReaderDataType[ReaderDataType["UByte"] = 0] = "UByte";
    ReaderDataType[ReaderDataType["Byte"] = 1] = "Byte";
    ReaderDataType[ReaderDataType["UShort"] = 2] = "UShort";
    ReaderDataType[ReaderDataType["Short"] = 3] = "Short";
    ReaderDataType[ReaderDataType["UInt"] = 4] = "UInt";
    ReaderDataType[ReaderDataType["Int"] = 5] = "Int";
    ReaderDataType[ReaderDataType["Float"] = 6] = "Float";
    ReaderDataType[ReaderDataType["Double"] = 7] = "Double";
    ReaderDataType[ReaderDataType["NString"] = 8] = "NString";
    ReaderDataType[ReaderDataType["String"] = 9] = "String";
})(ReaderDataType = exports.ReaderDataType || (exports.ReaderDataType = {}));
class Reader {
    constructor(data) {
        if (data.byteLength === 0) {
            throw new Error('ArrayBuffer must have size greater than zero');
        }
        this.data = new DataView(data);
        this.offset = 0;
    }
    length() {
        return this.data.byteLength;
    }
    tell() {
        return this.offset;
    }
    seek(offset) {
        this.offset = Math.max(0, offset);
    }
    skip(offset) {
        this.seek(this.tell() + offset);
    }
    b() {
        const r = this.data.getInt8(this.offset);
        this.skip(1);
        return r;
    }
    ub() {
        const r = this.data.getUint8(this.offset);
        this.skip(1);
        return r;
    }
    s(isLittleEndian = true) {
        const r = this.data.getInt16(this.offset, isLittleEndian);
        this.skip(2);
        return r;
    }
    us(isLittleEndian = true) {
        const r = this.data.getUint16(this.offset, isLittleEndian);
        this.skip(2);
        return r;
    }
    i(isLittleEndian = true) {
        const r = this.data.getInt32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    ui(isLittleEndian = true) {
        const r = this.data.getUint32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    f(isLittleEndian = true) {
        const r = this.data.getFloat32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    lf(isLittleEndian = true) {
        const r = this.data.getFloat64(this.tell(), isLittleEndian);
        this.skip(8);
        return r;
    }
    str() {
        let t = this.ub();
        let r = '';
        while (t !== 0) {
            r += String.fromCharCode(t);
            t = this.ub();
        }
        return r;
    }
    nstr(n) {
        if (n < 0) {
            throw new Error('Invalid string length');
        }
        let r = '';
        while (n > 0) {
            n -= 1;
            const charCode = this.ub();
            if (charCode === 0) {
                break;
            }
            r += String.fromCharCode(charCode);
        }
        if (n !== 0) {
            this.skip(n);
        }
        return r;
    }
    arr(n, f) {
        f.bind(this);
        const r = [];
        while (n-- > 0) {
            r.push(f());
        }
        return r;
    }
    arrx(n, type, nstrlen = 0) {
        let r;
        switch (type) {
            case ReaderDataType.UByte: {
                r = new Uint8Array(this.data.buffer, this.tell(), n);
                this.skip(n);
                break;
            }
            case ReaderDataType.Byte: {
                r = new Int8Array(this.data.buffer, this.tell(), n);
                this.skip(n);
                break;
            }
            case ReaderDataType.UShort:
                r = new Uint16Array(this.data.buffer, this.tell(), n);
                this.skip(n * 2);
                break;
            case ReaderDataType.Short:
                r = new Int16Array(this.data.buffer, this.tell(), n);
                this.skip(n * 2);
                break;
            case ReaderDataType.UInt:
                r = new Uint32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case ReaderDataType.Int:
                r = new Int32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case ReaderDataType.Float:
                r = new Float32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case ReaderDataType.Double:
                r = new Float64Array(this.data.buffer, this.tell(), n);
                this.skip(n * 8);
                break;
            case ReaderDataType.NString:
                r = [];
                while (n-- > 0) {
                    r.push(r.nstr(nstrlen));
                }
                break;
            case ReaderDataType.String:
                r = [];
                while (n-- > 0) {
                    r.push(r.str());
                }
                break;
        }
        return r;
    }
}
exports.Reader = Reader;


/***/ }),

/***/ "./tools/WadExporter/index.ts":
/*!************************************!*\
  !*** ./tools/WadExporter/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(/*! fs */ "fs");
const util_1 = __webpack_require__(/*! util */ "util");
const pngjs_1 = __webpack_require__(/*! pngjs */ "pngjs");
const Wad_1 = __webpack_require__(/*! ../../src/Parsers/Wad */ "./src/Parsers/Wad.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const mkdirP = util_1.promisify(fs_1.mkdir);
const readFileP = util_1.promisify(fs_1.readFile);
function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
class WadExporter {
    static export(path, out) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield readFileP(path, { flag: 'r' }).catch(() => {
                console.log('File not found or could not be opened');
            });
            if (!buffer) {
                return;
            }
            if (!fs_1.existsSync(out)) {
                yield mkdirP(out);
            }
            const arrayBuffer = toArrayBuffer(buffer);
            const wad = yield Wad_1.Wad.parse(arrayBuffer);
            for (let i = 0; i < wad.entries.length; ++i) {
                const entry = wad.entries[i];
                if (entry.type !== 'texture') {
                    continue;
                }
                const msg = `Exporting: ${entry.name}`;
                process.stdout.write(msg);
                const png = new pngjs_1.PNG({
                    width: entry.width,
                    height: entry.height
                });
                const mipmap = entry.data;
                for (let i = 0; i < mipmap.length; ++i) {
                    png.data[i] = mipmap[i];
                }
                png.pack().pipe(fs_1.createWriteStream(`${out}/${entry.name}.png`));
                const dots = [];
                for (let j = 0; j < 30 - msg.length; ++j) {
                    dots.push('.');
                }
                process.stdout.write(dots.join('') + 'DONE\n');
            }
            console.log(`\nSuccessfully exported all textures from "${path_1.resolve(process.cwd(), path)}"\n into "${path_1.resolve(process.cwd(), out)}" directory\n`);
        });
    }
}
exports.WadExporter = WadExporter;
function getParam(params, name) {
    let val = null;
    for (let i = 0; i < params.length; ++i) {
        if (params[i] === name) {
            val = params[i + 1];
            break;
        }
    }
    return val;
}
;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const path = getParam(process.argv, '--path');
        const out = getParam(process.argv, '--out');
        if (!path) {
            console.log('--path parameter missing');
            return;
        }
        if (!out) {
            console.log('--out parameter missing');
            return;
        }
        yield WadExporter.export(path, out);
    });
})();


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pngjs":
/*!************************!*\
  !*** external "pngjs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pngjs");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=wadexporter.js.map