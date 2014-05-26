var showf = require('../');
var test = require('tape');

test('rounding', function (t) {
    t.equal(showf(9.99999e20, 7), ' 1.0e21');
    t.equal(showf(9.9999e20, 7), ' 1.0e21');
    t.equal(showf(9.999e20, 7), ' 1.0e21');
    t.equal(showf(9.99e20, 7), ' 1.0e21');
    t.equal(showf(9.95e20, 7), ' 1.0e21');
    t.equal(showf(9.94e20, 7), ' 9.9e20');
    t.end();
});
