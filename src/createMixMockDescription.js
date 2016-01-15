var registry = require('./registry');
var isEmpty = require('lodash.isempty');

function isString(val) {
  return typeof val === 'string';
}

function hasValidImportPath(description) {
  return description &&
    isString(description.import) &&
    !isEmpty(description.import);
}

function createMixMockDescription(mockName, description) {
  if (isString(description)) {
    description = {
      import: description
    };
  }

  if (!hasValidImportPath(description)) {
    throw new Error('MochaMix expects proper import path');
  }

  mock = description.mock || registry.get('defaultMockGenerator');

  return {
    mockName: mockName,
    import: description.import,
    mock: mock
  };
}

module.exports = createMixMockDescription
