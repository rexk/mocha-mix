function defaultGetTestHooks() {
  return {
    before: global.before,
    after: global.after,
    beforeEach: global.beforeEach,
    afterEach: global.afterEach
  };
}

module.exports = defaultGetTestHooks;
