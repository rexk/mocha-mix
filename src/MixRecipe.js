var isObject = require('lodash.isobject');
var isUndefined = require('lodash.isundefined');
var MockDescription = require('./MockDescription');

function isValidObject(val) {
  return !isUndefined(val) && val !== null && isObject(val);
}

/**
 * MixRecipe returns normalized MixRecipe instance with given recipe.
 *
 * @param {object} recipe
 * @param {string} recipe.rootDir             root directory of the test executor.
 * @param {MixMap} recipe.mocks               key-value pair of mockName and mockDescription
 */
function MixRecipe(recipe) {
  if (!isValidObject(recipe)) {
    throw new Error('MochaMix is expecting an object as an argument');
  }

  var mixMap = recipe.mocks || {};
  var mocks = Object.keys(mixMap)
    .map(function (mockName) {
      return MockDescription(mockName, mixMap[mockName], recipe.defaultMockGenerator);
    });

  return {
    rootDir: recipe.rootDir || process.cwd(),
    import: recipe.import,
    mocks: mocks
  };
}

module.exports = MixRecipe;
