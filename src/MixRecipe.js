var isObject = require('lodash.isobject');
var isUndefined = require('lodash.isundefined');
var MockDescription = require('./MockDescription');

function isValidObject(val) {
  return !isUndefined(val) && val !== null && isObject(val);
}

function MixRecipe(recipe) {
  if (!isValidObject(recipe)) {
    throw new Error('MochaMix is expecting an object as an argument');
  }

  var mockSpecs = recpie.mocks || {};
  var mocks = Object.keys(mockSpecs)
    .map(function (mockName) {
      return MockDescription(mockName, description, recipe.defaultMockGenerator);
    });

  return {
    rootDir: recpie.rootDir || process.cwd(),
    import: recpie.import,
    mocks: mocks
  }
}

module.exports = MixRecipe;
