var PluginManager = require('./PluginManager');
var createMixer = require('./createMixer');
var createMockGenerator = require('./createMockGenerator');

function use(plugin) {
  if (typeof plugin !== 'function') {
    throw new Error('mocha-mix plugins must be a function');
  }

  plugin(PluginManager);
}

module.exports = {
  createMockGenerator: createMockGenerator,
  use: use,
  mix: createMixer
};
