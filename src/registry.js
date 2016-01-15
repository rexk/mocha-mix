var defaultMockGenerator = require('./defaultMockGenerator');
var defaultGetTestHooks = require('./defaultGetTestHooks');

var registry = {};

function backToDefaults() {
  registry = {
    defaultMockGenerator: defaultMockGenerator,
    getTestHooks: defaultGetTestHooks
  };
}

function get(name) {
  return registry[name];
}

function set(name, value) {
  registry[name] = value;
}

function clear() {
  registry = {};
}

backToDefaults();

module.exports = {
  get: get,
  set: set,
  clear: clear,
  backToDefaults: backToDefaults
};
