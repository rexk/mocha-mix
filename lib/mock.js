/**
 * isString returns true if the given value is a string
 * @param   {any}       value     value to be evaluated
 * @return  {boolean}
 */
function isString(value) {
  return typeof value === 'string';
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

function mapMochaMixSpec(spec) {
  var importPath = getImportPath(spec, true);
  var mocks = mapAllMocksSpecs(spec.mocks || {});
  return {
    import: importPath,
    mocks: mocks,
    _isMochaMix: true
  };
}

function mapMockSpec(mockName, mockSpec) {
  var importPath = getImportPath(mockSpec);
  var tagName = mockSpec.tagName || 'DIV';
  var mock = mockSpec.mock || createStubReactClass(tagName, mockName);
  return {
    import: importPath,
    mock: mock
  };
}

function mapAllMocksSpecs(spec) {
  spec = spec || {};
  var mocks = {};
  Object.keys(spec).forEach(function (mockName) {
    mocks[mockName] = mapMockSpec(mockName, spec[mockName]);
  });
  return mocks;
}

function getAllMocks(spec) {
  var mockSpec = spec && spec.mocks || {};
  var mocks = {};
  Object.keys(mockSpec).forEach(function (mockName) {
    mocks[mockName] = mockSpec[mockName].mock;
  });
  return mocks;
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
      '"require" is deprecated key\n' +
      'Use "import" instead"'
    );
  }

  return !ignoreString && isString(spec) ? spec : spec.import || spec.spec;
}

function mix(spec) {
  var mappedSpec = mapMochaMixSpec(spec);
}
