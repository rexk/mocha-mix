var ReactModules = {
  React : require('react'),
  ReactDOM : require('react/addons'),
  ReactAddon : require('react/addons').addons,
  TestUtils : require('react/addons').addons.TestUtils
};

module.exports.use = function (options) {
  options = options || {};
  ReactModules = Object.assign({}, ReactModules, options);
};

module.exports.get = function (name) {
  return ReactModules[name];
};
