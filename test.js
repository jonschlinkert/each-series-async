'use strict';

require('mocha');
var assert = require('assert');
var each = require('./');

describe('each', function() {
  it('should throw an error when the first argument is not an array', function(cb) {
    each({}, function() {}, function(err) {
      assert(err);
      cb();
    });
  });

  it('should throw an error when the callback is not a function', function() {
    assert.throws(function() {
      each();
    });
    assert.throws(function() {
      each(null, function() {}, {});
    });
  });

  it('should throw an error when the iterator is not a function', function(cb) {
    each(['a'], null, function(err) {
      assert(err);
      cb();
    });
  });

  it('should iterate over the given array', function(cb) {
    var res = [];
    each(['a', 'b', 'c'], function(val, next) {
      res.push(val);
      next(null, val);
    }, function(err) {
      assert.deepEqual(res, ['a', 'b', 'c']);
      cb();
    });
  });

  it('should run in series', function(cb) {
    this.timeout(10000);
    var res = [];
    each([1, 2, 3, 4, 5, 6], function(val, next) {
      setTimeout(function() {
        res.push(val + val);
        next();
      }, 100);
    }, function(err) {
      assert.deepEqual(res, [ 2, 4, 6, 8, 10, 12 ]);
      cb();
    });
  });
});
