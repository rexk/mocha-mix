var fs = require('fs');
var path = require('path');
var isObject = require('lodash.isobject');
var isUndefined = require('lodash.isundefined');
var MockDescription = require('./MockDescription');
var SupportedExtensions = [
  '',
  '.js',
  '.jsx',
  '.es6',
  '.es6.js',
  '.coffee',
  '.ts'
];

function getTargetPath(rootDir, importPath) {
  var fullPath = path.isAbsolute(importPath) ?
    importPath :
    path.join(rootDir, importPath);
  var found = SupportedExtensions.some(function findFile(ext) {
    var filePath = fullPath + ext;
    return fs.existsSync(filePath);
  });

  return found ?
    path.dirname(fullPath) :
    fullPath ;
}

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

  var rootDir = recipe.rootDir || process.cwd();
  var mixMap = recipe.mocks || {};
  var options = {
    targetPath: getTargetPath(rootDir, recipe.import)
  };
  var mocks = Object.keys(mixMap)
    .map(function (mockName) {
      return MockDescription(
        mockName,
        mixMap[mockName],
        recipe.defaultMockGenerator,
        options
      );
    });

  return {
    rootDir: rootDir,
    import: recipe.import,
    mocks: mocks
  };
}

module.exports = MixRecipe;
