var expect = require('expect');
var sinon = require('sinon');
var MochaMix = require('../index');

describe('plugin', function () {
  describe('single', function () {
    var beforeSpy = sinon.spy();
    var afterSpy = sinon.spy();
    var beforeEachSpy = sinon.spy();
    var afterEachSpy = sinon.spy();
    var MockPlugin = function (manager) {
      manager.before(beforeSpy);
      manager.after(afterSpy);
      manager.beforeEach(beforeEachSpy);
      manager.afterEach(afterEachSpy);
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

  describe('multiple', function () {
    
  });
});
