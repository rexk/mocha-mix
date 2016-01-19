var isFunction = require('lodash.isfunction');

function isMochaMixHook(hook) {
  return hook && hook.__isMochaMixHook;
}

function MixHook(hook) {
  if (isMochaMixHook(hook)) {
    return hook;
  }

  if (!isFunction(hook)) {
    throw new Error('createMixHook expects a function as its argument');
  }

  function HookWrapper(mixer) {
    return hook(mixer);
  }

  HookWrapper.__isMochaMixHook = true;
  return HookWrapper;
}

module.exports = MixHook;
module.exports.isMochaMixHook = isMochaMixHook;
