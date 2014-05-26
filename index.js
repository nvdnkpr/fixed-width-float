var sprintf = require('sprintf');

module.exports = function format (x, bytes) {
    if (!bytes) bytes = 7;
    var rfmt = '%' + bytes + '.' + bytes + 's';
    
    if (isNaN(x)) return sprintf(rfmt, 'NaN');
    if (x === Infinity) return sprintf(rfmt, 'Inf');
    if (x === -Infinity) return sprintf(rfmt, '-Inf');
    
    var n = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
    var pivot = Math.min(3, bytes - 2 - n);
    
    if (pivot === -1) {
        return String(Math.round(x)).slice(0,bytes-1);
    }
    
    else if (pivot < 0) {
        var p = 'e' + String(n);
        return format(x / Math.pow(10,n), bytes - p.length) + p;
    }
    return sprintf('%' + bytes + '.' + pivot + 'f', x);
};
