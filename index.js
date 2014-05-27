var sprintf = require('sprintf');
var rounder = Math.log(500) / Math.log(10);

module.exports = format;

function format (x, bytes) {
    if (bytes === undefined) bytes = 7;
    var rfmt = '%' + bytes + '.' + bytes + 's';
    
    if (bytes <= 0) return undefined;
    if (isNaN(x)) return sprintf(rfmt, 'NaN');
    if (x === Infinity) {
        if (bytes === 1) return undefined;
        return sprintf(rfmt, bytes >= 9 ? 'Infinity' : ' Inf').slice(0, bytes);
    }
    if (x === -Infinity) {
        if (bytes === 1) return undefined;
        return sprintf(rfmt, bytes >= 9 ? '-Infinity' : '-Inf').slice(0, bytes);
    }
    var s = packf(x, bytes);
    if (s === undefined) return s;
    return s.slice(0, bytes);
};

function sci (x, bytes) {
    var n = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
    var p = 'e' + String(n);
    var y = Math.abs(x);
    var r = y / Math.pow(10, n);
    if (Math.abs(r) >= 10 - Math.pow(10, -bytes)) {
        r /= 10;
        p = 'e' + String(n + 1);
    }
    
    var s;
    if (x < 0) {
        var res = packf(r, bytes - p.length);
        if (res === undefined) return res;
        s = '-' + res.substr(1);
    }
    else {
        s = packf(r, bytes - p.length);
    }
    if (s === undefined) return s;
    return s + p;
}

function packf (x, bytes) {
    var lbytes = Math.floor(bytes / 2 - 1);
    var rbytes = bytes - lbytes - 2;
    
    if (rbytes < 0) return undefined;
    if (Math.abs(x) * Math.pow(10, rbytes) < 1) return sci(x, bytes);
    
    var s = Math.abs(x).toFixed(rbytes);
    var dec = s.split('.')[0];
    if (lbytes < dec.length - 1) {
        return sci(x, bytes);
    }
    var sp = Array(lbytes - dec.length + 1).join(' ');
    return sp + (x < 0 ? '-' : ' ') + s;
}
