/**
 * Returns mocha specific test hooks register.
 *
 * @return {TestHooks}
 */
function defaultTestHooksGetter() {
  return {
    before: global.before,
    beforeEach: global.beforeEach,
    afterEach: global.afterEach,
    after: global.after
  };
}

module.exports = defaultTestHooksGetter;
