var isEmpty = require('lodash.isempty');
var isString = require('lodash.isstring');
var isUndefined = require('lodash.isundefined');
var MockGenerator = require('./MockGenerator');
var isMochaMixMockGenerator = MockGenerator.isMochaMixMockGenerator;

function hasValidImportPath(description) {
  return description &&
    isString(description.import) &&
    !isEmpty(description.import);
}

function MockDescription(mockName, description, defaultMockGenerator) {
  if (isString(description)) {
    description = {
      import: description
    };
  }

  if (!hasValidImportPath(description)) {
    throw new Error('MochaMix expects proper import path');
  }

  var mockGenerator = description.mock;
  var mock = description.mock;
  if (isUndefined(mockGenerator)) {
    mockGenerator = defaultMockGenerator;
  }

  if (!isMochaMixMockGenerator(mockGenerator)) {
    mockGenerator = MockGenerator(function generate() {
      return mock;
    });
  }

  return {
    mockName: mockName,
    import: description.import,
    mock: mockGenerator
  };
}

module.exports = MockDescription;
