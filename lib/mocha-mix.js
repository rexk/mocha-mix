require('./prepare-dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var path = require('path');
var sinon = require('sinon');
var mockery = require('mockery');

function createStubReactClass(name) {
  return React.createClass({
    displayName: (name || '') + ' stub',
    render: function () {
      return React.createElement('div');
    }
  })
}

function createReactMock(instance, key, requirePath) {
  var stub = instance.reactMocks[key] = createStubReactClass(key);
  mockery.registerMock(requirePath, stub);
}

function registerReactMocks(instance) {
  var spec = instance.spec;
  var reactMocks = spec.reactMocks;
  Object.keys(reactMocks)
  .forEach(function (key) {
    var reactMock = reactMocks[key];
    if (typeof reactMock === 'string') {
      createReactMock(instance, key, requireMock);
    }
    // TODO make it recursive so that it will trace inner modules recursively
    else if (typeof reactMock === 'object' && !reactMock.modules) {
      createReactMock(instance, key, reactMocks.require);
    }
    else if (typeof reactMock.=== 'object' && reactMock.modules) {
      var requirePath = reactMock.require;
      requireMock.modules.forEach(function (moduleName) {
        instance.reactMocks[key][moduleName] = createStubReactClass(moduleName);
      });
      mockery.registerMock(requirePath, instance.reactMocks[key]);
    }
  });
};

function registerMocks(instance) {
  // TODO
}

function createMix(spec) {
  var reactMocks = createReactMocks(spec.reactMocks);
  var mocks = createMocks(spec.mocks);

  var mochaMix = {
    spec: spec,
    reactMocks: {},
    mocks: {},
    after: after.bind(mochaMix),
    before: before.bind(mochaMix),
    requireComponent: requireComponent.bind(mochaMix),
    registerReactMocks: registerReactMocks.bind(mochaMix),
    registerMocks: registerMocks.bind(registerMocks)
  };

  return mochaMix;
};

function requireComponent(instance) {
  var spec = instance.spec;
  var Wrapper = spec._Wrapper;
  var rPath = path.join(process.cwd(), spec.require);
  var Component = require(rPath);
  return Wrapper(Component);
},

function after(instance) {
  mockery.deregisterAll();
  mockery.disable();
}

function before(instance) {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  });
  instance.registerReactMocks();
  instance.registerMocks();
}

module.exports = {
  mix: createMix
}
