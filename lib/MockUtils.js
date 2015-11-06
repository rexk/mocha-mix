var ReactUtils = require('./ReactUtils');
var React = ReactUtils.get('React');

/**
 * isString returns true if the given value is a string
 * @param   {any}       value     value to be evaluated
 * @return  {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isEmpty(value) {
  if (isUndefined(value)) {
    return true;
  }

  return (!typeof value === 'object' || typeof value === 'function') ?
    !value.size :
    !Object.keys(value).length;
}

/**
 * createSubReactclass
 *
 * @param {string}    name    name to be a displayName
 * @return {ReactComponent}
 */
function createStubReactClass(tagName, name) {
  return React.createClass({
    displayName: 'Stub(' + (name || tagName) + ')',
    render: function () {
      return React.createElement(
        tagName,
        this.props,
        this.props.children
      );
    }
  });
}

function createMix(spec) {
  var importPath = getImportPath(spec, true);
  var mocks = createMocks(spec.mocks);
  return {
    import: importPath,
    mocks: mocks,
    _isMochaMix: true
  };
}

function normalizeSpec(mockName, mockSpec, nested) {
  var importPath = getImportPath(mockSpec);
  var tagName = mockSpec.tagName || 'DIV';
  var mock = mockSpec.mock || createStubReactClass(tagName, mockName);
  var mocks = getMocks(mockSpec);
  return {
    import: importPath,
    mock: mock,
    mocks: createNormalizedSpec(mocks)
  };
}

function createNormalizedSpec(spec) {
  if (isUndefined(spec)) {
    return undefined;
  }
  var mocks = {};
  Object.keys(spec).forEach(function (mockName) {
    mocks[mockName] = normalizeSpec(mockName, spec[mockName]);
  });
  return mocks;
}

function mapMocks(mocks) {
  if (isEmpty(mocks)) {
    return undefined;
  }

  var result = {};
  Object.keys(mocks).forEach(function (mockName) {
    var spec = mocks[mockName];
    var mock = spec.mock;
    mock = Object.assign(mock, mapMocks(spec.mocks));
    result[mockName] = mock;
  });
  return result;
}

function createMocks(spec) {
  var mocks = createNormalizedSpec(spec);
  return mapMocks(mocks);
}

function registerMocks(mocks) {
  Object.keys(mocks).forEach(function (mockName) {
    mockery.registerMock(mockName, mocks[mockName].mock);
  });
}

/**
 * getImportPath greps import path from given spec object
 *
 * @param  {MockSpec}     spec    spec object to be inspected
 * @return {string}               relative path to the module
 *
 *
 * @method getImportPath
 */
function getImportPath(spec, ignoreString) {
  if (typeof spec ==='object' && spec.hasOwnProperty('require')) {
    console.warn(
      '!!WARNING!! "require" is deprecated. ' +
      'Use "import" instead"'
    );
  }

  if (typeof spec === 'boolean') {
    console.warn(
      '!!WARNING!! boolean import path is deprecated. ' +
      'Use "import" instead"'
    )
    spec = { import: 'LegacyInnerModule' };
  }

  return !ignoreString && isString(spec) ? spec : spec.import || spec.require;
}

function normalizeModules(modules) {
  var results = {};
  Object.keys(modules).forEach(function (mockName) {
    results[mockName] = normalizeSpec(mockName, modules[mockName])
  });
  return results;
}

function getMocks(spec) {
  if (spec.hasOwnProperty('modules')) {
    console.warn(
      '!!WARNING!! "modules" is deprecated. ' +
      'Use "mocks" instead"'
    );
    return spec.modules;
  }

  return spec.mocks || spec.modules;
}

module.exports = {
  createMix: createMix,
  createMocks: createMocks,
  registerMocks: registerMocks
};
