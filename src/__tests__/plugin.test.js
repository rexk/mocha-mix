var expect = require('expect');
var sinon = require('sinon');
var Index = require('../index');
var MockeryPlugin = require('mocha-mix-mockery');

describe('plugin', function () {
  describe('hook', function () {
    var MochaMix = Index.MochaMix();
    var beforeSpy = sinon.spy();
    var afterSpy = sinon.spy();
    var beforeEachSpy = sinon.spy();
    var afterEachSpy = sinon.spy();
    var spyList = [{
      name: 'beforeSpy',
      spy: beforeSpy
    }, {
      name: 'beforeEachSpy',
      spy: beforeEachSpy
    }, {
      name: 'afterEachSpy',
      spy: afterEachSpy
    }, {
      name: 'afterSpy',
      spy: afterSpy
    }];

    var MockPlugin = function (mochaMix) {
      mochaMix.before(beforeSpy);
      mochaMix.after(afterSpy);
      mochaMix.beforeEach(beforeEachSpy);
      mochaMix.afterEach(afterEachSpy);
    };

    MochaMix.use(MockPlugin);
    MochaMix.mix({
      rootDir: __dirname,
      import: '../index'
    });

    afterEach(function () {
      spyList.forEach(function (spyItem) {
        spyItem.spy.reset();
      });
    });


    it('should call each hook once', function () {
      var calledList = [{
        name: 'beforeSpy',
        spy: beforeSpy
      }, {
        name: 'beforeEachSpy',
        spy: beforeEachSpy
      }];

      var notCalledList = [{
        name: 'afterSpy',
        spy: afterSpy
      }, {
        name: 'afterEachSpy',
        spy: afterEachSpy
      }];

      calledList.forEach(function (spyItem) {
        expect(spyItem.spy.calledOnce).toBe(true, 'expects ' + spyItem.name + ' to be called once.');
      });

      notCalledList.forEach(function (spyItem) {
        expect(spyItem.spy.called).toBe(false, 'expects ' + spyItem.name + ' to be not called');
      });
    });

    it('should call each hook once x2', function () {
      var calledList = [{
        name: 'beforeEachSpy',
        spy: beforeEachSpy
      }];

      var notCalledList = [{
        name: 'beforeSpy',
        spy: beforeSpy
      }, {
        name: 'afterSpy',
        spy: afterSpy
      }, {
        name: 'afterEachSpy',
        spy: afterEachSpy
      }];

      calledList.forEach(function (spyItem) {
        expect(spyItem.spy.calledOnce).toBe(true, 'expects ' + spyItem.name + ' to be called once.');
      });

      notCalledList.forEach(function (spyItem) {
        expect(spyItem.spy.called).toBe(false, 'expects ' + spyItem.name + ' to be not called');
      });
    });
  });

  describe('defaultMockGenerator', function () {
    var MochaMix = Index.MochaMix();
    var defaultMock = {
      __isTestMock: true
    };

    var MockPlugin = function (mochaMix) {
      mochaMix.setDefaultMockGenerator(function () {
        return defaultMock;
      });
    };
    MochaMix.use(MockPlugin);
    MochaMix.use(MockeryPlugin());
    var mixer = MochaMix.mix({
      rootDir: __dirname,
      import: '../inhookdex',
      mocks: {
        TestMock: './MixHook'
      }
    });

    it('should return defulatMock using custom defaultMockGenerator', function () {
      expect(mixer.mocks.TestMock).toBe(defaultMock);
    });
  });
});
