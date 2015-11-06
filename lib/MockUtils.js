var React = require('react');

/**
 * isString returns true if the given value is a string
 * @param   {any}       value     value to be evaluated
 * @return  {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

function isEmpty(value) {
  if (typeof value === 'undefined') {
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
  var mocks = createMocks(spec.mocks || {});
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
  var mocks = mockSpec.mocks || {};
  return {
    import: importPath,
    mock: mock,
    mocks: createMocks(mocks)
  };
}

function createNormalizedSpec(spec) {
  spec = spec || {};
  var mocks = {};
  Object.keys(spec).forEach(function (mockName) {
    mocks[mockName] = normalizeSpec(mockName, spec[mockName]);
  });
  return mocks;
}

function mapMocks(mocks) {
  if (isEmpty(mocks)) {
    return {};
  }

  var result = {};
  Object.keys(mocks).forEach(function (mockName) {
    var spec = mocks[mockName];
    var mock = Object.assign({}, spec.mock, mapMocks(spec.mocks));
    console.log('innermock', mockName, spec.mocks, mapMocks(spec.mocks));
    result[mockName] = spec.mock;
  });
  return result;
}

function createMocks(spec) {
  var mocks = createNormalizedSpec(spec);
  console.log('mocks', mocks);
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
    spec = { import: 'LegacyInnerMock' };
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
    return normalizeModules(spec.modules);
  }

  return spec.mocks || {};
}

module.exports = {
  createMix: createMix,
  createMocks: createMocks,
  registerMocks: registerMocks
};
