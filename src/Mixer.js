var path = require('path');
var MixRecipe = require('./MixRecipe');
var REGEX_IS_RELATIVE = /^\./i;

function registerHook(mixer) {
  return function register(hookName) {
    var getTestHooks = registry.get('getTestHooks') || Function.prototype;
    var testHooks = getTestHooks();
    var hookFuncs = registry.get(hookName) || [];
    hookFuncs.forEach(function (hookFunc) {
      testHooks[hookName](hookFunc(mixer));
    });
  }
}

function registerHooks(mixer) {
  ['before', 'after', 'afterEach', 'beforeEach'].forEach(registerHook(mixer));
}

function getModulePath(importPath, rootDir) {
  if (path.isAbsolute(importPath)) {
    return mock.import;
  }

  if (REGEX_IS_RELATIVE.test(importPath)) {
    return path.join(rootDir, importPath);
  }

  // must be npm module name such as 'react', 'react/lib/...'
  return importPath;
}

function Mixer(recipe, defaultMockGenerator) {
  recipe = recipe || {};
  recipe.defaultMockGenerator = recipe.defaultMockGenerator || defaultMockGenerator;
  var mixRoot = MixRecipe(recipe);
  var importPath = getModulePath(mixRoot.import, mixRoot.rootDir);
  var mocks = {};
  var mixer = {
    recipe: mixRoot,
    import: function () {
      var _module = require(importPath);
      var _module2 = _module && _module.__esModule ? _module : {default: _module};
      return _module2.default;
    },
    require: function () {
      return require(importPath);
    },
    importAsWildcard: function () {
      return require(importPath);
    },
    registerMock: function(name, mock) {
      mocks[name] = mock
    },
    clearMock: function (name) {
      delete mocks[name];
    },
    mocks: mocks
  };

  registerHooks(mixer);
  return mixer;
}

module.exports = Mixer;
