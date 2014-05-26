var sprintf = require('sprintf');

module.exports = function format (x, bytes) {
    if (!bytes) bytes = 7;
    var rfmt = '%' + bytes + '.' + bytes + 's';
    
    if (isNaN(x)) return sprintf(rfmt, 'NaN');
    if (x === Infinity) return sprintf(rfmt, 'Inf');
    if (x === -Infinity) return sprintf(rfmt, '-Inf');
    
    var n;
    if (x === 0) n = 0;
    else n = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
    
    if (n < -2) {
        var p = 'e' + String(n);
        return format(x * Math.pow(10,-n), bytes - p.length) + p;
    }
    if (n >= bytes) {
        var p = 'e' + String(n);
        return format(x / Math.pow(10,n), bytes - p.length) + p;
    }
    var rbytes = Math.floor((bytes - 1) / 2);
    return sprintf('%' + bytes + '.' + rbytes + 'f', x).slice(0, bytes);
};
