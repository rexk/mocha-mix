require('./prepare-dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var path = require('path');
var sinon = require('sinon');
var mockery = require('mockery');

/**
 * isString returns true if the given value is a string
 * @param   {any}       value     value to be evaluated
 * @return  {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * isNotReactClass returns true if the given value's react field is false
 * @param    {any}        value    value to be evaluated
 * @return   {boolean}
 */
function isNotReactClass(value) {
  return value && value.react === false;
}

function hasModules(value) {
  return value && value.require && value.modules;
}

function createStubReactClass(name) {
  return React.createClass({
    displayName: (name || '') + ' stub',
    render: function () {
      return React.createElement('div');
    }
  })
}

/**
 * registerMocks traverses mockSpec and register mock instances
 * using mockery
 *
 * @method  registerMocks
 * @param   {MockSpec} mockSpec   mockSpec
 * @param   {Mocks}    mocks      mocks object create by createMocks
 */
function registerMocks(mockSpec, mocks) {
  mocks = mocks || {};
  Object.keys(mockSpec)
  .forEach(function (key) {
    var spec = mockSpec[key];
    if (isString(spec)) {
      mockery.registerMock(spec, mocks[key]);
      return;
    }

    mockery.registerMock(spec.require, mocks[key]);
  });
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
  Object.keys(mockSpec)
  .forEach(function (key) {
    var spec = mockSpec[key];
    if (isString(spec)) {
      mocks[key] = createStubReactClass(key);
      return;
    }

    if (!hasModules(spec) && isNotReactClass(spec)) {
      mocks[key] = spec.mock || sinon.stub();
      return;
    }
    else if (!hasModules(spec)) {
      mocks[key] = spec.m
    }

    mocks[key] = require(spec.require) || {};
    Object.keys(spec.modules)
    .forEach(function (moduleKey) {
      if (spec.modules[moduleKey]) {
        mocks[key][moduleKey] = createStubReactClass(moduleKey);
      }
    });
  })
  return mocks;
}

function requireComponent(mixed) {
  var requirePath = mixed.spec.require;
  var Component = require(path.join(process.cwd(), requirePath));
  var Wrapper = mixed.spec.ComponentWrapper;
  if (!Wrapper) {
    return Component;
  }
  return Wrapper(Component);
}

module.exports = {
  createMocks: createMocks,
  registerMocks: registerMocks
}
