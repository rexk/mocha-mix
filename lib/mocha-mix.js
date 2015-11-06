var MockUtils = require('./MockUtils');
var helpers = require('./helpers');
var path = require('path');
var sinon = require('sinon');
var createMix = MockUtils.createMix;
var createMocks = MockUtils.createMocks;
var registerMocks = MockUtils.registerMocks;

/**
 * MochaMix scoped sandbox for easy access
 * @type {sinon.sandbox}
 */
var sandbox = sinon.sandbox.create({
  useFakeServer: false,
  useFakeTimers: false
});

/**
 * requireComponent returns a component as if
 * one is loading with `require('path-to-component')` as specified in the mix spec
 *
 * @param {MochaMixInstance}  mixed   A object created by MochaMix.mix
 * @return {ReactComponent}
 */
function requireComponent(mixed) {
  if (mixed._isRequired) {
    return mixed._isWrapped ?
      helpers.withContext(mixed._Component, mixed.spec.context) :
      mixed._Component;
  }
  var requirePath = mixed.import;
  var Component = require(path.join(process.cwd(), requirePath));
  mixed._Component = Component;
  mixed._isRequired = true;
  var context = mixed.context;
  if (!context || typeof context !== 'object') {
    return Component;
  }
  mixed._isWrapped = true;
  return helpers.withContext(Component, context);
}

/**
 * mix creates a delicious mocha-mix instance to drink!!!
 *
 * @param  {object}     spec   layout for testing Component.
 * @return {MochaMix}          MochaMix instance with helper methods
 */
function mix(spec) {
  var mochaMix = createMix(spec);
  console.log('s', mochaMix);
  Object.assign(mochaMix, {
    requireComponent: requireComponent.bind(null, mochaMix),
    renderComponent: helpers.renderMixedComponent.bind(null, mochaMix),
    registerMocks: registerMocks.bind(null, mochaMix.spec),
    before: function () {
      helpers.enableMockery();
      registerMocks(mochaMix.spec);
    },
    after: function () {
      helpers.disableMockery();
    }
  });
  return mochaMix;
}

/**
 * @module mocha-mix
 */
module.exports = {
  createMocks: createMocks,
  registerMocks: registerMocks,
  sandbox: sandbox,
  mix: mix
};
