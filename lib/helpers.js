var React = require('react/addons');
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

module.exports = {
  render: render,
  renderComponent: renderComponent
};
