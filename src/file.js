function File(path) {
    this.path = path;
    this._request = new XMLHttpRequest();
    this._request.addEventListener("load", this._onLoad.bind(this));
    this._request.open("GET", path);
    this._request.responseType = "arraybuffer";
    this._request.send(null);
};

File.prototype._onLoad = function (event) {
    this.offset = 0;
    this.data = event.currentTarget.response;
    this.view = new DataView(this.data);
    this.length = this.view.byteLength;
};

File.prototype.addEventListener = function (eventType, listener) {
    var self = this;
    this._request.addEventListener(eventType, function (event) {
        event.data = {};
        event.data.file = self;
        listener(event);
    });
};

File.prototype.seek = function (position) {
    if (position < 0 || position > this.length) {
        this.offset = 0;
    }
    else {
        this.offset = position;
    }
};

File.prototype.skip = function (i) {
    this.offset += i;
    if (this.offset < 0 || this.offset > this.length) {
        this.offset = 0;
    }
};

File.prototype.tell = function () {
    return this.offset;
};

File.prototype.size = function () {
    return this.length;
};

File.prototype.readByte = function () {
    var r = this.view.getInt8(this.offset);
    this.offset += 1;
    return r;
};

File.prototype.readUByte = function () {
    var r = this.view.getUint8(this.offset);
    this.offset += 1;
    return r;
};

File.prototype.readShort = function () {
    var r = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return r;
};

File.prototype.readUShort = function () {
    var r = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return r;
};

File.prototype.readInt = function () {
    var r = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return r;
};

File.prototype.readUInt = function () {
    var r = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return r;
};

File.prototype.readFloat = function () {
    var r = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return r;
};

File.prototype.readDouble = function () {
    var r = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return r;
};

File.prototype.readString = function (length) {
    var temp;
    var result = "";
    while (( temp = this.readByte() ) != 0) {
        result += String.fromCharCode(temp);
    }

    if (length) {
        this.skip(length - result.length - 1);
    }

    return result;
};

File.prototype.readArray = function (count, readFunction) {
    var result = new Array(count);

    for (var i = 0; i < count; ++i) {
        result[i] = readFunction.call(this);
    }

    return result;
};

File.prototype.isOpen = function () {
    return this._request.status === 200;
};

File.prototype.cancel = function () {
    this._request.abort();
};

module.exports = File;