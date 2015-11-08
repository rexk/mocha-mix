var ReactUtils = require('./ReactUtils');
var React = ReactUtils.get('React');
var mockery = require('mockery');
var mixdash = require('./mixdash');
var isString = mixdash.isString;
var isUndefined = mixdash.isUndefined;
var isEmpty = mixdash.isEmpty;
var warnDeprecatedKey = mixdash.warnDeprecatedKey;

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
  warnDeprecatedKey(spec, 'context',
    '!!!WARNING!!! "context" is depcrecated'
  );
  var importPath = getImportPath(spec, true);
  var normalizeSpec = createNormalizedSpec(spec.mocks);
  var mocks = mapMocks(normalizeSpec);
  return {
    _isMochaMix: true,
    context: spec.context,
    import: importPath,
    mocks: mocks,
    spec: normalizeSpec
  };
}

function normalizeSpec(mockName, mockSpec) {
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
  Object.keys(mocks || {}).forEach(function (mockName) {
    var mockSpec = mocks[mockName];
    mockery.registerMock(mockSpec.import, mockSpec.mock);
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
  warnDeprecatedKey(
    spec,
    'require',
    '!!WARNING!! "require" is deprecated. ' +
    'Use "import" instead"'
  );

  if (typeof spec === 'boolean') {
    console.warn(
      '!!WARNING!! boolean import path is deprecated. ' +
      'Use "import" instead"'
    )
    spec = { import: 'LegacyInnerModule' };
  }

  return !ignoreString && isString(spec) ? spec : spec.import || spec.require;
}

function getMocks(spec) {
  warnDeprecatedKey(spec, 'modules',
    '!!WARNING!! "modules" is deprecated. ' +
    'Use "mocks" instead"'
  );
  return spec.mocks || spec.modules;
}

module.exports = {
  createMix: createMix,
  createMocks: createMocks,
  createNormalizedSpec: createNormalizedSpec,
  mapMocks: mapMocks,
  registerMocks: registerMocks
};
