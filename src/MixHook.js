var isFunction = require('lodash.isfunction');

function isMochaMixHook(hook) {
  return hook && hook.__isMochaMixHook;
}

/**
 * Returns a given hook with MixHookWrapper to expose mixer instance, for the
 * given functio
 *
 * It is useful for those who wants to add extra behaviour per each test suite,
 * or test cases.
 *
 * @see https://github.com/rexk/mocha-mix-mockery
 *
 * @param  {Function} hook   a funciton to be wrapped by a MixHook warpper.
 * @return {MixHook}
 */
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
