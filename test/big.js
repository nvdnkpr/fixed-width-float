var showf = require('../');
var test = require('tape');

test('big', function (t) {
    t.equal(showf(       1, 7), '  1.000');
    t.equal(showf(      10, 7), ' 10.000');
    t.equal(showf(     100, 7), ' 100.00');
    t.equal(showf(    1000, 7), ' 1000.0');
    t.equal(showf(    1000, 8), ' 1000.00');
    t.equal(showf(   10000, 7), ' 1.00e4');
    t.equal(showf(  100000, 7), ' 1.00e5');
    t.equal(showf( 1000000, 7), ' 1.00e6');
    t.equal(showf(10000000, 7), ' 1.00e7');
    
    t.equal(showf(1.23456e9, 7), ' 1.23e9');
    t.equal(showf(2.23456e9, 7), ' 2.23e9');
    t.equal(showf(3.23456e9, 7), ' 3.23e9');
    t.equal(showf(4.23456e9, 7), ' 4.23e9');
    t.equal(showf(5.23456e9, 7), ' 5.23e9');
    t.equal(showf(6.23456e9, 7), ' 6.23e9');
    t.equal(showf(7.23456e9, 7), ' 7.23e9');
    t.equal(showf(8.23456e9, 7), ' 8.23e9');
    t.equal(showf(9.23456e9, 7), ' 9.23e9');
    t.equal(showf(10.23456e9, 7), ' 1.0e10');
    t.equal(showf(1.23456e20, 7), ' 1.2e20');
    t.equal(showf(1.26456e20, 7), ' 1.3e20');
    
    t.end();
});

test('negative big', function (t) {
    t.equal(showf(-       1, 7), ' -1.000');
    t.equal(showf(-      10, 7), '-10.000');
    t.equal(showf(-  9.9994, 7), ' -9.999');
    t.equal(showf(-  9.9999, 7), '-10.000');
    t.equal(showf(-     100, 7), '-100.00');
    t.equal(showf(-    999.9, 7), '-999.90');
    t.equal(showf(-    999.901, 7), '-999.90');
    t.equal(showf(-    999.904, 7), '-999.90');
    t.equal(showf(-    999.905, 7), '-999.91');
    t.equal(showf(-    999.906, 7), '-999.91');
    t.equal(showf(-    999.91, 7), '-999.91');
    t.equal(showf(-    999.94, 7), '-999.94');
    t.equal(showf(-    9999.94, 8), '-9999.94');
    t.equal(showf(-    9999.99, 8), '-9999.99');
    t.equal(showf(-    9999.994, 8), '-9999.99');
    t.equal(showf(-    9999.995, 8), '-10000.0');
    t.equal(showf(-    99999.94, 8), '-99999.9');
    t.equal(showf(-    999999.94, 9), '-999999.9');
    t.equal(showf(     999999.94, 9), ' 999999.9');
    t.equal(showf(-    999.95, 7), '-999.95');
    t.equal(showf(-    999.99, 7), '-999.99');
    t.equal(showf(-    999.994, 7), '-999.99');
    t.equal(showf(     999.994, 7), ' 999.99');
    t.equal(showf(-    499.994, 7), '-499.99');
    t.equal(showf(-    9999.94, 7), '-9999.9');
    t.equal(showf(-    9989.94, 7), '-9.99e3');
    t.equal(showf(-    999.995, 7), '-1000.0');
    t.equal(showf(-    1000, 7), '-1000.0');
    t.equal(showf(-    1000.4, 7), '-1.00e3');
    t.equal(showf(-    1000.9, 7), '-1.00e3');
    t.equal(showf(-   10000, 7), '-1.00e4');
    t.equal(showf(-  100000, 7), '-1.00e5');
    t.equal(showf(- 1000000, 7), '-1.00e6');
    t.equal(showf(-10000000, 7), '-1.00e7');
    
    t.equal(showf(-1.23456e9, 7), '-1.23e9');
    t.equal(showf(-1.23456e20, 7), '-1.2e20');
    t.equal(showf(-1.26456e20, 7), '-1.3e20');
    
    t.end();
});
