var isFunction = require('lodash.isfunction');

function MixPlugin(plugin) {
  if (!isFunction(plugin)) {
    throw new Error('MixPlugin is expecting a function as its argument');
  }

  if (isMochaMixPlugin(plugin)) {
    return plugin;
  }

  function PluginWrapper(mochaMix) {
    return plugin(mochaMix);
  }

  PluginWrapper.__isMochaMixPlugin = true;

  return PluginWrapper;
}

module.exports = MixPlugin;
