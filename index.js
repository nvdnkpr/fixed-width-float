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
    return packf(x, bytes);
};

function sci (x, bytes) {
    var n = log10f(Math.abs(x));
    var sz = log10f(Math.abs(n));
    var s = sprintf('%.' + (bytes - sz - 6) + 'e', x);
    if (x > 0) s = ' ' + s;
    return Array(Math.max(0, bytes - s.length + 1)).join(' ') + s;
}

function log10f (n) {
    return Math.floor(Math.log(n) / Math.log(10));
}

function packf (x, bytes) {
    var lbytes = Math.max(1, Math.floor((bytes - 2) / 2));
    var rbytes = bytes - lbytes - 2;
    var s = sprintf('%' + lbytes + '.' + rbytes + 'f', x);
    if (x > 0) s = ' ' + s;
    if (s.split('.')[0].length - 1 > lbytes) return sci(x, bytes);
    if (Math.abs(x) < Math.pow(10,-rbytes)) return sci(x, bytes);
    return Array(Math.max(0, bytes - s.length + 1)).join(' ') + s;
}
