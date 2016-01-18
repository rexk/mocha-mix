var isFunction = require('lodash.isfunction');

function isMochaMixPlugin(plugin) {
  return plugin && plugin.__isMochaMixPlugin;
}

function MixPlugin(plugin) {
  if (isMochaMixPlugin(plugin)) {
    return plugin;
  }

  if (!isFunction(plugin)) {
    throw new Error('MixPlugin is expecting a function as its argument');
  }

  function PluginWrapper(mochaMix) {
    return plugin(mochaMix);
  }

  PluginWrapper.__isMochaMixPlugin = true;

  return PluginWrapper;
}

module.exports = MixPlugin;
module.exports.isMochaMixPlugin = isMochaMixPlugin;
