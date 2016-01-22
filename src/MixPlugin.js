var isFunction = require('lodash.isfunction');

/**
 * Validates given plugin function
 *
 * @param  {Function} plugin
 * @return {Function}
 */
function MixPlugin(plugin) {
  if (!isFunction(plugin)) {
    throw new Error('MixPlugin is expecting a function as its argument');
  }

  return plugin;
}

module.exports = MixPlugin;
