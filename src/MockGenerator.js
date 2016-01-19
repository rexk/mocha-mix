var isFunction = require('lodash.isfunction');

function isMochaMixMockGenerator(generator) {
  return generator && generator.__isMochaMixMockGenerator;
}

function MockGenerator(generator) {
  if (isMochaMixMockGenerator(generator)) {
    return generator;
  }

  if (!isFunction(generator)) {
    throw new Error('MockGenerator expects a function as its argument');
  }

  function MockGeneratorWrapper(options) {
    return generator(options);
  }

  MockGeneratorWrapper.__isMochaMixMockGenerator = true;
  return MockGeneratorWrapper;
}

module.exports = MockGenerator;
module.exports.isMochaMixMockGenerator = isMochaMixMockGenerator;
