// var React = require('react');
// var ReactDOM = require('react-dom');
jest.autoMockOff();
var path = require('path');
var MochaMix = require('mocha-mix');
var ReactPlugin = require('mocha-mix-react');

MochaMix.use(ReactPlugin);

MochaMix.use(function JestPlugin(mochaMix) {
  var MixHook = mochaMix.MixHook;
  mochaMix.setTestHooksGetter(function () {
    // For Jasmine 2.x runner
    return {
      before: global.beforeAll,
      beforeEach: global.beforeEach,
      afterEach: global.afterEach,
      after: global.afterAll
    };
  });

  mochaMix.before(MixHook(function (mixer) {
    return function beforeAll() {
      jest.autoMockOff();
      (mixer.recipe.mocks || []).forEach(function (mockDescription) {
        var recipe = mixer.recipe;
        var mockName = mockDescription.mockName;
        var mock = mockDescription.mock(mockDescription);
        var testedFilePath = path.join(recipe.rootDir, recipe.import);
        var rootDir = path.dirname(testedFilePath);
        var importPath = path.join(rootDir, mockDescription.import);
        jest.setMock(importPath, mock);
        mixer.registerMock(mockName, mock);
      });
    };
  }));

  mochaMix.after(function afterAll() {
    jest.autoMockOn();
  });
});

jest.autoMockOff();
