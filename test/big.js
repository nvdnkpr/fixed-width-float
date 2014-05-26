var showf = require('../');
var test = require('tape');

test('big', function (t) {
    t.equal(showf(       1, 7), '  1.000');
    t.equal(showf(      10, 7), ' 10.000');
    t.equal(showf(     100, 7), '100.000');
    t.equal(showf(    1000, 7), '1000.00');
    t.equal(showf(   10000, 7), '10000.0');
    t.equal(showf(  100000, 7), '100000.');
    t.equal(showf( 1000000, 7), '1000000');
    t.equal(showf(10000000, 7), ' 1.00e7');
    
    t.equal(showf(1.23456e9, 7), ' 1.23e9');
    t.equal(showf(1.23456e20, 7), ' 1.2e20');
    t.equal(showf(1.26456e20, 7), ' 1.3e20');
    t.equal(showf(9.99999e20, 7), ' 1.0e21');
    
    t.end();
});
