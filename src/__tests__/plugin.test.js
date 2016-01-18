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

    it('should call each hook once', function () {
      [beforeSpy, beforeEachSpy].forEach(function (spy) {
        expect(spy.calledOnce).toBe(true, 'expects ' + spy.name + 'to be called once.');
      });
      [afterSpy, afterEachSpy].forEach(function (spy) {
        expect(spy.called).toBe(false);
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
      import: '../index',
      mocks: {
        TestMock: './MixHook'
      }
    });

    it('should return defulatMock using custom defaultMockGenerator', function () {
      expect(mixer.mocks.TestMock).toBe(defaultMock);
    });
  });
});
