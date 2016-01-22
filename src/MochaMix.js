var assign = require('lodash.assign');
var isFunction = require('lodash.isfunction');
var MochaMixVersion = require('./MochaMixVersion');
var Mixer = require('./Mixer');
var MixHook = require('./MixHook');
var MixPlugin = require('./MixPlugin');
var MockGenerator = require('./MockGenerator');
var defaultMockGenerator = require('./defaultMockGenerator');
var defaultTestHooksGetter = require('./defaultTestHooksGetter');

var BEFORE = 'before';
var BEFORE_EACH = 'beforeEach';
var AFTER_EACH = 'afterEach';
var AFTER = 'after';

var TestHooksEnum = [BEFORE, BEFORE_EACH, AFTER_EACH, AFTER];

/**
 * Register all stored hook functions into the real test hooks registry.
 *
 * @param  {Mixer}      mixer            Mixer instance to be passed to hook functions.
 * @param  {HooksStore} hooksStore       an object that contains 4 test hooks queue.
 * @param  {Function}   testHooksGetter  a getter which returns real test hooks caller.
 * @return {[type]}                 [description]
 */
function registerHooks(mixer, hooksStore, testHooksGetter) {
  TestHooksEnum.forEach(function registerHook(hookName) {
    var testHooks = testHooksGetter();
    var hookFuncsList = hooksStore[hookName];
    hookFuncsList.forEach(function (hookFunc) {
      testHooks[hookName](hookFunc(mixer));
    });
  });
}

/**
 * Saves a given hookFunc into hooksStore[hookName] queue, so that it can be
 * registered into test hooks before test is conducted.
 *
 * @param {HooksStore}       hookStore  An object that contains 4 test hooks queue.
 * @param {String}           hookName   name of the test hook (before, beforeEach, afterEach, and after)
 * @param {Function|MixHook} hookFunc   function to be executed
 */
function addTestHook(hooksStore, hookName, hookFunc) {
  hook = hookFunc;
  if (!MixHook.isMochaMixHook(hook)) {
    hook = MixHook(function () {
      return hookFunc;
    });
  }
  hooksStore[hookName].push(hook);
}

/**
 * clears a test hook queue with given test hook name
 *
 * @param  {Object} hooksStore    An object that contains 4 test hooksStore queue.
 * @param  {String} hookName name of the test hook to be cleared.
 */
function clearTestHook(hooksStore, hookName) {
  hooksStore[hookName] = [];
}

/**
 * Creates a instance of MochaMix with given options object
 *
 * options object can provide testHooksGetter and defaultMockGenerator, if one
 * wishes to override MochaMix behavior.
 *
 * @param  {object}        options
 * @param  {Function}      testHooksGetter       A function which returns for set of BDD test hooks.
 * @param  {MockGenerator} defaultMockGenerator  MockGenerator to be invoked when "mock" field is not provided on a MockDescription.
 * @return {MochaMix}
 */
function MochaMix(options) {
  options = options || {};
  var hooksStore = {
    before: [],
    beforeEach: [],
    afterEach: [],
    after: []
  };

  var testHooksGetter = options.testHooksGetter || defaultTestHooksGetter;
  var mockGenerator = options.defaultMockGenerator || defaultMockGenerator;

  var mochaMix = {

    /**
     * MochaMix version string
     *
     * @type {String}
     */
    version: MochaMixVersion,

    /**
     * Returns an instance of Mixer, with given recipe object.
     *
     * @param  {MixRecipe} recipe  Mixing recipe for testing.
     * @return {Mixer}
     */
    mix: function (recipe) {
      recipe = assign({}, {defaultMockGenerator: mockGenerator}, recipe);
      var mixer = Mixer(recipe);
      registerHooks(mixer, hooksStore, testHooksGetter);
      return mixer;
    },

    /**
     * Registers a given plugin
     *
     * @param  {Function} plugin  Function that takes one argument as MochaMix instance.
     */
    use: function (plugin) {
      plugin = MixPlugin(plugin);
      plugin(mochaMix);
    },

    /**
     * Overrides testHooksGetter of this MochaMix instance.
     *
     * @param {Function} getter  a function that returns object of test hooks.
     */
    setTestHooksGetter: function (getter) {
      if (!isFunction(getter)) {
        throw new Error('setTestHooksGetter is expecting a function as its argument');
      }
      testHooksGetter = getter;
    },

    /**
     * Overrides defaultMockGenerator to be used for any MockDescription object
     * without "mock" field defined.
     *
     * @param {MockGenerator} generator  a MockGenerator instance to be used as new default.
     */
    setDefaultMockGenerator: function (generator) {
      var _mockGenerator = generator;
      if (!MockGenerator.isMochaMixMockGenerator(_mockGenerator)) {
        _mockGenerator = MockGenerator(generator);
      }
      mockGenerator = _mockGenerator;
    },

    /**
     * Registers a test hook function.
     * The function will be invoked once before each test suite.
     *
     * @param  {Function} hook  a function to be registred.
     */
    before: function (hook) {
      addTestHook(hooksStore, BEFORE, hook);
    },

    /**
     * Registers a test hook function.
     * The function will be invoked once before each test case.
     *
     * @param  {Function} hook  a function to be registred.
     */
    beforeEach: function (hook) {
      addTestHook(hooksStore, BEFORE_EACH, hook);
    },

    /**
     * Registers a test hook function.
     * The function will be invoked once after each test case.
     *
     * @param  {Function} hook  a function to be registred.
     */
    afterEach: function (hook) {
      addTestHook(hooksStore, AFTER_EACH, hook);
    },

    /**
     * Registers a test hook function.
     * The function will be invoked once after each test suite.
     *
     * @param  {Function} hook  a function to be registred.
     */
    after: function (hook) {
      addTestHook(hooksStore, AFTER, hook);
    },

    /**
     * Clears registered hooks in given name.
     *
     * Useful for testing MochaMix itself or isolating hooks per each test suit.
     * @param  {String} hookName  a name of hooks to be cleared.
     */
    clearHook: function (hookName) {
      clearTestHook(hooksStore, hookName);
    },

    /**
     * Clears all hooks
     *
     */
    clearAllHooks: function () {
      TestHooksEnum.forEach(function (hookName) {
        clearTestHook(hooksStore, hookName);
      });
    },

    /**
     * MixHook constructor
     *
     * @type {Function}
     */
    MixHook: MixHook,

    /**
     * MockGenerator constructor
     *
     * @type {Function}
     */
    MockGenerator: MockGenerator
  };

  return mochaMix;
}

module.exports = MochaMix;
