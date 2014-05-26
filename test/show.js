var showf = require('../');
var test = require('tape');

test('small numbers', function (t) {
    t.equal(showf(1, 7), '  1.000');
    t.equal(showf(0, 7), '  0.000');
    t.equal(showf(-1, 7), ' -1.000');
    t.end();
});
