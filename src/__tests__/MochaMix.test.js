var MochaMix = require('../MochaMix');
var expect = require('expect');
var sinon = require('sinon');

describe('MochaMix', function () {

  describe('hooks execution', function () {
    var mochaMix = MochaMix();
    var spyList = [];

    function registerSpy(spyList, name) {
      spyList.push({name: name, spy: sinon.spy()});
    }

    registerSpy(spyList, 'before');
    registerSpy(spyList, 'beforeEach');
    registerSpy(spyList, 'afterEach');
    registerSpy(spyList, 'after');

    spyList.forEach(function (spyItem) {
      var name = spyItem.name;
      var spy = spyItem.spy;
      mochaMix[name](spy);
    });

    mochaMix.mix({
      import: '../MochaMix'
    });

    it('should excute hooks', function () {
      var expectedCounts = [1, 1, 0, 0];
      expectedCounts.forEach(function (expected, idx) {
        var spyItem = spyList[idx];
        expect(spyItem.spy.callCount).toBe(expected,
          'expect ' + spyItem.name + ' to be called ' + expected + 'th times. but called ' + spyItem.spy.callCount + 'th times');
        });
      });

      it('should excute hooks x2', function () {
        var expectedCounts = [1, 2, 1, 0];
        expectedCounts.forEach(function (expected, idx) {
          var spyItem = spyList[idx];
          expect(spyItem.spy.callCount).toBe(expected,
            'expect ' + spyItem.name + ' to be called ' + expected + 'th times. but called ' + spyItem.spy.callCount + 'th times');
          });
      });
  });

  describe('clearAllHooks', function () {
    var mochaMix = MochaMix();
    var spyList = [];

    function registerSpy(spyList, name) {
      spyList.push({name: name, spy: sinon.spy()});
    }

    registerSpy(spyList, 'before');
    registerSpy(spyList, 'beforeEach');
    registerSpy(spyList, 'afterEach');
    registerSpy(spyList, 'after');

    spyList.forEach(function (spyItem) {
      var name = spyItem.name;
      var spy = spyItem.spy;
      mochaMix[name](spy);
    });

    mochaMix.clearAllHooks();
    mochaMix.mix({
      import: '../MochaMix'
    });

    it('should clearAllHooks', function () {
      var expectedCounts = [0, 0, 0, 0];
      expectedCounts.forEach(function (expected, idx) {
        var spyItem = spyList[idx];
        expect(spyItem.spy.callCount).toBe(expected,
          'expect ' + spyItem.name + ' to be called ' + expected + 'th times. but called ' + spyItem.spy.callCount + 'th times');
        });
    });

    it('should clearAllHooks x2', function () {
      var expectedCounts = [0, 0, 0, 0];
      expectedCounts.forEach(function (expected, idx) {
        var spyItem = spyList[idx];
        expect(spyItem.spy.callCount).toBe(expected,
          'expect ' + spyItem.name + ' to be called ' + expected + 'th times. but called ' + spyItem.spy.callCount + 'th times');
        });
    });
  });

  describe('test getter', function () {
    var isCalled = false;
    var mockTestGetter = function () {
      isCalled = true;
      return {
        before: global.before,
        beforeEach: global.beforeEach,
        afterEach: global.afterEach,
        after: global.after
      };
    };
    var mochaMix = MochaMix();
    var spyList = [];

    function registerSpy(spyList, name) {
      spyList.push({name: name, spy: sinon.spy()});
    }

    registerSpy(spyList, 'before');
    registerSpy(spyList, 'beforeEach');
    registerSpy(spyList, 'afterEach');
    registerSpy(spyList, 'after');

    spyList.forEach(function (spyItem) {
      var name = spyItem.name;
      var spy = spyItem.spy;
      mochaMix[name](spy);
    });

    mochaMix.setTestHooksGetter(mockTestGetter);
    mochaMix.mix({
      import: '../MochaMix'
    });

    it('should invoke the provided testHooksGetter', function () {
      expect(isCalled).toBe(true);
    });

    it('should throw an error', function () {
      var nonFunctionValues = [
        undefined,
        null,
        1.2,
        100,
        '',
        'test',
        true,
        false
      ];

      nonFunctionValues.forEach(function (value) {
        expect(function () {
          mochaMix.setTestHookGetter(value);
        }).toThrow();
      });
    });
  });
});
