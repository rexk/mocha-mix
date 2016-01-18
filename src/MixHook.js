var isFunction = require('lodash.isfunction');

function isMochaMixHook(hook) {
  return hook && hook.__isMochaMixHook;
}

function MixHook(hook) {
  if (!isFunction(hook)) {
    throw new Error('createMixHook expects a function as its argument');
  }

  if (isMochaMixHook(hook)) {
    return hook;
  }

  function HookWrapper(options) {
    return hook(options);
  }

  HookWrapper.__isMochaMixHook = true;
  return HookWrapper;
}

module.exports = MixHook;
