var assign = require('lodash.assign');
var isFunction = require('lodash.isfunction');
var Mixer = require('./Mixer');
var MixHook = require('./MixHook');
var MixPlugin = require('./MixPlugin');
var MockGenerator = require('./MockGenerator');
var defaultMockGenerator = require('./defaultMockGenerator');
var defaultTestHooksGetter = require('./defaultTestHooksGetter');

var TestHooksEnum = ['before', 'beforeEach', 'afterEach', 'after'];

function registerHooks(mixer, hooks, testHooksGetter) {
  TestHooksEnum.forEach(function registerHook(hookName) {
    var testHooks = testHooksGetter();
    var hookFuncsList = hooks[hookName];
    hookFuncsList.forEach(function (hookFunc) {
      testHooks[hookName](hookFunc(mixer));
    });
  });
};

function addTestHook(hooks, hookName, hookFunc) {
  hook = hookFunc;
  if (!MixHook.isMochaMixHook(hook)) {
    hook = MixHook(function () {
      return hookFunc;
    });
  }
  hooks[hookName].push(hook);
}

function clearTestHook(hooks, hookName) {
  hooks[hookName] = [];
}

function MochaMix(options) {
  options = options || {};
  var mixHooks = {
    before: [],
    beforeEach: [],
    afterEach: [],
    after: []
  };

  var testHooksGetter = options.testHooksGetter || defaultTestHooksGetter;
  var mockGenerator = options.defaultMockGenerator || defaultMockGenerator;

  var mochaMix = {
    mix: function (recipe) {
      recipe = assign({}, {defaultMockGenerator: mockGenerator}, recipe);
      var mixer = Mixer(recipe);
      registerHooks(mixer, mixHooks, testHooksGetter);
      return mixer;
    },
    use: function (plugin) {
      plugin = MixPlugin(plugin);
      plugin(mochaMix);
    },
    setTestHooksGetter: function (getter) {
      if (!isFunction(getter)) {
        throw new Error('setTestHooksGetter is expecting a function as its argument');
      }
      testHooksGetter = getter;
    },
    setDefaultMockGenerator: function (generator) {
      var _mockGenerator = generator;
      if (!MockGenerator.isMochaMixMockGenerator(_mockGenerator)) {
        _mockGenerator = MockGenerator(generator);
      }
      mockGenerator = _mockGenerator;
    },
    before: function (hook) {
      addTestHook(mixHooks, 'before', hook);
    },
    beforeEach: function (hook) {
      addTestHook(mixHooks, 'beforeEach', hook);
    },
    afterEach: function (hook) {
      addTestHook(mixHooks, 'afterEach', hook);
    },
    after: function (hook) {
      addTestHook(mixHooks, 'after', hook);
    },
    clearHook: function (hookName) {
      clearTestHook(mixHooks, hookName);
    },
    clearAllHooks: function () {
      TestHooksEnum.forEach(function (hookName) {
        clearTestHook(mixHooks, hookName);
      });
    },
    MixHook: MixHook,
    MockGenerator: MockGenerator
  };

  return mochaMix;
}

module.exports = MochaMix;
