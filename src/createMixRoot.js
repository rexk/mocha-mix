var isObject = require('lodash.isobject');
var createMixMockDescription = require('./createMixMockDescription');

function isValidObject(val) {
  return val !== undefined && val !== null && isObject(val);
}

function isUndefined(val) {
  return val === undefined;
}

function createMixRoot(spec) {
  if (!isValidObject(spec)) {
    throw new Error('MochaMix is expecting an object as an argument');
  }

  var mockSpecs = spec.mocks || {};
  var mocks = Object.keys(mockSpecs)
    .map(function (mockName) {
      return createMixMockDescription(mockName, description);
    });

  var shouldLoadOriginals = false;
  if (!isUndefined(spec.shouldLoadOriginals)) {
    shouldLoadOriginals = spec.shouldLoadOriginals;
  }

  return {
    rootDir: spec.rootDir || process.cwd(),
    import: spec.import,
    mocks: mocks,
    shouldLoadOriginals: shouldLoadOriginals
  }
}

module.exports = createMixRoot;
