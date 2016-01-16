function isMochaMixHook(hook) {
  return hook && hook.__isMochaMixHook;
}

function createMixHook(fn) {
  if (typeof fn !== 'function') {
    throw new Error('createMixHook expects a function as its argument');
  }

  if (isMochaMixHook(fn)) {
    return fn;
  }

  function MixHook(options) {
    return fn(options);
  }

  MixHook.__isMochaMixHook = true;
  return MixHook;
}

module.exports = createMixHook;
