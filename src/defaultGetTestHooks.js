function defaultGetTestHooks() {
  return {
    before: global.before,
    beforeEach: global.beforeEach,
    afterEach: global.afterEach,
    after: global.after
  };
}

module.exports = defaultGetTestHooks;
