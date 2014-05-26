var sprintf = require('sprintf');

module.exports = function format (x, bytes) {
    if (!bytes) bytes = 7;
    var rfmt = '%' + bytes + '.' + bytes + 's';
    
    if (isNaN(x)) return sprintf(rfmt, 'NaN');
    if (x === Infinity) return sprintf(rfmt, 'Inf');
    if (x === -Infinity) return sprintf(rfmt, '-Inf');
    
    var n = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
    if (n >= bytes) {
        var p = 'e' + String(n);
        return format(x / Math.pow(10,n), bytes - p.length) + p;
    }
    return sprintf('%' + bytes + '.3f', x).slice(0, bytes);
};
