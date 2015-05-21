require('./lib/prepare-dom');
var MochaMix = require('./lib/mocha-mix');
var helpers = require('./lib/helpers');
var compilers = require('./lib/compilers');
var assert = require('./lib/assert');
var contexts = require('./lib/contexts');
var TestUtils = require('react/addons').addons.TestUtils;

module.exports = {
  createMocks: MochaMix.createMocks,
  registerMocks: MochaMix.registerMocks,
  sandbox: MochaMix.sandbox,
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
  enableJSXFiles: compilers.enableJSXFiles,
  stubContexts: contexts,

  // TestUtils alias
  Simulate: TestUtils.Simulate,
  renderIntoDocument: TestUtils.renderIntoDocument,
  mockComponent: TestUtils.mockComponent,
  isElement: TestUtils.isElement,
  isElementOfType: TestUtils.isElementOfType,
  isDOMComponent: TestUtils.isDOMComponent,
  isCompositeComponent: TestUtils.isCompositeComponent,
  isCompositeComponentWithType: TestUtils.isCompositeComponentWithType,
  findAllInRenderedTree: TestUtils.findAllInRenderedTree,
  scryRenderedDOMComponentsWithClass: TestUtils.scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass: TestUtils.findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithTag: TestUtils.scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag: TestUtils.findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType: TestUtils.scryRenderedComponentsWithType,
  findRenderedComponentWithType: TestUtils.findRenderedComponentWithType
};
