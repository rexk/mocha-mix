require('./lib/prepare-dom');
var MochaMix = require('./lib/mocha-mix');
var helpers = require('./lib/helpers');
var compilers = require('./lib/compilers');
var assert = require('./lib/assert');

module.exports = {
  createMocks: MochaMix.createMocks,
  registerMocks: MochaMix.registerMocks,
  mix: MochaMix.mix,
  render: helpers.render,
  renderComponent: helpers.renderComponent,
  enableMockery: helpers.enableMockery,
  disableMockery: helpers.disableMockery,
  withContext: helpers.withContext,
  stubComponent: helpers.stubComponent,
  simulateEvent: helpers.simulateEvent,
  simulateNativeEvent: helpers.simulateNativeEvent,
  elementQuerySelector: helpers.elementQuerySelector,
  elementQuerySelectorAll: helpers.elementQuerySelectorAll,
  assertRender: assert.renderMatch,
  assertNotRender: assert.renderNotMatch,
  registerBabel: compilers.registerBabel,
  disableStyles: compilers.disableStyles,
  disableRawFiles: compilers.disableRawFiles,
  enableJSXFiles: compilers.enableJSXFiles
};
