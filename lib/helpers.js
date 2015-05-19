var React = require('react/addons');
var mockery = require('mockery');
var TestUtils = React.addons.TestUtils;

function render() {
  var element = React.createElement.apply(React, arguments);
  return TestUtils.renderIntoDocument(element);
}

function renderComponent(props) {
  var Component = this._Component;
  var element = React.createElement(Component, props);
  return TestUtils.renderIntoDocument(element);
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
}

/**
 * disableMockery
 *
 * @method  disableMockery
 */
function disableMockery() {
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
            showDataProps && this.addDataProps();
        },

        addDataProps: function () {
            Object.keys(this.props).forEach(function (key) {
                this.props['data-' + key] = this.props[key]
            }, this);
        },

        render: function () {
            return React.createElement(tag, this.props, children);
        }
    });
}

/**
 * @module helper
 */
module.exports = {
  render: render,
  renderComponent: renderComponent,
  enableMockery: enableMockery,
  disableMockery: disableMockery,
  withContext: withContext,
  stubComponent: stubComponent
};
