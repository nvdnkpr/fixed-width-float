var showf = require('../');
var test = require('tape');

test('big', function (t) {
    t.equal(showf(       1, 7), '  1.000');
    t.equal(showf(      10, 7), ' 10.000');
    t.equal(showf(     100, 7), '100.000');
    t.equal(showf(    1000, 7), ' 1.00e3');
    t.equal(showf(   10000, 7), ' 1.00e4');
    t.equal(showf(  100000, 7), ' 1.00e5');
    t.equal(showf( 1000000, 7), ' 1.00e6');
    t.equal(showf(10000000, 7), ' 1.00e7');
    
    t.equal(showf(1.23456e9, 7), ' 1.23e9');
    t.equal(showf(1.23456e20, 7), ' 1.2e20');
    t.equal(showf(1.26456e20, 7), ' 1.3e20');
    
    t.end();
});
