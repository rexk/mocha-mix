function isMochaMixMockGenerator(generator) {
  return generator && generator.__isMochaMixMockGenerator;
}

function createMockGenerator(fn) {
  if (typeof fn !== 'function') {
    throw new Error('createMockGenerator expects a function as its argument');
  }

  if (isMochaMixMockGenerator(fn)) {
    return fn;
  }

  function MockGenerator(options) {
    return fn(options);
  }

  MockGenerator.__isMochaMixMockGenerator = true;

  return MockGenerator;
}

module.exports = createMockGenerator;
