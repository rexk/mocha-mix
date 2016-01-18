var Mixer = require('./Mixer');
var MixHook = require('./MixHook');
var MixPlugin = require('./MixPlugin');
var MockGenerator = require('./MockGenerator');
var defaultMockGenerator = require('./defaultMockGenerator');
var defaultTestHooksGetter = require('./defaultTestHooksGetter');
var isFunction = require('./lodash.isFunction');

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
  hooks[hookName].push(MixHook(hookFunc));
}

function clearTestHook(hooks, hookName) {
  hooks[hookName] = [];
}

function MochaMix() {
  var mixHooks = {
    before: [],
    beforeEach: [],
    afterEach: [],
    after: []
  };

  var testHooksGetter = defaultTestHooksGetter;
  var mockGenerator = defaultMockGenerator;

  var mochaMix = {
    mix: function (recipe) {
      var mixer = Mixer(recipe, mockGenerator);
      registerHooks(mixer, mixHooks, testHooksGetter);
      return mixer;
    },
    use: function (plugin) {
      plugin = MixPlugin(plugin);
      plugin(mochaMix);
    },
    setTestHookGetter: function (getter) {
      if (!isFunction(getter)) {
        throw new Error('setTestHookGetter is expecting a function as its argument');
      }
      testHooksGetter = getter;
    },
    setDefaultMockGenerator: function (generator) {
      mockGenerator = MockGenerator(generator);
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
      clearTestHook(hooks, hookName);
    },
    clearAllHooks: function () {
      TestHooksEnum.forEach(function (hookName) {
        clearTestHook(hooks, hookName);
      });
    }
  };

  return mochaMix;
}

module.exports = MochaMix;
