var isFunction = require('lodash.isfunction');

function isMochaMixMockGenerator(generator) {
  return generator && generator.__isMochaMixMockGenerator;
}

/**
 * Validates given generator function and Returns MockGenerator instance with
 * given function.
 *
 * If given function is an instance of MockGenerator, it will return the same
 * function.
 *
 * If given function is not an instance of MockGenerator, MockGenerator will
 * return an instance of MockGenerator.
 *
 * @param  {Function|MockGenerator} generator  A generator that generates mock instance.
 * @return {MockGenerator}
 */
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
