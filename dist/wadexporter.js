/*!
 * The MIT License (MIT)
 * 
 * Copyright (c) 2017 Stefan Stojković
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

/***/ "./src/Reader.ts":
/*!***********************!*\
  !*** ./src/Reader.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        let r = this.data.getInt8(this.offset);
        this.skip(1);
        return r;
    }
    ub() {
        let r = this.data.getUint8(this.offset);
        this.skip(1);
        return r;
    }
    s(isLittleEndian = true) {
        let r = this.data.getInt16(this.offset, isLittleEndian);
        this.skip(2);
        return r;
    }
    us(isLittleEndian = true) {
        let r = this.data.getUint16(this.offset, isLittleEndian);
        this.skip(2);
        return r;
    }
    i(isLittleEndian = true) {
        let r = this.data.getInt32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    ui(isLittleEndian = true) {
        let r = this.data.getUint32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    f(isLittleEndian = true) {
        let r = this.data.getFloat32(this.tell(), isLittleEndian);
        this.skip(4);
        return r;
    }
    lf(isLittleEndian = true) {
        let r = this.data.getFloat64(this.tell(), isLittleEndian);
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
            let charCode = this.ub();
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
        let r = [];
        while (n-- > 0) {
            r.push(f());
        }
        return r;
    }
    arrx(n, type, nstrlen = 0) {
        let r;
        switch (type) {
            case Reader.Type.UByte: {
                r = new Uint8Array(this.data.buffer, this.tell(), n);
                this.skip(n);
                break;
            }
            case Reader.Type.Byte: {
                r = new Int8Array(this.data.buffer, this.tell(), n);
                this.skip(n);
                break;
            }
            case Reader.Type.UShort:
                r = new Uint16Array(this.data.buffer, this.tell(), n);
                this.skip(n * 2);
                break;
            case Reader.Type.Short:
                r = new Int16Array(this.data.buffer, this.tell(), n);
                this.skip(n * 2);
                break;
            case Reader.Type.UInt:
                r = new Uint32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case Reader.Type.Int:
                r = new Int32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case Reader.Type.Float:
                r = new Float32Array(this.data.buffer, this.tell(), n);
                this.skip(n * 4);
                break;
            case Reader.Type.Double:
                r = new Float64Array(this.data.buffer, this.tell(), n);
                this.skip(n * 8);
                break;
            case Reader.Type.NString:
                r = [];
                while (n-- > 0) {
                    r.push(r.nstr(nstrlen));
                }
                break;
            case Reader.Type.String:
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
(function (Reader) {
    let Type;
    (function (Type) {
        Type[Type["UByte"] = 0] = "UByte";
        Type[Type["Byte"] = 1] = "Byte";
        Type[Type["UShort"] = 2] = "UShort";
        Type[Type["Short"] = 3] = "Short";
        Type[Type["UInt"] = 4] = "UInt";
        Type[Type["Int"] = 5] = "Int";
        Type[Type["Float"] = 6] = "Float";
        Type[Type["Double"] = 7] = "Double";
        Type[Type["NString"] = 8] = "NString";
        Type[Type["String"] = 9] = "String";
    })(Type = Reader.Type || (Reader.Type = {}));
})(Reader || (Reader = {}));
exports.Reader = Reader;


/***/ }),

/***/ "./src/Wad.ts":
/*!********************!*\
  !*** ./src/Wad.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(/*! ./Reader */ "./src/Reader.ts");
const Xhr_1 = __webpack_require__(/*! ./Xhr */ "./src/Xhr.ts");
function parseMipMaps(r, width, height) {
    const pixelCount = width * height;
    const mipmaps = [0, 0, 0, 0].map((_1, i) => r.arrx(pixelCount / Math.pow(1 << i, 2), Reader_1.Reader.Type.UByte));
    r.skip(2);
    const palette = r.arrx(256 * 3, Reader_1.Reader.Type.UByte);
    return mipmaps.map(m => {
        const pixels = new Uint8Array(m.length * 4);
        for (let i = 0; i < m.length; ++i) {
            const r = palette[m[i] * 3];
            const g = palette[m[i] * 3 + 1];
            const b = palette[m[i] * 3 + 2];
            if (r === 0 && g === 0 && b === 255) {
                pixels[4 * i] = 0;
                pixels[4 * i + 1] = 0;
                pixels[4 * i + 2] = 0;
                pixels[4 * i + 3] = 0;
            }
            else {
                pixels[4 * i] = r;
                pixels[4 * i + 1] = g;
                pixels[4 * i + 2] = b;
                pixels[4 * i + 3] = 255;
            }
        }
        return pixels;
    });
}
function parseTexture(r) {
    const baseOffset = r.tell();
    r.skip(16);
    const texture = {
        width: r.ui(),
        height: r.ui(),
        mipmaps: []
    };
    const mipmapOffset = r.ui();
    r.seek(baseOffset + mipmapOffset);
    texture.mipmaps = parseMipMaps(r, texture.width, texture.height);
    return { texture };
}
function parseEntry(r, entry) {
    r.seek(entry.offset);
    switch (entry.type) {
        case 67: {
            return parseTexture(r);
        }
        default: {
            return r.arr(entry.length, r.ub.bind(r));
        }
    }
}
class Wad {
    constructor(entries) {
        this.entries = entries;
    }
    static parseFromArrayBuffer(buffer) {
        const r = new Reader_1.Reader(buffer);
        const magic = r.nstr(4);
        if (magic !== 'WAD3') {
            throw new Error('Invalid WAD file format');
        }
        const entryCount = r.ui();
        const directoryOffset = r.ui();
        r.seek(directoryOffset);
        const entries = [];
        for (let i = 0; i < entryCount; ++i) {
            const entry = {
                offset: r.ui(),
                diskLength: r.ui(),
                length: r.ui(),
                type: r.b(),
                isCompressed: r.b()
            };
            r.skip(2);
            entry.name = r.nstr(16);
            entries.push(entry);
        }
        entries.forEach(e => {
            e.data = parseEntry(r, e);
        });
        return new Wad(entries.map(e => ({
            name: e.name,
            data: e.data
        })));
    }
    static loadFromUrl(url, progressCallback) {
        return Xhr_1.xhr(url, {
            method: 'GET',
            isBinary: true,
            progressCallback
        }).then(response => Wad.parseFromArrayBuffer(response));
    }
}
exports.Wad = Wad;


/***/ }),

/***/ "./src/Xhr.ts":
/*!********************!*\
  !*** ./src/Xhr.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function xhr(url, params) {
    let method = params.method || 'GET';
    let isBinary = params.isBinary;
    let progressCallback = params.progressCallback;
    if (!url) {
        throw new Error('Url parameter missing');
    }
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        if (isBinary) {
            request.responseType = 'arraybuffer';
        }
        if (isBinary && progressCallback) {
            request.addEventListener('progress', event => {
                if (event.lengthComputable) {
                    progressCallback(request, event.loaded / event.total);
                }
                else {
                    let totalStr = request.getResponseHeader('content-length');
                    let total = 0;
                    if (totalStr) {
                        total = parseFloat(totalStr);
                    }
                    let encoding = request.getResponseHeader('content-encoding');
                    if (total && encoding && encoding.indexOf('gzip') > -1) {
                        total *= 4;
                        let loadedPercent = Math.min(0.99, event.loaded / total);
                        progressCallback(request, loadedPercent);
                    }
                    else {
                        progressCallback(request, 0);
                    }
                }
            });
        }
        request.addEventListener('readystatechange', (event) => {
            if (event.target.readyState !== 4) {
                return;
            }
            if (event.target.status === 200) {
                if (progressCallback) {
                    progressCallback(request, 1);
                }
                resolve(event.target.response);
            }
            else {
                reject({
                    status: event.target.status
                });
            }
        });
        request.open(method, url, true);
        request.send();
    });
}
exports.xhr = xhr;


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
const Wad_1 = __webpack_require__(/*! ../../src/Wad */ "./src/Wad.ts");
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
            const wad = yield Wad_1.Wad.parseFromArrayBuffer(arrayBuffer);
            for (let i = 0; i < wad.entries.length; ++i) {
                const entry = wad.entries[i];
                const msg = `Exporting: ${entry.name}`;
                process.stdout.write(msg);
                const png = new pngjs_1.PNG({
                    width: entry.data.texture.width,
                    height: entry.data.texture.height
                });
                const mipmap = entry.data.texture.mipmaps[0];
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