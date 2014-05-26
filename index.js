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
    
    var s = packf(x / Math.pow(10, n), bytes - p.length);
    if (s === undefined) return s;
    return s + p;
}

function packf (x, bytes) {
    var lbytes = Math.floor(bytes / 2 - 1);
    var rbytes = bytes - lbytes - 2;
    
    var s = Math.abs(x).toFixed(rbytes);
    var dec = s.split('.')[0];
    if (lbytes < dec.length - 1) {
        return sci(x, bytes);
    }
    var sp = Array(lbytes - dec.length + 1).join(' ');
    return sp + (x < 0 ? '-' : ' ') + s;
}
