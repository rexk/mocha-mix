require('./prepare-dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var path = require('path');
var sinon = require('sinon');
var mockery = require('mockery');

function isString(value) {
  return typeof value === 'string';
}

function isNotReactClass(value) {
  return value.react === false;
}

function hasModules(value) {
  return value.require && value.modules;
}

function createStubReactClass(name) {
  return React.createClass({
    displayName: (name || '') + ' stub',
    render: function () {
      return React.createElement('div');
    }
  })
}

function registerMocks(mockSpec, mocks) {
  Object.keys(mockSpec)
  .forEach(function (key) {
    var spec = mockSpec[key];
    if (isString(spec)) {
      mockery.registerMock(key, mocks[key]);
      return;
    }

    mockery.registerMock(spec.require, mocks[key]);
  });
}

function createMocks(mockSpec, mocks) {
  Object.keys(mockSpec)
  .forEach(function (key) {
    var spec = mockSpec[key];
    if (isString(spec)) {
      mocks[key] = createStubReactClass(key);
    }

    if (!hasModules(spec) && isNotReactClass(value)) {
      mocks[key] = spec.mock || sinon.stub();
    }

    mocks[key] = require(spec.require) || {};
    Object.keys(spec.modules)
    .forEach(function (moduleKey) {
      if (spec.modules[moduleKey]) {
        mocks[key][moduleKey] = createStubReactClass(moduleKey);
      }
    });
  })
}
