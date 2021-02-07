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
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HLViewer"] = factory();
	else
		root["HLViewer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/free-style/dist.es2015/index.js":
/*!******************************************************!*\
  !*** ./node_modules/free-style/dist.es2015/index.js ***!
  \******************************************************/
/*! exports provided: Cache, Selector, Style, Rule, FreeStyle, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return Cache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selector", function() { return Selector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return Style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FreeStyle", function() { return FreeStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/**
 * The unique id is used for unique hashes.
 */
let uniqueId = 0;
/**
 * Quick dictionary lookup for unit-less numbers.
 */
const CSS_NUMBER = Object.create(null);
/**
 * CSS properties that are valid unit-less numbers.
 *
 * Ref: https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/CSSProperty.js
 */
const CSS_NUMBER_KEYS = [
    "animation-iteration-count",
    "border-image-outset",
    "border-image-slice",
    "border-image-width",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "columns",
    "counter-increment",
    "counter-reset",
    "flex",
    "flex-grow",
    "flex-positive",
    "flex-shrink",
    "flex-negative",
    "flex-order",
    "font-weight",
    "grid-area",
    "grid-column",
    "grid-column-end",
    "grid-column-span",
    "grid-column-start",
    "grid-row",
    "grid-row-end",
    "grid-row-span",
    "grid-row-start",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "tab-size",
    "widows",
    "z-index",
    "zoom",
    // SVG properties.
    "fill-opacity",
    "flood-opacity",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width"
];
// Add vendor prefixes to all unit-less properties.
for (const property of CSS_NUMBER_KEYS) {
    for (const prefix of ["-webkit-", "-ms-", "-moz-", "-o-", ""]) {
        CSS_NUMBER[prefix + property] = true;
    }
}
/**
 * Escape a CSS class name.
 */
function escape(str) {
    return str.replace(/[ !#$%&()*+,./;<=>?@[\]^`{|}~"'\\]/g, "\\$&");
}
/**
 * Transform a JavaScript property into a CSS property.
 */
function hyphenate(propertyName) {
    return propertyName
        .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
        .replace(/^ms-/, "-ms-"); // Internet Explorer vendor prefix.
}
/**
 * Generate a hash value from a string.
 */
function stringHash(str) {
    let value = 5381;
    let len = str.length;
    while (len--)
        value = (value * 33) ^ str.charCodeAt(len);
    return (value >>> 0).toString(36);
}
/**
 * Transform a style string to a CSS string.
 */
function styleToString(key, value) {
    if (value && typeof value === "number" && !CSS_NUMBER[key]) {
        return `${key}:${value}px`;
    }
    return `${key}:${value}`;
}
/**
 * Sort an array of tuples by first value.
 */
function sortTuples(value) {
    return value.sort((a, b) => (a[0] > b[0] ? 1 : -1));
}
/**
 * Categorize user styles.
 */
function parseStyles(styles, hasNestedStyles) {
    const properties = [];
    const nestedStyles = [];
    // Sort keys before adding to styles.
    for (const key of Object.keys(styles)) {
        const name = key.trim();
        const value = styles[key];
        if (name.charCodeAt(0) !== 36 /* $ */ && value != null) {
            if (typeof value === "object" && !Array.isArray(value)) {
                nestedStyles.push([name, value]);
            }
            else {
                properties.push([hyphenate(name), value]);
            }
        }
    }
    return {
        style: stringifyProperties(sortTuples(properties)),
        nested: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
        isUnique: !!styles.$unique
    };
}
/**
 * Stringify an array of property tuples.
 */
function stringifyProperties(properties) {
    return properties
        .map(([name, value]) => {
        if (!Array.isArray(value))
            return styleToString(name, value);
        return value.map(x => styleToString(name, x)).join(";");
    })
        .join(";");
}
/**
 * Interpolate CSS selectors.
 */
function interpolate(selector, parent) {
    if (selector.indexOf("&") === -1)
        return `${parent} ${selector}`;
    return selector.replace(/&/g, parent);
}
/**
 * Recursive loop building styles with deferred selectors.
 */
function stylize(selector, styles, rulesList, stylesList, parent) {
    const { style, nested, isUnique } = parseStyles(styles, selector !== "");
    let pid = style;
    if (selector.charCodeAt(0) === 64 /* @ */) {
        const child = {
            selector,
            styles: [],
            rules: [],
            style: parent ? "" : style
        };
        rulesList.push(child);
        // Nested styles support (e.g. `.foo > @media > .bar`).
        if (style && parent) {
            child.styles.push({ selector: parent, style, isUnique });
        }
        for (const [name, value] of nested) {
            pid += name + stylize(name, value, child.rules, child.styles, parent);
        }
    }
    else {
        const key = parent ? interpolate(selector, parent) : selector;
        if (style)
            stylesList.push({ selector: key, style, isUnique });
        for (const [name, value] of nested) {
            pid += name + stylize(name, value, rulesList, stylesList, key);
        }
    }
    return pid;
}
/**
 * Transform `stylize` tree into style objects.
 */
function composeStylize(cache, pid, rulesList, stylesList, className, isStyle) {
    for (const { selector, style, isUnique } of stylesList) {
        const key = isStyle ? interpolate(selector, className) : selector;
        const id = isUnique
            ? `u\0${(++uniqueId).toString(36)}`
            : `s\0${pid}\0${style}`;
        const item = new Style(style, id);
        item.add(new Selector(key, `k\0${pid}\0${key}`));
        cache.add(item);
    }
    for (const { selector, style, rules, styles } of rulesList) {
        const item = new Rule(selector, style, `r\0${pid}\0${selector}\0${style}`);
        composeStylize(item, pid, rules, styles, className, isStyle);
        cache.add(item);
    }
}
/**
 * Cache to list to styles.
 */
function join(arr) {
    let res = "";
    for (let i = 0; i < arr.length; i++)
        res += arr[i];
    return res;
}
/**
 * Noop changes.
 */
const noopChanges = {
    add: () => undefined,
    change: () => undefined,
    remove: () => undefined
};
/**
 * Implement a cache/event emitter.
 */
class Cache {
    constructor(changes = noopChanges) {
        this.changes = changes;
        this.sheet = [];
        this.changeId = 0;
        this._keys = [];
        this._children = Object.create(null);
        this._counters = Object.create(null);
    }
    add(style) {
        const count = this._counters[style.id] || 0;
        const item = this._children[style.id] || style.clone();
        this._counters[style.id] = count + 1;
        if (count === 0) {
            this._children[item.id] = item;
            this._keys.push(item.id);
            this.sheet.push(item.getStyles());
            this.changeId++;
            this.changes.add(item, this._keys.length - 1);
        }
        else if (item instanceof Cache && style instanceof Cache) {
            const curIndex = this._keys.indexOf(style.id);
            const prevItemChangeId = item.changeId;
            item.merge(style);
            if (item.changeId !== prevItemChangeId) {
                this.sheet.splice(curIndex, 1, item.getStyles());
                this.changeId++;
                this.changes.change(item, curIndex, curIndex);
            }
        }
    }
    remove(style) {
        const count = this._counters[style.id];
        if (count) {
            this._counters[style.id] = count - 1;
            const item = this._children[style.id];
            const index = this._keys.indexOf(item.id);
            if (count === 1) {
                delete this._counters[style.id];
                delete this._children[style.id];
                this._keys.splice(index, 1);
                this.sheet.splice(index, 1);
                this.changeId++;
                this.changes.remove(item, index);
            }
            else if (item instanceof Cache && style instanceof Cache) {
                const prevChangeId = item.changeId;
                item.unmerge(style);
                if (item.changeId !== prevChangeId) {
                    this.sheet.splice(index, 1, item.getStyles());
                    this.changeId++;
                    this.changes.change(item, index, index);
                }
            }
        }
    }
    values() {
        return this._keys.map(key => this._children[key]);
    }
    merge(cache) {
        for (const item of cache.values())
            this.add(item);
        return this;
    }
    unmerge(cache) {
        for (const item of cache.values())
            this.remove(item);
        return this;
    }
    clone() {
        return new Cache().merge(this);
    }
}
/**
 * Selector is a dumb class made to represent nested CSS selectors.
 */
class Selector {
    constructor(selector, id) {
        this.selector = selector;
        this.id = id;
    }
    getStyles() {
        return this.selector;
    }
    clone() {
        return this;
    }
}
/**
 * The style container registers a style string with selectors.
 */
class Style extends Cache {
    constructor(style, id) {
        super();
        this.style = style;
        this.id = id;
    }
    getStyles() {
        return `${this.sheet.join(",")}{${this.style}}`;
    }
    clone() {
        return new Style(this.style, this.id).merge(this);
    }
}
/**
 * Implement rule logic for style output.
 */
class Rule extends Cache {
    constructor(rule, style, id) {
        super();
        this.rule = rule;
        this.style = style;
        this.id = id;
    }
    getStyles() {
        return `${this.rule}{${this.style}${join(this.sheet)}}`;
    }
    clone() {
        return new Rule(this.rule, this.style, this.id).merge(this);
    }
}
function key(pid, styles) {
    const key = `f${stringHash(pid)}`;
    if ( false || !styles.$displayName)
        return key;
    return `${styles.$displayName}_${key}`;
}
/**
 * The FreeStyle class implements the API for everything else.
 */
class FreeStyle extends Cache {
    constructor(id, changes) {
        super(changes);
        this.id = id;
    }
    registerStyle(styles) {
        const rulesList = [];
        const stylesList = [];
        const pid = stylize("&", styles, rulesList, stylesList);
        const id = key(pid, styles);
        const selector = `.${ false ? undefined : escape(id)}`;
        composeStylize(this, pid, rulesList, stylesList, selector, true);
        return id;
    }
    registerKeyframes(keyframes) {
        return this.registerHashRule("@keyframes", keyframes);
    }
    registerHashRule(prefix, styles) {
        const rulesList = [];
        const stylesList = [];
        const pid = stylize("", styles, rulesList, stylesList);
        const id = key(pid, styles);
        const selector = `${prefix} ${ false ? undefined : escape(id)}`;
        const rule = new Rule(selector, "", `h\0${pid}\0${prefix}`);
        composeStylize(rule, pid, rulesList, stylesList, "", false);
        this.add(rule);
        return id;
    }
    registerRule(rule, styles) {
        const rulesList = [];
        const stylesList = [];
        const pid = stylize(rule, styles, rulesList, stylesList);
        composeStylize(this, pid, rulesList, stylesList, "", false);
    }
    registerCss(styles) {
        return this.registerRule("", styles);
    }
    getStyles() {
        return join(this.sheet);
    }
    clone() {
        return new FreeStyle(this.id, this.changes).merge(this);
    }
}
/**
 * Exports a simple function to create a new instance.
 */
function create(changes) {
    return new FreeStyle(`f${(++uniqueId).toString(36)}`, changes);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix.js ***!
  \*************************************************/
/*! exports provided: glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gl_matrix_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gl-matrix/common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return _gl_matrix_common_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _gl_matrix_mat2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gl-matrix/mat2.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return _gl_matrix_mat2_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _gl_matrix_mat2d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gl-matrix/mat2d.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat2d.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return _gl_matrix_mat2d_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _gl_matrix_mat3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gl-matrix/mat3.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return _gl_matrix_mat3_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _gl_matrix_mat4_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gl-matrix/mat4.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return _gl_matrix_mat4_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _gl_matrix_quat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gl-matrix/quat.js */ "./node_modules/gl-matrix/lib/gl-matrix/quat.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return _gl_matrix_quat_js__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _gl_matrix_quat2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gl-matrix/quat2.js */ "./node_modules/gl-matrix/lib/gl-matrix/quat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat2", function() { return _gl_matrix_quat2_js__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _gl_matrix_vec2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gl-matrix/vec2.js */ "./node_modules/gl-matrix/lib/gl-matrix/vec2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return _gl_matrix_vec2_js__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _gl_matrix_vec3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gl-matrix/vec3.js */ "./node_modules/gl-matrix/lib/gl-matrix/vec3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return _gl_matrix_vec3_js__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _gl_matrix_vec4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gl-matrix/vec4.js */ "./node_modules/gl-matrix/lib/gl-matrix/vec4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return _gl_matrix_vec4_js__WEBPACK_IMPORTED_MODULE_9__; });













/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/common.js":
/*!********************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/common.js ***!
  \********************************************************/
/*! exports provided: EPSILON, ARRAY_TYPE, RANDOM, setMatrixArrayType, toRadian, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANDOM", function() { return RANDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatrixArrayType", function() { return setMatrixArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadian", function() { return toRadian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/mat2.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/mat2.js ***!
  \******************************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, transpose, invert, adjoint, determinant, multiply, rotate, scale, fromRotation, fromScaling, str, frob, LDU, add, subtract, exactEquals, equals, multiplyScalar, multiplyScalarAndAdd, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LDU", function() { return LDU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function fromValues(m00, m01, m10, m11) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];

  // Calculate the determinant
  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;

  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;

  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/mat2d.js":
/*!*******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/mat2d.js ***!
  \*******************************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, invert, determinant, multiply, rotate, scale, translate, fromRotation, fromScaling, fromTranslation, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
function fromValues(a, b, c, d, tx, ty) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];

  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
}

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/mat3.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/mat3.js ***!
  \******************************************************/
/*! exports provided: create, fromMat4, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, rotate, scale, fromTranslation, fromRotation, fromScaling, fromMat2d, fromQuat, normalFromMat4, projection, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat2d", function() { return fromMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalFromMat4", function() { return normalFromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projection", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/mat4.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/mat4.js ***!
  \******************************************************/
/*! exports provided: create, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, scale, rotate, rotateX, rotateY, rotateZ, fromTranslation, fromScaling, fromRotation, fromXRotation, fromYRotation, fromZRotation, fromRotationTranslation, fromQuat2, getTranslation, getScaling, getRotation, fromRotationTranslationScale, fromRotationTranslationScaleOrigin, fromQuat, frustum, perspective, perspectiveFromFieldOfView, ortho, lookAt, targetTo, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXRotation", function() { return fromXRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromYRotation", function() { return fromYRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromZRotation", function() { return fromZRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat2", function() { return fromQuat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaling", function() { return getScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScale", function() { return fromRotationTranslationScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScaleOrigin", function() { return fromRotationTranslationScaleOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frustum", function() { return frustum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspective", function() { return perspective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspectiveFromFieldOfView", function() { return perspectiveFromFieldOfView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ortho", function() { return ortho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookAt", function() { return lookAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTo", function() { return targetTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  // Cache only the current line of the second matrix
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
    out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
    out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;
  var b00 = void 0,
      b01 = void 0,
      b02 = void 0;
  var b10 = void 0,
      b11 = void 0,
      b12 = void 0;
  var b20 = void 0,
      b21 = void 0,
      b22 = void 0;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
  a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
  a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {quat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */
function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];

  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  //Only scale if it makes sense
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  var ox = o[0];
  var oy = o[1];
  var oz = o[2];

  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;

  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf = void 0;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  var x0 = void 0,
      x1 = void 0,
      x2 = void 0,
      y0 = void 0,
      y1 = void 0,
      y2 = void 0,
      z0 = void 0,
      z1 = void 0,
      z2 = void 0,
      len = void 0;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];

  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];

  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];

  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/quat.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/quat.js ***!
  \******************************************************/
/*! exports provided: create, identity, setAxisAngle, getAxisAngle, multiply, rotateX, rotateY, rotateZ, calculateW, slerp, random, invert, conjugate, fromMat3, fromEuler, str, clone, fromValues, copy, set, add, mul, scale, dot, lerp, length, len, squaredLength, sqrLen, normalize, exactEquals, equals, rotationTo, sqlerp, setAxes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxisAngle", function() { return setAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxisAngle", function() { return getAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateW", function() { return calculateW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat3", function() { return fromMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEuler", function() { return fromEuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationTo", function() { return rotationTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqlerp", function() { return sqlerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxes", function() { return setAxes; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat3.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat3.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vec3.js */ "./node_modules/gl-matrix/lib/gl-matrix/vec3.js");
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vec4.js */ "./node_modules/gl-matrix/lib/gl-matrix/vec4.js");





/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);
  if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  var omega = void 0,
      cosom = void 0,
      sinom = void 0,
      scale0 = void 0,
      scale1 = void 0;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Generates a random quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();

  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);

  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot = void 0;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;

  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);

  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;

  return out;
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
var clone = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["clone"];

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
var fromValues = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["fromValues"];

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
var copy = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["copy"];

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
var set = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["set"];

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
var add = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["add"];

/**
 * Alias for {@link quat.multiply}
 * @function
 */
var mul = multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
var scale = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["scale"];

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var dot = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["dot"];

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */
var lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["lerp"];

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
var length = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["length"];

/**
 * Alias for {@link quat.length}
 * @function
 */
var len = length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["squaredLength"];

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
var normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["normalize"];

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["exactEquals"];

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var equals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["equals"];

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
var rotationTo = function () {
  var tmpvec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["create"]();
  var xUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](1, 0, 0);
  var yUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](0, 1, 0);

  return function (out, a, b) {
    var dot = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["dot"](a, b);
    if (dot < -0.999999) {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, xUnitVec3, a);
      if (_vec3_js__WEBPACK_IMPORTED_MODULE_2__["len"](tmpvec3) < 0.000001) _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, yUnitVec3, a);
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
var setAxes = function () {
  var matr = _mat3_js__WEBPACK_IMPORTED_MODULE_1__["create"]();

  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/quat2.js":
/*!*******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/quat2.js ***!
  \*******************************************************/
/*! exports provided: create, clone, fromValues, fromRotationTranslationValues, fromRotationTranslation, fromTranslation, fromRotation, fromMat4, copy, identity, set, getReal, getDual, setReal, setDual, getTranslation, translate, rotateX, rotateY, rotateZ, rotateByQuatAppend, rotateByQuatPrepend, rotateAroundAxis, add, multiply, mul, scale, dot, lerp, invert, conjugate, length, len, squaredLength, sqrLen, normalize, str, exactEquals, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationValues", function() { return fromRotationTranslationValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReal", function() { return getReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDual", function() { return getDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReal", function() { return setReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDual", function() { return setDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatAppend", function() { return rotateByQuatAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatPrepend", function() { return rotateByQuatPrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAroundAxis", function() { return rotateAroundAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quat.js */ "./node_modules/gl-matrix/lib/gl-matrix/quat.js");
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat4.js */ "./node_modules/gl-matrix/lib/gl-matrix/mat4.js");




/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */
function create() {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }
  dq[3] = 1;
  return dq;
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */
function clone(a) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}

/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */
function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}

/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */
function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}

/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q quaternion
 * @param {vec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Creates a dual quat from a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}

/**
 * Creates a dual quat from a quaternion
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {mat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */
function fromMat4(out, a) {
  //TODO Optimize this
  var outer = _quat_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getRotation"](outer, a);
  var t = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getTranslation"](t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}

/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}

/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */
function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;

  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}

/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} real part
 */
var getReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];

/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} dual part
 */
function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}

/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */
var setReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];

/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */
function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}

/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {quat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */
function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}

/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to translate
 * @param {vec3} v vector to translate by
 * @returns {quat2} out
 */
function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}

/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateX"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateY"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateZ"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {quat} q quaternion to rotate by
 * @returns {quat2} out
 */
function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];

  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat} q quaternion to rotate by
 * @param {quat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */
function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];

  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}

/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {vec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */
function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return copy(out, a);
  }
  var axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);

  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);

  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;

  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;

  return out;
}

/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 * @function
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}

/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 */
function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}

/**
 * Alias for {@link quat2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}

/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var dot = _quat_js__WEBPACK_IMPORTED_MODULE_1__["dot"];

/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */
function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;

  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;

  return out;
}

/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */
function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}

/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}

/**
 * Calculates the length of a dual quat
 *
 * @param {quat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */
var length = _quat_js__WEBPACK_IMPORTED_MODULE_1__["length"];

/**
 * Alias for {@link quat2.length}
 * @function
 */
var len = length;

/**
 * Calculates the squared length of a dual quat
 *
 * @param {quat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var squaredLength = _quat_js__WEBPACK_IMPORTED_MODULE_1__["squaredLength"];

/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */
function normalize(out, a) {
  var magnitude = squaredLength(a);
  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);

    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;

    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];

    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;

    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;

    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }
  return out;
}

/**
 * Returns a string representation of a dual quatenion
 *
 * @param {quat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */
function str(a) {
  return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
}

/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat2} a the first dual quaternion.
 * @param {quat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}

/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {quat2} a the first dual quat.
 * @param {quat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/vec2.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/vec2.js ***!
  \******************************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat2, transformMat2d, transformMat3, transformMat4, rotate, angle, str, exactEquals, equals, len, sub, mul, div, dist, sqrDist, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2", function() { return transformMat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2d", function() { return transformMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec2} out
 */
function rotate(out, a, b, c) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(c),
      cosC = Math.cos(c);

  //perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];

  return out;
}

/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];

  var len1 = x1 * x1 + y1 * y1;
  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;
  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec2.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec2.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/vec3.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/vec3.js ***!
  \******************************************************/
/*! exports provided: create, clone, length, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, squaredLength, negate, inverse, normalize, dot, cross, lerp, hermite, bezier, random, transformMat4, transformMat3, transformQuat, rotateX, rotateY, rotateZ, angle, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hermite", function() { return hermite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezier", function() { return bezier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2];
  // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);
  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x;
  // var uuv = vec3.cross([], qvec, uv);
  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx;
  // vec3.scale(uv, uv, 2 * w);
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  // vec3.scale(uuv, uuv, 2);
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  // return vec3.add(out, a, vec3.add(out, uv, uuv));
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec3.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec3.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec3.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/lib/gl-matrix/vec4.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/lib/gl-matrix/vec4.js ***!
  \******************************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, lerp, random, transformMat4, transformQuat, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/lib/gl-matrix/common.js");


/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];

  // calculate quat * vec
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec4.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec4.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec4.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/nanoevents/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoevents/index.js ***!
  \******************************************/
/*! exports provided: createNanoEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNanoEvents", function() { return createNanoEvents; });
let createNanoEvents = () => ({
  events: {},
  emit (event, ...args) {
    for (let i of this.events[event] || []) {
      i(...args)
    }
  },
  on (event, cb) {
    ;(this.events[event] = this.events[event] || []).push(cb)
    return () => (this.events[event] = this.events[event].filter(i => i !== cb))
  }
})




/***/ }),

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/*! exports provided: default, h, createElement, cloneElement, createRef, Component, render, rerender, options */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

function applyRef(ref, value) {
  if (ref) {
    if (typeof ref == 'function') ref(value);else ref.current = value;
  }
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p;
	while (p = items.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		applyRef(old, null);
		applyRef(value, node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.shift()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null) applyRef(node['__preactattr_'].ref, null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	applyRef(component.__ref, component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.push(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] != null) applyRef(base['__preactattr_'].ref, null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	applyRef(component.__ref, null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

function createRef() {
	return {};
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	createRef: createRef,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


/***/ }),

/***/ "./node_modules/typestyle/lib.es2015/index.js":
/*!****************************************************!*\
  !*** ./node_modules/typestyle/lib.es2015/index.js ***!
  \****************************************************/
/*! exports provided: TypeStyle, types, extend, classes, media, setStylesTarget, cssRaw, cssRule, forceRenderStyles, fontFace, getStyles, keyframes, reinit, style, stylesheet, createTypeStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStylesTarget", function() { return setStylesTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssRaw", function() { return cssRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssRule", function() { return cssRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceRenderStyles", function() { return forceRenderStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return fontFace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reinit", function() { return reinit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stylesheet", function() { return stylesheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTypeStyle", function() { return createTypeStyle; });
/* harmony import */ var _internal_typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/typestyle */ "./node_modules/typestyle/lib.es2015/internal/typestyle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeStyle", function() { return _internal_typestyle__WEBPACK_IMPORTED_MODULE_0__["TypeStyle"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/typestyle/lib.es2015/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "types", function() { return _types__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _internal_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/utilities */ "./node_modules/typestyle/lib.es2015/internal/utilities.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _internal_utilities__WEBPACK_IMPORTED_MODULE_2__["extend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classes", function() { return _internal_utilities__WEBPACK_IMPORTED_MODULE_2__["classes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "media", function() { return _internal_utilities__WEBPACK_IMPORTED_MODULE_2__["media"]; });



/**
 * All the CSS types in the 'types' namespace
 */


/**
 * Export certain utilities
 */

/** Zero configuration, default instance of TypeStyle */
var ts = new _internal_typestyle__WEBPACK_IMPORTED_MODULE_0__["TypeStyle"]({ autoGenerateTag: true });
/** Sets the target tag where we write the css on style updates */
var setStylesTarget = ts.setStylesTarget;
/**
 * Insert `raw` CSS as a string. This is useful for e.g.
 * - third party CSS that you are customizing with template strings
 * - generating raw CSS in JavaScript
 * - reset libraries like normalize.css that you can use without loaders
 */
var cssRaw = ts.cssRaw;
/**
 * Takes CSSProperties and registers it to a global selector (body, html, etc.)
 */
var cssRule = ts.cssRule;
/**
 * Renders styles to the singleton tag imediately
 * NOTE: You should only call it on initial render to prevent any non CSS flash.
 * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
 **/
var forceRenderStyles = ts.forceRenderStyles;
/**
 * Utility function to register an @font-face
 */
var fontFace = ts.fontFace;
/**
 * Allows use to use the stylesheet in a node.js environment
 */
var getStyles = ts.getStyles;
/**
 * Takes keyframes and returns a generated animationName
 */
var keyframes = ts.keyframes;
/**
 * Helps with testing. Reinitializes FreeStyle + raw
 */
var reinit = ts.reinit;
/**
 * Takes CSSProperties and return a generated className you can use on your component
 */
var style = ts.style;
/**
 * Takes an object where property names are ideal class names and property values are CSSProperties, and
 * returns an object where property names are the same ideal class names and the property values are
 * the actual generated class names using the ideal class name as the $debugName
 */
var stylesheet = ts.stylesheet;
/**
 * Creates a new instance of TypeStyle separate from the default instance.
 *
 * - Use this for creating a different typestyle instance for a shadow dom component.
 * - Use this if you don't want an auto tag generated and you just want to collect the CSS.
 *
 * NOTE: styles aren't shared between different instances.
 */
function createTypeStyle(target) {
    var instance = new _internal_typestyle__WEBPACK_IMPORTED_MODULE_0__["TypeStyle"]({ autoGenerateTag: false });
    if (target) {
        instance.setStylesTarget(target);
    }
    return instance;
}


/***/ }),

/***/ "./node_modules/typestyle/lib.es2015/internal/formatting.js":
/*!******************************************************************!*\
  !*** ./node_modules/typestyle/lib.es2015/internal/formatting.js ***!
  \******************************************************************/
/*! exports provided: convertToStyles, convertToKeyframes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToStyles", function() { return convertToStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToKeyframes", function() { return convertToKeyframes; });
/**
 * We need to do the following to *our* objects before passing to freestyle:
 * - For any `$nest` directive move up to FreeStyle style nesting
 * - For any `$unique` directive map to FreeStyle Unique
 * - For any `$debugName` directive return the debug name
 */
function convertToStyles(object) {
    /** The final result we will return */
    var styles = {};
    for (var key in object) {
        /** Grab the value upfront */
        var val = object[key];
        /** TypeStyle configuration options */
        if (key === '$nest') {
            var nested = val;
            for (var selector in nested) {
                var subproperties = nested[selector];
                styles[selector] = convertToStyles(subproperties);
            }
        }
        else if (key === '$debugName') {
            styles.$displayName = val;
        }
        else {
            styles[key] = val;
        }
    }
    return styles;
}
// todo: better name here
function convertToKeyframes(frames) {
    var result = {};
    for (var offset in frames) {
        if (offset !== '$debugName') {
            result[offset] = frames[offset];
        }
    }
    if (frames.$debugName) {
        result.$displayName = frames.$debugName;
    }
    return result;
}


/***/ }),

/***/ "./node_modules/typestyle/lib.es2015/internal/typestyle.js":
/*!*****************************************************************!*\
  !*** ./node_modules/typestyle/lib.es2015/internal/typestyle.js ***!
  \*****************************************************************/
/*! exports provided: TypeStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeStyle", function() { return TypeStyle; });
/* harmony import */ var free_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! free-style */ "./node_modules/free-style/dist.es2015/index.js");
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatting */ "./node_modules/typestyle/lib.es2015/internal/formatting.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./node_modules/typestyle/lib.es2015/internal/utilities.js");



/**
 * Creates an instance of free style with our options
 */
var createFreeStyle = function () { return free_style__WEBPACK_IMPORTED_MODULE_0__["create"](); };
/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
var TypeStyle = /** @class */ (function () {
    function TypeStyle(_a) {
        var _this = this;
        var autoGenerateTag = _a.autoGenerateTag;
        /**
         * Insert `raw` CSS as a string. This is useful for e.g.
         * - third party CSS that you are customizing with template strings
         * - generating raw CSS in JavaScript
         * - reset libraries like normalize.css that you can use without loaders
         */
        this.cssRaw = function (mustBeValidCSS) {
            if (!mustBeValidCSS) {
                return;
            }
            _this._raw += mustBeValidCSS || '';
            _this._pendingRawChange = true;
            _this._styleUpdated();
        };
        /**
         * Takes CSSProperties and registers it to a global selector (body, html, etc.)
         */
        this.cssRule = function (selector) {
            var objects = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                objects[_i - 1] = arguments[_i];
            }
            var styles = Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["convertToStyles"])(_utilities__WEBPACK_IMPORTED_MODULE_2__["extend"].apply(void 0, objects));
            _this._freeStyle.registerRule(selector, styles);
            _this._styleUpdated();
            return;
        };
        /**
         * Renders styles to the singleton tag imediately
         * NOTE: You should only call it on initial render to prevent any non CSS flash.
         * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
         **/
        this.forceRenderStyles = function () {
            var target = _this._getTag();
            if (!target) {
                return;
            }
            target.textContent = _this.getStyles();
        };
        /**
         * Utility function to register an @font-face
         */
        this.fontFace = function () {
            var fontFace = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fontFace[_i] = arguments[_i];
            }
            var freeStyle = _this._freeStyle;
            for (var _a = 0, _b = fontFace; _a < _b.length; _a++) {
                var face = _b[_a];
                freeStyle.registerRule('@font-face', face);
            }
            _this._styleUpdated();
            return;
        };
        /**
         * Allows use to use the stylesheet in a node.js environment
         */
        this.getStyles = function () {
            return (_this._raw || '') + _this._freeStyle.getStyles();
        };
        /**
         * Takes keyframes and returns a generated animationName
         */
        this.keyframes = function (frames) {
            var keyframes = Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["convertToKeyframes"])(frames);
            // TODO: replace $debugName with display name
            var animationName = _this._freeStyle.registerKeyframes(keyframes);
            _this._styleUpdated();
            return animationName;
        };
        /**
         * Helps with testing. Reinitializes FreeStyle + raw
         */
        this.reinit = function () {
            /** reinit freestyle */
            var freeStyle = createFreeStyle();
            _this._freeStyle = freeStyle;
            _this._lastFreeStyleChangeId = freeStyle.changeId;
            /** reinit raw */
            _this._raw = '';
            _this._pendingRawChange = false;
            /** Clear any styles that were flushed */
            var target = _this._getTag();
            if (target) {
                target.textContent = '';
            }
        };
        /** Sets the target tag where we write the css on style updates */
        this.setStylesTarget = function (tag) {
            /** Clear any data in any previous tag */
            if (_this._tag) {
                _this._tag.textContent = '';
            }
            _this._tag = tag;
            /** This special time buffer immediately */
            _this.forceRenderStyles();
        };
        /**
         * Takes an object where property names are ideal class names and property values are CSSProperties, and
         * returns an object where property names are the same ideal class names and the property values are
         * the actual generated class names using the ideal class name as the $debugName
         */
        this.stylesheet = function (classes) {
            var classNames = Object.getOwnPropertyNames(classes);
            var result = {};
            for (var _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
                var className = classNames_1[_i];
                var classDef = classes[className];
                if (classDef) {
                    classDef.$debugName = className;
                    result[className] = _this.style(classDef);
                }
            }
            return result;
        };
        var freeStyle = createFreeStyle();
        this._autoGenerateTag = autoGenerateTag;
        this._freeStyle = freeStyle;
        this._lastFreeStyleChangeId = freeStyle.changeId;
        this._pending = 0;
        this._pendingRawChange = false;
        this._raw = '';
        this._tag = undefined;
        // rebind prototype to TypeStyle.  It might be better to do a function() { return this.style.apply(this, arguments)}
        this.style = this.style.bind(this);
    }
    /**
     * Only calls cb all sync operations settle
     */
    TypeStyle.prototype._afterAllSync = function (cb) {
        var _this = this;
        this._pending++;
        var pending = this._pending;
        Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["raf"])(function () {
            if (pending !== _this._pending) {
                return;
            }
            cb();
        });
    };
    TypeStyle.prototype._getTag = function () {
        if (this._tag) {
            return this._tag;
        }
        if (this._autoGenerateTag) {
            var tag = typeof window === 'undefined'
                ? { textContent: '' }
                : document.createElement('style');
            if (typeof document !== 'undefined') {
                document.head.appendChild(tag);
            }
            this._tag = tag;
            return tag;
        }
        return undefined;
    };
    /** Checks if the style tag needs updating and if so queues up the change */
    TypeStyle.prototype._styleUpdated = function () {
        var _this = this;
        var changeId = this._freeStyle.changeId;
        var lastChangeId = this._lastFreeStyleChangeId;
        if (!this._pendingRawChange && changeId === lastChangeId) {
            return;
        }
        this._lastFreeStyleChangeId = changeId;
        this._pendingRawChange = false;
        this._afterAllSync(function () { return _this.forceRenderStyles(); });
    };
    TypeStyle.prototype.style = function () {
        var className = this._freeStyle.registerStyle(Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["convertToStyles"])(_utilities__WEBPACK_IMPORTED_MODULE_2__["extend"].apply(undefined, arguments)));
        this._styleUpdated();
        return className;
    };
    return TypeStyle;
}());



/***/ }),

/***/ "./node_modules/typestyle/lib.es2015/internal/utilities.js":
/*!*****************************************************************!*\
  !*** ./node_modules/typestyle/lib.es2015/internal/utilities.js ***!
  \*****************************************************************/
/*! exports provided: raf, classes, extend, media */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classes", function() { return classes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "media", function() { return media; });
/** Raf for node + browser */
var raf = typeof requestAnimationFrame === 'undefined'
    /**
     * Make sure setTimeout is always invoked with
     * `this` set to `window` or `global` automatically
     **/
    ? function (cb) { return setTimeout(cb); }
    /**
     * Make sure window.requestAnimationFrame is always invoked with `this` window
     * We might have raf without window in case of `raf/polyfill` (recommended by React)
     **/
    : typeof window === 'undefined'
        ? requestAnimationFrame
        : requestAnimationFrame.bind(window);
/**
 * Utility to join classes conditionally
 */
function classes() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes
        .map(function (c) { return c && typeof c === 'object' ? Object.keys(c).map(function (key) { return !!c[key] && key; }) : [c]; })
        .reduce(function (flattened, c) { return flattened.concat(c); }, [])
        .filter(function (c) { return !!c; })
        .join(' ');
}
/**
 * Merges various styles into a single style object.
 * Note: if two objects have the same property the last one wins
 */
function extend() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    /** The final result we will return */
    var result = {};
    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
        var object = objects_1[_a];
        if (object == null || object === false) {
            continue;
        }
        for (var key in object) {
            /** Falsy values except a explicit 0 is ignored */
            var val = object[key];
            if (!val && val !== 0) {
                continue;
            }
            /** if nested media or pseudo selector */
            if (key === '$nest' && val) {
                result[key] = result['$nest'] ? extend(result['$nest'], val) : val;
            }
            /** if freestyle sub key that needs merging. We come here due to our recursive calls */
            else if ((key.indexOf('&') !== -1 || key.indexOf('@media') === 0)) {
                result[key] = result[key] ? extend(result[key], val) : val;
            }
            else {
                result[key] = val;
            }
        }
    }
    return result;
}
/**
 * Utility to help customize styles with media queries. e.g.
 * ```
 * style(
 *  media({maxWidth:500}, {color:'red'})
 * )
 * ```
 */
var media = function (mediaQuery) {
    var _a;
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    var mediaQuerySections = [];
    if (mediaQuery.type)
        mediaQuerySections.push(mediaQuery.type);
    if (mediaQuery.orientation)
        mediaQuerySections.push("(orientation: " + mediaQuery.orientation + ")");
    if (mediaQuery.minWidth)
        mediaQuerySections.push("(min-width: " + mediaLength(mediaQuery.minWidth) + ")");
    if (mediaQuery.maxWidth)
        mediaQuerySections.push("(max-width: " + mediaLength(mediaQuery.maxWidth) + ")");
    if (mediaQuery.minHeight)
        mediaQuerySections.push("(min-height: " + mediaLength(mediaQuery.minHeight) + ")");
    if (mediaQuery.maxHeight)
        mediaQuerySections.push("(max-height: " + mediaLength(mediaQuery.maxHeight) + ")");
    var stringMediaQuery = "@media " + mediaQuerySections.join(' and ');
    var object = {
        $nest: (_a = {},
            _a[stringMediaQuery] = extend.apply(void 0, objects),
            _a)
    };
    return object;
};
var mediaLength = function (value) {
    return typeof value === 'string' ? value : value + "px";
};


/***/ }),

/***/ "./node_modules/typestyle/lib.es2015/types.js":
/*!****************************************************!*\
  !*** ./node_modules/typestyle/lib.es2015/types.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/BitReader.ts":
/*!**************************!*\
  !*** ./src/BitReader.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BitView {
    constructor(buffer) {
        this.view = new Uint8Array(buffer, 0, buffer.byteLength);
    }
    getBits(offset, bits, signed = false) {
        const available = this.view.length * 8 - offset;
        if (bits > available) {
            throw new Error('Bits out of bounds');
        }
        let value = 0;
        for (let i = 0; i < bits;) {
            const remaining = bits - i;
            const bitOffset = offset & 7;
            const currentByte = this.view[offset >> 3];
            const read = Math.min(remaining, 8 - bitOffset);
            const mask = (1 << read) - 1;
            const readBits = (currentByte >> bitOffset) & mask;
            value |= readBits << i;
            offset += read;
            i += read;
        }
        if (signed) {
            if (bits !== 32 && value & (1 << (bits - 1))) {
                value |= -1 ^ ((1 << bits) - 1);
            }
            return value;
        }
        return value >>> 0;
    }
    getInt8(offset) {
        return this.getBits(offset, 8, true);
    }
    getUint8(offset) {
        return this.getBits(offset, 8, false);
    }
    getInt16(offset) {
        return this.getBits(offset, 16, true);
    }
    getUint16(offset) {
        return this.getBits(offset, 16, false);
    }
    getInt32(offset) {
        return this.getBits(offset, 32, true);
    }
    getUint32(offset) {
        return this.getBits(offset, 32, false);
    }
    getFloat32(offset) {
        BitView.scratch.setUint32(0, this.getUint32(offset));
        return BitView.scratch.getFloat32(0);
    }
    getFloat64(offset) {
        BitView.scratch.setUint32(0, this.getUint32(offset));
        BitView.scratch.setUint32(4, this.getUint32(offset + 32));
        return BitView.scratch.getFloat64(0);
    }
}
BitView.scratch = new DataView(new ArrayBuffer(8));
exports.BitView = BitView;
class BitStream {
    constructor(source) {
        this.view = new BitView(source);
        this.index = 0;
    }
    readBits(bits, signed = false) {
        const val = this.view.getBits(this.index, bits, signed);
        this.index += bits;
        return val;
    }
    readInt8() {
        const val = this.view.getInt8(this.index);
        this.index += 8;
        return val;
    }
    readUint8() {
        const val = this.view.getUint8(this.index);
        this.index += 8;
        return val;
    }
    readInt16() {
        const val = this.view.getInt16(this.index);
        this.index += 16;
        return val;
    }
    readUint16() {
        const val = this.view.getUint16(this.index);
        this.index += 16;
        return val;
    }
    readInt32() {
        const val = this.view.getInt32(this.index);
        this.index += 32;
        return val;
    }
    readUint32() {
        const val = this.view.getUint32(this.index);
        this.index += 32;
        return val;
    }
    readFloat32() {
        const val = this.view.getFloat32(this.index);
        this.index += 32;
        return val;
    }
    readFloat64() {
        const val = this.view.getFloat64(this.index);
        this.index += 64;
        return val;
    }
    readString(bytes = 0, utf8 = false) {
        let i = 0;
        const chars = [];
        let append = true;
        while (!bytes || (bytes && i < bytes)) {
            const c = this.readUint8();
            if (c === 0x00) {
                append = false;
                if (!bytes) {
                    break;
                }
            }
            if (append) {
                chars.push(c);
            }
            i++;
        }
        const string = String.fromCharCode.apply(null, chars);
        if (utf8) {
            try {
                return decodeURIComponent(string);
            }
            catch (e) {
                return string;
            }
        }
        else {
            return string;
        }
    }
}
exports.BitStream = BitStream;


/***/ }),

/***/ "./src/Bsp.ts":
/*!********************!*\
  !*** ./src/Bsp.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Bsp {
    constructor(name, entities, textures, models, lightmap) {
        this.skies = [];
        this.sprites = {};
        this.name = name;
        this.entities = entities;
        this.textures = textures;
        this.models = models;
        this.lightmap = lightmap;
    }
}
exports.Bsp = Bsp;


/***/ }),

/***/ "./src/Config.ts":
/*!***********************!*\
  !*** ./src/Config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static init(params) {
        if (typeof params === 'string') {
            return new Config({
                paths: {
                    base: params,
                    replays: `${params}/replays`,
                    maps: `${params}/maps`,
                    wads: `${params}/wads`,
                    skies: `${params}/skies`,
                    sounds: `${params}/sounds`
                }
            });
        }
        else {
            return new Config({
                paths: {
                    base: (params && params.paths && params.paths.base) || '',
                    replays: (params && params.paths && params.paths.replays) || '/replays',
                    maps: (params && params.paths && params.paths.maps) || '/maps',
                    wads: (params && params.paths && params.paths.wads) || '/wads',
                    skies: (params && params.paths && params.paths.skies) || '/skies',
                    sounds: (params && params.paths && params.paths.sounds) || '/sounds'
                }
            });
        }
    }
    constructor(params) {
        this.paths = Object.assign({}, params.paths);
    }
    getBasePath() {
        return this.paths.base;
    }
    getReplaysPath() {
        return this.paths.replays;
    }
    getMapsPath() {
        return this.paths.maps;
    }
    getWadsPath() {
        return this.paths.wads;
    }
    getSkiesPath() {
        return this.paths.skies;
    }
    getSoundsPath() {
        return this.paths.sounds;
    }
}
exports.Config = Config;


/***/ }),

/***/ "./src/Fullscreen.ts":
/*!***************************!*\
  !*** ./src/Fullscreen.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apis = [
    {
        enabled: 'fullscreenEnabled',
        element: 'fullscreenElement',
        request: 'requestFullscreen',
        exit: 'exitFullscreen',
        change: 'fullscreenchange',
        error: 'fullscreenerror'
    },
    {
        enabled: 'mozFullScreenEnabled',
        element: 'mozFullScreenElement',
        request: 'mozRequestFullScreen',
        exit: 'mozCancelFullScreen',
        change: 'mozfullscreenchange',
        error: 'mozfullscreenerror'
    },
    {
        enabled: 'webkitFullscreenEnabled',
        element: 'webkitCurrentFullScreenElement',
        request: 'webkitRequestFullscreen',
        exit: 'webkitExitFullscreen',
        change: 'webkitfullscreenchange',
        error: 'webkitfullscreenerror'
    },
    {
        enabled: 'msFullscreenEnabled',
        element: 'msFullscreenElement',
        request: 'msRequestFullscreen',
        exit: 'msExitFullscreen',
        change: 'MSFullscreenChange',
        error: 'MSFullscreenError'
    }
];
let apiIdx = 0;
const doc = document;
for (let i = 0; i < apis.length; ++i) {
    if (typeof doc[apis[i].enabled] !== 'undefined') {
        apiIdx = i;
        break;
    }
}
class Fullscreen {
    static element() {
        return doc[apis[apiIdx].element];
    }
    static enabled() {
        return doc[apis[apiIdx].enabled];
    }
    static isInFullscreen() {
        return Fullscreen.element() !== null;
    }
    static enter(node) {
        node[apis[apiIdx].request]();
    }
    static exit() {
        doc[apis[apiIdx].exit]();
    }
    static onChange(callback) {
        return window.addEventListener(apis[apiIdx].change, callback);
    }
    static onChangeRemove(callback) {
        window.removeEventListener(apis[apiIdx].change, callback);
    }
    static onError(callback) {
        return window.addEventListener(apis[apiIdx].error, callback);
    }
}
exports.Fullscreen = Fullscreen;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nanoevents_1 = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");
const Time = __webpack_require__(/*! ./Time */ "./src/Time.ts");
const Loader_1 = __webpack_require__(/*! ./Loader */ "./src/Loader.ts");
const Mouse_1 = __webpack_require__(/*! ./Input/Mouse */ "./src/Input/Mouse.ts");
const Touch_1 = __webpack_require__(/*! ./Input/Touch */ "./src/Input/Touch.ts");
const Camera_1 = __webpack_require__(/*! ./Graphics/Camera */ "./src/Graphics/Camera.ts");
const Keyboard_1 = __webpack_require__(/*! ./Input/Keyboard */ "./src/Input/Keyboard.ts");
const SoundSystem_1 = __webpack_require__(/*! ./SoundSystem */ "./src/SoundSystem.ts");
const Context_1 = __webpack_require__(/*! ./Graphics/Context */ "./src/Graphics/Context.ts");
const ReplayPlayer_1 = __webpack_require__(/*! ./ReplayPlayer */ "./src/ReplayPlayer.ts");
const Renderer_1 = __webpack_require__(/*! ./Graphics/Renderer */ "./src/Graphics/Renderer.ts");
const SkyScene_1 = __webpack_require__(/*! ./Graphics/SkyScene */ "./src/Graphics/SkyScene.ts");
const WorldScene_1 = __webpack_require__(/*! ./Graphics/WorldScene */ "./src/Graphics/WorldScene.ts");
var PlayerMode;
(function (PlayerMode) {
    PlayerMode[PlayerMode["FREE"] = 0] = "FREE";
    PlayerMode[PlayerMode["REPLAY"] = 1] = "REPLAY";
})(PlayerMode = exports.PlayerMode || (exports.PlayerMode = {}));
class Game {
    constructor(params) {
        this.pauseTime = 0;
        this.isPaused = false;
        this.lastTime = 0;
        this.accumTime = 0;
        this.timeStep = 1 / 60;
        this.title = '';
        this.pointerLocked = false;
        this.touch = new Touch_1.Touch();
        this.mouse = new Mouse_1.Mouse();
        this.keyboard = new Keyboard_1.Keyboard();
        this.entities = [];
        this.onLoadAll = (loader) => {
            if (loader && loader.replay) {
                this.changeReplay(loader.replay.data);
                this.changeMode(PlayerMode.REPLAY);
            }
            if (!loader.map || !loader.map.data) {
                return;
            }
            const map = loader.map.data;
            const skies = loader.skies;
            let skiesValid = true;
            skies.forEach(sky => {
                skiesValid = skiesValid && sky.isDone();
            });
            if (skiesValid) {
                skies.forEach(sky => (sky.data ? map.skies.push(sky.data) : 0));
            }
            Object.entries(loader.sprites).forEach(([name, item]) => {
                if (item.data) {
                    map.sprites[name] = item.data;
                }
            });
            if (loader.sounds.length > 0) {
                loader.sounds.forEach(sound => {
                    if (sound.data) {
                        this.sounds.push(sound.data);
                    }
                });
            }
            this.changeMap(map);
            this.events.emit('load', loader);
        };
        this.draw = () => {
            requestAnimationFrame(this.draw);
            const canvas = this.canvas;
            const parent = canvas.parentElement;
            if (parent) {
                const pw = parent.clientWidth;
                const ph = parent.clientHeight;
                if (canvas.width !== pw || canvas.height !== ph) {
                    canvas.width = pw;
                    canvas.height = ph;
                    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    this.camera.updateProjectionMatrix();
                    this.context.gl.viewport(0, 0, this.context.gl.drawingBufferWidth, this.context.gl.drawingBufferHeight);
                }
                if (canvas.clientWidth !== canvas.width ||
                    canvas.clientHeight !== canvas.height) {
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientHeight;
                    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    this.camera.updateProjectionMatrix();
                    this.context.gl.viewport(0, 0, this.context.gl.drawingBufferWidth, this.context.gl.drawingBufferHeight);
                }
            }
            const currTime = Time.now() / 1000;
            const dt = currTime - this.lastTime;
            this.accumTime += dt;
            while (this.accumTime > this.timeStep) {
                this.update(this.timeStep);
                this.accumTime -= this.timeStep;
            }
            this.renderer.draw();
            if (this.mapName !== '') {
                this.skyScene.draw(this.camera);
                this.worldScene.draw(this.camera, this.entities);
            }
            this.lastTime = currTime;
        };
        this.onTouchStart = (e) => {
            const touch = e.touches.item(0);
            if (touch) {
                this.touch.pressed = true;
                this.touch.position[0] = touch.clientX;
                this.touch.position[1] = touch.clientY;
            }
        };
        this.onTouchEnd = () => {
            this.touch.pressed = false;
            this.touch.delta[0] = 0;
            this.touch.delta[1] = 0;
        };
        this.onTouchMove = (e) => {
            const touch = e.touches.item(0);
            if (touch && this.touch.pressed) {
                this.touch.delta[0];
                this.touch.delta[0] = touch.clientX - this.touch.position[0];
                this.touch.delta[1] = touch.clientY - this.touch.position[1];
                this.touch.position[0] = touch.clientX;
                this.touch.position[1] = touch.clientY;
            }
        };
        this.onMouseMove = (e) => {
            if (this.pointerLocked) {
                this.mouse.delta[0] = e.movementX * 0.5;
                this.mouse.delta[1] = e.movementY * 0.5;
                this.mouse.position[0] = e.pageX;
                this.mouse.position[1] = e.pageY;
            }
        };
        this.keyDown = (e) => {
            this.keyboard.keys[e.which] = 1;
            if (this.pointerLocked) {
                e.preventDefault();
                return false;
            }
            return true;
        };
        this.keyUp = (e) => {
            this.keyboard.keys[e.which] = 0;
            if (this.pointerLocked) {
                e.preventDefault();
                return false;
            }
            return true;
        };
        this.onVisibilityChange = () => {
            if (document.hidden) {
                if (this.isPaused) {
                    return;
                }
                this.pauseTime = Time.now() / 1000;
                this.isPaused = true;
            }
            else {
                if (!this.isPaused) {
                    return;
                }
                this.lastTime = Time.now() / 1000 - this.pauseTime + this.lastTime;
                this.isPaused = false;
            }
        };
        this.sounds = [];
        this.soundSystem = new SoundSystem_1.SoundSystem();
        this.config = params.config;
        this.loader = new Loader_1.Loader(this.config);
        this.loader.events.on('loadall', this.onLoadAll);
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
        document.addEventListener('touchcancel', this.onTouchEnd, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);
        window.addEventListener('visibilitychange', this.onVisibilityChange);
        this.canvas = params.canvas;
        this.camera = Camera_1.Camera.init(this.canvas.width / this.canvas.height);
        this.context = params.context;
        this.renderer = params.renderer;
        this.worldScene = params.worldScene;
        this.skyScene = params.skyScene;
        this.mode = PlayerMode.FREE;
        this.player = new ReplayPlayer_1.ReplayPlayer(this);
        this.events = nanoevents_1.createNanoEvents();
        this.mapName = '';
    }
    static init(config) {
        const status = Context_1.Context.checkWebGLSupport();
        if (!status.hasSupport) {
            return {
                status: 'error',
                message: 'No WebGL support!'
            };
        }
        const canvas = document.createElement('canvas');
        if (!canvas) {
            return {
                status: 'error',
                message: 'Failed to create <canvas> element!'
            };
        }
        const context = Context_1.Context.init(canvas);
        if (!context) {
            return {
                status: 'error',
                message: 'Failed to initialize WebGL context'
            };
        }
        const renderer = Renderer_1.Renderer.init(context);
        if (!renderer) {
            return {
                status: 'error',
                message: 'Failed to initialize renderer'
            };
        }
        const worldScene = WorldScene_1.WorldScene.init(context);
        if (!worldScene) {
            return {
                status: 'error',
                message: 'Failed to initialize world scene'
            };
        }
        const skyScene = SkyScene_1.SkyScene.init(context);
        if (!skyScene) {
            return {
                status: 'error',
                message: 'Failed to initialize sky scene'
            };
        }
        const game = new Game({
            canvas,
            config,
            context,
            renderer,
            worldScene,
            skyScene
        });
        return {
            status: 'success',
            game
        };
    }
    getCanvas() {
        return this.canvas;
    }
    load(name) {
        this.events.emit('loadstart');
        this.loader.load(name);
    }
    changeMap(map) {
        if (this.mapName.toLowerCase() === map.name.toLowerCase()) {
            return;
        }
        this.mapName = map.name;
        this.worldScene.changeMap(map);
        this.skyScene.changeMap(map);
        this.entities = map.entities;
        const spawn = map.entities.find(e => e['classname'] === 'info_player_start');
        if (spawn) {
            this.camera.position[0] = spawn.origin[0];
            this.camera.position[1] = spawn.origin[1];
            this.camera.position[2] = spawn.origin[2];
        }
        else {
            this.camera.position[0] = 0;
            this.camera.position[1] = 0;
            this.camera.position[2] = 0;
        }
        this.camera.rotation[0] = 0;
        this.camera.rotation[1] = 0;
        this.camera.rotation[2] = 0;
    }
    changeReplay(replay) {
        this.events.emit('prereplaychange', this, replay);
        this.player.changeReplay(replay);
        this.events.emit('postreplaychange', this, replay);
    }
    changeMode(mode) {
        this.mode = mode;
        this.events.emit('modechange', mode);
    }
    setTitle(title) {
        this.title = title;
        this.events.emit('titlechange', title);
    }
    getTitle() {
        return this.title;
    }
    update(dt) {
        this.events.emit('preupdate', this);
        const camera = this.camera;
        const keyboard = this.keyboard;
        const mouse = this.mouse;
        const touch = this.touch;
        if (this.mode === PlayerMode.REPLAY) {
            this.player.update(dt);
        }
        else if (this.mode === PlayerMode.FREE) {
            if (this.touch.pressed) {
                camera.rotation[0] = Math.min(Math.max(camera.rotation[0] + touch.delta[1] / 100, -Math.PI / 2), Math.PI / 2);
                camera.rotation[1] -= touch.delta[0] / 100;
            }
            else {
                camera.rotation[0] = Math.min(Math.max(camera.rotation[0] + mouse.delta[1] / 100, -Math.PI / 2), Math.PI / 2);
                camera.rotation[1] -= mouse.delta[0] / 100;
            }
            const speed = 500;
            const ds = speed * dt;
            const KEY_W = Keyboard_1.Keyboard.KEYS.W;
            const KEY_S = Keyboard_1.Keyboard.KEYS.S;
            const KEY_A = Keyboard_1.Keyboard.KEYS.A;
            const KEY_D = Keyboard_1.Keyboard.KEYS.D;
            const downKey = Keyboard_1.Keyboard.KEYS.C;
            const upKey = Keyboard_1.Keyboard.KEYS.SPACE;
            if (keyboard.keys[KEY_W] !== keyboard.keys[KEY_S]) {
                if (keyboard.keys[KEY_W]) {
                    camera.position[1] -= Math.cos(camera.rotation[1] + Math.PI / 2) * ds;
                    camera.position[0] += Math.sin(camera.rotation[1] + Math.PI / 2) * ds;
                }
                else if (keyboard.keys[KEY_S]) {
                    camera.position[1] -= Math.cos(camera.rotation[1] - Math.PI / 2) * ds;
                    camera.position[0] += Math.sin(camera.rotation[1] - Math.PI / 2) * ds;
                }
            }
            if (keyboard.keys[KEY_A] !== keyboard.keys[KEY_D]) {
                if (keyboard.keys[KEY_A]) {
                    camera.position[1] += Math.cos(camera.rotation[1]) * ds;
                    camera.position[0] -= Math.sin(camera.rotation[1]) * ds;
                }
                else if (keyboard.keys[KEY_D]) {
                    camera.position[1] -= Math.cos(camera.rotation[1]) * ds;
                    camera.position[0] += Math.sin(camera.rotation[1]) * ds;
                }
            }
            if (keyboard.keys[upKey] !== keyboard.keys[downKey]) {
                if (keyboard.keys[upKey]) {
                    camera.position[2] += ds;
                }
                else if (keyboard.keys[downKey]) {
                    camera.position[2] -= ds;
                }
            }
        }
        mouse.delta[0] = 0;
        mouse.delta[1] = 0;
        this.events.emit('postupdate', this);
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/Graphics/Camera.ts":
/*!********************************!*\
  !*** ./src/Graphics/Camera.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/lib/gl-matrix.js");
class Camera {
    constructor(aspect) {
        this.projectionMatrix = gl_matrix_1.mat4.create();
        this.fov = gl_matrix_1.glMatrix.toRadian(60);
        this.near = 1.0;
        this.far = 8192.0;
        this.viewMatrix = gl_matrix_1.mat4.create();
        this.position = gl_matrix_1.vec3.create();
        this.rotation = gl_matrix_1.vec3.create();
        this.aspect = aspect;
        this.updateProjectionMatrix();
    }
    static init(aspect) {
        return new Camera(aspect);
    }
    updateProjectionMatrix() {
        gl_matrix_1.mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
    }
    updateViewMatrix() {
        gl_matrix_1.mat4.identity(this.viewMatrix);
        gl_matrix_1.mat4.rotateX(this.viewMatrix, this.viewMatrix, this.rotation[0] - Math.PI / 2);
        gl_matrix_1.mat4.rotateZ(this.viewMatrix, this.viewMatrix, Math.PI / 2 - this.rotation[1]);
        gl_matrix_1.mat4.translate(this.viewMatrix, this.viewMatrix, [
            -this.position[0],
            -this.position[1],
            -this.position[2]
        ]);
    }
}
exports.Camera = Camera;


/***/ }),

/***/ "./src/Graphics/Context.ts":
/*!*********************************!*\
  !*** ./src/Graphics/Context.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["VERTEX"] = 0] = "VERTEX";
    ShaderType[ShaderType["FRAGMENT"] = 1] = "FRAGMENT";
})(ShaderType = exports.ShaderType || (exports.ShaderType = {}));
class Context {
    static init(canvas) {
        const gl = canvas.getContext('webgl', {
            alpha: false
        });
        if (!gl) {
            console.error('Failed to get WebGL context');
            return null;
        }
        return new Context(gl);
    }
    static checkWebGLSupport() {
        const MESSAGES = {
            BAD_BROWSER: 'Your browser does not seem to support WebGL',
            BAD_GPU: 'Your graphics card does not seem to support WebGL'
        };
        const wnd = window;
        if (!wnd.WebGLRenderingContext) {
            return {
                hasSupport: false,
                message: MESSAGES.BAD_BROWSER
            };
        }
        const c = document.createElement('canvas');
        try {
            const ctx = c.getContext('webgl') || c.getContext('experimental-webgl');
            if (ctx) {
                return {
                    hasSupport: true,
                    message: ''
                };
            }
            else {
                return {
                    hasSupport: false,
                    message: MESSAGES.BAD_GPU
                };
            }
        }
        catch (e) {
            return {
                hasSupport: false,
                message: MESSAGES.BAD_GPU
            };
        }
    }
    constructor(gl) {
        this.gl = gl;
    }
    createProgram(params) {
        const gl = this.gl;
        var program = gl.createProgram();
        if (!program) {
            console.error('Failed to create WebGL program');
            return null;
        }
        const vertexShader = this.createShader({
            source: params.vertexShaderSrc,
            type: ShaderType.VERTEX
        });
        if (!vertexShader) {
            console.error('Failed to compile vertex shader');
            return null;
        }
        const fragmentShader = this.createShader({
            source: params.fragmentShaderSrc,
            type: ShaderType.FRAGMENT
        });
        if (!fragmentShader) {
            console.error('Failed to compile fragment shader');
            return null;
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            const reason = gl.getProgramInfoLog(program);
            console.error(`Could not initialize shader: ${reason}`);
            return null;
        }
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            const reason = gl.getProgramInfoLog(program);
            console.error(`Could not initialize shader: ${reason}`);
            return null;
        }
        gl.useProgram(program);
        const attributes = {};
        for (let i = 0; i < params.attributeNames.length; ++i) {
            const name = params.attributeNames[i];
            const attr = gl.getAttribLocation(program, name);
            if (attr === -1) {
                console.error(`gl.getAttribLocation failed for attrib named "${name}"`);
                gl.deleteProgram(program);
                return null;
            }
            attributes[name] = attr;
        }
        const uniforms = {};
        for (let i = 0; i < params.uniformNames.length; ++i) {
            const name = params.uniformNames[i];
            const uniform = gl.getUniformLocation(program, name);
            if (uniform === null) {
                console.error(`gl.getUniformLocation failed for uniform named "${name}"`);
                gl.deleteProgram(program);
                return null;
            }
            uniforms[name] = uniform;
        }
        return {
            handle: program,
            attributes,
            uniforms
        };
    }
    createShader(params) {
        const gl = this.gl;
        const shader = params.type === ShaderType.VERTEX
            ? gl.createShader(gl.VERTEX_SHADER)
            : gl.createShader(gl.FRAGMENT_SHADER);
        if (!shader) {
            console.error('Failed to create shader program');
            return null;
        }
        gl.shaderSource(shader, params.source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    getAnisotropyExtension() {
        return (this.gl.getExtension('EXT_texture_filter_anisotropic') ||
            this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
            this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic'));
    }
    getMaxAnisotropy(extension) {
        return this.gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    }
}
exports.Context = Context;


/***/ }),

/***/ "./src/Graphics/Renderer.ts":
/*!**********************************!*\
  !*** ./src/Graphics/Renderer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Renderer {
    constructor(params) {
        this.draw = () => {
            const gl = this.context.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        this.context = params.context;
    }
    static init(context) {
        const gl = context.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        return new Renderer({ context });
    }
}
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/Graphics/SkyScene.ts":
/*!**********************************!*\
  !*** ./src/Graphics/SkyScene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SkyShader_1 = __webpack_require__(/*! ./SkyShader/SkyShader */ "./src/Graphics/SkyShader/SkyShader.ts");
class SkyScene {
    constructor(params) {
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.texture = null;
        this.isReady = false;
        this.context = params.context;
        this.shader = params.shader;
    }
    static init(context) {
        const shader = SkyShader_1.SkyShader.init(context);
        if (!shader) {
            console.error("skyscenen't");
            return null;
        }
        return new SkyScene({ context, shader });
    }
    changeMap(bsp) {
        if (bsp.skies.length !== 6) {
            this.isReady = false;
            return;
        }
        const gl = this.context.gl;
        const vertexBuffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();
        const texture = gl.createTexture();
        if (!vertexBuffer || !indexBuffer || !texture) {
            throw new Error('shouldnt happen');
        }
        const indices = new Uint8Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ]);
        const vertices = new Float32Array([
            -1.0, -1.0, 1.0, 0.499, 0.001,
            1.0, -1.0, 1.0, 0.499, 0.249,
            1.0, 1.0, 1.0, 0.001, 0.249,
            -1.0, 1.0, 1.0, 0.001, 0.001,
            -1.0, -1.0, -1.0, 0.499, 0.749,
            -1.0, 1.0, -1.0, 0.001, 0.749,
            1.0, 1.0, -1.0, 0.001, 0.501,
            1.0, -1.0, -1.0, 0.499, 0.501,
            -1.0, 1.0, -1.0, 0.501, 0.749,
            -1.0, 1.0, 1.0, 0.501, 0.501,
            1.0, 1.0, 1.0, 0.999, 0.501,
            1.0, 1.0, -1.0, 0.999, 0.749,
            -1.0, -1.0, -1.0, 0.999, 0.249,
            1.0, -1.0, -1.0, 0.501, 0.249,
            1.0, -1.0, 1.0, 0.501, 0.001,
            -1.0, -1.0, 1.0, 0.999, 0.001,
            1.0, -1.0, -1.0, 0.499, 0.499,
            1.0, 1.0, -1.0, 0.001, 0.499,
            1.0, 1.0, 1.0, 0.001, 0.251,
            1.0, -1.0, 1.0, 0.499, 0.251,
            -1.0, -1.0, -1.0, 0.501, 0.499,
            -1.0, -1.0, 1.0, 0.501, 0.251,
            -1.0, 1.0, 1.0, 0.999, 0.251,
            -1.0, 1.0, -1.0, 0.999, 0.499
        ].map((a, i) => ((i % 5) < 3) ? a * 4096 : a));
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('sky ctx fail');
        }
        const coords = {
            up: [0, 0],
            rt: [0, 256],
            dn: [0, 512],
            ft: [256, 0],
            lf: [256, 256],
            bk: [256, 512]
        };
        bsp.skies.forEach((sky) => {
            const smc = document.createElement('canvas');
            const smctx = smc.getContext('2d');
            if (!smctx) {
                throw new Error('Runtime error.');
            }
            smc.width = sky.width;
            smc.height = sky.height;
            const imageData = smctx.getImageData(0, 0, smc.width, smc.height);
            for (let i = 0; i < sky.data.length; ++i) {
                imageData.data[i] = sky.data[i];
            }
            smctx.putImageData(imageData, 0, 0);
            const side = sky.name.slice(-2);
            const c = coords[side] ? coords[side] : [];
            if (!ctx) {
                throw new Error('Runtime error.');
            }
            ctx.drawImage(smc, c[0], c[1]);
        });
        const pixelData = ctx.getImageData(0, 0, 512, 1024).data;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 1024, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(pixelData));
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const anisotropy = this.context.getAnisotropyExtension();
        if (anisotropy) {
            gl.texParameteri(gl.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, this.context.getMaxAnisotropy(anisotropy));
        }
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        this.texture = texture;
        this.isReady = true;
    }
    draw(camera) {
        if (!this.isReady) {
            return;
        }
        const gl = this.context.gl;
        const shader = this.shader;
        shader.useProgram(gl);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        shader.enableVertexAttribs(gl);
        shader.setVertexAttribPointers(gl);
        shader.setDiffuse(gl, 0);
        const x = camera.position[0];
        const y = camera.position[1];
        const z = camera.position[2];
        camera.position[0] = 0;
        camera.position[1] = 0;
        camera.position[2] = 0;
        camera.updateViewMatrix();
        camera.position[0] = x;
        camera.position[1] = y;
        camera.position[2] = z;
        shader.setViewMatrix(gl, camera.viewMatrix);
        shader.setProjectionMatrix(gl, camera.projectionMatrix);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }
}
exports.SkyScene = SkyScene;


/***/ }),

/***/ "./src/Graphics/SkyShader/SkyShader.ts":
/*!*********************************************!*\
  !*** ./src/Graphics/SkyShader/SkyShader.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fragmentSrc = `#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D diffuse;

varying vec2 vTexCoord;

void main(void) {
  vec4 diffuseColor = texture2D(diffuse, vTexCoord);
  gl_FragColor = vec4(diffuseColor.rgb, 1.0);
}`;
const vertexSrc = `#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 texCoord;

varying vec2 vTexCoord;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vTexCoord = texCoord;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1);
}`;
class SkyShader {
    static init(context) {
        const attributeNames = ['position', 'texCoord'];
        const uniformNames = ['viewMatrix', 'projectionMatrix', 'diffuse'];
        const program = context.createProgram({
            vertexShaderSrc: vertexSrc,
            fragmentShaderSrc: fragmentSrc,
            attributeNames,
            uniformNames
        });
        if (!program) {
            console.error(`Failed to create sky shader program`);
            return null;
        }
        return new SkyShader(program);
    }
    constructor(program) {
        this.program = program.handle;
        this.aPosition = program.attributes['position'];
        this.aTexCoord = program.attributes['texCoord'];
        this.uViewMx = program.uniforms['viewMatrix'];
        this.uProjectionMx = program.uniforms['projectionMatrix'];
        this.uDiffuse = program.uniforms['diffuse'];
    }
    useProgram(gl) {
        gl.useProgram(this.program);
    }
    setViewMatrix(gl, matrix) {
        gl.uniformMatrix4fv(this.uViewMx, false, matrix);
    }
    setProjectionMatrix(gl, matrix) {
        gl.uniformMatrix4fv(this.uProjectionMx, false, matrix);
    }
    setDiffuse(gl, value) {
        gl.uniform1i(this.uDiffuse, value);
    }
    enableVertexAttribs(gl) {
        gl.enableVertexAttribArray(this.aPosition);
        gl.enableVertexAttribArray(this.aTexCoord);
    }
    setVertexAttribPointers(gl) {
        gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 5 * 4, 0);
        gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 5 * 4, 3 * 4);
    }
}
exports.SkyShader = SkyShader;


/***/ }),

/***/ "./src/Graphics/Util.ts":
/*!******************************!*\
  !*** ./src/Graphics/Util.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeTexture = (pixels, width, height, newWidth, newHeight) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Runtime error.');
    }
    canvas.width = width;
    canvas.height = height;
    const nc = document.createElement('canvas');
    const nctx = nc.getContext('2d');
    if (!nctx) {
        throw new Error('Runtime error.');
    }
    nc.width = newWidth;
    nc.height = newHeight;
    const cid = ctx.createImageData(width, height);
    for (let i = 0, size = width * height * 4; i < size; i += 4) {
        cid.data[i] = pixels[i];
        cid.data[i + 1] = pixels[i + 1];
        cid.data[i + 2] = pixels[i + 2];
        cid.data[i + 3] = pixels[i + 3];
    }
    ctx.putImageData(cid, 0, 0);
    nctx.drawImage(canvas, 0, 0, newWidth, newHeight);
    return new Uint8Array(nctx.getImageData(0, 0, newWidth, newHeight).data);
};
exports.isPowerOfTwo = (n) => (n & (n - 1)) === 0;
exports.nextPowerOfTwo = (n) => {
    --n;
    for (let i = 1; i < 32; i <<= 1) {
        n = n | (n >> i);
    }
    return n + 1;
};


/***/ }),

/***/ "./src/Graphics/WorldScene.ts":
/*!************************************!*\
  !*** ./src/Graphics/WorldScene.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/lib/gl-matrix.js");
const WorldShader_1 = __webpack_require__(/*! ./WorldShader/WorldShader */ "./src/Graphics/WorldShader/WorldShader.ts");
const BspEntityParser_1 = __webpack_require__(/*! ../Parsers/BspEntityParser */ "./src/Parsers/BspEntityParser.ts");
const Sprite_1 = __webpack_require__(/*! ../Parsers/Sprite */ "./src/Parsers/Sprite.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Graphics/Util.ts");
class WorldScene {
    constructor(params) {
        this.modelMatrix = gl_matrix_1.mat4.create();
        this.sceneInfo = {
            length: 0,
            data: new Float32Array(0),
            models: []
        };
        this.bsp = null;
        this.textures = [];
        this.sprites = {};
        this.lightmap = null;
        this.buffer = params.buffer;
        this.context = params.context;
        this.shader = params.shader;
    }
    static init(context) {
        const shader = WorldShader_1.MainShader.init(context);
        if (!shader) {
            console.error('Failed to init MainShader');
            return null;
        }
        shader.useProgram(context.gl);
        const buffer = context.gl.createBuffer();
        if (!buffer) {
            console.error('Failed to create WebGL buffer');
            return null;
        }
        return new WorldScene({ buffer, context, shader });
    }
    changeMap(bsp) {
        this.fillBuffer(bsp);
        this.loadTextures(bsp);
        this.loadSpriteTextures(bsp);
        this.loadLightmap(bsp);
        this.bsp = bsp;
    }
    fillBuffer(bsp) {
        const gl = this.context.gl;
        const models = bsp.models;
        const INVISIBLE_TEXTURES = [
            'aaatrigger',
            'clip',
            'null',
            'hint',
            'nodraw',
            'invisible',
            'skip',
            'trigger',
            'sky',
            'fog'
        ];
        let size = 0;
        for (let i = 0; i < models.length; ++i) {
            const model = models[i];
            for (let j = 0; j < model.faces.length; ++j) {
                const texture = bsp.textures[model.faces[j].textureIndex];
                if (INVISIBLE_TEXTURES.indexOf(texture.name) > -1) {
                    continue;
                }
                size += model.faces[j].buffer.length;
            }
        }
        size += 7 * 6;
        const sceneInfo = {
            length: size,
            data: new Float32Array(size),
            models: []
        };
        let currentVertex = 0;
        for (let i = 0; i < bsp.models.length; ++i) {
            const model = bsp.models[i];
            const modelInfo = {
                origin: model.origin,
                offset: currentVertex,
                length: 0,
                isTransparent: false,
                faces: []
            };
            for (let j = 0; j < model.faces.length; ++j) {
                const texture = bsp.textures[model.faces[j].textureIndex];
                if (INVISIBLE_TEXTURES.indexOf(texture.name) > -1) {
                    continue;
                }
                const faceInfo = {
                    offset: currentVertex,
                    length: 0,
                    textureIndex: -1
                };
                for (let k = 0; k < model.faces[j].buffer.length; ++k) {
                    sceneInfo.data[currentVertex++] = model.faces[j].buffer[k];
                }
                if (!modelInfo.isTransparent &&
                    bsp.textures[model.faces[j].textureIndex].name[0] === '{') {
                    modelInfo.isTransparent = true;
                }
                faceInfo.textureIndex = model.faces[j].textureIndex;
                faceInfo.length = currentVertex - faceInfo.offset;
                modelInfo.faces.push(faceInfo);
            }
            modelInfo.length = currentVertex - modelInfo.offset;
            sceneInfo.models.push(modelInfo);
        }
        sceneInfo.models.push({
            origin: [0, 0, 0],
            offset: currentVertex,
            length: 4,
            isTransparent: false,
            faces: [
                {
                    offset: currentVertex,
                    length: 4,
                    textureIndex: 0
                }
            ]
        });
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = -0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 1;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0.5;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        sceneInfo.data[currentVertex++] = 0;
        currentVertex = 0;
        const sortedSceneInfo = {
            data: new Float32Array(sceneInfo.data),
            length: sceneInfo.length,
            models: sceneInfo.models.map(model => ({
                origin: [...model.origin],
                offset: model.offset,
                length: model.length,
                isTransparent: model.isTransparent,
                faces: model.faces.map(face => ({
                    offset: face.offset,
                    length: face.length,
                    textureIndex: face.textureIndex
                }))
            }))
        };
        for (let i = 0; i < sortedSceneInfo.models.length; ++i) {
            const model = sortedSceneInfo.models[i];
            model.faces.sort((a, b) => a.textureIndex - b.textureIndex);
            for (let j = 0; j < model.faces.length; ++j) {
                const face = model.faces[j];
                const newOffset = currentVertex;
                for (let k = 0; k < face.length; ++k) {
                    sortedSceneInfo.data[currentVertex] = sceneInfo.data[face.offset + k];
                    currentVertex += 1;
                }
                face.offset = newOffset;
            }
            const newFaces = [];
            let currentTextureIndex = -1;
            for (let j = 0; j < model.faces.length; ++j) {
                const face = model.faces[j];
                if (face.textureIndex === currentTextureIndex) {
                    newFaces[newFaces.length - 1].length += face.length;
                }
                else {
                    newFaces.push({
                        offset: face.offset,
                        length: face.length,
                        textureIndex: face.textureIndex
                    });
                    currentTextureIndex = face.textureIndex;
                }
            }
            model.faces = newFaces;
        }
        this.sceneInfo = sortedSceneInfo;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.sceneInfo.data, gl.STATIC_DRAW);
    }
    loadTextures(bsp) {
        const gl = this.context.gl;
        for (let i = 0; i < bsp.textures.length; ++i) {
            const glTexture = gl.createTexture();
            if (!glTexture) {
                throw new Error('fatal error');
            }
            const texture = bsp.textures[i];
            if (!Util_1.isPowerOfTwo(texture.width) || !Util_1.isPowerOfTwo(texture.height)) {
                const w = texture.width;
                const h = texture.height;
                const nw = Util_1.nextPowerOfTwo(texture.width);
                const nh = Util_1.nextPowerOfTwo(texture.height);
                texture.data = Util_1.resizeTexture(texture.data, w, h, nw, nh);
                texture.width = nw;
                texture.height = nh;
            }
            gl.bindTexture(gl.TEXTURE_2D, glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texture.width, texture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, texture.data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.generateMipmap(gl.TEXTURE_2D);
            const anisotropy = this.context.getAnisotropyExtension();
            if (anisotropy) {
                gl.texParameteri(gl.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, this.context.getMaxAnisotropy(anisotropy));
            }
            this.textures.push({
                name: texture.name,
                width: texture.width,
                height: texture.height,
                data: texture.data,
                handle: glTexture
            });
        }
    }
    loadSpriteTextures(bsp) {
        const gl = this.context.gl;
        for (const [name, sprite] of Object.entries(bsp.sprites)) {
            const glTexture = gl.createTexture();
            if (!glTexture) {
                throw new Error('fatal error');
            }
            const texture = sprite.frames[0];
            if (!Util_1.isPowerOfTwo(texture.width) || !Util_1.isPowerOfTwo(texture.height)) {
                const w = texture.width;
                const h = texture.height;
                const nw = Util_1.nextPowerOfTwo(texture.width);
                const nh = Util_1.nextPowerOfTwo(texture.height);
                texture.data = Util_1.resizeTexture(texture.data, w, h, nw, nh);
                texture.width = nw;
                texture.height = nh;
            }
            gl.bindTexture(gl.TEXTURE_2D, glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texture.width, texture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, texture.data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.generateMipmap(gl.TEXTURE_2D);
            const anisotropy = this.context.getAnisotropyExtension();
            if (anisotropy) {
                gl.texParameteri(gl.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, this.context.getMaxAnisotropy(anisotropy));
            }
            this.textures.push({
                name: name,
                width: texture.width,
                height: texture.height,
                data: texture.data,
                handle: glTexture
            });
            this.sprites[name] = sprite;
        }
    }
    loadLightmap(bsp) {
        const gl = this.context.gl;
        const glLightmap = gl.createTexture();
        if (!glLightmap) {
            throw new Error('fatal error');
        }
        gl.bindTexture(gl.TEXTURE_2D, glLightmap);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, bsp.lightmap.width, bsp.lightmap.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, bsp.lightmap.data);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        this.lightmap = {
            data: bsp.lightmap.data,
            handle: glLightmap
        };
    }
    draw(camera, entities) {
        if (!this.bsp || !this.lightmap) {
            return;
        }
        const gl = this.context.gl;
        const shader = this.shader;
        shader.useProgram(gl);
        camera.updateProjectionMatrix();
        camera.updateViewMatrix();
        shader.setViewMatrix(gl, camera.viewMatrix);
        shader.setProjectionMatrix(gl, camera.projectionMatrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        shader.enableVertexAttribs(gl);
        shader.setVertexAttribPointers(gl);
        shader.setDiffuse(gl, 0);
        shader.setLightmap(gl, 1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.lightmap.handle);
        gl.activeTexture(gl.TEXTURE0);
        const opaqueEntities = [];
        const transparentEntities = [];
        for (let i = 1; i < entities.length; ++i) {
            const e = entities[i];
            if (e.model) {
                if (!e.rendermode ||
                    e.rendermode == BspEntityParser_1.RenderMode.Normal ||
                    e.rendermode == BspEntityParser_1.RenderMode.Solid) {
                    if (e.model[0] === '*') {
                        const model = this.sceneInfo.models[parseInt(e.model.substr(1))];
                        if (model.isTransparent) {
                            transparentEntities.push(e);
                            continue;
                        }
                    }
                    else if (e.model.indexOf('.spr') > -1) {
                        transparentEntities.push(e);
                        continue;
                    }
                    opaqueEntities.push(e);
                }
                else if (e.rendermode == BspEntityParser_1.RenderMode.Additive) {
                    transparentEntities.push(e);
                }
                else {
                    transparentEntities.push(e);
                }
            }
        }
        shader.setOpacity(gl, 1.0);
        this.renderWorldSpawn();
        this.renderOpaqueEntities(camera, opaqueEntities);
        if (transparentEntities.length) {
            gl.depthMask(false);
            this.renderTransparentEntities(transparentEntities, camera);
            gl.depthMask(true);
        }
    }
    renderWorldSpawn() {
        const model = this.sceneInfo.models[0];
        const gl = this.context.gl;
        gl_matrix_1.mat4.identity(this.modelMatrix);
        this.shader.setModelMatrix(gl, this.modelMatrix);
        for (let j = 0; j < model.faces.length; ++j) {
            const face = model.faces[j];
            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
        }
    }
    renderOpaqueEntities(camera, entities) {
        const gl = this.context.gl;
        const shader = this.shader;
        const mmx = this.modelMatrix;
        for (let i = 0; i < entities.length; ++i) {
            const entity = entities[i];
            const modelIndex = parseInt(entity.model.substr(1));
            const model = this.sceneInfo.models[modelIndex];
            if (model) {
                const angles = entity.angles || [0, 0, 0];
                const origin = entity.origin
                    ? gl_matrix_1.vec3.fromValues(entity.origin[0], entity.origin[1], entity.origin[2])
                    : gl_matrix_1.vec3.create();
                gl_matrix_1.vec3.add(origin, origin, model.origin);
                gl_matrix_1.mat4.identity(mmx);
                gl_matrix_1.mat4.translate(mmx, mmx, origin);
                gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180);
                gl_matrix_1.mat4.rotateX(this.modelMatrix, this.modelMatrix, (angles[2] * Math.PI) / 180);
                shader.setModelMatrix(gl, this.modelMatrix);
                for (let j = 0; j < model.faces.length; ++j) {
                    const face = model.faces[j];
                    gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                    gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                }
            }
            else if (entity.model.indexOf('.spr') > -1) {
                const texture = this.textures.find(a => a.name === entity.model);
                const sprite = this.sprites[entity.model];
                if (texture && sprite) {
                    const origin = entity.origin
                        ? gl_matrix_1.vec3.fromValues(entity.origin[0], entity.origin[1], entity.origin[2])
                        : gl_matrix_1.vec3.create();
                    const scale = gl_matrix_1.vec3.fromValues(texture.width, 1, texture.height);
                    const angles = entity.angles
                        ? gl_matrix_1.vec3.fromValues(entity.angles[0], entity.angles[2], entity.angles[1])
                        : gl_matrix_1.vec3.create();
                    gl_matrix_1.vec3.scale(scale, scale, entity.scale || 1);
                    gl_matrix_1.mat4.identity(mmx);
                    gl_matrix_1.mat4.translate(mmx, mmx, origin);
                    switch (sprite.header.type) {
                        case Sprite_1.SpriteType.VP_PARALLEL_UPRIGHT: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.FACING_UPRIGHT: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.VP_PARALLEL: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, Math.atan2(origin[1] - camera.position[1], origin[0] - camera.position[0]) +
                                Math.PI / 2);
                            gl_matrix_1.mat4.rotateX(mmx, mmx, Math.atan2(camera.position[2] - origin[2], Math.sqrt(Math.pow(camera.position[0] - origin[0], 2) +
                                Math.pow(camera.position[1] - origin[1], 2))));
                            break;
                        }
                        case Sprite_1.SpriteType.ORIENTED: {
                            gl_matrix_1.mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateX(mmx, mmx, (angles[2] * Math.PI) / 180 - Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.VP_PARALLEL_ORIENTED: {
                            gl_matrix_1.mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI);
                            break;
                        }
                        default: {
                            throw new Error('Invalid sprite type');
                        }
                    }
                    gl_matrix_1.mat4.scale(mmx, mmx, scale);
                    shader.setModelMatrix(gl, mmx);
                    shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                    const renderMode = entity.rendermode || BspEntityParser_1.RenderMode.Normal;
                    switch (renderMode) {
                        case BspEntityParser_1.RenderMode.Normal: {
                            shader.setOpacity(gl, 1);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Color: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Texture: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Glow: {
                            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Solid: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Additive: {
                            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        }
                    }
                }
            }
        }
    }
    renderTransparentEntities(entities, camera) {
        const gl = this.context.gl;
        const shader = this.shader;
        const mmx = this.modelMatrix;
        const entityDistances = entities
            .map((e, i) => ({
            index: i,
            distance: gl_matrix_1.vec3.dist(camera.position, e.origin || [0, 0, 0])
        }))
            .sort((a, b) => a.distance - b.distance);
        for (let i = 0; i < entityDistances.length; ++i) {
            const entity = entities[entityDistances[i].index];
            const modelIndex = parseInt(entity.model.substr(1));
            const model = this.sceneInfo.models[modelIndex];
            if (model) {
                const angles = entity.angles || [0, 0, 0];
                const origin = entity.origin || [0, 0, 0];
                origin[0] += model.origin[0];
                origin[1] += model.origin[1];
                origin[2] += model.origin[2];
                gl_matrix_1.mat4.identity(mmx);
                gl_matrix_1.mat4.translate(mmx, mmx, origin);
                gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180);
                gl_matrix_1.mat4.rotateX(this.modelMatrix, this.modelMatrix, (angles[2] * Math.PI) / 180);
                shader.setModelMatrix(gl, this.modelMatrix);
                const renderMode = entity.rendermode || BspEntityParser_1.RenderMode.Normal;
                switch (renderMode) {
                    case BspEntityParser_1.RenderMode.Normal: {
                        shader.setOpacity(gl, 1);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        break;
                    }
                    case BspEntityParser_1.RenderMode.Color: {
                        shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        break;
                    }
                    case BspEntityParser_1.RenderMode.Texture: {
                        shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        break;
                    }
                    case BspEntityParser_1.RenderMode.Glow: {
                        shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        break;
                    }
                    case BspEntityParser_1.RenderMode.Solid: {
                        shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        break;
                    }
                    case BspEntityParser_1.RenderMode.Additive: {
                        gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                        shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                        for (let j = 0; j < model.faces.length; ++j) {
                            const face = model.faces[j];
                            gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle);
                            gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7);
                        }
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    }
                }
            }
            else if (entity.model.indexOf('.spr') > -1) {
                const texture = this.textures.find(a => a.name === entity.model);
                const sprite = this.sprites[entity.model];
                if (texture && sprite) {
                    const origin = entity.origin
                        ? gl_matrix_1.vec3.fromValues(entity.origin[0], entity.origin[1], entity.origin[2])
                        : gl_matrix_1.vec3.create();
                    const scale = gl_matrix_1.vec3.fromValues(texture.width, 1, texture.height);
                    const angles = entity.angles
                        ? gl_matrix_1.vec3.fromValues(entity.angles[0], entity.angles[2], entity.angles[1])
                        : gl_matrix_1.vec3.create();
                    gl_matrix_1.vec3.scale(scale, scale, entity.scale || 1);
                    gl_matrix_1.mat4.identity(mmx);
                    gl_matrix_1.mat4.translate(mmx, mmx, origin);
                    switch (sprite.header.type) {
                        case Sprite_1.SpriteType.VP_PARALLEL_UPRIGHT: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.FACING_UPRIGHT: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.VP_PARALLEL: {
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, Math.atan2(origin[1] - camera.position[1], origin[0] - camera.position[0]) +
                                Math.PI / 2);
                            gl_matrix_1.mat4.rotateX(mmx, mmx, Math.atan2(camera.position[2] - origin[2], Math.sqrt(Math.pow(camera.position[0] - origin[0], 2) +
                                Math.pow(camera.position[1] - origin[1], 2))));
                            break;
                        }
                        case Sprite_1.SpriteType.ORIENTED: {
                            gl_matrix_1.mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateX(mmx, mmx, (angles[2] * Math.PI) / 180 - Math.PI / 2);
                            break;
                        }
                        case Sprite_1.SpriteType.VP_PARALLEL_ORIENTED: {
                            gl_matrix_1.mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI);
                            gl_matrix_1.mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI);
                            break;
                        }
                        default: {
                            throw new Error('Invalid sprite type');
                        }
                    }
                    gl_matrix_1.mat4.scale(mmx, mmx, scale);
                    shader.setModelMatrix(gl, mmx);
                    shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                    const renderMode = entity.rendermode || BspEntityParser_1.RenderMode.Normal;
                    switch (renderMode) {
                        case BspEntityParser_1.RenderMode.Normal: {
                            shader.setOpacity(gl, 1);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Color: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Texture: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Glow: {
                            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Solid: {
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            break;
                        }
                        case BspEntityParser_1.RenderMode.Additive: {
                            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                            shader.setOpacity(gl, (entity.renderamt || 255) / 255);
                            gl.bindTexture(gl.TEXTURE_2D, texture.handle);
                            gl.drawArrays(gl.TRIANGLES, this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                                7, 6);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        }
                    }
                }
            }
        }
    }
}
exports.WorldScene = WorldScene;


/***/ }),

/***/ "./src/Graphics/WorldShader/WorldShader.ts":
/*!*************************************************!*\
  !*** ./src/Graphics/WorldShader/WorldShader.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fragmentSrc = `#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D diffuse;
uniform sampler2D lightmap;
uniform float opacity;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

void main(void) {
  vec4 diffuseColor = texture2D(diffuse, vTexCoord);
  vec4 lightColor = texture2D(lightmap, vLightmapCoord);

  gl_FragColor = vec4(diffuseColor.rgb * lightColor.rgb, diffuseColor.a * opacity);
}`;
const vertexSrc = `#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 texCoord;
attribute vec2 texCoord2;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vTexCoord = texCoord;
  vLightmapCoord = texCoord2;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}`;
class MainShader {
    static init(context) {
        const attributeNames = ['position', 'texCoord', 'texCoord2'];
        const uniformNames = [
            'modelMatrix',
            'viewMatrix',
            'projectionMatrix',
            'diffuse',
            'lightmap',
            'opacity'
        ];
        const program = context.createProgram({
            vertexShaderSrc: vertexSrc,
            fragmentShaderSrc: fragmentSrc,
            attributeNames,
            uniformNames
        });
        if (!program) {
            console.error('Failed to create MainShader program');
            return null;
        }
        return new MainShader(program);
    }
    constructor(program) {
        this.program = program.handle;
        this.aPosition = program.attributes['position'];
        this.aTexCoord = program.attributes['texCoord'];
        this.aTexCoord2 = program.attributes['texCoord2'];
        this.uModelMx = program.uniforms['modelMatrix'];
        this.uViewMx = program.uniforms['viewMatrix'];
        this.uProjectionMx = program.uniforms['projectionMatrix'];
        this.uDiffuse = program.uniforms['diffuse'];
        this.uLightmap = program.uniforms['lightmap'];
        this.uOpacity = program.uniforms['opacity'];
    }
    useProgram(gl) {
        gl.useProgram(this.program);
    }
    setModelMatrix(gl, matrix) {
        gl.uniformMatrix4fv(this.uModelMx, false, matrix);
    }
    setViewMatrix(gl, matrix) {
        gl.uniformMatrix4fv(this.uViewMx, false, matrix);
    }
    setProjectionMatrix(gl, matrix) {
        gl.uniformMatrix4fv(this.uProjectionMx, false, matrix);
    }
    setDiffuse(gl, value) {
        gl.uniform1i(this.uDiffuse, value);
    }
    setLightmap(gl, val) {
        gl.uniform1i(this.uLightmap, val);
    }
    setOpacity(gl, val) {
        gl.uniform1f(this.uOpacity, val);
    }
    enableVertexAttribs(gl) {
        gl.enableVertexAttribArray(this.aPosition);
        gl.enableVertexAttribArray(this.aTexCoord);
        gl.enableVertexAttribArray(this.aTexCoord2);
    }
    setVertexAttribPointers(gl) {
        gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 7 * 4, 0);
        gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 7 * 4, 3 * 4);
        gl.vertexAttribPointer(this.aTexCoord2, 2, gl.FLOAT, false, 7 * 4, 5 * 4);
    }
}
exports.MainShader = MainShader;


/***/ }),

/***/ "./src/Input/Keyboard.ts":
/*!*******************************!*\
  !*** ./src/Input/Keyboard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Keyboard {
    constructor() {
        this.keys = new Uint8Array(256);
        for (let i = 0; i < 256; ++i) {
            this.keys[0] = 0;
        }
    }
}
exports.Keyboard = Keyboard;
(function (Keyboard) {
    let KEYS;
    (function (KEYS) {
        KEYS[KEYS["A"] = 'A'.charCodeAt(0)] = "A";
        KEYS[KEYS["B"] = 'B'.charCodeAt(0)] = "B";
        KEYS[KEYS["C"] = 'C'.charCodeAt(0)] = "C";
        KEYS[KEYS["D"] = 'D'.charCodeAt(0)] = "D";
        KEYS[KEYS["E"] = 'E'.charCodeAt(0)] = "E";
        KEYS[KEYS["F"] = 'F'.charCodeAt(0)] = "F";
        KEYS[KEYS["G"] = 'G'.charCodeAt(0)] = "G";
        KEYS[KEYS["H"] = 'H'.charCodeAt(0)] = "H";
        KEYS[KEYS["I"] = 'I'.charCodeAt(0)] = "I";
        KEYS[KEYS["J"] = 'J'.charCodeAt(0)] = "J";
        KEYS[KEYS["K"] = 'K'.charCodeAt(0)] = "K";
        KEYS[KEYS["L"] = 'L'.charCodeAt(0)] = "L";
        KEYS[KEYS["M"] = 'M'.charCodeAt(0)] = "M";
        KEYS[KEYS["N"] = 'N'.charCodeAt(0)] = "N";
        KEYS[KEYS["O"] = 'O'.charCodeAt(0)] = "O";
        KEYS[KEYS["P"] = 'P'.charCodeAt(0)] = "P";
        KEYS[KEYS["Q"] = 'Q'.charCodeAt(0)] = "Q";
        KEYS[KEYS["R"] = 'R'.charCodeAt(0)] = "R";
        KEYS[KEYS["S"] = 'S'.charCodeAt(0)] = "S";
        KEYS[KEYS["T"] = 'T'.charCodeAt(0)] = "T";
        KEYS[KEYS["U"] = 'U'.charCodeAt(0)] = "U";
        KEYS[KEYS["V"] = 'V'.charCodeAt(0)] = "V";
        KEYS[KEYS["W"] = 'W'.charCodeAt(0)] = "W";
        KEYS[KEYS["X"] = 'X'.charCodeAt(0)] = "X";
        KEYS[KEYS["Y"] = 'Y'.charCodeAt(0)] = "Y";
        KEYS[KEYS["Z"] = 'Z'.charCodeAt(0)] = "Z";
        KEYS[KEYS["CTRL"] = 17] = "CTRL";
        KEYS[KEYS["ALT"] = 18] = "ALT";
        KEYS[KEYS["SPACE"] = 32] = "SPACE";
    })(KEYS = Keyboard.KEYS || (Keyboard.KEYS = {}));
})(Keyboard = exports.Keyboard || (exports.Keyboard = {}));


/***/ }),

/***/ "./src/Input/Mouse.ts":
/*!****************************!*\
  !*** ./src/Input/Mouse.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/lib/gl-matrix.js");
class Mouse {
    constructor() {
        this.click = false;
        this.leftClick = false;
        this.rightClick = false;
        this.position = gl_matrix_1.vec2.create();
        this.delta = gl_matrix_1.vec2.create();
    }
}
exports.Mouse = Mouse;


/***/ }),

/***/ "./src/Input/Touch.ts":
/*!****************************!*\
  !*** ./src/Input/Touch.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/lib/gl-matrix.js");
class Touch {
    constructor() {
        this.pressed = false;
        this.position = gl_matrix_1.vec2.create();
        this.delta = gl_matrix_1.vec2.create();
    }
}
exports.Touch = Touch;


/***/ }),

/***/ "./src/Loader.ts":
/*!***********************!*\
  !*** ./src/Loader.ts ***!
  \***********************/
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
const nanoevents_1 = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");
const Sound_1 = __webpack_require__(/*! ./Sound */ "./src/Sound.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Util.ts");
const Tga_1 = __webpack_require__(/*! ./Parsers/Tga */ "./src/Parsers/Tga.ts");
const Wad_1 = __webpack_require__(/*! ./Parsers/Wad */ "./src/Parsers/Wad.ts");
const Replay_1 = __webpack_require__(/*! ./Replay/Replay */ "./src/Replay/Replay.ts");
const Sprite_1 = __webpack_require__(/*! ./Parsers/Sprite */ "./src/Parsers/Sprite.ts");
const Xhr_1 = __webpack_require__(/*! ./Xhr */ "./src/Xhr.ts");
const BspParser_1 = __webpack_require__(/*! ./Parsers/BspParser */ "./src/Parsers/BspParser.ts");
var LoadItemStatus;
(function (LoadItemStatus) {
    LoadItemStatus[LoadItemStatus["Loading"] = 1] = "Loading";
    LoadItemStatus[LoadItemStatus["Skipped"] = 2] = "Skipped";
    LoadItemStatus[LoadItemStatus["Error"] = 3] = "Error";
    LoadItemStatus[LoadItemStatus["Done"] = 4] = "Done";
})(LoadItemStatus || (LoadItemStatus = {}));
class LoadItemBase {
    constructor(name) {
        this.name = name;
        this.progress = 0;
        this.status = LoadItemStatus.Loading;
        this.data = null;
    }
    isLoading() {
        return this.status === LoadItemStatus.Loading;
    }
    skip() {
        this.status = LoadItemStatus.Skipped;
    }
    isSkipped() {
        return this.status === LoadItemStatus.Skipped;
    }
    error() {
        this.status = LoadItemStatus.Error;
    }
    isError() {
        return this.status === LoadItemStatus.Error;
    }
    done(data) {
        this.status = LoadItemStatus.Done;
        this.data = data;
    }
    isDone() {
        return this.status === LoadItemStatus.Done;
    }
}
class LoadItemReplay extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'replay';
    }
}
class LoadItemBsp extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'bsp';
    }
}
class LoadItemSky extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'sky';
    }
}
class LoadItemWad extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'wad';
    }
}
class LoadItemSound extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'sound';
    }
}
class LoadItemSprite extends LoadItemBase {
    constructor() {
        super(...arguments);
        this.type = 'sprite';
    }
}
class Loader {
    constructor(config) {
        this.sprites = {};
        this.config = config;
        this.replay = undefined;
        this.map = undefined;
        this.skies = [];
        this.wads = [];
        this.sounds = [];
        this.events = nanoevents_1.createNanoEvents();
        this.events.on('error', (err) => {
            console.error(err);
        });
    }
    clear() {
        this.replay = undefined;
        this.map = undefined;
        this.skies.length = 0;
        this.wads.length = 0;
        this.sounds.length = 0;
        this.sprites = {};
    }
    checkStatus() {
        if (this.replay && !this.replay.isDone()) {
            return;
        }
        if (this.map && !this.map.isDone()) {
            return;
        }
        for (let i = 0; i < this.skies.length; ++i) {
            if (this.skies[i].isLoading()) {
                return;
            }
        }
        for (let i = 0; i < this.wads.length; ++i) {
            if (this.wads[i].isLoading()) {
                return;
            }
        }
        for (let i = 0; i < this.sounds.length; ++i) {
            if (this.sounds[i].isLoading()) {
                return;
            }
        }
        const sprites = Object.entries(this.sprites);
        for (let i = 0; i < sprites.length; ++i) {
            if (sprites[i][1].isLoading()) {
                return;
            }
        }
        this.events.emit('loadall', this);
    }
    load(name) {
        const extension = Util_1.extname(name);
        if (extension === '.dem') {
            this.loadReplay(name);
        }
        else if (extension === '.bsp') {
            this.loadMap(name);
        }
        else {
            this.events.emit('error', 'Invalid file extension', name);
        }
    }
    loadReplay(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.replay = new LoadItemReplay(name);
            this.events.emit('loadstart', this.replay);
            const progressCallback = (_1, progress) => {
                if (this.replay) {
                    this.replay.progress = progress;
                }
                this.events.emit('progress', this.replay);
            };
            const replayPath = this.config.getReplaysPath();
            const buffer = yield Xhr_1.xhr(`${replayPath}/${name}`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch((err) => {
                if (this.replay) {
                    this.replay.error();
                }
                this.events.emit('error', err, this.replay);
            });
            if (this.replay.isError()) {
                return;
            }
            const replay = yield Replay_1.Replay.parseIntoChunks(buffer);
            this.replay.done(replay);
            this.loadMap(replay.maps[0].name + '.bsp');
            const sounds = replay.maps[0].resources.sounds;
            sounds.forEach((sound) => {
                if (sound.used) {
                    this.loadSound(sound.name, sound.index);
                }
            });
            this.events.emit('load', this.replay);
            this.checkStatus();
        });
    }
    loadMap(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map = new LoadItemBsp(name);
            this.events.emit('loadstart', this.map);
            const progressCallback = (_1, progress) => {
                if (this.map) {
                    this.map.progress = progress;
                }
                this.events.emit('progress', this.map);
            };
            const mapsPath = this.config.getMapsPath();
            const buffer = yield Xhr_1.xhr(`${mapsPath}/${name}`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch(err => {
                if (this.map) {
                    this.map.error();
                }
                this.events.emit('error', err, this.map);
            });
            if (this.map.isError()) {
                return;
            }
            const map = yield BspParser_1.BspParser.parse(name, buffer);
            this.map.done(map);
            map.entities
                .map((e) => {
                if (typeof e.model === 'string' && e.model.indexOf('.spr') > -1) {
                    return e.model;
                }
                return undefined;
            })
                .filter((a, pos, arr) => a && arr.indexOf(a) === pos)
                .forEach(a => a && this.loadSprite(a));
            const skyname = map.entities[0].skyname;
            if (skyname) {
                const sides = ['bk', 'dn', 'ft', 'lf', 'rt', 'up'];
                sides.map(a => `${skyname}${a}`).forEach(a => this.loadSky(a));
            }
            if (map.textures.find(a => a.isExternal)) {
                const wads = map.entities[0].wad;
                const wadPromises = wads.map((w) => this.loadWad(w));
                yield Promise.all(wadPromises);
            }
            this.events.emit('load', this.map);
            this.checkStatus();
        });
    }
    loadSprite(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new LoadItemSprite(name);
            this.sprites[name] = item;
            this.events.emit('loadstart', item);
            const progressCallback = (_1, progress) => {
                item.progress = progress;
                this.events.emit('progress', item);
            };
            const buffer = yield Xhr_1.xhr(`${this.config.getBasePath()}/${name}`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch((err) => {
                item.error();
                this.events.emit('error', err, item);
                this.checkStatus();
            });
            if (item.isError()) {
                return;
            }
            const sprite = Sprite_1.Sprite.parse(buffer);
            item.done(sprite);
            this.events.emit('load', item);
            this.checkStatus();
        });
    }
    loadSky(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new LoadItemSky(name);
            this.skies.push(item);
            this.events.emit('loadstart', item);
            const progressCallback = (_1, progress) => {
                item.progress = progress;
                this.events.emit('progress', item);
            };
            const skiesPath = this.config.getSkiesPath();
            const buffer = yield Xhr_1.xhr(`${skiesPath}/${name}.tga`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch((err) => {
                item.error();
                this.events.emit('error', err, item);
                this.checkStatus();
            });
            if (item.isError()) {
                return;
            }
            const skyImage = Tga_1.Tga.parse(buffer, name);
            item.done(skyImage);
            this.events.emit('load', item);
            this.checkStatus();
        });
    }
    loadWad(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const wadItem = new LoadItemWad(name);
            this.wads.push(wadItem);
            this.events.emit('loadstart', wadItem);
            const progressCallback = (_1, progress) => {
                wadItem.progress = progress;
                this.events.emit('progress', wadItem);
            };
            const wadsPath = this.config.getWadsPath();
            const buffer = yield Xhr_1.xhr(`${wadsPath}/${name}`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch((err) => {
                wadItem.error();
                this.events.emit('error', err, wadItem);
                this.checkStatus();
            });
            if (wadItem.isError()) {
                return;
            }
            const wad = yield Wad_1.Wad.parse(buffer);
            wadItem.done(wad);
            if (!this.map || !this.map.data) {
                return;
            }
            const map = this.map.data;
            const cmp = (a, b) => a.toLowerCase() === b.toLowerCase();
            wad.entries.forEach(entry => {
                if (entry.type !== 'texture') {
                    return;
                }
                map.textures.forEach(texture => {
                    if (cmp(entry.name, texture.name)) {
                        texture.width = entry.width;
                        texture.height = entry.height;
                        texture.data = entry.data;
                    }
                });
            });
            this.events.emit('load', wadItem);
            this.checkStatus();
        });
    }
    loadSound(name, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const sound = new LoadItemSound(name);
            this.sounds.push(sound);
            this.events.emit('loadstart', sound);
            const progressCallback = (_1, progress) => {
                sound.progress = progress;
                this.events.emit('progress', sound);
            };
            const soundsPath = this.config.getSoundsPath();
            const buffer = yield Xhr_1.xhr(`${soundsPath}/${name}`, {
                method: 'GET',
                isBinary: true,
                progressCallback
            }).catch((err) => {
                sound.error();
                this.events.emit('error', err, sound);
                this.checkStatus();
            });
            if (sound.isError()) {
                return;
            }
            const data = yield Sound_1.Sound.create(buffer).catch((err) => {
                sound.error();
                this.events.emit('error', err, sound);
                this.checkStatus();
            });
            if (!data || sound.isError()) {
                return;
            }
            data.index = index;
            data.name = name;
            sound.done(data);
            this.events.emit('load', sound);
            this.checkStatus();
        });
    }
}
exports.Loader = Loader;


/***/ }),

/***/ "./src/Parsers/BspEntityParser.ts":
/*!****************************************!*\
  !*** ./src/Parsers/BspEntityParser.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WorldSpawnStartDark;
(function (WorldSpawnStartDark) {
    WorldSpawnStartDark[WorldSpawnStartDark["No"] = 0] = "No";
    WorldSpawnStartDark[WorldSpawnStartDark["Yes"] = 1] = "Yes";
})(WorldSpawnStartDark = exports.WorldSpawnStartDark || (exports.WorldSpawnStartDark = {}));
var WorldSpawnGameTitle;
(function (WorldSpawnGameTitle) {
    WorldSpawnGameTitle[WorldSpawnGameTitle["No"] = 0] = "No";
    WorldSpawnGameTitle[WorldSpawnGameTitle["Yes"] = 1] = "Yes";
})(WorldSpawnGameTitle = exports.WorldSpawnGameTitle || (exports.WorldSpawnGameTitle = {}));
var WorldSpawnNewUnit;
(function (WorldSpawnNewUnit) {
    WorldSpawnNewUnit[WorldSpawnNewUnit["No"] = 0] = "No";
    WorldSpawnNewUnit[WorldSpawnNewUnit["Yes"] = 1] = "Yes";
})(WorldSpawnNewUnit = exports.WorldSpawnNewUnit || (exports.WorldSpawnNewUnit = {}));
var WorldSpawnDefaultTeam;
(function (WorldSpawnDefaultTeam) {
    WorldSpawnDefaultTeam[WorldSpawnDefaultTeam["FewestPlayers"] = 0] = "FewestPlayers";
    WorldSpawnDefaultTeam[WorldSpawnDefaultTeam["FirstTeam"] = 1] = "FirstTeam";
})(WorldSpawnDefaultTeam = exports.WorldSpawnDefaultTeam || (exports.WorldSpawnDefaultTeam = {}));
var AiScriptedSequenceMoveTo;
(function (AiScriptedSequenceMoveTo) {
    AiScriptedSequenceMoveTo[AiScriptedSequenceMoveTo["No"] = 0] = "No";
    AiScriptedSequenceMoveTo[AiScriptedSequenceMoveTo["Walk"] = 1] = "Walk";
    AiScriptedSequenceMoveTo[AiScriptedSequenceMoveTo["Run"] = 2] = "Run";
    AiScriptedSequenceMoveTo[AiScriptedSequenceMoveTo["Instantaneous"] = 4] = "Instantaneous";
    AiScriptedSequenceMoveTo[AiScriptedSequenceMoveTo["No_TurnToFace"] = 5] = "No_TurnToFace";
})(AiScriptedSequenceMoveTo = exports.AiScriptedSequenceMoveTo || (exports.AiScriptedSequenceMoveTo = {}));
var AiScriptedSequenceFinishSchedule;
(function (AiScriptedSequenceFinishSchedule) {
    AiScriptedSequenceFinishSchedule[AiScriptedSequenceFinishSchedule["DefaultAI"] = 0] = "DefaultAI";
    AiScriptedSequenceFinishSchedule[AiScriptedSequenceFinishSchedule["Ambush"] = 1] = "Ambush";
})(AiScriptedSequenceFinishSchedule = exports.AiScriptedSequenceFinishSchedule || (exports.AiScriptedSequenceFinishSchedule = {}));
var AiScriptedSequenceSpawnflags;
(function (AiScriptedSequenceSpawnflags) {
    AiScriptedSequenceSpawnflags[AiScriptedSequenceSpawnflags["Repeatable"] = 4] = "Repeatable";
    AiScriptedSequenceSpawnflags[AiScriptedSequenceSpawnflags["LeaveCorpse"] = 8] = "LeaveCorpse";
})(AiScriptedSequenceSpawnflags = exports.AiScriptedSequenceSpawnflags || (exports.AiScriptedSequenceSpawnflags = {}));
var AmbientGenericPreset;
(function (AmbientGenericPreset) {
    AmbientGenericPreset[AmbientGenericPreset["None"] = 0] = "None";
    AmbientGenericPreset[AmbientGenericPreset["HugeMachine"] = 1] = "HugeMachine";
    AmbientGenericPreset[AmbientGenericPreset["BigMachine"] = 2] = "BigMachine";
    AmbientGenericPreset[AmbientGenericPreset["Machine"] = 3] = "Machine";
    AmbientGenericPreset[AmbientGenericPreset["SlowFadeIn"] = 4] = "SlowFadeIn";
    AmbientGenericPreset[AmbientGenericPreset["FadeIn"] = 5] = "FadeIn";
    AmbientGenericPreset[AmbientGenericPreset["QuickFadeIn"] = 6] = "QuickFadeIn";
    AmbientGenericPreset[AmbientGenericPreset["SlowPulse"] = 7] = "SlowPulse";
    AmbientGenericPreset[AmbientGenericPreset["Pulse"] = 8] = "Pulse";
    AmbientGenericPreset[AmbientGenericPreset["QuickPulse"] = 9] = "QuickPulse";
    AmbientGenericPreset[AmbientGenericPreset["SlowOscillator"] = 10] = "SlowOscillator";
    AmbientGenericPreset[AmbientGenericPreset["Oscillator"] = 11] = "Oscillator";
    AmbientGenericPreset[AmbientGenericPreset["QuickOscillator"] = 12] = "QuickOscillator";
    AmbientGenericPreset[AmbientGenericPreset["GrungePitch"] = 13] = "GrungePitch";
    AmbientGenericPreset[AmbientGenericPreset["VeryLowPitch"] = 14] = "VeryLowPitch";
    AmbientGenericPreset[AmbientGenericPreset["LowPitch"] = 15] = "LowPitch";
    AmbientGenericPreset[AmbientGenericPreset["HighPitch"] = 16] = "HighPitch";
    AmbientGenericPreset[AmbientGenericPreset["VeryHighPitch"] = 17] = "VeryHighPitch";
    AmbientGenericPreset[AmbientGenericPreset["ScreamingPitch"] = 18] = "ScreamingPitch";
    AmbientGenericPreset[AmbientGenericPreset["OscillateSpinUpDown"] = 19] = "OscillateSpinUpDown";
    AmbientGenericPreset[AmbientGenericPreset["PulseSpinUpDown"] = 20] = "PulseSpinUpDown";
    AmbientGenericPreset[AmbientGenericPreset["RandomPitch"] = 21] = "RandomPitch";
    AmbientGenericPreset[AmbientGenericPreset["RandomPitchFast"] = 22] = "RandomPitchFast";
    AmbientGenericPreset[AmbientGenericPreset["IncrementalSpinup"] = 23] = "IncrementalSpinup";
    AmbientGenericPreset[AmbientGenericPreset["Alien"] = 24] = "Alien";
    AmbientGenericPreset[AmbientGenericPreset["Bizzare"] = 25] = "Bizzare";
    AmbientGenericPreset[AmbientGenericPreset["PlanetX"] = 26] = "PlanetX";
    AmbientGenericPreset[AmbientGenericPreset["Haunted"] = 27] = "Haunted";
})(AmbientGenericPreset = exports.AmbientGenericPreset || (exports.AmbientGenericPreset = {}));
var AmbientGenericSpawnFlags;
(function (AmbientGenericSpawnFlags) {
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["PlayEverywhere"] = 1] = "PlayEverywhere";
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["SmallRadius"] = 2] = "SmallRadius";
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["MediumRadius"] = 4] = "MediumRadius";
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["LargeRadius"] = 8] = "LargeRadius";
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["StartSilent"] = 16] = "StartSilent";
    AmbientGenericSpawnFlags[AmbientGenericSpawnFlags["NotToggled"] = 32] = "NotToggled";
})(AmbientGenericSpawnFlags = exports.AmbientGenericSpawnFlags || (exports.AmbientGenericSpawnFlags = {}));
var ButtonTargetSpawnFlags;
(function (ButtonTargetSpawnFlags) {
    ButtonTargetSpawnFlags[ButtonTargetSpawnFlags["UseActivates"] = 1] = "UseActivates";
    ButtonTargetSpawnFlags[ButtonTargetSpawnFlags["StartOn"] = 2] = "StartOn";
})(ButtonTargetSpawnFlags = exports.ButtonTargetSpawnFlags || (exports.ButtonTargetSpawnFlags = {}));
var CyclerWeaponTriggerCondition;
(function (CyclerWeaponTriggerCondition) {
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["NoTrigger"] = 0] = "NoTrigger";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["SeePlayerMadAtPlayer"] = 1] = "SeePlayerMadAtPlayer";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["TakeDamage"] = 2] = "TakeDamage";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["HalfHealthRemaining"] = 3] = "HalfHealthRemaining";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["Death"] = 4] = "Death";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["HearWorld"] = 7] = "HearWorld";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["HearPlayer"] = 8] = "HearPlayer";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["HearCombat"] = 9] = "HearCombat";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["SeePlayerUnconditional"] = 10] = "SeePlayerUnconditional";
    CyclerWeaponTriggerCondition[CyclerWeaponTriggerCondition["SeePlayerNotInCombat"] = 11] = "SeePlayerNotInCombat";
})(CyclerWeaponTriggerCondition = exports.CyclerWeaponTriggerCondition || (exports.CyclerWeaponTriggerCondition = {}));
var EnvBeamSpawnFlags;
(function (EnvBeamSpawnFlags) {
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["StartOn"] = 1] = "StartOn";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["Toggle"] = 2] = "Toggle";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["RandomStrike"] = 4] = "RandomStrike";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["Ring"] = 8] = "Ring";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["StartSparks"] = 16] = "StartSparks";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["EndSparks"] = 32] = "EndSparks";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["DecalEnd"] = 64] = "DecalEnd";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["FadeStart"] = 128] = "FadeStart";
    EnvBeamSpawnFlags[EnvBeamSpawnFlags["FadeEnd"] = 256] = "FadeEnd";
})(EnvBeamSpawnFlags = exports.EnvBeamSpawnFlags || (exports.EnvBeamSpawnFlags = {}));
var ZHLTLightFlags;
(function (ZHLTLightFlags) {
    ZHLTLightFlags[ZHLTLightFlags["Normal"] = 0] = "Normal";
    ZHLTLightFlags[ZHLTLightFlags["EmbeddedFix"] = 1] = "EmbeddedFix";
    ZHLTLightFlags[ZHLTLightFlags["OpaqueBlockLight"] = 2] = "OpaqueBlockLight";
    ZHLTLightFlags[ZHLTLightFlags["OpaqueEmbeddedFix"] = 3] = "OpaqueEmbeddedFix";
    ZHLTLightFlags[ZHLTLightFlags["OpaqueConcaveFix"] = 6] = "OpaqueConcaveFix";
})(ZHLTLightFlags = exports.ZHLTLightFlags || (exports.ZHLTLightFlags = {}));
var RenderEffect;
(function (RenderEffect) {
    RenderEffect[RenderEffect["Normal"] = 0] = "Normal";
    RenderEffect[RenderEffect["SlowPulse"] = 1] = "SlowPulse";
    RenderEffect[RenderEffect["FastPulse"] = 2] = "FastPulse";
    RenderEffect[RenderEffect["SlowWidePulse"] = 3] = "SlowWidePulse";
    RenderEffect[RenderEffect["FastWidePulse"] = 4] = "FastWidePulse";
    RenderEffect[RenderEffect["SlowFadeAway"] = 5] = "SlowFadeAway";
    RenderEffect[RenderEffect["FastFadeAway"] = 6] = "FastFadeAway";
    RenderEffect[RenderEffect["SlowBecomeSolid"] = 7] = "SlowBecomeSolid";
    RenderEffect[RenderEffect["FastBecomeSolid"] = 8] = "FastBecomeSolid";
    RenderEffect[RenderEffect["SlowStrobe"] = 9] = "SlowStrobe";
    RenderEffect[RenderEffect["FastStrobe"] = 10] = "FastStrobe";
    RenderEffect[RenderEffect["FasterStrobe"] = 11] = "FasterStrobe";
    RenderEffect[RenderEffect["SlowFlicker"] = 12] = "SlowFlicker";
    RenderEffect[RenderEffect["FastFlicker"] = 13] = "FastFlicker";
    RenderEffect[RenderEffect["ConstantGlow"] = 14] = "ConstantGlow";
    RenderEffect[RenderEffect["DistortModels"] = 15] = "DistortModels";
    RenderEffect[RenderEffect["HologramDistort"] = 16] = "HologramDistort";
})(RenderEffect = exports.RenderEffect || (exports.RenderEffect = {}));
var RenderMode;
(function (RenderMode) {
    RenderMode[RenderMode["Normal"] = 0] = "Normal";
    RenderMode[RenderMode["Color"] = 1] = "Color";
    RenderMode[RenderMode["Texture"] = 2] = "Texture";
    RenderMode[RenderMode["Glow"] = 3] = "Glow";
    RenderMode[RenderMode["Solid"] = 4] = "Solid";
    RenderMode[RenderMode["Additive"] = 5] = "Additive";
})(RenderMode = exports.RenderMode || (exports.RenderMode = {}));
const parseNumberArray = (a) => a.split(' ').map(b => parseFloat(b));
const parsers = {
    worldspawn: (e) => ({
        classname: 'worldspawn',
        wad: e.wad
            .split(';')
            .filter((a) => a.length)
            .map((w) => w.replace(/\\/g, '/')),
        mapversion: parseInt(e.mapversion),
        skyname: e.skyname,
        maxRange: parseFloat(e.MaxRange) || 8192,
        message: e.message || '',
        sounds: parseInt(e.sounds) || 0,
        light: parseInt(e.light) || 0,
        waveHeight: parseFloat(e.WaveHeight) || 0,
        startDark: parseInt(e.startdark) || 0,
        newUnit: parseInt(e.newunit) || 0,
        defaultTeam: parseInt(e.defaultteam) || 0,
        gameTitle: parseInt(e.gametitle) || 0
    }),
    aiscripted_sequence: (e) => ({
        classname: 'aiscripted_sequence',
        spawnflags: parseInt(e.spawnflags),
        m_iszEntity: e.m_iszEntity,
        m_iszPlay: e.m_iszPlay || '',
        m_flRadius: parseInt(e.m_flRadius) || 512,
        m_flRepeat: parseInt(e.m_flRepeat) || 0,
        m_fMoveTo: parseInt(e.m_fMoveTo) || 0,
        m_iFinishSchedule: parseInt(e.m_iFinishSchedule) || 0,
    }),
    ambient_generic: (e) => ({
        classname: 'ambient_generic',
        origin: parseNumberArray(e.origin),
        targetName: e.targetname,
        message: e.message,
        health: parseInt(e.health) || 10,
        preset: parseInt(e.preset) || 0,
        startVolume: parseInt(e.volstart) || 0,
        fadeIn: parseInt(e.fadein),
        fadeOut: parseInt(e.fadeout),
        pitch: parseInt(e.pitch),
        pitchStart: parseInt(e.pitchstart),
        spinUp: parseInt(e.spinup),
        spinDown: parseInt(e.spindown),
        lfoType: parseInt(e.lfotype),
        lfoRate: parseInt(e.lforate),
        lfoModPitch: parseInt(e.lfomodpitch),
        lfoModVolume: parseInt(e.lfomodvolume),
        cSpinUp: parseInt(e.cspinup),
        spawnFlags: parseInt(e.spawnflags)
    }),
    ammo_357: (e) => ({
        classname: 'ammo_357',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_9mmAR: (e) => ({
        classname: 'ammo_9mmAR',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_9mmbox: (e) => ({
        classname: 'ammo_9mmbox',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_9mmclip: (e) => ({
        classname: 'ammo_9mmclip',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_ARgrenades: (e) => ({
        classname: 'ammo_ARgrenades',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_buckshot: (e) => ({
        classname: 'ammo_buckshot',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_crossbow: (e) => ({
        classname: 'ammo_crossbow',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_gaussclip: (e) => ({
        classname: 'ammo_gaussclip',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    ammo_rpgclip: (e) => ({
        classname: 'ammo_rpgclip',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname || '',
        delay: parseInt(e.delay) || 0,
        killTarget: e.killtarget || '',
        spawnFlags: e.spawnflags || 0
    }),
    button_target: (e) => ({
        classname: 'button_target',
        target: e.target,
        master: e.master,
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0'),
        zhltLightFlags: parseInt(e.zhlt_lightflags) || 0,
        lightOrigin: e.light_origin,
        spawnFlags: parseInt(e.spawnflags) || 1
    }),
    cycler: (e) => ({
        classname: 'cycler',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        targetName: e.targetname,
        model: e.model,
        sequence: e.sequence || '',
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0')
    }),
    cycler_sprite: (e) => ({
        classname: 'cycler_sprite',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        targetName: e.targetname,
        model: e.model,
        framerate: parseInt(e.framerate || '10'),
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0')
    }),
    cyclear_weapon: (e) => ({
        classname: 'cycler_weapon',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        target: e.target,
        targetName: e.targetname,
        triggerTarget: e.TriggerTarget || '',
        triggerCondition: parseInt(e.TriggerCondition) || 0,
        model: e.model,
        sequence: e.sequence,
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0')
    }),
    cyclear_wreckage: (e) => ({
        classname: 'cycler_wreckage',
        origin: parseNumberArray(e.origin),
        angles: parseNumberArray(e.angles),
        targetName: e.targetname,
        model: e.model,
        framerate: parseInt(e.framerate) || 10,
        scale: parseFloat(e.scale) || 1.0,
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0')
    }),
    env_beam: (e) => ({
        classname: 'env_beam',
        renderEffect: parseInt(e.renderfx) || 0,
        renderMode: parseInt(e.rendermode) || 0,
        renderAmmount: parseInt(e.renderamt) || 255,
        renderColor: parseNumberArray(e.rendercolor || '0 0 0'),
        radius: parseFloat(e.Radius) || 256,
        life: parseInt(e.life) || 1,
        boltWidth: parseInt(e.BoltWidth) || 20,
        noiseAmplitude: parseInt(e.NoiseAmplitude) || 0,
        texture: e.texture || 'sprites/laserbeam.spr',
        textureScroll: parseInt(e.TextureScroll) || 35,
        frameRate: parseInt(e.framerate) || 0,
        frameStart: parseInt(e.framestart) || 0,
        strikeTime: parseInt(e.StrikeTime) || 1,
        damage: parseInt(e.damage) || 1,
        spawnFlags: parseInt(e.spawnflags)
    })
};
class BspEntityParser {
    static parse(entities) {
        const arr = [];
        for (let i = 0; i < entities.length; ++i) {
            const e = entities[i];
            if (!e.classname) {
                arr.push({
                    classname: '!',
                    data: e
                });
            }
            if (parsers[e.classname]) {
                arr.push(parsers[e.classname](e));
            }
            else {
                arr.push({
                    classname: '?',
                    originalClassname: e.classname,
                    data: e
                });
            }
        }
        return arr;
    }
}
exports.BspEntityParser = BspEntityParser;


/***/ }),

/***/ "./src/Parsers/BspLightmapParser.ts":
/*!******************************************!*\
  !*** ./src/Parsers/BspLightmapParser.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BspLightmapParser {
    constructor(lightmap) {
        this.block = new Uint16Array(BspLightmapParser.TEXTURE_SIZE);
        this.lightmap = lightmap;
        this.texture = new Uint8Array(BspLightmapParser.TEXTURE_SIZE * BspLightmapParser.TEXTURE_SIZE * 4);
        this.texture[this.texture.length - 4] = 255;
        this.texture[this.texture.length - 3] = 255;
        this.texture[this.texture.length - 2] = 255;
        this.texture[this.texture.length - 1] = 255;
    }
    static init(lightmap) {
        return new BspLightmapParser(lightmap);
    }
    getTexture() {
        return this.texture;
    }
    processFace(faceData, texinfo, offset) {
        const size = this.getDimensions(faceData);
        const rect = this.readLightmap(offset, size.width, size.height);
        if (rect) {
            for (let i = 0; i < faceData.length / 7; ++i) {
                let lu = faceData[i * 7] * texinfo.s[0] +
                    faceData[i * 7 + 1] * texinfo.s[1] +
                    faceData[i * 7 + 2] * texinfo.s[2] +
                    texinfo.sShift -
                    size.minU;
                lu += rect.x * 16 + 8;
                lu /= BspLightmapParser.TEXTURE_SIZE * 16;
                let lv = faceData[i * 7] * texinfo.t[0] +
                    faceData[i * 7 + 1] * texinfo.t[1] +
                    faceData[i * 7 + 2] * texinfo.t[2] +
                    texinfo.tShift -
                    size.minV;
                lv += rect.y * 16 + 8;
                lv /= BspLightmapParser.TEXTURE_SIZE * 16;
                faceData[i * 7 + 5] = lu;
                faceData[i * 7 + 6] = lv;
            }
        }
    }
    getDimensions(faceData) {
        let minU = Math.floor(faceData[3]);
        let minV = Math.floor(faceData[4]);
        let maxU = Math.floor(faceData[3]);
        let maxV = Math.floor(faceData[4]);
        for (let i = 1; i < faceData.length / 7; ++i) {
            if (Math.floor(faceData[i * 7 + 3]) < minU) {
                minU = Math.floor(faceData[i * 7 + 3]);
            }
            if (Math.floor(faceData[i * 7 + 4]) < minV) {
                minV = Math.floor(faceData[i * 7 + 4]);
            }
            if (Math.floor(faceData[i * 7 + 3]) > maxU) {
                maxU = Math.floor(faceData[i * 7 + 3]);
            }
            if (Math.floor(faceData[i * 7 + 4]) > maxV) {
                maxV = Math.floor(faceData[i * 7 + 4]);
            }
        }
        return {
            width: Math.ceil(maxU / 16) - Math.floor(minU / 16) + 1,
            height: Math.ceil(maxV / 16) - Math.floor(minV / 16) + 1,
            minU: Math.floor(minU),
            minV: Math.floor(minV)
        };
    }
    readLightmap(offset, width, height) {
        if (height <= 0 || width <= 0) {
            return null;
        }
        const block = this.findFreeSpace(width, height);
        if (block) {
            const o = [block.x, block.y];
            const s = [width, height];
            const d = [BspLightmapParser.TEXTURE_SIZE, BspLightmapParser.TEXTURE_SIZE];
            const count = width * height;
            for (let i = 0; i < count; ++i) {
                const p = o[1] * d[0] + o[0] + d[0] * Math.floor(i / s[0]) + (i % s[0]);
                this.texture[p * 4] = Math.min(255, this.lightmap[offset + i * 3] * 2);
                this.texture[p * 4 + 1] = Math.min(255, this.lightmap[offset + i * 3 + 1] * 2);
                this.texture[p * 4 + 2] = Math.min(255, this.lightmap[offset + i * 3 + 2] * 2);
                this.texture[p * 4 + 3] = 255;
            }
        }
        return block;
    }
    findFreeSpace(w, h) {
        let x = 0;
        let y = 0;
        let bestHeight = BspLightmapParser.TEXTURE_SIZE;
        for (let i = 0; i < this.block.length - w; ++i) {
            let tentativeHeight = 0;
            let j;
            for (j = 0; j < w; ++j) {
                if (this.block[i + j] >= bestHeight) {
                    break;
                }
                if (this.block[i + j] > tentativeHeight) {
                    tentativeHeight = this.block[i + j];
                }
            }
            if (j === w) {
                x = i;
                y = bestHeight = tentativeHeight;
            }
        }
        if (bestHeight + h > BspLightmapParser.TEXTURE_SIZE) {
            return null;
        }
        for (let i = 0; i < w; ++i) {
            this.block[x + i] = bestHeight + h;
        }
        return { x, y };
    }
}
BspLightmapParser.TEXTURE_SIZE = 1024;
exports.BspLightmapParser = BspLightmapParser;


/***/ }),

/***/ "./src/Parsers/BspParser.ts":
/*!**********************************!*\
  !*** ./src/Parsers/BspParser.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(/*! ../Util */ "./src/Util.ts");
const Vdf_1 = __webpack_require__(/*! ../Parsers/Vdf */ "./src/Parsers/Vdf.ts");
const Bsp_1 = __webpack_require__(/*! ../Bsp */ "./src/Bsp.ts");
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
const BspLightmapParser_1 = __webpack_require__(/*! ../Parsers/BspLightmapParser */ "./src/Parsers/BspLightmapParser.ts");
const Util_2 = __webpack_require__(/*! ./Util */ "./src/Parsers/Util.ts");
function parseModels(models, faces, edges, surfEdges, vertices, texinfo, textures, lightmap) {
    const parsedModels = [];
    for (let i = 0; i < models.length; ++i) {
        const model = models[i];
        const _faces = [];
        const v0 = new Float32Array(3);
        const v1 = new Float32Array(3);
        const v2 = new Float32Array(3);
        const uv0 = new Float32Array(2);
        const uv1 = new Float32Array(2);
        const uv2 = new Float32Array(2);
        const luv0 = new Float32Array(2);
        const luv1 = new Float32Array(2);
        const luv2 = new Float32Array(2);
        let origin = i === 0
            ? [0, 0, 0]
            : [0, 0, 0].map((_, i) => (model.maxs[i] - model.mins[i]) / 2 + model.mins[i]);
        for (let i = model.firstFace; i < model.firstFace + model.faceCount; ++i) {
            const faceData = {
                buffer: new Float32Array((faces[i].edgeCount - 2) * 21),
                textureIndex: -1
            };
            const faceTexInfo = texinfo[faces[i].textureInfo];
            const faceTexture = textures[faceTexInfo.textureIndex];
            const faceSurfEdges = surfEdges.slice(faces[i].firstEdge, faces[i].firstEdge + faces[i].edgeCount);
            const v0idx = edges[Math.abs(faceSurfEdges[0])][faceSurfEdges[0] > 0 ? 0 : 1];
            v0[0] = vertices[v0idx][0];
            v0[1] = vertices[v0idx][1];
            v0[2] = vertices[v0idx][2];
            uv0[0] =
                v0[0] * faceTexInfo.s[0] +
                    v0[1] * faceTexInfo.s[1] +
                    v0[2] * faceTexInfo.s[2] +
                    faceTexInfo.sShift;
            uv0[1] =
                v0[0] * faceTexInfo.t[0] +
                    v0[1] * faceTexInfo.t[1] +
                    v0[2] * faceTexInfo.t[2] +
                    faceTexInfo.tShift;
            luv0[0] = 0;
            luv0[1] = 0;
            const v1idx = edges[Math.abs(faceSurfEdges[1])][faceSurfEdges[1] > 0 ? 0 : 1];
            v1[0] = vertices[v1idx][0];
            v1[1] = vertices[v1idx][1];
            v1[2] = vertices[v1idx][2];
            uv1[0] =
                v1[0] * faceTexInfo.s[0] +
                    v1[1] * faceTexInfo.s[1] +
                    v1[2] * faceTexInfo.s[2] +
                    faceTexInfo.sShift;
            uv1[1] =
                v1[0] * faceTexInfo.t[0] +
                    v1[1] * faceTexInfo.t[1] +
                    v1[2] * faceTexInfo.t[2] +
                    faceTexInfo.tShift;
            luv1[0] = 0;
            luv1[1] = 0.999;
            let compIndex = 0;
            for (let j = 2; j < faces[i].edgeCount; ++j) {
                const v2idx = edges[Math.abs(faceSurfEdges[j])][faceSurfEdges[j] > 0 ? 0 : 1];
                v2[0] = vertices[v2idx][0];
                v2[1] = vertices[v2idx][1];
                v2[2] = vertices[v2idx][2];
                uv2[0] =
                    v2[0] * faceTexInfo.s[0] +
                        v2[1] * faceTexInfo.s[1] +
                        v2[2] * faceTexInfo.s[2] +
                        faceTexInfo.sShift;
                uv2[1] =
                    v2[0] * faceTexInfo.t[0] +
                        v2[1] * faceTexInfo.t[1] +
                        v2[2] * faceTexInfo.t[2] +
                        faceTexInfo.tShift;
                luv2[0] = 0.999;
                luv2[1] = 0.999;
                faceData.buffer[compIndex++] = v0[0];
                faceData.buffer[compIndex++] = v0[1];
                faceData.buffer[compIndex++] = v0[2];
                faceData.buffer[compIndex++] = uv0[0];
                faceData.buffer[compIndex++] = uv0[1];
                faceData.buffer[compIndex++] = luv0[0];
                faceData.buffer[compIndex++] = luv0[1];
                faceData.buffer[compIndex++] = v1[0];
                faceData.buffer[compIndex++] = v1[1];
                faceData.buffer[compIndex++] = v1[2];
                faceData.buffer[compIndex++] = uv1[0];
                faceData.buffer[compIndex++] = uv1[1];
                faceData.buffer[compIndex++] = luv1[0];
                faceData.buffer[compIndex++] = luv1[1];
                faceData.buffer[compIndex++] = v2[0];
                faceData.buffer[compIndex++] = v2[1];
                faceData.buffer[compIndex++] = v2[2];
                faceData.buffer[compIndex++] = uv2[0];
                faceData.buffer[compIndex++] = uv2[1];
                faceData.buffer[compIndex++] = luv2[0];
                faceData.buffer[compIndex++] = luv2[1];
                v1[0] = v2[0];
                v1[1] = v2[1];
                v1[2] = v2[2];
                uv1[0] = uv2[0];
                uv1[1] = uv2[1];
                luv1[0] = luv2[0];
                luv1[1] = luv2[1];
            }
            if (faceTexInfo.flags === 0 || faceTexInfo.flags === -65536) {
                lightmap.processFace(faceData.buffer, faceTexInfo, faces[i].lightmapOffset);
            }
            faceData.textureIndex = faceTexInfo.textureIndex;
            for (let j = 0; j < faceData.buffer.length / 7; ++j) {
                faceData.buffer[j * 7] -= origin[0];
                faceData.buffer[j * 7 + 1] -= origin[1];
                faceData.buffer[j * 7 + 2] -= origin[2];
                faceData.buffer[j * 7 + 3] /= faceTexture.width;
                faceData.buffer[j * 7 + 4] /= faceTexture.height;
            }
            _faces.push(faceData);
        }
        parsedModels.push({
            origin,
            faces: _faces
        });
    }
    return parsedModels;
}
exports.parseModels = parseModels;
var BspLumpIndex;
(function (BspLumpIndex) {
    BspLumpIndex[BspLumpIndex["Entities"] = 0] = "Entities";
    BspLumpIndex[BspLumpIndex["Planes"] = 1] = "Planes";
    BspLumpIndex[BspLumpIndex["Textures"] = 2] = "Textures";
    BspLumpIndex[BspLumpIndex["Vertices"] = 3] = "Vertices";
    BspLumpIndex[BspLumpIndex["Visibility"] = 4] = "Visibility";
    BspLumpIndex[BspLumpIndex["Nodes"] = 5] = "Nodes";
    BspLumpIndex[BspLumpIndex["TexInfo"] = 6] = "TexInfo";
    BspLumpIndex[BspLumpIndex["Faces"] = 7] = "Faces";
    BspLumpIndex[BspLumpIndex["Lighting"] = 8] = "Lighting";
    BspLumpIndex[BspLumpIndex["ClipNodes"] = 9] = "ClipNodes";
    BspLumpIndex[BspLumpIndex["Leaves"] = 10] = "Leaves";
    BspLumpIndex[BspLumpIndex["MarkSurfaces"] = 11] = "MarkSurfaces";
    BspLumpIndex[BspLumpIndex["Edges"] = 12] = "Edges";
    BspLumpIndex[BspLumpIndex["SurfEdges"] = 13] = "SurfEdges";
    BspLumpIndex[BspLumpIndex["Models"] = 14] = "Models";
})(BspLumpIndex = exports.BspLumpIndex || (exports.BspLumpIndex = {}));
class BspParser {
    static parse(name, buffer) {
        const r = new Reader_1.Reader(buffer);
        const version = r.ui();
        if (version !== 30) {
            throw new Error('Invalid map version');
        }
        const lumps = [];
        for (let i = 0; i < 15; ++i) {
            lumps.push({
                offset: r.ui(),
                length: r.ui()
            });
        }
        const entities = this.loadEntities(r, lumps[BspLumpIndex.Entities].offset, lumps[BspLumpIndex.Entities].length);
        const textures = this.loadTextures(r, lumps[BspLumpIndex.Textures].offset);
        const models = this.loadModels(r, lumps[BspLumpIndex.Models].offset, lumps[BspLumpIndex.Models].length);
        const faces = this.loadFaces(r, lumps[BspLumpIndex.Faces].offset, lumps[BspLumpIndex.Faces].length);
        const edges = this.loadEdges(r, lumps[BspLumpIndex.Edges].offset, lumps[BspLumpIndex.Edges].length);
        const surfEdges = this.loadSurfEdges(r, lumps[BspLumpIndex.SurfEdges].offset, lumps[BspLumpIndex.SurfEdges].length);
        const vertices = this.loadVertices(r, lumps[BspLumpIndex.Vertices].offset, lumps[BspLumpIndex.Vertices].length);
        const texinfo = this.loadTexInfo(r, lumps[BspLumpIndex.TexInfo].offset, lumps[BspLumpIndex.TexInfo].length);
        const lightmap = this.loadLightmap(r, lumps[BspLumpIndex.Lighting].offset, lumps[BspLumpIndex.Lighting].length);
        const parsedLightmap = BspLightmapParser_1.BspLightmapParser.init(lightmap);
        const parsedModels = parseModels(models, faces, edges, surfEdges, vertices, texinfo, textures, parsedLightmap);
        return new Bsp_1.Bsp(name, entities, textures, parsedModels, {
            width: BspLightmapParser_1.BspLightmapParser.TEXTURE_SIZE,
            height: BspLightmapParser_1.BspLightmapParser.TEXTURE_SIZE,
            data: parsedLightmap.getTexture()
        });
    }
    static loadFaces(r, offset, length) {
        r.seek(offset);
        const faces = [];
        for (let i = 0; i < length / 20; ++i) {
            faces.push({
                plane: r.us(),
                planeSide: r.us(),
                firstEdge: r.ui(),
                edgeCount: r.us(),
                textureInfo: r.us(),
                styles: [r.ub(), r.ub(), r.ub(), r.ub()],
                lightmapOffset: r.ui()
            });
        }
        return faces;
    }
    static loadModels(r, offset, length) {
        r.seek(offset);
        const models = [];
        for (let i = 0; i < length / 64; ++i) {
            models.push({
                mins: [r.f(), r.f(), r.f()],
                maxs: [r.f(), r.f(), r.f()],
                origin: [r.f(), r.f(), r.f()],
                headNodes: [r.i(), r.i(), r.i(), r.i()],
                visLeaves: r.i(),
                firstFace: r.i(),
                faceCount: r.i()
            });
        }
        return models;
    }
    static loadEdges(r, offset, length) {
        r.seek(offset);
        const edges = [];
        for (let i = 0; i < length / 4; ++i) {
            edges.push([r.us(), r.us()]);
        }
        return edges;
    }
    static loadSurfEdges(r, offset, length) {
        r.seek(offset);
        const surfEdges = [];
        for (let i = 0; i < length / 4; ++i) {
            surfEdges.push(r.i());
        }
        return surfEdges;
    }
    static loadVertices(r, offset, length) {
        r.seek(offset);
        const vertices = [];
        for (let i = 0; i < length / 12; ++i) {
            vertices.push([r.f(), r.f(), r.f()]);
        }
        return vertices;
    }
    static loadTexInfo(r, offset, length) {
        r.seek(offset);
        const texinfo = [];
        for (let i = 0; i < length / 40; ++i) {
            texinfo.push({
                s: [r.f(), r.f(), r.f()],
                sShift: r.f(),
                t: [r.f(), r.f(), r.f()],
                tShift: r.f(),
                textureIndex: r.i(),
                flags: r.i()
            });
        }
        return texinfo;
    }
    static loadLightmap(r, offset, length) {
        r.seek(offset);
        return r.arrx(length, Reader_1.ReaderDataType.UByte);
    }
    static loadTextureData(r) {
        const name = r.nstr(16);
        const width = r.ui();
        const height = r.ui();
        const isExternal = !r.ui();
        if (isExternal) {
            const data = new Uint8Array(4);
            data[0] = data[1] = data[2] = data[3] = 255;
            return { name, width, height, data, isExternal };
        }
        else {
            r.skip(3 * 4);
            const pixelCount = width * height;
            const pixels = r.arrx(pixelCount, Reader_1.ReaderDataType.UByte);
            r.skip(21 * (pixelCount / 64));
            r.skip(2);
            const palette = r.arrx(768, Reader_1.ReaderDataType.UByte);
            const data = name[0] === '{'
                ? Util_2.paletteWithLastTransToRGBA(pixels, palette)
                : Util_2.paletteToRGBA(pixels, palette);
            return { name, width, height, data, isExternal };
        }
    }
    static loadTextures(r, offset) {
        r.seek(offset);
        const count = r.ui();
        const offsets = [];
        for (let i = 0; i < count; ++i) {
            offsets.push(r.ui());
        }
        const textures = [];
        for (let i = 0; i < count; ++i) {
            if (offsets[i] === 0xffffffff) {
                textures.push({
                    name: 'ERROR404',
                    width: 1,
                    height: 1,
                    data: new Uint8Array([0, 255, 0, 255]),
                    isExternal: false
                });
            }
            else {
                r.seek(offset + offsets[i]);
                textures.push(this.loadTextureData(r));
            }
        }
        return textures;
    }
    static loadEntities(r, offset, length) {
        r.seek(offset);
        const entities = Vdf_1.vdf(r.nstr(length));
        const VECTOR_ATTRS = [
            'origin',
            'angles',
            '_diffuse_light',
            '_light',
            'rendercolor',
            'avelocity'
        ];
        const NUMBER_ATTRS = ['renderamt', 'rendermode', 'scale'];
        const worldSpawn = entities[0];
        if (worldSpawn.classname === 'worldspawn') {
            worldSpawn.model = '*0';
            worldSpawn.wad = worldSpawn.wad || '';
            worldSpawn.wad = worldSpawn.wad
                .split(';')
                .filter((w) => w.length)
                .map((w) => w.replace(/\\/g, '/'))
                .map((w) => Util_1.basename(w));
        }
        entities.forEach(e => {
            if (e.model) {
                if (typeof e.renderamt === 'undefined') {
                    e.renderamt = 0;
                }
                if (typeof e.rendermode === 'undefined') {
                    e.rendermode = 0;
                }
                if (typeof e.renderfx === 'undefined') {
                    e.renderfx = 0;
                }
                if (typeof e.rendercolor === 'undefined') {
                    e.rendercolor = '0 0 0';
                }
            }
            VECTOR_ATTRS.forEach(attr => {
                if (e[attr]) {
                    e[attr] = e[attr].split(' ').map((v) => Number.parseFloat(v));
                }
            });
            NUMBER_ATTRS.forEach(attr => {
                if (e[attr]) {
                    e[attr] = Number.parseFloat(e[attr]);
                }
            });
        });
        return entities;
    }
}
exports.BspParser = BspParser;


/***/ }),

/***/ "./src/Parsers/Sprite.ts":
/*!*******************************!*\
  !*** ./src/Parsers/Sprite.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Parsers/Util.ts");
var SpriteType;
(function (SpriteType) {
    SpriteType[SpriteType["VP_PARALLEL_UPRIGHT"] = 0] = "VP_PARALLEL_UPRIGHT";
    SpriteType[SpriteType["FACING_UPRIGHT"] = 1] = "FACING_UPRIGHT";
    SpriteType[SpriteType["VP_PARALLEL"] = 2] = "VP_PARALLEL";
    SpriteType[SpriteType["ORIENTED"] = 3] = "ORIENTED";
    SpriteType[SpriteType["VP_PARALLEL_ORIENTED"] = 4] = "VP_PARALLEL_ORIENTED";
})(SpriteType = exports.SpriteType || (exports.SpriteType = {}));
var SpriteAlphaType;
(function (SpriteAlphaType) {
    SpriteAlphaType[SpriteAlphaType["SPR_NORMAL"] = 0] = "SPR_NORMAL";
    SpriteAlphaType[SpriteAlphaType["SPR_ADDITIVE"] = 1] = "SPR_ADDITIVE";
    SpriteAlphaType[SpriteAlphaType["SPR_INDEXALPHA"] = 2] = "SPR_INDEXALPHA";
    SpriteAlphaType[SpriteAlphaType["SPR_ALPHTEST"] = 3] = "SPR_ALPHTEST";
})(SpriteAlphaType = exports.SpriteAlphaType || (exports.SpriteAlphaType = {}));
var SpriteSyncType;
(function (SpriteSyncType) {
    SpriteSyncType[SpriteSyncType["SYNCHRONIZED"] = 0] = "SYNCHRONIZED";
    SpriteSyncType[SpriteSyncType["RANDOM"] = 1] = "RANDOM";
})(SpriteSyncType = exports.SpriteSyncType || (exports.SpriteSyncType = {}));
class Sprite {
    constructor(header, frames) {
        this.header = header;
        this.frames = frames;
    }
    static parse(buffer) {
        const r = new Reader_1.Reader(buffer);
        const magic = r.nstr(4);
        if (magic !== 'IDSP') {
            throw new Error('Invalid sprite file format');
        }
        const header = {
            version: r.i(),
            type: r.i(),
            alphaType: r.i(),
            radius: r.f(),
            width: r.i(),
            height: r.i(),
            frameCount: r.i(),
            beamLength: r.f(),
            syncType: r.i()
        };
        const paletteSize = r.s();
        const palette = r.arrx(paletteSize * 3, Reader_1.ReaderDataType.UByte);
        const frames = [];
        for (let i = 0; i < header.frameCount; ++i) {
            const frame = {
                group: r.i(),
                position: [r.i(), r.i()],
                width: r.i(),
                height: r.i(),
                data: new Uint8Array(header.width * header.height * 4)
            };
            const pixels = r.arrx(header.width * header.height, Reader_1.ReaderDataType.UByte);
            if (header.alphaType === SpriteAlphaType.SPR_ALPHTEST) {
                frame.data = Util_1.paletteWithLastTransToRGBA(pixels, palette);
            }
            else {
                frame.data = Util_1.paletteToRGBA(pixels, palette);
            }
            frames.push(frame);
        }
        return new Sprite(header, frames);
    }
}
exports.Sprite = Sprite;


/***/ }),

/***/ "./src/Parsers/Tga.ts":
/*!****************************!*\
  !*** ./src/Parsers/Tga.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
class Tga {
    constructor(name, width, height, data) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.data = data;
    }
    static parse(buffer, name) {
        let r = new Reader_1.Reader(buffer);
        let header = {
            idLength: r.ub(),
            colorMapType: r.ub(),
            imageType: r.ub(),
            colorMap: {
                firstEntryIndex: r.us(),
                length: r.us(),
                size: r.ub()
            },
            image: {
                xOrigin: r.us(),
                yOrigin: r.us(),
                width: r.us(),
                height: r.us(),
                depth: r.ub(),
                descriptor: r.ub()
            }
        };
        if (header.idLength) {
            r.arrx(header.idLength, Reader_1.ReaderDataType.UByte);
        }
        if (header.colorMapType) {
            throw new Error('Not implemented');
        }
        let w = header.image.width;
        let h = header.image.height;
        let pixelCount = w * h;
        let imageData;
        if (header.imageType === 0x02) {
            let byteCount = (pixelCount * header.image.depth) / 8;
            imageData = r.arrx(byteCount, Reader_1.ReaderDataType.UByte);
            if (header.image.depth === 24) {
                let temp = new Uint8Array(pixelCount * 4);
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w; ++j) {
                        let dst = (h - 1 - i) * w + j;
                        temp[dst * 4] = imageData[(i * w + j) * 3 + 2];
                        temp[dst * 4 + 1] = imageData[(i * w + j) * 3 + 1];
                        temp[dst * 4 + 2] = imageData[(i * w + j) * 3];
                        temp[dst * 4 + 3] = 255;
                    }
                }
                imageData = temp;
            }
            else if (header.image.depth === 32) {
                let temp = new Uint8Array(pixelCount * 4);
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w; ++j) {
                        let dst = (h - 1 - i) * w + j;
                        temp[dst * 4] = imageData[(i * w + j) * 4 + 2];
                        temp[dst * 4 + 1] = imageData[(i * w + j) * 4 + 1];
                        temp[dst * 4 + 2] = imageData[(i * w + j) * 4];
                        temp[dst * 4 + 3] = 255;
                    }
                }
                imageData = temp;
            }
        }
        else if (header.imageType === 0x0a) {
            imageData = new Uint8Array(pixelCount * 4);
            if (header.image.depth === 24) {
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w;) {
                        let repCount = r.ub();
                        if (repCount & 0x80) {
                            repCount = (repCount & 0x7f) + 1;
                            let bl = r.ub();
                            let gr = r.ub();
                            let rd = r.ub();
                            while (j < w && repCount) {
                                let dst = (h - 1 - i) * w + j;
                                imageData[dst * 4] = rd;
                                imageData[dst * 4 + 1] = gr;
                                imageData[dst * 4 + 2] = bl;
                                imageData[dst * 4 + 3] = 255;
                                ++j;
                                --repCount;
                            }
                        }
                        else {
                            repCount = (repCount & 0x7f) + 1;
                            while (j < w && repCount) {
                                let dst = (h - 1 - i) * w + j;
                                imageData[dst * 4 + 2] = r.ub();
                                imageData[dst * 4 + 1] = r.ub();
                                imageData[dst * 4] = r.ub();
                                imageData[dst * 4 + 3] = 255;
                                ++j;
                                --repCount;
                            }
                        }
                    }
                }
            }
        }
        return new Tga(name, header.image.width, header.image.height, imageData);
    }
}
exports.Tga = Tga;


/***/ }),

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

/***/ "./src/Parsers/Vdf.ts":
/*!****************************!*\
  !*** ./src/Parsers/Vdf.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function vdf(input) {
    let state = 0;
    let key = '';
    let val = '';
    const objects = [];
    for (let i = 0; i < input.length; ++i) {
        const c = input[i];
        switch (state) {
            case 0: {
                if (/\s/.test(c)) {
                    continue;
                }
                else if (c === '{') {
                    objects.push({});
                    state = 1;
                }
                else {
                    return [];
                }
                break;
            }
            case 1: {
                if (/\s/.test(c)) {
                    continue;
                }
                else if (c === '}') {
                    state = 0;
                }
                else if (c === '"') {
                    key = '';
                    state = 2;
                }
                else {
                    return [];
                }
                break;
            }
            case 2: {
                if (c === '"') {
                    state = 3;
                }
                else {
                    key += c;
                }
                break;
            }
            case 3: {
                if (/\s/.test(c)) {
                    continue;
                }
                else if (c === '"') {
                    val = '';
                    state = 4;
                }
                break;
            }
            case 4: {
                if (c === '"') {
                    objects[objects.length - 1][key] = val;
                    state = 1;
                }
                else {
                    val += c;
                }
                break;
            }
        }
    }
    return objects;
}
exports.vdf = vdf;


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
const parseCache = (_r, metadata) => ({
    type: 'cache',
    name: metadata.name
});
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
    const width = r.ui() && 256;
    const height = r.ui();
    const rowCount = r.ui();
    const rowHeight = r.ui();
    const glyphs = [];
    for (let i = 0; i < 256; ++i) {
        const glyphOffset = r.us();
        const glyphWidth = r.us();
        glyphs.push({
            x: glyphOffset % width,
            y: (Math.floor(glyphOffset / width) / rowHeight) * rowHeight,
            width: glyphWidth,
            height: rowHeight
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
        data: Util_1.paletteWithLastTransToRGBA(pixels, palette)
    };
}
const parseUnknown = (r, metadata) => ({
    type: 'unknown',
    name: metadata.name,
    data: r.arrx(metadata.length, Reader_1.ReaderDataType.UByte)
});
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

/***/ "./src/PlayerInterface/Buttons/FullscreenButton/index.tsx":
/*!****************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/FullscreenButton/index.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const Fullscreen_1 = __webpack_require__(/*! ../../../Fullscreen */ "./src/Fullscreen.ts");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Buttons/FullscreenButton/style.ts");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
class FullscreenButton extends preact_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isInFullscreen: false
        };
        this.onClick = () => {
            if (Fullscreen_1.Fullscreen.isInFullscreen()) {
                Fullscreen_1.Fullscreen.exit();
            }
            else {
                Fullscreen_1.Fullscreen.enter(this.props.root);
            }
        };
        this.onFullscreen = () => {
            this.setState({
                isInFullscreen: Fullscreen_1.Fullscreen.isInFullscreen()
            });
        };
    }
    componentDidMount() {
        Fullscreen_1.Fullscreen.onChange(this.onFullscreen);
    }
    componentWillUnmount() {
        Fullscreen_1.Fullscreen.onChangeRemove(this.onFullscreen);
    }
    render() {
        return (preact_1.h("div", { class: typestyle_1.classes(Controls_style_1.ControlsStyle.button, style_1.FullscreenButtonStyle.button), onClick: this.onClick }, this.state.isInFullscreen ? (preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 22 L22 22 L22 0 L14 0 L14 14 L0 14 M42 0 L42 22 L64 22 L64 14 L50 14 L50 0 M14 50 L0 50 L0 42 L22 42 L22 64 L14 64 M42 64 L42 42 L64 42 L64 50 L50 50 L50 64 Z" }))) : (preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 22 L8 22 L8 8 L22 8 L22 0 L0 0 M42 0 L42 8 L56 8 L56 22 L64 22 L64 0 M0 64 L0 42 L8 42 L8 56 L22 56 L22 64 M64 64 L42 64 L42 56 L56 56 L56 42 L64 42 Z" })))));
    }
}
exports.FullscreenButton = FullscreenButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/FullscreenButton/style.ts":
/*!***************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/FullscreenButton/style.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.FullscreenButtonStyle = typestyle_1.stylesheet({
    button: {
        width: '30px',
        minWidth: '30px',
        height: '30px',
        padding: '5px'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Buttons/PauseButton/index.tsx":
/*!***********************************************************!*\
  !*** ./src/PlayerInterface/Buttons/PauseButton/index.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
function PauseButton(props) {
    return (preact_1.h("div", { class: Controls_style_1.ControlsStyle.button, onClick: props.onClick },
        preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 0 L0 64 L20 64 L20 0 M44 0 L64 0 L64 64 L44 64 Z" }))));
}
exports.PauseButton = PauseButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/PlayButton/index.tsx":
/*!**********************************************************!*\
  !*** ./src/PlayerInterface/Buttons/PlayButton/index.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
function PlayButton(props) {
    return (preact_1.h("div", { class: Controls_style_1.ControlsStyle.button, onClick: props.onClick },
        preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 0 L0 64 L64 32 Z" }))));
}
exports.PlayButton = PlayButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/SettingsButton/index.tsx":
/*!**************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/SettingsButton/index.tsx ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const Game_1 = __webpack_require__(/*! ../../../Game */ "./src/Game.ts");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Buttons/SettingsButton/style.ts");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
class SettingsButton extends preact_1.Component {
    constructor() {
        super(...arguments);
        this.onFreeModeClick = () => {
            if (this.props.game.mode === Game_1.PlayerMode.FREE) {
                return;
            }
            this.props.game.changeMode(Game_1.PlayerMode.FREE);
            this.props.game.player.pause();
        };
        this.onReplayModeClick = () => {
            if (this.props.game.mode === Game_1.PlayerMode.REPLAY) {
                return;
            }
            this.props.game.changeMode(Game_1.PlayerMode.REPLAY);
        };
        this.toggleMenu = () => {
            this.setState({ isOpen: !this.state.isOpen });
        };
    }
    render() {
        const hasReplay = !!this.props.game.player.replay;
        return (preact_1.h("div", { class: style_1.SettingsButtonStyle.settings },
            preact_1.h("div", { class: typestyle_1.classes(Controls_style_1.ControlsStyle.button, style_1.SettingsButtonStyle.button), onClick: this.toggleMenu },
                preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                    preact_1.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", fill: "#ffffff", d: "M23.9 10.7c0-0.3-0.4-0.6-0.8-0.6 -1.1 0-2.1-0.6-2.5-1.6 -0.4-1-0.1-2.2 0.7-3 0.3-0.2 0.3-0.6 0.1-0.9 -0.6-0.7-1.2-1.4-1.9-1.9 -0.3-0.2-0.7-0.2-0.9 0.1 -0.7 0.8-2 1.1-3 0.7 -1-0.4-1.7-1.5-1.6-2.6 0-0.4-0.2-0.7-0.6-0.7 -0.9-0.1-1.8-0.1-2.7 0C10.4 0.1 10.1 0.4 10.1 0.8 10.1 1.9 9.5 2.9 8.5 3.3 7.5 3.7 6.2 3.4 5.5 2.6c-0.2-0.3-0.6-0.3-0.9-0.1 -0.7 0.6-1.4 1.2-1.9 1.9C2.4 4.8 2.5 5.2 2.7 5.4c0.8 0.8 1.1 2 0.7 3 -0.4 1-1.4 1.6-2.6 1.6 -0.4 0-0.7 0.2-0.7 0.6 -0.1 0.9-0.1 1.8 0 2.7 0 0.3 0.4 0.6 0.8 0.6 1 0 2 0.6 2.5 1.6 0.4 1 0.2 2.2-0.7 3 -0.3 0.2-0.3 0.6-0.1 0.9 0.6 0.7 1.2 1.4 1.9 1.9 0.3 0.2 0.7 0.2 0.9-0.1 0.7-0.8 2-1.1 3-0.7 1 0.4 1.7 1.5 1.6 2.6 0 0.4 0.2 0.7 0.6 0.7C11.1 24 11.5 24 12 24c0.4 0 0.9 0 1.3-0.1 0.3 0 0.6-0.3 0.6-0.7 0-1.1 0.6-2.1 1.6-2.6 1-0.4 2.3-0.1 3 0.7 0.2 0.3 0.6 0.3 0.9 0.1 0.7-0.6 1.4-1.2 1.9-1.9 0.2-0.3 0.2-0.7-0.1-0.9 -0.8-0.8-1.1-2-0.7-3 0.4-1 1.4-1.6 2.5-1.6l0.1 0c0.3 0 0.7-0.2 0.7-0.6C24 12.5 24 11.6 23.9 10.7zM12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6c3.3 0 6 2.7 6 6S15.3 18 12 18zM12 16" }))),
            preact_1.h("div", { class: this.state.isOpen ? style_1.SettingsButtonStyle.menuOpen : style_1.SettingsButtonStyle.menu },
                preact_1.h("span", { class: style_1.SettingsButtonStyle.menuItemTitle }, "Mode"),
                hasReplay ? (preact_1.h("span", { class: this.props.game.mode === Game_1.PlayerMode.REPLAY
                        ? style_1.SettingsButtonStyle.menuItemSelected
                        : style_1.SettingsButtonStyle.menuItem, onClick: this.onReplayModeClick }, "Replay")) : (preact_1.h("span", null)),
                preact_1.h("span", { class: this.props.game.mode === Game_1.PlayerMode.FREE
                        ? style_1.SettingsButtonStyle.menuItemSelected
                        : style_1.SettingsButtonStyle.menuItem, onClick: this.onFreeModeClick }, "Free"))));
    }
}
exports.SettingsButton = SettingsButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/SettingsButton/style.ts":
/*!*************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/SettingsButton/style.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const menuStyle = () => ({
    display: 'none',
    position: 'absolute',
    left: '-38px',
    bottom: '48px',
    padding: '2px 6px',
    fontSize: '14px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexFlow: 'column',
    minWidth: '100px'
});
const menuItemStyle = () => ({
    cursor: 'pointer',
    margin: '4px 0',
    padding: '4px',
    $nest: {
        '&:last-child': {
            marginTop: 0
        },
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
    }
});
exports.SettingsButtonStyle = typestyle_1.stylesheet({
    settings: {
        position: 'relative'
    },
    menu: Object.assign({}, menuStyle()),
    menuOpen: Object.assign({}, menuStyle(), { display: 'flex' }),
    menuItemTitle: {
        padding: '6px 4px',
        borderBottom: '1px solid white',
        fontWeight: 'bold'
    },
    menuItem: Object.assign({}, menuItemStyle()),
    menuItemSelected: Object.assign({}, menuItemStyle(), { backgroundColor: 'rgba(255, 255, 255, 0.2) !important' }),
    button: {
        width: '32px',
        height: '32px',
        padding: '5px'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Buttons/SpeedDownButton/index.tsx":
/*!***************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/SpeedDownButton/index.tsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Buttons/SpeedDownButton/style.ts");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
function SpeedDownButton(props) {
    return (preact_1.h("div", { class: typestyle_1.classes(Controls_style_1.ControlsStyle.button, style_1.SpeedDownButtonStyle.button), onClick: props.onClick },
        preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 0 L0 64 L32 32 L32 64 L64 32 L32 0 L32 32 Z" }))));
}
exports.SpeedDownButton = SpeedDownButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/SpeedDownButton/style.ts":
/*!**************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/SpeedDownButton/style.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.SpeedDownButtonStyle = typestyle_1.stylesheet({
    button: {
        transform: 'rotate(180deg)'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Buttons/SpeedUpButton/index.tsx":
/*!*************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/SpeedUpButton/index.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
function SpeedUpButton(props) {
    return (preact_1.h("div", { class: Controls_style_1.ControlsStyle.button, onClick: props.onClick },
        preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", fill: "currentcolor" },
            preact_1.h("path", { d: "M0 0 L0 64 L32 32 L32 64 L64 32 L32 0 L32 32 Z" }))));
}
exports.SpeedUpButton = SpeedUpButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/VolumeButton/index.tsx":
/*!************************************************************!*\
  !*** ./src/PlayerInterface/Buttons/VolumeButton/index.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Buttons/VolumeButton/style.ts");
const Controls_style_1 = __webpack_require__(/*! ../../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
function VolumeButton(props) {
    return (preact_1.h("div", { class: typestyle_1.classes(Controls_style_1.ControlsStyle.button, style_1.VolumeButton.button), onClick: props.onClick },
        preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", fill: "currentcolor" },
            preact_1.h("path", { d: "M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z" }))));
}
exports.VolumeButton = VolumeButton;


/***/ }),

/***/ "./src/PlayerInterface/Buttons/VolumeButton/style.ts":
/*!***********************************************************!*\
  !*** ./src/PlayerInterface/Buttons/VolumeButton/style.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.VolumeButton = typestyle_1.stylesheet({
    button: {
        width: '28px',
        height: '28px',
        padding: '2px',
        marginRight: '5px'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Controls.style.ts":
/*!***********************************************!*\
  !*** ./src/PlayerInterface/Controls.style.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const controlsStyle = () => ({
    zIndex: 30,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '0 16px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    userSelect: 'none',
    opacity: 0,
    transition: 'opacity 0.2s'
});
exports.ControlsStyle = typestyle_1.stylesheet({
    controls: Object.assign({}, controlsStyle()),
    controlsVisible: Object.assign({}, controlsStyle(), { opacity: 1 }),
    buttons: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '6px',
        alignItems: 'center'
    },
    button: {
        width: '32px',
        height: '32px',
        padding: '7px',
        boxSizing: 'border-box',
        cursor: 'pointer'
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        $nest: {
            '& .button': {
                marginRight: '8px'
            }
        }
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        width: '70px',
        height: '100%',
        justifyContent: 'space-between'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/FreeMode/index.tsx":
/*!************************************************!*\
  !*** ./src/PlayerInterface/FreeMode/index.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/FreeMode/style.ts");
const Controls_style_1 = __webpack_require__(/*! ../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
const SettingsButton_1 = __webpack_require__(/*! ../Buttons/SettingsButton */ "./src/PlayerInterface/Buttons/SettingsButton/index.tsx");
const FullscreenButton_1 = __webpack_require__(/*! ../Buttons/FullscreenButton */ "./src/PlayerInterface/Buttons/FullscreenButton/index.tsx");
function FreeMode(props) {
    return (preact_1.h("div", { class: typestyle_1.classes(props.class, style_1.FreeModeStyle.controls) },
        preact_1.h("div", { class: Controls_style_1.ControlsStyle.buttons },
            preact_1.h("div", { class: Controls_style_1.ControlsStyle.left }),
            preact_1.h("div", { class: Controls_style_1.ControlsStyle.right },
                preact_1.h(SettingsButton_1.SettingsButton, { game: props.game }),
                preact_1.h(FullscreenButton_1.FullscreenButton, { active: false, root: props.root })))));
}
exports.FreeMode = FreeMode;


/***/ }),

/***/ "./src/PlayerInterface/FreeMode/style.ts":
/*!***********************************************!*\
  !*** ./src/PlayerInterface/FreeMode/style.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.FreeModeStyle = typestyle_1.stylesheet({
    controls: {
        height: '44px'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Loading/index.tsx":
/*!***********************************************!*\
  !*** ./src/PlayerInterface/Loading/index.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Loading/style.ts");
const itemTypeGroupName = {
    replay: 'Replay',
    bsp: 'Map',
    sound: 'Sounds',
    sky: 'Skybox',
    sprite: 'Sprites',
    wad: 'Wads'
};
class Loading extends preact_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: {}
        };
        this.onItemLoad = (item) => {
            const items = this.state.items[item.type] ? this.state.items[item.type] : [];
            for (let i = 0; i < items.length; ++i) {
                if (items[i] === item) {
                    return;
                }
            }
            items.push({
                name: item.name,
                progress: 0
            });
            this.setState({
                items: Object.assign({}, this.state.items, { [item.type]: items })
            });
        };
        this.onItemProgress = (item) => {
            if (!this.state.items[item.type]) {
                return;
            }
            const items = this.state.items[item.type];
            for (let i = 0; i < items.length; ++i) {
                if (items[i].name === item.name) {
                    items[i].progress = item.progress;
                    break;
                }
            }
            this.forceUpdate();
        };
    }
    componentDidMount() {
        const loaderEvents = this.props.game.loader.events;
        this.offLoadStart = loaderEvents.on('loadstart', this.onItemLoad);
        this.offProgress = loaderEvents.on('progress', this.onItemProgress);
    }
    componentWillUnmount() {
        this.offLoadStart && this.offLoadStart();
        this.offProgress && this.offProgress();
    }
    formatItem(name, progress) {
        name = itemTypeGroupName[name];
        const status = Math.round(progress * 100) + '%';
        let length = 29 - name.length - status.length;
        if (length < 2) {
            length = 9 - status.length;
        }
        const dots = Array(length).join('.');
        return `${name}${dots}${status}`;
    }
    render() {
        return (preact_1.h("div", { class: this.props.visible ? style_1.LoadingStyle.loading : style_1.LoadingStyle.loadingHidden },
            preact_1.h("div", { class: style_1.LoadingStyle.spinner },
                preact_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "80px", height: "80px", viewBox: "0 0 80 80", xmlSpace: "preserve" },
                    preact_1.h("path", { fill: "#ffffff", width: "10px", d: "M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z" }))),
            preact_1.h("ul", { class: style_1.LoadingStyle.log }, Object.entries(this.state.items).map(([name, items]) => (preact_1.h("li", { key: name, class: style_1.LoadingStyle.logItem }, this.formatItem(name, items.reduce((prev, cur) => prev + cur.progress, 0) /
                items.length)))))));
    }
}
exports.Loading = Loading;


/***/ }),

/***/ "./src/PlayerInterface/Loading/style.ts":
/*!**********************************************!*\
  !*** ./src/PlayerInterface/Loading/style.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const loadingStyle = () => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    opacity: 1,
    transition: 'opacity 2s ease, z-index 1s linear',
    zIndex: 30
});
exports.LoadingStyle = typestyle_1.stylesheet({
    loading: Object.assign({}, loadingStyle()),
    loadingHidden: Object.assign({}, loadingStyle(), { opacity: 0, userSelect: 'none', zIndex: 0 }),
    spinner: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: '-40px',
        marginTop: '-40px',
        animation: 'rotate 1s linear 0s infinite',
        height: '80px',
        width: '80px',
        animationName: typestyle_1.keyframes({
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
        })
    },
    log: {
        position: 'absolute',
        background: 'rgba(0,0,0,0.4)',
        padding: '10px',
        fontFamily: 'monospace',
        margin: '0',
        top: '16px',
        right: 0,
        paddingLeft: '16px',
        listStyle: 'none'
    },
    logItem: {
        display: 'block'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/ReplayMode/index.tsx":
/*!**************************************************!*\
  !*** ./src/PlayerInterface/ReplayMode/index.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Time_1 = __webpack_require__(/*! ../Time */ "./src/PlayerInterface/Time/index.tsx");
const TimeLine_1 = __webpack_require__(/*! ../TimeLine */ "./src/PlayerInterface/TimeLine/index.tsx");
const VolumeControl_1 = __webpack_require__(/*! ../VolumeControl */ "./src/PlayerInterface/VolumeControl/index.tsx");
const PlayButton_1 = __webpack_require__(/*! ../Buttons/PlayButton */ "./src/PlayerInterface/Buttons/PlayButton/index.tsx");
const PauseButton_1 = __webpack_require__(/*! ../Buttons/PauseButton */ "./src/PlayerInterface/Buttons/PauseButton/index.tsx");
const VolumeButton_1 = __webpack_require__(/*! ../Buttons/VolumeButton */ "./src/PlayerInterface/Buttons/VolumeButton/index.tsx");
const SpeedUpButton_1 = __webpack_require__(/*! ../Buttons/SpeedUpButton */ "./src/PlayerInterface/Buttons/SpeedUpButton/index.tsx");
const SpeedDownButton_1 = __webpack_require__(/*! ../Buttons/SpeedDownButton */ "./src/PlayerInterface/Buttons/SpeedDownButton/index.tsx");
const SettingsButton_1 = __webpack_require__(/*! ../Buttons/SettingsButton */ "./src/PlayerInterface/Buttons/SettingsButton/index.tsx");
const FullscreenButton_1 = __webpack_require__(/*! ../Buttons/FullscreenButton */ "./src/PlayerInterface/Buttons/FullscreenButton/index.tsx");
const Controls_style_1 = __webpack_require__(/*! ../Controls.style */ "./src/PlayerInterface/Controls.style.ts");
class ReplayMode extends preact_1.Component {
    constructor() {
        super(...arguments);
        this.onPlayClick = () => {
            this.props.game.player.play();
        };
        this.onPauseClick = () => {
            this.props.game.player.pause();
        };
        this.onSpeedDown = () => {
            this.props.game.player.speedDown();
        };
        this.onSpeedUp = () => {
            this.props.game.player.speedUp();
        };
        this.onVolumeClick = () => {
            this.props.game.soundSystem.toggleMute();
        };
        this.onPlayStateChange = () => {
            this.forceUpdate();
        };
    }
    componentDidMount() {
        this.offPlay = this.props.game.player.events.on('play', this.onPlayStateChange);
        this.offPause = this.props.game.player.events.on('pause', this.onPlayStateChange);
        this.offStop = this.props.game.player.events.on('stop', this.onPlayStateChange);
    }
    componentWillUnmount() {
        this.offPlay && this.offPlay();
        this.offPause && this.offPause();
        this.offStop && this.offStop();
    }
    render() {
        const game = this.props.game;
        const player = game.player;
        const playing = player.isPlaying;
        const paused = player.isPaused;
        return (preact_1.h("div", { class: this.props.class },
            preact_1.h(TimeLine_1.TimeLine, { game: game }),
            preact_1.h("div", { class: Controls_style_1.ControlsStyle.buttons },
                preact_1.h("div", { class: Controls_style_1.ControlsStyle.left },
                    preact_1.h(SpeedDownButton_1.SpeedDownButton, { onClick: this.onSpeedDown }),
                    paused || !playing ? (preact_1.h(PlayButton_1.PlayButton, { onClick: this.onPlayClick })) : (preact_1.h(PauseButton_1.PauseButton, { onClick: this.onPauseClick })),
                    preact_1.h(SpeedUpButton_1.SpeedUpButton, { onClick: this.onSpeedUp }),
                    preact_1.h(VolumeButton_1.VolumeButton, { onClick: this.onVolumeClick }),
                    preact_1.h(VolumeControl_1.VolumeControl, { game: game }),
                    preact_1.h(Time_1.Time, { player: player })),
                preact_1.h("div", { class: Controls_style_1.ControlsStyle.right },
                    preact_1.h(SettingsButton_1.SettingsButton, { game: game }),
                    preact_1.h(FullscreenButton_1.FullscreenButton, { active: true, root: this.props.root })))));
    }
}
exports.ReplayMode = ReplayMode;


/***/ }),

/***/ "./src/PlayerInterface/Root.style.ts":
/*!*******************************************!*\
  !*** ./src/PlayerInterface/Root.style.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
const rootStyle = () => ({
    position: 'relative',
    color: 'white',
    width: '100%',
    height: '100%',
    cursor: 'none',
    userSelect: 'none'
});
const titleStyle = () => ({
    position: 'absolute',
    top: '20px',
    left: '0',
    zIndex: 20,
    padding: '10px 10px 10px 20px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    fontSize: '13pt',
    fontFamily: `'Roboto', Arial, Helvetica, sans-serif`,
    opacity: 0,
    transition: 'opacity 0.2s'
});
const controlsStyle = () => ({
    zIndex: 30,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '0 16px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    userSelect: 'none',
    opacity: 0,
    transition: 'opacity 0.2s'
});
exports.RootStyle = typestyle_1.stylesheet({
    root: Object.assign({}, rootStyle()),
    rootVisible: Object.assign({}, rootStyle(), { cursor: 'default' }),
    title: Object.assign({}, titleStyle()),
    titleVisible: Object.assign({}, titleStyle(), { opacity: 1 }),
    controls: Object.assign({}, controlsStyle()),
    controlsVisible: Object.assign({}, controlsStyle(), { opacity: 1 }),
    screen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10
    }
});


/***/ }),

/***/ "./src/PlayerInterface/Root.tsx":
/*!**************************************!*\
  !*** ./src/PlayerInterface/Root.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Loading_1 = __webpack_require__(/*! ./Loading */ "./src/PlayerInterface/Loading/index.tsx");
const FreeMode_1 = __webpack_require__(/*! ./FreeMode */ "./src/PlayerInterface/FreeMode/index.tsx");
const ReplayMode_1 = __webpack_require__(/*! ./ReplayMode */ "./src/PlayerInterface/ReplayMode/index.tsx");
const Fullscreen_1 = __webpack_require__(/*! ../Fullscreen */ "./src/Fullscreen.ts");
const Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
const Root_style_1 = __webpack_require__(/*! ./Root.style */ "./src/PlayerInterface/Root.style.ts");
class Root extends preact_1.Component {
    constructor(props) {
        super(props);
        this.node = null;
        this.fadeOut = 0;
        this.onPointerLockChange = () => {
            if (document.pointerLockElement === this.props.root) {
                this.props.game.pointerLocked = true;
            }
            else {
                this.props.game.pointerLocked = false;
            }
        };
        this.onContextMenu = (e) => {
            e.preventDefault();
        };
        this.onWindowClick = () => {
            this.setState({ isActive: false });
        };
        this.onRootClick = (e) => {
            e.stopPropagation();
            this.setState({ isActive: true });
            this.fadeReset();
        };
        this.onKeyDown = (e) => {
            if (!this.state.isActive) {
                return;
            }
            const game = this.props.game;
            switch (e.which) {
                case 70: {
                    if (Fullscreen_1.Fullscreen.isInFullscreen()) {
                        Fullscreen_1.Fullscreen.exit();
                    }
                    else {
                        Fullscreen_1.Fullscreen.enter(this.props.root);
                    }
                    this.fadeReset();
                    break;
                }
                case 77: {
                    game.soundSystem.toggleMute();
                    this.fadeReset();
                    break;
                }
                case 38: {
                    game.soundSystem.setVolume(game.soundSystem.getVolume() + 0.05);
                    this.fadeReset();
                    break;
                }
                case 40: {
                    game.soundSystem.setVolume(game.soundSystem.getVolume() - 0.05);
                    this.fadeReset();
                    break;
                }
                case 74:
                case 37: {
                    game.player.seek(game.player.currentTime - 5);
                    this.fadeReset();
                    break;
                }
                case 76:
                case 39: {
                    game.player.seek(game.player.currentTime + 5);
                    this.fadeReset();
                    break;
                }
                case 75:
                case 32: {
                    if (this.props.game.mode !== Game_1.PlayerMode.REPLAY) {
                        return;
                    }
                    if (!game.player.isPlaying || game.player.isPaused) {
                        game.player.play();
                    }
                    else {
                        game.player.pause();
                    }
                    break;
                }
            }
        };
        this.onModeChange = () => {
            this.forceUpdate();
        };
        this.onLoadStart = () => {
            this.setState({ isLoading: true });
        };
        this.onLoadEnd = () => {
            this.setState({ isLoading: false });
        };
        this.onTitleChange = (title) => {
            this.setState({ title });
        };
        this.onMouseEnter = () => {
            this.setState({ isMouseOver: true });
            this.fadeReset();
        };
        this.onMouseMove = () => {
            if (this.state.isMouseOver && !Fullscreen_1.Fullscreen.isInFullscreen()) {
                this.fadeReset();
            }
        };
        this.onMouseLeave = () => {
            this.setState({
                isMouseOver: false,
                isVisible: false
            });
            clearTimeout(this.fadeOut);
            this.fadeOut = 0;
        };
        this.fadeReset = () => {
            if (!this.state.isVisible) {
                this.setState({ isVisible: true });
            }
            clearTimeout(this.fadeOut);
            this.fadeOut = setTimeout(() => {
                this.setState({ isVisible: false });
                this.fadeOut = 0;
            }, 5000);
        };
        this.onScreenClick = () => {
            switch (this.props.game.mode) {
                case Game_1.PlayerMode.REPLAY: {
                    const player = this.props.game.player;
                    if (!player.isPlaying || player.isPaused) {
                        player.play();
                    }
                    else {
                        player.pause();
                    }
                    break;
                }
                case Game_1.PlayerMode.FREE: {
                    this.props.root.requestPointerLock();
                    break;
                }
            }
        };
        this.onScreenDblClick = () => {
            if (Fullscreen_1.Fullscreen.isInFullscreen()) {
                Fullscreen_1.Fullscreen.exit();
            }
            else {
                Fullscreen_1.Fullscreen.enter(this.props.root);
            }
        };
        this.state = {
            title: props.game.title,
            isActive: false,
            isLoading: false,
            isMouseOver: false,
            isVisible: false
        };
    }
    componentDidMount() {
        if (!this.node) {
            return;
        }
        const game = this.props.game;
        const root = this.props.root;
        this.node.appendChild(game.getCanvas());
        this.offLoadStart = game.events.on('loadstart', this.onLoadStart);
        this.offLoad = game.events.on('load', this.onLoadEnd);
        this.offModeChange = game.events.on('modechange', this.onModeChange);
        this.offTitleChange = game.events.on('titlechange', this.onTitleChange);
        root.addEventListener('click', this.onRootClick);
        window.addEventListener('click', this.onWindowClick);
        window.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
        root.addEventListener('mouseover', this.onMouseEnter);
        root.addEventListener('mousemove', this.onMouseMove);
        root.addEventListener('mouseout', this.onMouseLeave);
        root.addEventListener('contextmenu', this.onContextMenu);
    }
    componentWillUnmount() {
        const root = this.props.root;
        this.offLoadStart && this.offLoadStart();
        this.offLoad && this.offLoad();
        this.offModeChange && this.onModeChange();
        this.offTitleChange && this.offTitleChange();
        root.removeEventListener('click', this.onRootClick);
        window.removeEventListener('click', this.onWindowClick);
        window.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('pointerlockchange', this.onPointerLockChange, false);
        root.removeEventListener('mouseover', this.onMouseEnter);
        root.removeEventListener('mousemove', this.onMouseMove);
        root.removeEventListener('mouseout', this.onMouseLeave);
        root.removeEventListener('contextmenu', this.onContextMenu);
    }
    render() {
        const game = this.props.game;
        const isVisible = this.state.isVisible;
        return (preact_1.h("div", { class: isVisible ? Root_style_1.RootStyle.rootVisible : Root_style_1.RootStyle.root },
            preact_1.h("div", { class: isVisible ? Root_style_1.RootStyle.titleVisible : Root_style_1.RootStyle.title }, this.state.title),
            preact_1.h(Loading_1.Loading, { game: game, visible: this.state.isLoading }),
            preact_1.h("div", { class: Root_style_1.RootStyle.screen, ref: node => (this.node = node), onClick: this.onScreenClick, onDblClick: this.onScreenDblClick }),
            game.mode === Game_1.PlayerMode.FREE ? (preact_1.h(FreeMode_1.FreeMode, { class: isVisible ? Root_style_1.RootStyle.controlsVisible : Root_style_1.RootStyle.controls, game: game, root: this.props.root })) : (preact_1.h(ReplayMode_1.ReplayMode, { class: isVisible ? Root_style_1.RootStyle.controlsVisible : Root_style_1.RootStyle.controls, game: game, root: this.props.root, visible: this.state.isMouseOver }))));
    }
}
exports.Root = Root;


/***/ }),

/***/ "./src/PlayerInterface/Time/index.tsx":
/*!********************************************!*\
  !*** ./src/PlayerInterface/Time/index.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Time_1 = __webpack_require__(/*! ../../Time */ "./src/Time.ts");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/Time/style.ts");
class Time extends preact_1.Component {
    constructor() {
        super(...arguments);
        this.onPlay = () => {
            this.setState({
                isPlaying: true
            }, this.update);
        };
        this.onPauseOrStop = () => {
            this.setState({
                isPlaying: false
            });
        };
        this.update = () => {
            if (!this.state.isPlaying) {
                return;
            }
            this.forceUpdate();
            setTimeout(this.update, 100);
        };
    }
    componentDidMount() {
        this.offPlay = this.props.player.events.on('play', this.onPlay);
        this.offPause = this.props.player.events.on('pause', this.onPauseOrStop);
        this.offStop = this.props.player.events.on('stop', this.onPauseOrStop);
    }
    componentWillUnmount() {
        this.offPlay && this.offPlay();
        this.offPause && this.offPause();
        this.offStop && this.offStop();
    }
    render() {
        const current = Time_1.formatTime(this.props.player.currentTime);
        const total = Time_1.formatTime(this.props.player.replay.length);
        return (preact_1.h("div", { class: style_1.Time.time },
            current,
            " / ",
            total));
    }
}
exports.Time = Time;


/***/ }),

/***/ "./src/PlayerInterface/Time/style.ts":
/*!*******************************************!*\
  !*** ./src/PlayerInterface/Time/style.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.Time = typestyle_1.stylesheet({
    time: {
        fontFamily: `'Roboto', Arial, Helvetica, sans-serif`,
        fontSize: '10pt'
    }
});


/***/ }),

/***/ "./src/PlayerInterface/TimeLine/index.tsx":
/*!************************************************!*\
  !*** ./src/PlayerInterface/TimeLine/index.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/TimeLine/style.ts");
class TimeLine extends preact_1.Component {
    constructor(props) {
        super(props);
        this.onPostUpdate = () => {
            const player = this.props.game.player;
            this.setState({
                progress: player.currentTime / player.replay.length
            });
        };
        this.onClick = (e) => {
            const rects = e.currentTarget.getClientRects()[0];
            const progress = 1 - (rects.right - e.pageX) / (rects.right - rects.left);
            this.props.game.player.seekByPercent(progress * 100);
            this.props.game.player.pause();
        };
        this.onMouseEnter = () => {
            this.setState({
                ghostKnobActive: true
            });
        };
        this.onMouseMove = (e) => {
            if (!this.state.ghostKnobActive) {
                return;
            }
            const rects = e.currentTarget.getClientRects()[0];
            const progressPos = 1 - (rects.right - e.pageX) / (rects.right - rects.left);
            const pos = progressPos * 100 + '%';
            this.setState({
                ghostKnobPos: pos
            });
        };
        this.onMouseLeave = () => {
            this.setState({
                ghostKnobActive: false
            });
        };
        this.state = {
            progress: 0,
            ghostKnobActive: false,
            ghostKnobPos: '0%',
            onPostUpdate: null
        };
    }
    componentDidMount() {
        this.offPostUpdate = this.props.game.events.on('postupdate', this.onPostUpdate);
    }
    componentWillUnmount() {
        if (this.offPostUpdate) {
            this.offPostUpdate();
        }
    }
    render() {
        const timePos = this.state.progress * 100;
        const knobOff = timePos + '%';
        const lineOff = 100 - timePos + '%';
        return (preact_1.h("div", { class: style_1.TimeLine.timeline, onClick: this.onClick, onMouseEnter: this.onMouseEnter, onMouseMove: this.onMouseMove, onMouseLeave: this.onMouseLeave },
            preact_1.h("div", { class: style_1.TimeLine.ghostLine }),
            preact_1.h("div", { class: style_1.TimeLine.line, style: { right: lineOff } }),
            preact_1.h("div", { class: style_1.TimeLine.knob, style: { left: knobOff } }),
            preact_1.h("div", { class: style_1.TimeLine.ghostKnob, style: { left: this.state.ghostKnobPos } })));
    }
}
exports.TimeLine = TimeLine;


/***/ }),

/***/ "./src/PlayerInterface/TimeLine/style.ts":
/*!***********************************************!*\
  !*** ./src/PlayerInterface/TimeLine/style.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.TimeLine = typestyle_1.stylesheet({
    timeline: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '26px',
        cursor: 'pointer'
    },
    line: {
        height: '4px',
        backgroundColor: '#fff',
        position: 'absolute',
        left: '0',
        right: '0',
        borderRadius: '2px'
    },
    ghostLine: {
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'absolute',
        left: '0',
        right: '0',
        borderRadius: '2px'
    },
    knob: {
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        left: '100%',
        marginLeft: '-6px'
    },
    ghostKnob: {
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        borderRadius: '8px',
        left: '0',
        marginLeft: '-4px',
        display: 'none',
        $nest: {
            '&:hover': {
                display: 'block'
            }
        }
    }
});


/***/ }),

/***/ "./src/PlayerInterface/VolumeControl/index.tsx":
/*!*****************************************************!*\
  !*** ./src/PlayerInterface/VolumeControl/index.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const style_1 = __webpack_require__(/*! ./style */ "./src/PlayerInterface/VolumeControl/style.ts");
class VolumeControl extends preact_1.Component {
    constructor(props) {
        super(props);
        this.onVolumeChange = () => {
            this.setState({
                volume: this.props.game.soundSystem.getVolume()
            });
        };
        this.onClick = (e) => {
            const rects = e.currentTarget.getClientRects()[0];
            const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left);
            this.props.game.soundSystem.setVolume(volume);
        };
        this.onMouseEnter = () => {
            this.setState({
                ghostKnobActive: true
            });
        };
        this.onMouseMove = (e) => {
            if (!this.state.ghostKnobActive) {
                return;
            }
            const rects = e.currentTarget.getClientRects()[0];
            const volumePos = 1 - (rects.right - e.pageX) / (rects.right - rects.left);
            const pos = Math.min(95, Math.max(5, volumePos * 100)) + '%';
            this.setState({
                ghostKnobPos: pos
            });
        };
        this.onMouseLeave = () => {
            this.setState({
                ghostKnobActive: false
            });
        };
        this.state = {
            volume: props.game.soundSystem.getVolume(),
            ghostKnobActive: false,
            ghostKnobPos: '5%'
        };
    }
    componentDidMount() {
        this.offVolumeChange = this.props.game.soundSystem.events.on('volumeChange', this.onVolumeChange);
    }
    componentWillUnmount() {
        this.offVolumeChange && this.offVolumeChange();
    }
    render() {
        const volumePos = this.state.volume * 100;
        const knobOff = Math.min(95, Math.max(5, volumePos)) + '%';
        const lineOff = Math.min(95, Math.max(5, 100 - volumePos)) + '%';
        return (preact_1.h("div", { class: style_1.VolumeControl.control, onClick: this.onClick, onMouseEnter: this.onMouseEnter, onMouseMove: this.onMouseMove, onMouseLeave: this.onMouseLeave },
            preact_1.h("div", { class: style_1.VolumeControl.ghostLine }),
            preact_1.h("div", { class: style_1.VolumeControl.line, style: { right: lineOff } }),
            preact_1.h("div", { class: style_1.VolumeControl.knob, style: { left: knobOff } }),
            preact_1.h("div", { class: style_1.VolumeControl.ghostKnob, style: { left: this.state.ghostKnobPos } })));
    }
}
exports.VolumeControl = VolumeControl;


/***/ }),

/***/ "./src/PlayerInterface/VolumeControl/style.ts":
/*!****************************************************!*\
  !*** ./src/PlayerInterface/VolumeControl/style.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = __webpack_require__(/*! typestyle */ "./node_modules/typestyle/lib.es2015/index.js");
exports.VolumeControl = typestyle_1.stylesheet({
    control: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '80px',
        height: '26px',
        marginLeft: '6px',
        marginRight: '14px',
        cursor: 'pointer'
    },
    line: {
        height: '4px',
        backgroundColor: '#fff',
        position: 'absolute',
        left: '0',
        right: '0',
        borderRadius: '2px'
    },
    ghostLine: {
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'absolute',
        left: '0',
        right: '0',
        borderRadius: '2px'
    },
    knob: {
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        left: '100%',
        marginLeft: '-6px'
    },
    ghostKnob: {
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        borderRadius: '8px',
        left: '0',
        marginLeft: '-4px',
        display: 'none',
        $nest: {
            '&:hover': {
                display: 'block'
            }
        }
    }
});


/***/ }),

/***/ "./src/PlayerInterface/index.tsx":
/*!***************************************!*\
  !*** ./src/PlayerInterface/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
const Root_1 = __webpack_require__(/*! ./Root */ "./src/PlayerInterface/Root.tsx");
class PlayerInterface {
    constructor(game, rootNode) {
        this.game = game;
        this.rootNode = rootNode;
    }
    getRootNode() {
        return this.rootNode;
    }
    draw() {
        preact_1.render(preact_1.h(Root_1.Root, { game: this.game, root: this.rootNode }), this.rootNode);
    }
}
exports.PlayerInterface = PlayerInterface;


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
            return '';
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

/***/ "./src/Replay/DeltaType.ts":
/*!*********************************!*\
  !*** ./src/Replay/DeltaType.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DeltaType;
(function (DeltaType) {
    DeltaType[DeltaType["DT_BYTE"] = 1] = "DT_BYTE";
    DeltaType[DeltaType["DT_SHORT"] = 2] = "DT_SHORT";
    DeltaType[DeltaType["DT_FLOAT"] = 4] = "DT_FLOAT";
    DeltaType[DeltaType["DT_INTEGER"] = 8] = "DT_INTEGER";
    DeltaType[DeltaType["DT_ANGLE"] = 16] = "DT_ANGLE";
    DeltaType[DeltaType["DT_TIMEWINDOW_8"] = 32] = "DT_TIMEWINDOW_8";
    DeltaType[DeltaType["DT_TIMEWINDOW_BIG"] = 64] = "DT_TIMEWINDOW_BIG";
    DeltaType[DeltaType["DT_STRING"] = 128] = "DT_STRING";
    DeltaType[DeltaType["DT_SIGNED"] = -2147483648] = "DT_SIGNED";
})(DeltaType = exports.DeltaType || (exports.DeltaType = {}));


/***/ }),

/***/ "./src/Replay/FrameDataReader.ts":
/*!***************************************!*\
  !*** ./src/Replay/FrameDataReader.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const readCoord_1 = __webpack_require__(/*! ./readCoord */ "./src/Replay/readCoord.ts");
const readDelta_1 = __webpack_require__(/*! ./readDelta */ "./src/Replay/readDelta.ts");
const BitReader_1 = __webpack_require__(/*! ../BitReader */ "./src/BitReader.ts");
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
class FrameDataReader {
    static bad() {
        throw new Error('Invalid message type');
    }
    static nop() {
        return null;
    }
    static disconnect(r) {
        return {
            reason: r.str()
        };
    }
    static event(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let events = [];
        let eventCount = bs.readBits(5);
        for (let i = 0; i < eventCount; ++i) {
            let event = {
                index: bs.readBits(10)
            };
            let packetIndexBit = bs.readBits(1);
            if (packetIndexBit) {
                event.packetIndex = bs.readBits(11);
                let deltaBit = bs.readBits(1);
                if (deltaBit) {
                    event.delta = readDelta_1.readDelta(bs, deltaDecoders['event_t']);
                }
            }
            let fireTimeBit = bs.readBits(1);
            if (fireTimeBit) {
                event.fireTime = bs.readBits(16);
            }
            events.push(event);
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return { events };
    }
    static version(r) {
        return {
            version: r.ui()
        };
    }
    static setView(r) {
        return {
            entityIndex: r.s()
        };
    }
    static sound(r) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let flags = bs.readBits(9);
        let volume = 1;
        if ((flags & 1) !== 0) {
            volume = bs.readBits(8) / 255;
        }
        let attenuation = 1;
        if ((flags & 2) !== 0) {
            attenuation = bs.readBits(8) / 64;
        }
        let channel = bs.readBits(3);
        let entityIndex = bs.readBits(11);
        let soundIndex;
        if ((flags & 4) !== 0) {
            soundIndex = bs.readBits(16);
        }
        else {
            soundIndex = bs.readBits(8);
        }
        let xFlag = bs.readBits(1);
        let yFlag = bs.readBits(1);
        let zFlag = bs.readBits(1);
        let xPosition;
        let yPosition;
        let zPosition;
        if (xFlag) {
            xPosition = readCoord_1.readCoord(bs);
        }
        if (yFlag) {
            yPosition = readCoord_1.readCoord(bs);
        }
        if (zFlag) {
            zPosition = readCoord_1.readCoord(bs);
        }
        let pitch = 1;
        if ((flags & 8) !== 0) {
            pitch = bs.readBits(8);
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return {
            flags,
            volume,
            attenuation,
            channel,
            entityIndex,
            soundIndex,
            xPosition,
            yPosition,
            zPosition,
            pitch
        };
    }
    static time(r) {
        return {
            time: r.f()
        };
    }
    static print(r) {
        return {
            message: r.str()
        };
    }
    static stuffText(r) {
        let message = r.str();
        let commands = message.split(';').map(command => {
            let args = command
                .split(/\s*("[^"]+"|[^\s"]+)/)
                .map(arg => arg.replace(/^"(.*)"$/, '$1').trim())
                .filter(arg => arg);
            let func = args[0];
            let params = args.slice(1);
            return { func, params };
        });
        return { commands };
    }
    static setAngle(r) {
        return {
            pitch: r.s(),
            yaw: r.s(),
            roll: r.s()
        };
    }
    static serverInfo(r) {
        let info = {
            protocol: r.i(),
            spawnCount: r.i(),
            mapCrc: r.i(),
            clientDllHash: r.arrx(16, Reader_1.ReaderDataType.UByte),
            maxPlayers: r.ub(),
            playerIndex: r.ub(),
            isDeathmatch: r.ub(),
            gameDir: r.str(),
            hostName: r.str(),
            mapFileName: r.str(),
            mapCycle: r.str()
        };
        r.skip(1);
        return info;
    }
    static lightStyle(r) {
        return {
            index: r.ub(),
            lightInfo: r.str()
        };
    }
    static updateUserInfo(r) {
        return {
            clientIndex: r.ub(),
            clientUserId: r.ui(),
            clientUserInfo: r.str(),
            clientCdKeyHash: r.arrx(16, Reader_1.ReaderDataType.UByte)
        };
    }
    static deltaDescription(r, deltaDecoders) {
        let data = {
            name: r.str(),
            fields: []
        };
        let bs = new BitReader_1.BitStream(r.data.buffer);
        let fieldCount = r.us();
        bs.index = r.tell() * 8;
        for (let i = 0; i < fieldCount; ++i) {
            data.fields.push(readDelta_1.readDelta(bs, deltaDecoders['delta_description_t']));
        }
        deltaDecoders[data.name] = data.fields;
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return data;
    }
    static clientData(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let deltaSequence = bs.readBits(1);
        if (deltaSequence) {
            bs.index += 8;
        }
        let clientDataDecoder = deltaDecoders['clientdata_t'];
        let clientData = readDelta_1.readDelta(bs, clientDataDecoder);
        let weaponDataDecoder = deltaDecoders['weapon_data_t'];
        while (bs.readBits(1)) {
            bs.index += 6;
            readDelta_1.readDelta(bs, weaponDataDecoder);
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return {
            clientData
        };
    }
    static stopSound(r) {
        return {
            entityIndex: r.s()
        };
    }
    static pings(r) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let pings = [];
        while (bs.readBits(1)) {
            pings.push({
                slot: bs.readBits(8),
                ping: bs.readBits(8),
                loss: bs.readBits(8)
            });
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return pings;
    }
    static particle(r) {
        return {
            position: [r.s() / 8, r.s() / 8, r.s() / 8],
            direction: [r.b(), r.b(), r.b()],
            count: r.ub(),
            color: r.ub()
        };
    }
    static damage() {
        return null;
    }
    static spawnStatic(r) {
        let data = {
            modelIndex: r.s(),
            sequence: r.b(),
            frame: r.b(),
            colorMap: r.s(),
            skin: r.b(),
            position: [],
            rotation: []
        };
        data.position[0] = r.s() / 8;
        data.rotation[0] = r.b() * (360 / 256);
        data.position[1] = r.s() / 8;
        data.rotation[1] = r.b() * (360 / 256);
        data.position[2] = r.s() / 8;
        data.rotation[2] = r.b() * (360 / 256);
        data.renderMode = r.b();
        if (data.renderMode) {
            data.renderAmt = r.b();
            data.renderColor = [r.ub(), r.ub(), r.ub()];
            data.renderFx = r.b();
        }
        return data;
    }
    static eventReliable(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let eventIndex = bs.readBits(10);
        let eventData = readDelta_1.readDelta(bs, deltaDecoders['event_t']);
        let delayBit = bs.readBits(1);
        let delay;
        if (delayBit) {
            delay = bs.readBits(16);
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return {
            eventIndex,
            eventData,
            delayBit,
            delay
        };
    }
    static spawnBaseLine(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let entities = [];
        while (true) {
            let entityIdx = bs.readBits(11);
            if (entityIdx === (1 << 11) - 1) {
                break;
            }
            let entityType = bs.readBits(2);
            let entityTypeString;
            if (entityType & 1) {
                if (entityIdx > 0 && entityIdx <= 32) {
                    entityTypeString = 'entity_state_player_t';
                }
                else {
                    entityTypeString = 'entity_state_t';
                }
            }
            else {
                entityTypeString = 'custom_entity_state_t';
            }
            entities[entityIdx] = readDelta_1.readDelta(bs, deltaDecoders[entityTypeString]);
        }
        let footer = bs.readBits(5);
        if (footer !== (1 << 5) - 1) {
            throw new Error('Bad spawnbaseline');
        }
        let nExtraData = bs.readBits(6);
        let extraData = [];
        for (let i = 0; i < nExtraData; ++i) {
            extraData.push(readDelta_1.readDelta(bs, deltaDecoders['entity_state_t']));
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return {
            entities,
            extraData
        };
    }
    static tempEntity(r) {
        const TE_BEAMPOINTS = 0;
        const TE_BEAMENTPOINT = 1;
        const TE_GUNSHOT = 2;
        const TE_EXPLOSION = 3;
        const TE_TAREXPLOSION = 4;
        const TE_SMOKE = 5;
        const TE_TRACER = 6;
        const TE_LIGHTNING = 7;
        const TE_BEAMENTS = 8;
        const TE_SPARKS = 9;
        const TE_LAVASPLASH = 10;
        const TE_TELEPORT = 11;
        const TE_EXPLOSION2 = 12;
        const TE_BSPDECAL = 13;
        const TE_IMPLOSION = 14;
        const TE_SPRITETRAIL = 15;
        const TE_SPRITE = 17;
        const TE_BEAMSPRITE = 18;
        const TE_BEAMTORUS = 19;
        const TE_BEAMDISK = 20;
        const TE_BEAMCYLINDER = 21;
        const TE_BEAMFOLLOW = 22;
        const TE_GLOWSPRITE = 23;
        const TE_BEAMRING = 24;
        const TE_STREAK_SPLASH = 25;
        const TE_DLIGHT = 27;
        const TE_ELIGHT = 28;
        const TE_TEXTMESSAGE = 29;
        const TE_LINE = 30;
        const TE_BOX = 31;
        const TE_KILLBEAM = 99;
        const TE_LARGEFUNNEL = 100;
        const TE_BLOODSTREAM = 101;
        const TE_SHOWLINE = 102;
        const TE_BLOOD = 103;
        const TE_DECAL = 104;
        const TE_FIZZ = 105;
        const TE_MODEL = 106;
        const TE_EXPLODEMODEL = 107;
        const TE_BREAKMODEL = 108;
        const TE_GUNSHOTDECAL = 109;
        const TE_SPRITE_SPRAY = 110;
        const TE_ARMOR_RICOCHET = 111;
        const TE_PLAYERDECAL = 112;
        const TE_BUBBLES = 113;
        const TE_BUBBLETRAIL = 114;
        const TE_BLOODSPRITE = 115;
        const TE_WORLDDECAL = 116;
        const TE_WORLDDECALHIGH = 117;
        const TE_DECALHIGH = 118;
        const TE_PROJECTILE = 119;
        const TE_SPRAY = 120;
        const TE_PLAYERSPRITES = 121;
        const TE_PARTICLEBURST = 122;
        const TE_FIREFIELD = 123;
        const TE_PLAYERATTACHMENT = 124;
        const TE_KILLPLAYERATTACHMENTS = 125;
        const TE_MULTIGUNSHOT = 126;
        const TE_USERTRACER = 127;
        let type = r.ub();
        let data = {};
        switch (type) {
            case TE_BEAMPOINTS: {
                r.skip(24);
                break;
            }
            case TE_BEAMENTPOINT: {
                r.skip(20);
                break;
            }
            case TE_GUNSHOT: {
                r.skip(6);
                break;
            }
            case TE_EXPLOSION: {
                r.skip(11);
                break;
            }
            case TE_TAREXPLOSION: {
                r.skip(6);
                break;
            }
            case TE_SMOKE: {
                r.skip(10);
                break;
            }
            case TE_TRACER: {
                r.skip(12);
                break;
            }
            case TE_LIGHTNING: {
                r.skip(17);
                break;
            }
            case TE_BEAMENTS: {
                r.skip(16);
                break;
            }
            case TE_SPARKS: {
                r.skip(6);
                break;
            }
            case TE_LAVASPLASH: {
                r.skip(6);
                break;
            }
            case TE_TELEPORT: {
                r.skip(6);
                break;
            }
            case TE_EXPLOSION2: {
                r.skip(8);
                break;
            }
            case TE_BSPDECAL: {
                r.skip(8);
                let entityIndex = r.s();
                if (entityIndex) {
                    r.skip(2);
                }
                break;
            }
            case TE_IMPLOSION: {
                r.skip(9);
                break;
            }
            case TE_SPRITETRAIL: {
                r.skip(19);
                break;
            }
            case TE_SPRITE: {
                r.skip(10);
                break;
            }
            case TE_BEAMSPRITE: {
                r.skip(16);
                break;
            }
            case TE_BEAMTORUS: {
                r.skip(24);
                break;
            }
            case TE_BEAMDISK: {
                r.skip(24);
                break;
            }
            case TE_BEAMCYLINDER: {
                r.skip(24);
                break;
            }
            case TE_BEAMFOLLOW: {
                r.skip(10);
                break;
            }
            case TE_GLOWSPRITE: {
                r.skip(11);
                break;
            }
            case TE_BEAMRING: {
                r.skip(16);
                break;
            }
            case TE_STREAK_SPLASH: {
                r.skip(19);
                break;
            }
            case TE_DLIGHT: {
                r.skip(12);
                break;
            }
            case TE_ELIGHT: {
                r.skip(16);
                break;
            }
            case TE_TEXTMESSAGE: {
                data.channel = r.b();
                data.x = r.s();
                data.y = r.s();
                data.effect = r.b();
                data.textColor = [r.ub(), r.ub(), r.ub(), r.ub()];
                data.effectColor = [r.ub(), r.ub(), r.ub(), r.ub()];
                data.fadeInTime = r.s();
                data.fadeOutTime = r.s();
                data.holdTime = r.s();
                if (data.effect) {
                    data.effectTime = r.s();
                }
                data.message = r.str();
                break;
            }
            case TE_LINE: {
                r.skip(17);
                break;
            }
            case TE_BOX: {
                r.skip(17);
                break;
            }
            case TE_KILLBEAM: {
                r.skip(2);
                break;
            }
            case TE_LARGEFUNNEL: {
                r.skip(10);
                break;
            }
            case TE_BLOODSTREAM: {
                r.skip(14);
                break;
            }
            case TE_SHOWLINE: {
                r.skip(12);
                break;
            }
            case TE_BLOOD: {
                r.skip(14);
                break;
            }
            case TE_DECAL: {
                r.skip(9);
                break;
            }
            case TE_FIZZ: {
                r.skip(5);
                break;
            }
            case TE_MODEL: {
                r.skip(17);
                break;
            }
            case TE_EXPLODEMODEL: {
                r.skip(13);
                break;
            }
            case TE_BREAKMODEL: {
                r.skip(24);
                break;
            }
            case TE_GUNSHOTDECAL: {
                r.skip(9);
                break;
            }
            case TE_SPRITE_SPRAY: {
                r.skip(17);
                break;
            }
            case TE_ARMOR_RICOCHET: {
                r.skip(7);
                break;
            }
            case TE_PLAYERDECAL: {
                r.skip(10);
                break;
            }
            case TE_BUBBLES: {
                r.skip(19);
                break;
            }
            case TE_BUBBLETRAIL: {
                r.skip(19);
                break;
            }
            case TE_BLOODSPRITE: {
                r.skip(12);
                break;
            }
            case TE_WORLDDECAL: {
                r.skip(7);
                break;
            }
            case TE_WORLDDECALHIGH: {
                r.skip(7);
                break;
            }
            case TE_DECALHIGH: {
                r.skip(9);
                break;
            }
            case TE_PROJECTILE: {
                r.skip(16);
                break;
            }
            case TE_SPRAY: {
                r.skip(18);
                break;
            }
            case TE_PLAYERSPRITES: {
                r.skip(5);
                break;
            }
            case TE_PARTICLEBURST: {
                r.skip(10);
                break;
            }
            case TE_FIREFIELD: {
                r.skip(9);
                break;
            }
            case TE_PLAYERATTACHMENT: {
                r.skip(7);
                break;
            }
            case TE_KILLPLAYERATTACHMENTS: {
                r.skip(1);
                break;
            }
            case TE_MULTIGUNSHOT: {
                r.skip(18);
                break;
            }
            case TE_USERTRACER: {
                r.skip(15);
                break;
            }
            default: {
                throw new Error('Unknown temp entity type');
            }
        }
        return data;
    }
    static setPause(r) {
        return {
            isPaused: r.b()
        };
    }
    static signOnNum(r) {
        return {
            sign: r.b()
        };
    }
    static centerPrint(r) {
        return {
            message: r.str()
        };
    }
    static killedMonster() {
        return null;
    }
    static foundSecret() {
        return null;
    }
    static spawnStaticSound(r) {
        return {
            position: [r.s() / 8, r.s() / 8, r.s() / 8],
            soundIndex: r.us(),
            volume: r.ub() / 255,
            attenuation: r.ub() / 64,
            entityIndex: r.us(),
            pitch: r.ub(),
            flags: r.ub()
        };
    }
    static intermission() {
        return null;
    }
    static finale(r) {
        return {
            text: r.str()
        };
    }
    static cdTrack(r) {
        return {
            track: r.b(),
            loopTrack: r.b()
        };
    }
    static restore(r) {
        let saveName = r.str();
        let mapCount = r.ub();
        let maps = [];
        for (let i = 0; i < mapCount; ++i) {
            maps.push(r.str());
        }
        return { saveName, maps };
    }
    static cutscene(r) {
        return {
            text: r.str()
        };
    }
    static weaponAnim(r) {
        return {
            sequenceNumber: r.b(),
            weaponModelBodyGroup: r.b()
        };
    }
    static decalName(r) {
        return {
            positionIndex: r.ub(),
            decalName: r.str()
        };
    }
    static roomType(r) {
        return {
            type: r.us()
        };
    }
    static addAngle(r) {
        return {
            angleToAdd: r.s() / (360 / 65536)
        };
    }
    static newUserMsg(r) {
        return {
            index: r.ub(),
            size: r.b(),
            name: r.nstr(16)
        };
    }
    static packetEntities(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let entityStates = [];
        bs.readBits(16);
        let entityNumber = 0;
        while (true) {
            let footer = bs.readBits(16);
            if (footer === 0) {
                break;
            }
            bs.index -= 16;
            let entityNumberIncrement = bs.readBits(1);
            if (!entityNumberIncrement) {
                let absoluteEntityNumber = bs.readBits(1);
                if (absoluteEntityNumber) {
                    entityNumber = bs.readBits(11);
                }
                else {
                    entityNumber += bs.readBits(6);
                }
            }
            else {
                entityNumber++;
            }
            let custom = bs.readBits(1);
            let useBaseline = bs.readBits(1);
            if (useBaseline) {
                bs.index += 6;
            }
            let entityType = 'entity_state_t';
            if (entityNumber > 0 && entityNumber <= 32) {
                entityType = 'entity_state_player_t';
            }
            else if (custom) {
                entityType = 'custom_entity_state_t';
            }
            entityStates.push(readDelta_1.readDelta(bs, deltaDecoders[entityType]));
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return { entityStates };
    }
    static deltaPacketEntities(r, deltaDecoders) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        bs.readBits(16);
        bs.index += 8;
        let entityStates = [];
        let entityIdx = 0;
        while (true) {
            let footer = bs.readBits(16);
            if (footer === 0) {
                break;
            }
            bs.index -= 16;
            let removeEntity = bs.readBits(1);
            let absoluteEntityNumber = bs.readBits(1);
            if (absoluteEntityNumber) {
                entityIdx = bs.readBits(11);
            }
            else {
                entityIdx += bs.readBits(6);
            }
            if (removeEntity) {
                continue;
            }
            let custom = bs.readBits(1);
            let entityType = 'entity_state_t';
            if (entityIdx > 0 && entityIdx < 32) {
                entityType = 'entity_state_player_t';
            }
            else if (custom) {
                entityType = 'custom_entity_state_t';
            }
            entityStates[entityIdx] = readDelta_1.readDelta(bs, deltaDecoders[entityType]);
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return { entityStates };
    }
    static choke() {
        return null;
    }
    static resourceList(r) {
        let bs = new BitReader_1.BitStream(r.data.buffer);
        bs.index = r.tell() * 8;
        let entries = [];
        let entryCount = bs.readBits(12);
        for (let i = 0; i < entryCount; ++i) {
            let entry = {};
            entry.type = bs.readBits(4);
            entry.name = bs.readString();
            entry.index = bs.readBits(12);
            entry.size = bs.readBits(24);
            let flags = bs.readBits(3);
            if (flags & 4) {
                bs.index += 128;
            }
            if (bs.readBits(1)) {
                bs.index += 256;
            }
            entries.push(entry);
        }
        if (bs.readBits(1)) {
            while (bs.readBits(1)) {
                let nBits = bs.readBits(1) ? 5 : 10;
                bs.index += nBits;
            }
        }
        if (bs.index % 8 > 0) {
            r.seek(Math.floor(bs.index / 8) + 1);
        }
        else {
            r.seek(bs.index / 8);
        }
        return entries;
    }
    static newMoveVars(r) {
        return {
            gravity: r.f(),
            stopSpeed: r.f(),
            maxSpeed: r.f(),
            spectatorMaxSpeed: r.f(),
            acceleration: r.f(),
            airAcceleration: r.f(),
            waterAcceleration: r.f(),
            friction: r.f(),
            edgeFriction: r.f(),
            waterFriction: r.f(),
            entityGravity: r.f(),
            bounce: r.f(),
            stepSize: r.f(),
            maxVelocity: r.f(),
            zMax: r.f(),
            waveHeight: r.f(),
            footsteps: r.b(),
            rollAngle: r.f(),
            rollSpeed: r.f(),
            skyColor: [r.f(), r.f(), r.f()],
            skyVec: [r.f(), r.f(), r.f()],
            skyName: r.str()
        };
    }
    static resourceRequest(r) {
        let data = {
            spawnCount: r.i()
        };
        r.skip(4);
        return data;
    }
    static customization(r) {
        let playerIndex = r.ub();
        let type = r.ub();
        let name = r.str();
        let index = r.us();
        let downloadSize = r.ui();
        let flags = r.ub();
        let md5hash;
        if (flags & 4) {
            md5hash = [r.i(), r.i(), r.i(), r.i()];
        }
        return {
            playerIndex,
            type,
            name,
            index,
            downloadSize,
            flags,
            md5hash
        };
    }
    static crosshairAngle(r) {
        return {
            pitch: r.b(),
            yaw: r.b()
        };
    }
    static soundFade(r) {
        return {
            initialPercent: r.ub(),
            holdTime: r.ub(),
            fadeOutTime: r.ub(),
            fadeInTime: r.ub()
        };
    }
    static fileTxferFailed(r) {
        return {
            filename: r.str()
        };
    }
    static hltv(r) {
        return {
            mode: r.ub()
        };
    }
    static director(r) {
        let length = r.ub();
        return {
            flag: r.ub(),
            message: r.nstr(length - 1)
        };
    }
    static voiceInit(r) {
        return {
            codecName: r.str(),
            quality: r.b()
        };
    }
    static voiceData(r) {
        let playerIndex = r.ub();
        let size = r.us();
        let data = r.arrx(size, Reader_1.ReaderDataType.UByte);
        return { playerIndex, data };
    }
    static sendExtraInfo(r) {
        return {
            fallbackDir: r.str(),
            canCheat: r.ub()
        };
    }
    static timeScale(r) {
        return {
            timeScale: r.f()
        };
    }
    static resourceLocation(r) {
        return {
            url: r.str()
        };
    }
    static sendCvarValue(r) {
        return {
            name: r.str()
        };
    }
    static sendCvarValue2(r) {
        return {
            requestId: r.ui(),
            name: r.str()
        };
    }
    static read(r, type, deltaDecoders) {
        if (type === 0) {
            return null;
        }
        const handler = FrameDataReader.handlers[type];
        if (handler) {
            return handler(r, deltaDecoders);
        }
        else {
            return null;
        }
    }
}
FrameDataReader.handlers = [
    FrameDataReader.bad,
    FrameDataReader.nop,
    FrameDataReader.disconnect,
    FrameDataReader.event,
    FrameDataReader.version,
    FrameDataReader.setView,
    FrameDataReader.sound,
    FrameDataReader.time,
    FrameDataReader.print,
    FrameDataReader.stuffText,
    FrameDataReader.setAngle,
    FrameDataReader.serverInfo,
    FrameDataReader.lightStyle,
    FrameDataReader.updateUserInfo,
    FrameDataReader.deltaDescription,
    FrameDataReader.clientData,
    FrameDataReader.stopSound,
    FrameDataReader.pings,
    FrameDataReader.particle,
    FrameDataReader.damage,
    FrameDataReader.spawnStatic,
    FrameDataReader.eventReliable,
    FrameDataReader.spawnBaseLine,
    FrameDataReader.tempEntity,
    FrameDataReader.setPause,
    FrameDataReader.signOnNum,
    FrameDataReader.centerPrint,
    FrameDataReader.killedMonster,
    FrameDataReader.foundSecret,
    FrameDataReader.spawnStaticSound,
    FrameDataReader.intermission,
    FrameDataReader.finale,
    FrameDataReader.cdTrack,
    FrameDataReader.restore,
    FrameDataReader.cutscene,
    FrameDataReader.weaponAnim,
    FrameDataReader.decalName,
    FrameDataReader.roomType,
    FrameDataReader.addAngle,
    FrameDataReader.newUserMsg,
    FrameDataReader.packetEntities,
    FrameDataReader.deltaPacketEntities,
    FrameDataReader.choke,
    FrameDataReader.resourceList,
    FrameDataReader.newMoveVars,
    FrameDataReader.resourceRequest,
    FrameDataReader.customization,
    FrameDataReader.crosshairAngle,
    FrameDataReader.soundFade,
    FrameDataReader.fileTxferFailed,
    FrameDataReader.hltv,
    FrameDataReader.director,
    FrameDataReader.voiceInit,
    FrameDataReader.voiceData,
    FrameDataReader.sendExtraInfo,
    FrameDataReader.timeScale,
    FrameDataReader.resourceLocation,
    FrameDataReader.sendCvarValue,
    FrameDataReader.sendCvarValue2
];
exports.FrameDataReader = FrameDataReader;
(function (FrameDataReader) {
    let SVC;
    (function (SVC) {
        SVC[SVC["BAD"] = 0] = "BAD";
        SVC[SVC["NOP"] = 1] = "NOP";
        SVC[SVC["DISCONNECT"] = 2] = "DISCONNECT";
        SVC[SVC["EVENT"] = 3] = "EVENT";
        SVC[SVC["VERSION"] = 4] = "VERSION";
        SVC[SVC["SETVIEW"] = 5] = "SETVIEW";
        SVC[SVC["SOUND"] = 6] = "SOUND";
        SVC[SVC["TIME"] = 7] = "TIME";
        SVC[SVC["PRINT"] = 8] = "PRINT";
        SVC[SVC["STUFFTEXT"] = 9] = "STUFFTEXT";
        SVC[SVC["SETANGLE"] = 10] = "SETANGLE";
        SVC[SVC["SERVERINFO"] = 11] = "SERVERINFO";
        SVC[SVC["LIGHTSTYLE"] = 12] = "LIGHTSTYLE";
        SVC[SVC["UPDATEUSERINFO"] = 13] = "UPDATEUSERINFO";
        SVC[SVC["DELTADESCRIPTION"] = 14] = "DELTADESCRIPTION";
        SVC[SVC["CLIENTDATA"] = 15] = "CLIENTDATA";
        SVC[SVC["STOPSOUND"] = 16] = "STOPSOUND";
        SVC[SVC["PINGS"] = 17] = "PINGS";
        SVC[SVC["PARTICLE"] = 18] = "PARTICLE";
        SVC[SVC["DAMAGE"] = 19] = "DAMAGE";
        SVC[SVC["SPAWNSTATIC"] = 20] = "SPAWNSTATIC";
        SVC[SVC["EVENT_RELIABLE"] = 21] = "EVENT_RELIABLE";
        SVC[SVC["SPAWNBASELINE"] = 22] = "SPAWNBASELINE";
        SVC[SVC["TEMPENTITY"] = 23] = "TEMPENTITY";
        SVC[SVC["SETPAUSE"] = 24] = "SETPAUSE";
        SVC[SVC["SIGNONNUM"] = 25] = "SIGNONNUM";
        SVC[SVC["CENTERPRINT"] = 26] = "CENTERPRINT";
        SVC[SVC["KILLEDMONSTER"] = 27] = "KILLEDMONSTER";
        SVC[SVC["FOUNDSECRET"] = 28] = "FOUNDSECRET";
        SVC[SVC["SPAWNSTATICSOUND"] = 29] = "SPAWNSTATICSOUND";
        SVC[SVC["INTERMISSION"] = 30] = "INTERMISSION";
        SVC[SVC["FINALE"] = 31] = "FINALE";
        SVC[SVC["CDTRACK"] = 32] = "CDTRACK";
        SVC[SVC["RESTORE"] = 33] = "RESTORE";
        SVC[SVC["CUTSCENE"] = 34] = "CUTSCENE";
        SVC[SVC["WEAPONANIM"] = 35] = "WEAPONANIM";
        SVC[SVC["DECALNAME"] = 36] = "DECALNAME";
        SVC[SVC["ROOMTYPE"] = 37] = "ROOMTYPE";
        SVC[SVC["ADDANGLE"] = 38] = "ADDANGLE";
        SVC[SVC["NEWUSERMSG"] = 39] = "NEWUSERMSG";
        SVC[SVC["PACKETENTITIES"] = 40] = "PACKETENTITIES";
        SVC[SVC["DELTAPACKETENTITIES"] = 41] = "DELTAPACKETENTITIES";
        SVC[SVC["CHOKE"] = 42] = "CHOKE";
        SVC[SVC["RESOURCELIST"] = 43] = "RESOURCELIST";
        SVC[SVC["NEWMOVEVARS"] = 44] = "NEWMOVEVARS";
        SVC[SVC["RESOURCEREQUEST"] = 45] = "RESOURCEREQUEST";
        SVC[SVC["CUSTOMIZATION"] = 46] = "CUSTOMIZATION";
        SVC[SVC["CROSSHAIRANGLE"] = 47] = "CROSSHAIRANGLE";
        SVC[SVC["SOUNDFADE"] = 48] = "SOUNDFADE";
        SVC[SVC["FILETXFERFAILED"] = 49] = "FILETXFERFAILED";
        SVC[SVC["HLTV"] = 50] = "HLTV";
        SVC[SVC["DIRECTOR"] = 51] = "DIRECTOR";
        SVC[SVC["VOICEINIT"] = 52] = "VOICEINIT";
        SVC[SVC["VOICEDATA"] = 53] = "VOICEDATA";
        SVC[SVC["SENDEXTRAINFO"] = 54] = "SENDEXTRAINFO";
        SVC[SVC["TIMESCALE"] = 55] = "TIMESCALE";
        SVC[SVC["RESOURCELOCATION"] = 56] = "RESOURCELOCATION";
        SVC[SVC["SENDCVARVALUE"] = 57] = "SENDCVARVALUE";
        SVC[SVC["SENDCVARVALUE2"] = 58] = "SENDCVARVALUE2";
    })(SVC = FrameDataReader.SVC || (FrameDataReader.SVC = {}));
})(FrameDataReader = exports.FrameDataReader || (exports.FrameDataReader = {}));


/***/ }),

/***/ "./src/Replay/Replay.ts":
/*!******************************!*\
  !*** ./src/Replay/Replay.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ReplayMap_1 = __webpack_require__(/*! ./ReplayMap */ "./src/Replay/ReplayMap.ts");
const ReplayChunk_1 = __webpack_require__(/*! ./ReplayChunk */ "./src/Replay/ReplayChunk.ts");
const ReplayState_1 = __webpack_require__(/*! ./ReplayState */ "./src/Replay/ReplayState.ts");
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
const FrameDataReader_1 = __webpack_require__(/*! ./FrameDataReader */ "./src/Replay/FrameDataReader.ts");
const readDelta_1 = __webpack_require__(/*! ./readDelta */ "./src/Replay/readDelta.ts");
const checkType = (r) => {
    let magic = r.nstr(8);
    return magic === 'HLDEMO';
};
const readHeader = (r) => ({
    demoProtocol: r.ui(),
    netProtocol: r.ui(),
    mapName: r.nstr(260),
    modName: r.nstr(260),
    mapCrc: r.i(),
    dirOffset: r.ui()
});
const readDirectories = (r, offset) => {
    r.seek(offset);
    let count = r.ui();
    let directories = [];
    for (let i = 0; i < count; ++i) {
        directories.push({
            id: r.ui(),
            name: r.nstr(64),
            flags: r.ui(),
            cdTrack: r.i(),
            time: r.f(),
            frames: r.ui(),
            offset: r.ui(),
            length: r.ui()
        });
    }
    return directories;
};
const readFrameData = (r, deltaDecoders, customMessages) => {
    let length = r.ui();
    let limit = r.tell() + length;
    let data = [];
    while (r.tell() < limit) {
        let type = r.ub();
        if (type === 1) {
            continue;
        }
        else if (type >= 64) {
            if (customMessages[type] && customMessages[type].size > -1) {
                r.skip(customMessages[type].size);
            }
            else {
                r.skip(r.ub());
            }
            continue;
        }
        let message = FrameDataReader_1.FrameDataReader.read(r, type, deltaDecoders);
        if (message) {
            if (type === 39) {
                customMessages[message.index] = message;
            }
            data.push({
                type,
                data: message
            });
        }
        else {
            r.seek(limit);
        }
    }
    r.seek(limit);
    return data;
};
const readFrame = (r, deltaDecoders, customMessages) => {
    let frame = {
        type: r.ub(),
        time: r.f(),
        tick: r.ui()
    };
    switch (frame.type) {
        case 0:
        case 1: {
            r.skip(4);
            frame.camera = {
                position: [r.f(), r.f(), r.f()],
                orientation: [r.f(), r.f(), r.f()]
            };
            r.skip(436);
            frame.data = readFrameData(r, deltaDecoders, customMessages);
            break;
        }
        case 2: {
            break;
        }
        case 3: {
            frame.command = r.nstr(64);
            break;
        }
        case 4: {
            r.skip(32);
            break;
        }
        case 5: {
            break;
        }
        case 6: {
            r.skip(84);
            break;
        }
        case 7: {
            r.skip(8);
            break;
        }
        case 8: {
            frame.sound = {
                channel: r.i(),
                sample: r.nstr(r.ui()),
                attenuation: r.f(),
                volume: r.f(),
                flags: r.ui(),
                pitch: r.i()
            };
            break;
        }
        case 9: {
            r.skip(r.ui());
            break;
        }
        default: {
            frame.error = true;
            break;
        }
    }
    return frame;
};
class Replay {
    constructor(header, directories) {
        this.header = header;
        this.mapName = this.header.mapName;
        this.directories = directories;
    }
    static parseFromArrayBuffer(buffer) {
        let r = new Reader_1.Reader(buffer);
        let magic = r.nstr(8);
        if (magic !== 'HLDEMO') {
            throw new Error('Invalid replay format');
        }
        let header = {};
        header.demoProtocol = r.ui();
        header.netProtocol = r.ui();
        header.mapName = r.nstr(260);
        header.modName = r.nstr(260);
        header.mapCrc = r.i();
        header.dirOffset = r.ui();
        r.seek(header.dirOffset);
        let directoryCount = r.ui();
        let directories = [];
        for (let i = 0; i < directoryCount; ++i) {
            directories.push({
                id: r.ui(),
                name: r.nstr(64),
                flags: r.ui(),
                cdTrack: r.i(),
                time: r.f(),
                frames: r.ui(),
                offset: r.ui(),
                length: r.ui(),
                macros: []
            });
        }
        for (let i = 0; i < directories.length; ++i) {
            r.seek(directories[i].offset);
            let isFinalMacroReached = false;
            while (!isFinalMacroReached) {
                let macro = {
                    type: r.b(),
                    time: r.f(),
                    frame: r.ui()
                };
                switch (macro.type) {
                    case 0:
                    case 1: {
                        r.skip(4);
                        macro.camera = {
                            position: [r.f(), r.f(), r.f()],
                            orientation: [r.f(), r.f(), r.f()]
                        };
                        r.skip(436);
                        r.skip(r.ui());
                        break;
                    }
                    case 2: {
                        break;
                    }
                    case 3: {
                        macro.command = r.nstr(64);
                        break;
                    }
                    case 4: {
                        r.skip(32);
                        break;
                    }
                    case 5: {
                        isFinalMacroReached = true;
                        break;
                    }
                    case 6: {
                        r.skip(84);
                        break;
                    }
                    case 7: {
                        r.skip(8);
                        break;
                    }
                    case 8: {
                        r.skip(4);
                        r.skip(r.ui() + 16);
                        break;
                    }
                    case 9: {
                        r.skip(r.ui());
                        break;
                    }
                    default: {
                        const offset = Number(r.tell() - 9).toString(16);
                        const msg = [
                            `Unexpected macro (${macro.type})`,
                            ` at offset = ${offset}.`
                        ].join('');
                        throw new Error(msg);
                    }
                }
                directories[i].macros.push(macro);
            }
        }
        return new Replay(header, directories);
    }
    static parseFullFromArrayBuffer(buffer) {
        let r = new Reader_1.Reader(buffer);
        let magic = r.nstr(8);
        if (magic !== 'HLDEMO') {
            throw new Error('Invalid replay format');
        }
        let header = {};
        header.demoProtocol = r.ui();
        header.netProtocol = r.ui();
        header.mapName = r.nstr(260);
        header.modName = r.nstr(260);
        header.mapCrc = r.i();
        header.dirOffset = r.ui();
        r.seek(header.dirOffset);
        let directoryCount = r.ui();
        let directories = [];
        for (let i = 0; i < directoryCount; ++i) {
            directories.push({
                id: r.ui(),
                name: r.nstr(64),
                flags: r.ui(),
                cdTrack: r.i(),
                time: r.f(),
                frames: r.ui(),
                offset: r.ui(),
                length: r.ui(),
                macros: []
            });
        }
        let deltaDecoders = readDelta_1.getInitialDeltaDecoders();
        let customMessages = [];
        for (let i = 0; i < directories.length; ++i) {
            r.seek(directories[i].offset);
            let isFinalMacroReached = false;
            while (!isFinalMacroReached) {
                let macro = {
                    type: r.b(),
                    time: r.f(),
                    frame: r.ui()
                };
                switch (macro.type) {
                    case 0:
                    case 1: {
                        r.skip(4);
                        macro.camera = {
                            position: [r.f(), r.f(), r.f()],
                            orientation: [r.f(), r.f(), r.f()],
                            forward: [r.f(), r.f(), r.f()],
                            right: [r.f(), r.f(), r.f()],
                            up: [r.f(), r.f(), r.f()]
                        };
                        macro.RefParams = {
                            frametime: r.f(),
                            time: r.f(),
                            intermission: r.i(),
                            paused: r.i(),
                            spectator: r.i(),
                            onground: r.i(),
                            waterlevel: r.i(),
                            velocity: [r.f(), r.f(), r.f()],
                            origin: [r.f(), r.f(), r.f()],
                            viewHeight: [r.f(), r.f(), r.f()],
                            idealPitch: r.f(),
                            viewAngles: [r.f(), r.f(), r.f()],
                            health: r.i(),
                            crosshairAngle: [r.f(), r.f(), r.f()],
                            viewSize: r.f(),
                            punchAngle: [r.f(), r.f(), r.f()],
                            maxClients: r.i(),
                            viewEntity: r.i(),
                            playerCount: r.i(),
                            maxEntities: r.i(),
                            demoPlayback: r.i(),
                            hardware: r.i(),
                            smoothing: r.i(),
                            ptr_cmd: r.i(),
                            ptr_movevars: r.i(),
                            viewport: [r.i(), r.i(), r.i(), r.i()],
                            nextView: r.i(),
                            onlyClientDraw: r.i()
                        };
                        macro.UserCmd = {
                            lerp_msec: r.s(),
                            msec: r.ub(),
                            UNUSED1: r.ub(),
                            viewAngles: [r.f(), r.f(), r.f()],
                            forwardMove: r.f(),
                            sideMove: r.f(),
                            upMove: r.f(),
                            lightLevel: r.b(),
                            UNUSED2: r.ub(),
                            buttons: r.us(),
                            impulse: r.b(),
                            weaponSelect: r.b(),
                            UNUSED: r.s(),
                            impactIndex: r.i(),
                            impactPosition: [r.f(), r.f(), r.f()]
                        };
                        macro.MoveVars = {
                            gravity: r.f(),
                            stopSpeed: r.f(),
                            maxSpeed: r.f(),
                            spectatorMaxSpeed: r.f(),
                            acceleration: r.f(),
                            airAcceleration: r.f(),
                            waterAcceleration: r.f(),
                            friction: r.f(),
                            edgeFriction: r.f(),
                            waterFriction: r.f(),
                            entityGravity: r.f(),
                            bounce: r.f(),
                            stepSize: r.f(),
                            maxVelocity: r.f(),
                            zMax: r.f(),
                            waveHeight: r.f(),
                            footsteps: r.i(),
                            skyName: r.nstr(32),
                            rollAngle: r.f(),
                            rollSpeed: r.f(),
                            skyColor: [r.f(), r.f(), r.f()],
                            skyVec: [r.f(), r.f(), r.f()]
                        };
                        macro.view = [r.f(), r.f(), r.f()];
                        macro.viewModel = r.i();
                        macro.incoming_sequence = r.i();
                        macro.incoming_acknowledged = r.i();
                        macro.incoming_reliable_acknowledged = r.i();
                        macro.incoming_reliable_sequence = r.i();
                        macro.outgoing_sequence = r.i();
                        macro.reliable_sequence = r.i();
                        macro.last_reliable_sequence = r.i();
                        let frameDataLength = r.ui();
                        let frameDataEnd = frameDataLength + r.tell();
                        macro.frameData = [];
                        while (r.tell() < frameDataEnd) {
                            let type = r.ub();
                            if (type === 1) {
                                continue;
                            }
                            else if (type >= 64) {
                                if (customMessages[type] && customMessages[type].size > -1) {
                                    r.skip(customMessages[type].size);
                                }
                                else {
                                    r.skip(r.ub());
                                }
                                continue;
                            }
                            let frameData = FrameDataReader_1.FrameDataReader.read(r, type, deltaDecoders);
                            if (frameData) {
                                if (type === 39) {
                                    customMessages[frameData.index] = frameData;
                                }
                                macro.frameData.push({ type, frameData });
                            }
                            else {
                                r.seek(frameDataEnd);
                            }
                        }
                        r.seek(frameDataEnd);
                        break;
                    }
                    case 2: {
                        break;
                    }
                    case 3: {
                        macro.command = r.nstr(64);
                        break;
                    }
                    case 4: {
                        macro.clientData = {
                            position: [r.f(), r.f(), r.f()],
                            rotation: [r.f(), r.f(), r.f()],
                            weaponFlags: r.ui(),
                            fov: r.f()
                        };
                        break;
                    }
                    case 5: {
                        isFinalMacroReached = true;
                        break;
                    }
                    case 6: {
                        macro.event = {
                            flags: r.ui(),
                            index: r.ui(),
                            delay: r.f(),
                            args: {
                                flags: r.ui(),
                                entityIndex: r.ui(),
                                position: [r.f(), r.f(), r.f()],
                                rotation: [r.f(), r.f(), r.f()],
                                velocity: [r.f(), r.f(), r.f()],
                                ducking: r.ui(),
                                fparam1: r.f(),
                                fparam2: r.f(),
                                iparam1: r.i(),
                                iparam2: r.i(),
                                bparam1: r.i(),
                                bparam2: r.i()
                            }
                        };
                        break;
                    }
                    case 7: {
                        macro.weaponAnimation = {
                            animation: r.i(),
                            body: r.i()
                        };
                        break;
                    }
                    case 8: {
                        macro.sound = {
                            channel: r.i(),
                            sample: r.nstr(r.ui()),
                            attenuation: r.f(),
                            volume: r.f(),
                            flags: r.ui(),
                            pitch: r.i()
                        };
                        break;
                    }
                    case 9: {
                        r.skip(r.ui());
                        break;
                    }
                    default: {
                        const offset = Number(r.tell() - 9).toString(16);
                        const msg = `Unexpected macro (${macro.type}) at offset = ${offset}`;
                        throw new Error(msg);
                    }
                }
                directories[i].macros.push(macro);
            }
        }
        return new Replay(header, directories);
    }
    static parseIntoChunks(buffer) {
        let r = new Reader_1.Reader(buffer);
        if (!checkType(r)) {
            throw new Error('Invalid replay file format');
        }
        let maps = [];
        let deltaDecoders = readDelta_1.getInitialDeltaDecoders();
        let customMessages = [];
        let header = readHeader(r);
        let directories = readDirectories(r, header.dirOffset);
        let currentMap;
        let currentChunk;
        let lastFrame;
        let lastFrameOffset;
        let state = new ReplayState_1.ReplayState();
        let directoryEndOffset;
        directoryEndOffset = directories[0].offset + directories[0].length;
        r.seek(directories[0].offset);
        while (r.tell() < directoryEndOffset) {
            let frame = readFrame(r, deltaDecoders, customMessages);
            state.feedFrame(frame);
            if (frame.error) {
                throw new Error('Encountered error while reading replay');
            }
            if (frame.type < 2) {
                let serverInfo = frame.data.find((msg) => msg.type === FrameDataReader_1.FrameDataReader.SVC.SERVERINFO);
                if (serverInfo) {
                    currentMap = new ReplayMap_1.ReplayMap(serverInfo.data.mapFileName);
                    maps.push(currentMap);
                }
                let resourceList = frame.data.find((msg) => msg.type === FrameDataReader_1.FrameDataReader.SVC.RESOURCELIST);
                if (resourceList && currentMap) {
                    currentMap.setResources(resourceList.data);
                }
            }
        }
        if (!(currentMap instanceof ReplayMap_1.ReplayMap)) {
            throw new Error('Error while parsing replay.');
        }
        lastFrameOffset = r.tell();
        currentChunk = new ReplayChunk_1.ReplayChunk(state, 0);
        currentMap.addChunk(currentChunk);
        directoryEndOffset = directories[1].offset + directories[1].length;
        r.seek(directories[1].offset);
        while (true) {
            let offset = r.tell();
            if (offset >= directoryEndOffset) {
                let timeLength = lastFrame.time - currentChunk.startTime;
                currentChunk.timeLength = timeLength;
                let lastFrameLength = offset - lastFrameOffset;
                r.seek(lastFrameOffset);
                currentChunk.setData(r.arrx(lastFrameLength, Reader_1.ReaderDataType.UByte));
                r.seek(offset);
                break;
            }
            let frame = readFrame(r, deltaDecoders, customMessages);
            state.feedFrame(frame);
            lastFrame = frame;
            if (frame.error) {
                throw new Error('Encountered error while reading replay');
            }
            if (frame.type < 2) {
                let serverInfo = frame.data.find((msg) => msg.type === FrameDataReader_1.FrameDataReader.SVC.SERVERINFO);
                if (serverInfo) {
                    currentMap = new ReplayMap_1.ReplayMap(serverInfo.data.mapFileName);
                    maps.push(currentMap);
                    let timeLength = lastFrame.time - currentChunk.startTime;
                    currentChunk.timeLength = timeLength;
                    let lastFrameLength = offset - lastFrameOffset;
                    let tempOffset = r.tell();
                    r.seek(lastFrameOffset);
                    currentChunk.setData(r.arrx(lastFrameLength, Reader_1.ReaderDataType.UByte));
                    r.seek(tempOffset);
                    lastFrameOffset = offset;
                    currentChunk = new ReplayChunk_1.ReplayChunk(state, frame.time);
                    currentMap.addChunk(currentChunk);
                }
                let resourceList = frame.data.find((msg) => msg.type === FrameDataReader_1.FrameDataReader.SVC.RESOURCELIST);
                if (resourceList) {
                    currentMap.setResources(resourceList.data);
                }
                if (serverInfo) {
                    continue;
                }
                for (let i = 0; i < frame.data.length; ++i) {
                    let message = frame.data[i];
                    if (message.type === FrameDataReader_1.FrameDataReader.SVC.SOUND ||
                        message.type === FrameDataReader_1.FrameDataReader.SVC.SPAWNSTATICSOUND) {
                        let sound = currentMap.resources.sounds.find((s) => s.index === message.data.soundIndex);
                        if (sound) {
                            sound.used = true;
                        }
                    }
                    else if (message.type === FrameDataReader_1.FrameDataReader.SVC.STUFFTEXT) {
                        let sounds = currentMap.resources.sounds;
                        let commands = message.data.commands;
                        for (let i = 0; i < commands.length; ++i) {
                            let command = commands[i];
                            let func = command.func;
                            if ((func === 'speak' || func === 'spk') &&
                                command.params.length === 1) {
                                let soundName = command.params[0] + '.wav';
                                let sound = sounds.find((s) => s.name === soundName);
                                if (sound) {
                                    sound.used = true;
                                }
                            }
                        }
                    }
                }
            }
            else if (frame.type === 8) {
                let sound = currentMap.resources.sounds.find((s) => s.name === frame.sound.sample);
                if (sound) {
                    sound.used = true;
                }
            }
            if (currentChunk.startTime + 10 < frame.time) {
                let lastFrameLength = offset - lastFrameOffset;
                let tempOffset = r.tell();
                r.seek(lastFrameOffset);
                currentChunk.setData(r.arrx(lastFrameLength, Reader_1.ReaderDataType.UByte));
                r.seek(tempOffset);
                lastFrameOffset = offset;
                currentChunk = new ReplayChunk_1.ReplayChunk(state, frame.time);
                currentMap.addChunk(currentChunk);
            }
        }
        return {
            length: directories[1].time,
            maps,
            deltaDecoders,
            customMessages
        };
    }
    static readHeader(r) {
        return readHeader(r);
    }
    static readDirectories(r, offset) {
        return readDirectories(r, offset);
    }
    static readFrame(r, deltaDecoders, customMessages) {
        return readFrame(r, deltaDecoders, customMessages);
    }
    static readFrameData(r, deltaDecoders, customMessages) {
        return readFrame(r, deltaDecoders, customMessages);
    }
}
exports.Replay = Replay;


/***/ }),

/***/ "./src/Replay/ReplayChunk.ts":
/*!***********************************!*\
  !*** ./src/Replay/ReplayChunk.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(/*! ../Reader */ "./src/Reader.ts");
class ReplayChunk {
    constructor(initialState, startTime) {
        this.state = initialState.clone();
        this.startTime = startTime;
        this.timeLength = 10;
        this.data = null;
        this.reader = null;
    }
    setData(data) {
        this.data = new Uint8Array(data.length);
        for (let i = 0; i < data.length; ++i) {
            this.data[i] = data[i];
        }
        this.reader = new Reader_1.Reader(this.data.buffer);
    }
}
exports.ReplayChunk = ReplayChunk;


/***/ }),

/***/ "./src/Replay/ReplayMap.ts":
/*!*********************************!*\
  !*** ./src/Replay/ReplayMap.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(/*! ../Util */ "./src/Util.ts");
class ReplayMap {
    constructor(mapFilePath) {
        this.name = Util_1.basename(mapFilePath, '.bsp');
        this.chunks = [];
        this.resources = {
            sounds: [],
            skins: [],
            models: [],
            decals: [],
            custom: [],
            events: []
        };
    }
    setResources(resources) {
        resources.forEach(res => {
            switch (res.type) {
                case 0: {
                    res.used = false;
                    this.resources.sounds.push(res);
                    break;
                }
                case 1: {
                    this.resources.skins.push(res);
                    break;
                }
                case 2: {
                    this.resources.models.push(res);
                    break;
                }
                case 3: {
                    this.resources.decals.push(res);
                    break;
                }
                case 4: {
                    this.resources.custom.push(res);
                    break;
                }
                case 5: {
                    this.resources.events.push(res);
                    break;
                }
            }
        });
    }
    addChunk(chunk) {
        this.chunks.push(chunk);
    }
}
exports.ReplayMap = ReplayMap;


/***/ }),

/***/ "./src/Replay/ReplayState.ts":
/*!***********************************!*\
  !*** ./src/Replay/ReplayState.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ReplayState {
    constructor(obj = null) {
        if (obj) {
            this.cameraPos = JSON.parse(JSON.stringify(obj.cameraPos));
            this.cameraRot = JSON.parse(JSON.stringify(obj.cameraRot));
            this.entities = JSON.parse(JSON.stringify(obj.entities));
        }
        else {
            this.cameraPos = [0, 0, 0];
            this.cameraRot = [0, 0, 0];
            this.entities = [];
        }
    }
    feedFrame(frame) {
        switch (frame.type) {
            case 0:
            case 1: {
                this.cameraPos[0] = frame.camera.position[0];
                this.cameraPos[1] = frame.camera.position[1];
                this.cameraPos[2] = frame.camera.position[2];
                this.cameraRot[0] = frame.camera.orientation[0];
                this.cameraRot[1] = frame.camera.orientation[1];
                this.cameraRot[2] = frame.camera.orientation[2];
                break;
            }
        }
    }
    clone() {
        return new ReplayState(this);
    }
}
exports.ReplayState = ReplayState;


/***/ }),

/***/ "./src/Replay/readCoord.ts":
/*!*********************************!*\
  !*** ./src/Replay/readCoord.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function readCoord(bs) {
    let intFlag = bs.readBits(1);
    let fractionFlag = bs.readBits(1);
    if (!intFlag && !fractionFlag) {
        return 0;
    }
    let sign = bs.readBits(1);
    let intValue = 0;
    let fractionValue = 0;
    if (intFlag) {
        intValue = bs.readBits(12);
    }
    if (fractionFlag) {
        fractionValue = bs.readBits(3);
    }
    let value = intValue + fractionValue / 32;
    if (sign) {
        value = -value;
    }
    return value;
}
exports.readCoord = readCoord;


/***/ }),

/***/ "./src/Replay/readDelta.ts":
/*!*********************************!*\
  !*** ./src/Replay/readDelta.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DeltaType_1 = __webpack_require__(/*! ./DeltaType */ "./src/Replay/DeltaType.ts");
function readDelta(bs, dd) {
    let data = {};
    let maskBitCount = bs.readBits(3);
    let maskBits = [];
    for (let i = 0; i < maskBitCount; ++i) {
        maskBits.push(bs.readBits(8));
    }
    let brk = false;
    for (let i = 0; i < maskBitCount; ++i) {
        for (let j = 0; j < 8; ++j) {
            let index = j + i * 8;
            if (index === dd.length) {
                brk = true;
                break;
            }
            if (maskBits[i] & (1 << j)) {
                if (dd[index].flags & DeltaType_1.DeltaType.DT_BYTE) {
                    if (dd[index].flags & DeltaType_1.DeltaType.DT_SIGNED) {
                        let sign = bs.readBits(1) ? -1 : 1;
                        let value = bs.readBits(dd[index].bits - 1);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = (sign * value) / divisor;
                    }
                    else {
                        let value = bs.readBits(dd[index].bits);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = value / divisor;
                    }
                }
                else if (dd[index].flags & DeltaType_1.DeltaType.DT_SHORT) {
                    if (dd[index].flags & DeltaType_1.DeltaType.DT_SIGNED) {
                        let sign = bs.readBits(1) ? -1 : 1;
                        let value = bs.readBits(dd[index].bits - 1);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = (sign * value) / divisor;
                    }
                    else {
                        let value = bs.readBits(dd[index].bits);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = value / divisor;
                    }
                }
                else if (dd[index].flags & DeltaType_1.DeltaType.DT_INTEGER) {
                    if (dd[index].flags & DeltaType_1.DeltaType.DT_SIGNED) {
                        let sign = bs.readBits(1) ? -1 : 1;
                        let value = bs.readBits(dd[index].bits - 1);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = (sign * value) / divisor;
                    }
                    else {
                        let value = bs.readBits(dd[index].bits);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = value / divisor;
                    }
                }
                else if (dd[index].flags & DeltaType_1.DeltaType.DT_FLOAT ||
                    dd[index].flags & DeltaType_1.DeltaType.DT_TIMEWINDOW_8 ||
                    dd[index].flags & DeltaType_1.DeltaType.DT_TIMEWINDOW_BIG) {
                    if (dd[index].flags & DeltaType_1.DeltaType.DT_SIGNED) {
                        let sign = bs.readBits(1) ? -1 : 1;
                        let value = bs.readBits(dd[index].bits - 1);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = (sign * value) / divisor;
                    }
                    else {
                        let value = bs.readBits(dd[index].bits);
                        let divisor = dd[index].divisor;
                        data[dd[index].name] = value / divisor;
                    }
                }
                else if (dd[index].flags & DeltaType_1.DeltaType.DT_ANGLE) {
                    let value = bs.readBits(dd[index].bits);
                    let multiplier = 360 / (1 << dd[index].bits);
                    data[dd[index].name] = value * multiplier;
                }
                else if (dd[index].flags & DeltaType_1.DeltaType.DT_STRING) {
                    data[dd[index].name] = bs.readString();
                }
            }
        }
        if (brk) {
            break;
        }
    }
    return data;
}
exports.readDelta = readDelta;
const initialDeltaDecoders = {
    delta_description_t: [
        {
            name: 'flags',
            bits: 32,
            divisor: 1,
            flags: DeltaType_1.DeltaType.DT_INTEGER
        },
        {
            name: 'name',
            bits: 8,
            divisor: 1,
            flags: DeltaType_1.DeltaType.DT_STRING
        },
        {
            name: 'offset',
            bits: 16,
            divisor: 1,
            flags: DeltaType_1.DeltaType.DT_INTEGER
        },
        {
            name: 'size',
            bits: 8,
            divisor: 1,
            flags: DeltaType_1.DeltaType.DT_INTEGER
        },
        {
            name: 'bits',
            bits: 8,
            divisor: 1,
            flags: DeltaType_1.DeltaType.DT_INTEGER
        },
        {
            name: 'divisor',
            bits: 32,
            divisor: 4000,
            flags: DeltaType_1.DeltaType.DT_FLOAT
        },
        {
            name: 'preMultiplier',
            bits: 32,
            divisor: 4000,
            flags: DeltaType_1.DeltaType.DT_FLOAT
        }
    ]
};
exports.getInitialDeltaDecoders = () => (Object.assign({}, initialDeltaDecoders));


/***/ }),

/***/ "./src/ReplayPlayer.ts":
/*!*****************************!*\
  !*** ./src/ReplayPlayer.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/lib/gl-matrix.js");
const nanoevents_1 = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");
const Replay_1 = __webpack_require__(/*! ./Replay/Replay */ "./src/Replay/Replay.ts");
const ReplayState_1 = __webpack_require__(/*! ./Replay/ReplayState */ "./src/Replay/ReplayState.ts");
const updateGame = (game, state) => {
    game.camera.position[0] = state.cameraPos[0];
    game.camera.position[1] = state.cameraPos[1];
    game.camera.position[2] = state.cameraPos[2];
    game.camera.rotation[0] = gl_matrix_1.glMatrix.toRadian(state.cameraRot[0]);
    game.camera.rotation[1] = gl_matrix_1.glMatrix.toRadian(state.cameraRot[1]);
    game.camera.rotation[2] = gl_matrix_1.glMatrix.toRadian(state.cameraRot[2]);
};
class ReplayPlayer {
    constructor(game) {
        this.currentMap = 0;
        this.currentChunk = 0;
        this.currentTime = 0;
        this.currentTick = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.speed = 1;
        this.reset();
        this.game = game;
        this.state = new ReplayState_1.ReplayState();
        this.replay = null;
        this.events = nanoevents_1.createNanoEvents();
    }
    reset() {
        this.currentMap = 0;
        this.currentChunk = 0;
        this.currentTime = 0;
        this.currentTick = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.speed = 1;
        if (this.replay) {
            let firstChunk = this.replay.maps[0].chunks[0];
            firstChunk.reader.seek(0);
            this.state = firstChunk.state.clone();
        }
    }
    changeReplay(replay) {
        this.replay = replay;
        this.reset();
    }
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
        }
        else if (this.isPaused) {
            this.isPaused = false;
        }
        this.events.emit('play');
    }
    pause() {
        if (this.isPlaying) {
            this.isPaused = true;
        }
        this.events.emit('pause');
    }
    stop() {
        this.reset();
        this.events.emit('stop');
    }
    speedUp() {
        this.speed = Math.min(this.speed * 2, 4);
    }
    speedDown() {
        this.speed = Math.max(this.speed / 2, 0.25);
    }
    seek(value) {
        let t = Math.max(0, Math.min(this.replay.length, value));
        let maps = this.replay.maps;
        for (let i = 0; i < maps.length; ++i) {
            let chunks = maps[i].chunks;
            for (let j = 0; j < chunks.length; ++j) {
                let chunk = chunks[j];
                let startTime = chunk.startTime;
                let timeLimit = startTime + chunk.timeLength;
                if (t >= startTime && t < timeLimit) {
                    this.currentMap = i;
                    this.currentChunk = j;
                    this.currentTime = t;
                    this.state = chunk.state.clone();
                    let deltaDecoders = this.replay.deltaDecoders;
                    let customMessages = this.replay.customMessages;
                    let r = chunk.reader;
                    r.seek(0);
                    while (true) {
                        let offset = r.tell();
                        let frame = Replay_1.Replay.readFrame(r, deltaDecoders, customMessages);
                        if (frame.time <= t) {
                            this.state.feedFrame(frame);
                            this.currentTick = frame.tick;
                        }
                        else {
                            r.seek(offset);
                            break;
                        }
                    }
                    updateGame(this.game, this.state);
                    return;
                }
            }
        }
    }
    seekByPercent(value) {
        value = Math.max(0, Math.min(value, 100)) / 100;
        value *= this.replay.length;
        this.seek(value);
    }
    update(dt) {
        if (!this.isPlaying || this.isPaused) {
            return;
        }
        let deltaDecoders = this.replay.deltaDecoders;
        let customMessages = this.replay.customMessages;
        let map = this.replay.maps[this.currentMap];
        let chunk = map.chunks[this.currentChunk];
        let r = chunk.reader;
        let endTime = this.currentTime + dt * this.speed;
        let hitStop = false;
        while (true) {
            let offset = r.tell();
            if (offset >= chunk.data.length) {
                if (this.currentChunk === map.chunks.length - 1) {
                    if (this.currentMap === this.replay.maps.length - 1) {
                        hitStop = true;
                        break;
                    }
                    else {
                        this.currentChunk = 0;
                        this.currentMap++;
                        map = this.replay.maps[this.currentMap];
                        chunk = map.chunks[this.currentChunk];
                    }
                }
                else {
                    this.currentChunk++;
                    chunk = map.chunks[this.currentChunk];
                }
                r = chunk.reader;
                r.seek(0);
                offset = 0;
                continue;
            }
            let sounds = this.game.sounds;
            let frame = Replay_1.Replay.readFrame(r, deltaDecoders, customMessages);
            if (frame.type < 2) {
                for (let i = 0; i < frame.data.length; ++i) {
                    let message = frame.data[i];
                    if (message.type === 6) {
                        let msgSound = message.data;
                        let sound = sounds.find((s) => s.index === msgSound.soundIndex);
                        if (sound && sound.name !== 'common/null.wav') {
                            let channel = msgSound.channel;
                            let volume = msgSound.volume;
                            this.game.soundSystem.play(sound, channel, volume);
                        }
                    }
                    else if (message.type === 29) {
                        let msgSound = message.data;
                        let sound = sounds.find((s) => s.index === msgSound.soundIndex);
                        if (sound && sound.name !== 'common/null.wav') {
                        }
                    }
                    else if (message.type === 9) {
                        message.data.commands.forEach((command) => {
                            switch (command.func) {
                                case 'speak':
                                case 'spk':
                                case 'play': {
                                    let soundName = command.params[0] + '.wav';
                                    let sound = sounds.find((s) => s.name === soundName);
                                    if (!sound) {
                                        return;
                                    }
                                    this.game.soundSystem.play(sound, 1, 0.7);
                                    break;
                                }
                                case 'playvol': {
                                    let soundName = command.params[0] + '.wav';
                                    let volume;
                                    if (isNaN(command.params[1])) {
                                        volume = 1;
                                    }
                                    else {
                                        volume = parseFloat(command.params[1]);
                                    }
                                    let sound = sounds.find((s) => s.name === soundName);
                                    if (!sound) {
                                        return;
                                    }
                                    this.game.soundSystem.play(sound, 1, volume);
                                    break;
                                }
                            }
                        });
                    }
                }
            }
            else if (frame.type === 8) {
                let sample = frame.sound.sample;
                let sound = sounds.find(s => s.name === sample);
                if (sound && sound.name !== 'common/null.wav') {
                    let channel = frame.sound.channel;
                    let volume = frame.sound.volume;
                    this.game.soundSystem.play(sound, channel, volume);
                }
            }
            if (frame.time <= endTime) {
                this.state.feedFrame(frame);
                this.currentTick = frame.tick;
            }
            else {
                r.seek(offset);
                break;
            }
        }
        updateGame(this.game, this.state);
        this.currentTime = endTime;
        if (hitStop) {
            this.stop();
        }
    }
}
exports.ReplayPlayer = ReplayPlayer;


/***/ }),

/***/ "./src/Sound.ts":
/*!**********************!*\
  !*** ./src/Sound.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SoundSystem_1 = __webpack_require__(/*! ./SoundSystem */ "./src/SoundSystem.ts");
class Sound {
    constructor(buffer) {
        this.index = -1;
        this.name = '';
        this.buffer = buffer;
    }
    static create(buffer) {
        return new Promise((resolve, reject) => {
            SoundSystem_1.SoundSystem.getContext().decodeAudioData(buffer, (buffer) => {
                resolve(new Sound(buffer));
            }, (err) => {
                reject(err);
            });
        });
    }
}
exports.Sound = Sound;


/***/ }),

/***/ "./src/SoundSystem.ts":
/*!****************************!*\
  !*** ./src/SoundSystem.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nanoevents_1 = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");
const wnd = window;
const polyfillAudioContext = wnd.AudioContext || wnd.webkitAudioContext;
const audioContext = new polyfillAudioContext();
class SoundSystem {
    constructor() {
        this.context = audioContext;
        this.events = nanoevents_1.createNanoEvents();
        const volume = parseFloat(localStorage.getItem('volume') || '0.3');
        localStorage.setItem('volume', volume.toString());
        this.channels = [];
        this.preMuteVolume = 1;
        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = volume;
        this.masterGain.connect(this.context.destination);
        for (let i = 0; i < 8; ++i) {
            this.channels.push({
                source: null,
                gain: this.context.createGain()
            });
            this.channels[i].gain.connect(this.masterGain);
        }
    }
    static getContext() {
        return audioContext;
    }
    play(sound, channel, volume) {
        this.stop(channel);
        const gain = this.channels[channel].gain;
        gain.gain.value = Math.max(0, Math.min(1, volume));
        const source = this.context.createBufferSource();
        source.buffer = sound.buffer;
        source.connect(gain);
        source.start(0);
        this.channels[channel].source = source;
    }
    stop(channel) {
        const source = this.channels[channel].source;
        if (source) {
            source.stop(0);
        }
    }
    getVolume() {
        return this.masterGain.gain.value;
    }
    setVolume(value) {
        const current = this.masterGain.gain.value;
        if (current > 0 && value === 0) {
            this.preMuteVolume = current;
        }
        this.masterGain.gain.value = value;
        localStorage.setItem('volume', value.toString());
        this.events.emit('volumeChange', value);
    }
    toggleMute() {
        if (this.getVolume() === 0) {
            this.setVolume(this.preMuteVolume);
        }
        else {
            this.setVolume(0);
        }
    }
}
exports.SoundSystem = SoundSystem;


/***/ }),

/***/ "./src/Time.ts":
/*!*********************!*\
  !*** ./src/Time.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wnd = window;
let _now;
if (typeof performance !== 'undefined') {
    if (performance.now) {
        _now = () => wnd.performance.now();
    }
    else if (wnd.performance.mozNow) {
        _now = () => wnd.performance.mozNow();
    }
    else if (wnd.performance.msNow) {
        _now = () => wnd.performance.msNow();
    }
    else if (wnd.performance.oNow) {
        _now = () => wnd.performance.oNow();
    }
    else if (wnd.performance.webkitNow) {
        _now = () => wnd.performance.webkitNow();
    }
    else if (Date.now) {
        _now = () => Date.now();
    }
}
exports.now = _now || (() => new Date().getTime());
exports.formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds - m * 60);
    const mm = m < 10 ? '0' + m : m.toString();
    const ss = s < 10 ? '0' + s : s.toString();
    return mm + ':' + ss;
};


/***/ }),

/***/ "./src/Util.ts":
/*!*********************!*\
  !*** ./src/Util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function basename(path, extension) {
    return path.slice(path.lastIndexOf('/') + 1).replace(extension || '', '');
}
exports.basename = basename;
function extname(path) {
    const slashPos = path.lastIndexOf('/');
    const dotPos = path.lastIndexOf('.');
    if (slashPos < dotPos) {
        return path.slice(dotPos);
    }
    else {
        return '';
    }
}
exports.extname = extname;


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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
const Config_1 = __webpack_require__(/*! ./Config */ "./src/Config.ts");
const index_1 = __webpack_require__(/*! ./PlayerInterface/index */ "./src/PlayerInterface/index.tsx");
class HLV {
    constructor(game) {
        this.game = game;
    }
    load(name) {
        this.game.load(name);
    }
    setTitle(title) {
        this.game.setTitle(title);
    }
    getTitle() {
        return this.game.getTitle();
    }
}
HLV.VERSION = "0.7.5";
var HLViewer;
(function (HLViewer) {
    function init(rootSelector, params) {
        const node = document.querySelector(rootSelector);
        if (!node) {
            return null;
        }
        const config = Config_1.Config.init(params);
        const result = Game_1.Game.init(config);
        if (result.status === 'success') {
            const game = result.game;
            const ui = new index_1.PlayerInterface(game, node);
            ui.draw();
            game.draw();
            return new HLV(game);
        }
        return null;
    }
    HLViewer.init = init;
})(HLViewer || (HLViewer = {}));
module.exports = HLViewer;


/***/ })

/******/ });
});