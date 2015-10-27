var React = require('react');
var mockery = require('mockery');
var TestUtils = React.addons.TestUtils;

function render(element) {
  return TestUtils.renderIntoDocument(element);
}

/**
 * renderComponent renders the given Component with the given props and
 * the given children
 *
 * @method renderComponent
 * @param {ReactComponent}  Component
 * @param {Object}          props
 * @param {ReactElement}
 */
function renderComponent() {
  var element = React.createElement.apply(React, arguments);
  return render(element);
}

/**
 * render Component from MochaMix instance
 *
 * @param {MochaMix} mixed  a Object returned from MochaMix
 * @param {Object} props [description]
 */
function renderMixedComponent(mixed, props) {
  var Component = mixed.requireComponent();
  var rendered = renderComponent(Component, props);
  mixed._rendered = rendered;
  return TestUtils.findRenderedComponentWithType(rendered, mixed._Component);
}

/**
 * enableMockery enables mockery with default options
 *
 * @method  enableMockery
 */
function enableMockery() {
  // Despite all of options are discouraged by the official mockery
  // documentation, following options will supress unwanted warning
  // messages
  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  // Hacking mockery to use already cached react.
  // despite of useCleanCache react instance will be always the same instance
  mockery.registerMock('react', React);
}

/**
 * disableMockery
 *
 * @method  disableMockery
 */
function disableMockery() {
  mockery.deregisterAll();
  mockery.disable();
}

/**
 * Wraps component in a context creating component
 *
 * @method withContext
 * @param {ReactComponent} Component class
 * @param {Object} context the context to be passed to Component
 * @return {ReactComponent} react class with context setup
 *
 * Yahoo's implementation of withContext
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 *
 **/
function withContext(Component, context) {
    var childContextTypes = {};

    // Do not use hasOwnProperty, we need all keys from the entire prototype chain
    for (var key in context) {
        childContextTypes[key] = React.PropTypes.any;
    }

    return React.createClass({
        displayName: (Component.displayName || 'Component') + ':withContext',
        childContextTypes: childContextTypes,
        getChildContext: function () {
            return context;
        },
        render: function () {
            return React.createElement(Component, this.props);
        }
    });
}

/**
 * Creates a ComponentStub
 *
 * @method stubComponent
 * @param {ReactElement|String} tag element to create
 * @param {Object} assertProps raises an error if component props don't match
 * @return {ReactComponent} ComponentStub
 *
 * Yahoo's implementation
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 *
 **/
function stubComponent(tag, children, showDataProps) {
  return React.createClass({
    displayName: tag.displayName || tag,

    componentWillMount: function () {
      if (showDataProps) {
        this.addDataProps();
      }
    },

    addDataProps: function () {
      Object.keys(this.props)
      .forEach(function (key) {
        this.props['data-' + key] = this.props[key];
      }, this);
    },

    render: function () {
      return React.createElement(tag, this.props, children);
    }
  });
}

/**
 * Simulates an event triggered on given element
 *
 * @method simulateEvent
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 * @param {Object} data to pass with the event
 *
 * * Yahoo's implementation
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 **/
function simulateEvent(element, event, data) {
  TestUtils.Simulate[event](
    React.findDOMNode(element) || element,
    data
  );
}

/**
 * Simulates an native event on given element
 *
 * @method simulateNativeEvent
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 * @param {Object} nativeData to pass with the event
 *
 * * Yahoo's implementation
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 **/
function simulateNativeEvent(element, event, nativeData) {
  TestUtils.SimulateNative[event](
    React.findDOMNode(element) || element,
    nativeData
  );
}

/**
 * Element by query selector
 *
 * @method elementQuerySelector
 * @param {ReactElement} element node where you will search
 * @param {string} query css selector
 * @return {DOMNode} the first DOM node that matches the query
 *
 * * Yahoo's implementation
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 **/
function elementQuerySelector(element, query) {
  return React.findDOMNode(element).querySelector(query);
}

/**
 * Elements by query selector
 *
 * @method elementQuerySelectorAll
 * @param {ReactElement} element node where you will search
 * @param {String} query css selector
 * @return {DOMNode} all DOM nodes that matches the query
 *
 * * Yahoo's implementation
 * @see https://github.com/yahoo/jsx-test/blob/master/lib/helper.js
 **/
function elementQuerySelectorAll(element, query) {
  return React.findDOMNode(element).querySelectorAll(query);
}

/**
 * @module helper
 */
module.exports = {
  render: render,
  renderComponent: renderComponent,
  renderMixedComponent: renderMixedComponent,
  enableMockery: enableMockery,
  disableMockery: disableMockery,
  withContext: withContext,
  stubComponent: stubComponent,
  simulateEvent: simulateEvent,
  simulateNativeEvent: simulateNativeEvent,
  elementQuerySelector: elementQuerySelector,
  elementQuerySelectorAll: elementQuerySelectorAll
};
