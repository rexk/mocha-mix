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

/**
 * Returns a normalized MockDescription instance.
 *
 * Normalized MockDescription instance consists of tree components.
 *   mockName :  a key to be used for mock reference object of a mixer instance.
 *   import   :  import path to be used to register mock object using mocking modules (jest, mockery)
 *   mock     :  anything that needs to be returned when a module is required with given impor path.
 *
 * @param  {String}                  mockName              name of the mock. Usually used as a key for mock reference object.
 * @param  {String|MockDescription}  description           description object or a string indicating import path of a module.
 * @param  {MockGenerator}           defaultMockGenerator  defaultMockGenerator to be used if description.mock is not defined.
 *
 * @return {MockDescription}
 */
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
    /**
     * Name of the mock.
     * @type {String}
     */
    mockName: mockName,

    /**
     * A module path
     *
     * @type {String}
     */
    import: description.import,

    /**
     * @type {MockGenerator|Any}
     */
    mock: mockGenerator
  };
}

module.exports = MockDescription;
