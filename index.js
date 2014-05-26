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
    
    var n, b = Math.ceil((bytes + 1) / 2);
    if (x === 0) n = 0
    else n = Math.floor(Math.log(Math.abs(x)) / Math.log(10))
    
    if (n >= Math.ceil((bytes - 1) / 2)) return sci(x, n, bytes);
    if (n < -2) return sci(x, n, bytes);
    
    if (x < 0) x = nround(x, n, bytes);
    
    var rbytes = Math.floor((bytes - 1) / 2);
    var res = sprintf('%' + bytes + '.' + rbytes + 'f', x)
    var dot = res.split('.')[1];
    var ex = Math.floor((bytes - 1) / 2)
    if (!/^[ -]/.test(res) && dot && dot.length + 1 !== ex) res = ' ' + res;
    return res.slice(0, bytes);
};

function sci (x, n, bytes) {
    var p = 'e' + String(n);
    if (n < 0) {
        var s = format(x * Math.pow(10,-n), bytes - p.length);
        if (s === undefined) return s;
        return s + p;
    }
    var s, y = x / Math.pow(10, n);
    
    var b = Math.ceil(Math.log(Math.abs(x)) / Math.log(10));
    var sx = Math.pow(10, -(bytes - b - 2));
    var slo = Math.pow(10,b) - sx;
    var sup = Math.pow(10,b) - sx * 0.5
    if (Math.abs(x) < sup && Math.abs(x) > slo) {
        return (x < 0 ? '-' : ' ') + String(slo);
    }
    if (Math.abs(y) + Math.pow(10, p.length - bytes + rounder) >= 10) {
        s = format(y / 10, bytes - p.length - Math.floor((bytes + 1) % 2));
        p = 'e' + String(n + 1);
    }
    else s = format(y, bytes - p.length);
    
    if (s === undefined) return s;
    
    var res = (s + p).slice(0, bytes);
    var extra = Array(bytes - res.length + 1).join(' ');
    return extra + res;
}

function nround (x, n, bytes) {
    var pb = Math.pow(10, Math.floor(bytes / 2) - Math.max(0, n-1));
    return -Math.round(Math.abs(x) * pb) / pb;
}
