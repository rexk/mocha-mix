var registry = require('./registry');
var createMixHook = require('./createMixHook');
var createMockGenerator = require('./createMockGenerator');

function setDefaultMock(mock) {
  var generator = createMockGenerator(function () {
    return mock
  });

  registry.set('defaultMockGenerator', generator);
}

function setTestHookGetter(getter) {
  if (typeof getter !== 'function') {
    throw new Error('setTestHookGetter is expecting function as its argument');
  }

  registry.set('getTestGetter', getter);
}

function addTestHook(hookName, fn) {
  var hook = createMixHook(function () {
    return fn;
  });
  var hookList = registry.get(hookName) || [];
  hookList.push(hook);
  registry.set(hookName, hookList);
}

function before(fn) {
  addTestHook('before', fn);
}

function after(fn) {
  addTestHook('after', fn);
}

function beforeEach(fn) {
  addTestHook('beforeEach', fn);
}

function afterEach(fn) {
  addTestHook('afterEach', fn);
}


module.exports = {
  after: after,
  afterEach: afterEach,
  before: before,
  beforeEach: beforeEach,
  createMixHook: createMixHook,
  createMockGenerator: createMockGenerator,
  setDefaultMock: setDefaultMock,
  setTestHookGetter: setTestHookGetter
};
