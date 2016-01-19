var isFunction = require('lodash.isfunction');

function MixPlugin(plugin) {
  if (!isFunction(plugin)) {
    throw new Error('MixPlugin is expecting a function as its argument');
  }

  return plugin;
}

module.exports = MixPlugin;
