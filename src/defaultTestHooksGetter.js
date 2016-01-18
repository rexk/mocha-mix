function defaultTestHooksGetter() {
  return {
    before: global.before,
    beforeEach: global.beforeEach,
    afterEach: global.afterEach,
    after: global.afterEach
  };
}

module.exports = defaultTestHooksGetter;
