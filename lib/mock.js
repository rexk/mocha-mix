/**
 * getImportPath greps import path from given spec object
 *
 * @method getImportPath
 * @param  {MockSpec}     spec    spec object to be inspected
 * @return {string}               relative path to the module
 */
function getImportPath(spec) {
  return spec.require || spec.import;
}

/**
 * createMocks traverses to the given mockSpec then
 * returns created stub tree.
 *
 * @method  createMocks
 * @param   {MockSpec}    mockSpec    MockSpec to be followed
 * @return  {Mocks}
 */
function createMocks(mockSpec) {
  var mocks = {};
  if (!mockSpec) {
    return mocks;
  }

  Object.keys(mockSpec)
  .forEach(function (key) {
    var spec = mockSpec[key];
    if (isString(spec)) {
      mocks[key] = createStubReactClass('div', key);
      return;
    }

    if (!hasModules(spec) && isNotReactClass(spec)) {
      mocks[key] = spec.mock || sinon.stub();
      return;
    }
    else if (!hasModules(spec)) {
      mocks[key] = createStubReactClass(spec.tagName || 'div', key);
      return;
    }

    mocks[key] = require(spec.require) || {};
    Object.keys(spec.modules)
    .forEach(function (moduleKey) {
      var moduleSpec = spec.modules[moduleKey];
      if (moduleSpec) {
        mocks[key][moduleKey] = createStubReactClass(moduleSpec.tagName || 'div', moduleKey);
      }
    });
  });
  return mocks;
}
