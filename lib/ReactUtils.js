var ReactModules = {
  React : require('react'),
  ReactDOM : require('react/addons'),
  ReactAddon : require('react/addons').addons,
  ReactTestUtils : require('react/addons').addons.TestUtils
};

var _isInitialized = false;

function get(name) {
  return ReactModules[name];
}

function use(options) {
  options = options || {};
  ReactModules = Object.assign({}, ReactModules, options);
}

function isInitialized() {
  return _isInitialized;
}

module.exports = {
  get: get,
  isInitialized: isInitialized,
  use: use
};
