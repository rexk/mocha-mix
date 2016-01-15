var path = require('path');
var registry = require('./registry');
var createMixRoot = require('./createMixRoot');
var REGEX_RELATIVE = /^\./i;

function registerHook(mixer) {
  return function register(hookName) {
    var testHooks = registry.get('getTestHooks');
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

  if (REGEX_RELATIVE.test(importPath)) {
    return path.join(rootDir, importPath);
  }

  // must be npm module name such as 'react', 'react/lib/...'
  return importPath;
}

// function loadOriginals(mixRoot) {
//   var rootDir = mixRoot.rootDir;
//   var mocks = mixRoot.mocks || [];
//
//   return (mocks || []).map(function (mock) {
//     var importPath = getModulePath(mock, rootDir);
//     return {
//       name: mock.name,
//       module: require(importPath)
//     };
//   }).reduce(function (ret, original) {
//     ret[original.name] = original.module;
//     return ret;
//   }, {});
// }

function createMixer(mixRoot) {
  var mixRoot = createMixRoot(mixRoot);
  var importPath = getModulePath(mixRoot.import, mixRoot.rootDir);
  var mocks = {};
  var originals = {};
  var mixer = {
    import: function () {
      var _module = require(importPath);
      var _module2 = _module && _module.__esModule ? _module : {default: _module};
      return _module2.default;
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
    mocks: mocks,
    originals: originals
  };

  registerHooks(mixer);
  return mixer;
}

module.exports = createMixer;
