var sprintf = require('sprintf');

module.exports = function format (x, bytes) {
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
    
    var n;
    if (x === 0) n = 0;
    else n = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
    
    if (n < -2) {
        var p = 'e' + String(n);
        return format(x * Math.pow(10,-n), bytes - p.length) + p;
    }
    if (n >= bytes) {
        var p = 'e' + String(n);
        var s = format(x / Math.pow(10,n), bytes - p.length) + p;
        return s.slice(0, bytes);
    }
    var rbytes = Math.floor((bytes - 1) / 2);
    return sprintf('%' + bytes + '.' + rbytes + 'f', x).slice(0, bytes);
};
