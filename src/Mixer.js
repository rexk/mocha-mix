var MixRecipe = require('./MixRecipe');
var getModulePath = require('./getModulePath');

function Mixer(recipe) {
  var mixRecipe = MixRecipe(recipe);
  var importPath = getModulePath(mixRecipe.import, mixRecipe.rootDir);
  var mocks = {};
  var mixer = {
    recipe: mixRecipe,
    mocks: mocks,
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
      mixer.mocks[name] = mock;
    },
    clearMock: function (name) {
      delete mixer.mocks[name];
    },
    clearAllMocks: function () {
      mixer.mocks = {};
    },
  };
  return mixer;
}

module.exports = Mixer;
