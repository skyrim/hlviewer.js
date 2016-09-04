module.exports = {
    resizeTexture: function(data, w, h, nw, nh) {
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");
        c.width = w;
        c.height = h;

        var nc = document.createElement("canvas");
        var nctx = nc.getContext("2d");
        nc.width = nw;
        nc.height = nh;

        var cid = ctx.createImageData(w, h);
        for (var i = 0, size = w * h * 4; i < size; i += 4) {
            cid.data[i] = data[i];
            cid.data[i + 1] = data[i + 1];
            cid.data[i + 2] = data[i + 2];
            cid.data[i + 3] = data[i + 3];
        }
        ctx.putImageData(cid, 0, 0);

        nctx.drawImage(c, 0, 0, nw, nh);

        return new Uint8Array(nctx.getImageData(0, 0, nw, nh).data);
    },
    
    isPowerOfTwo: function(number) {
        return (number & (number - 1)) == 0;
    },

    nextHighestPowerOfTwo: function(number) {
        --number;
        for (var i = 1; i < 32; i <<= 1) {
            number = number | number >> i;
        }
        return number + 1;
    }
};