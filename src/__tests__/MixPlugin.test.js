var expect = require('expect');
var MixPlugin = require('../MixPlugin');

describe('MixPlugin', function () {

  function EmptyPluginGenerator() {}

  it('should throw error if given argument is not a function', function () {
    var nonFunctionalValues = [
      undefined,
      null,
      1,
      'string test',
      1.24,
      true,
      false
    ];

    nonFunctionalValues.forEach(function testValue(plugin) {
      expect(function monitor() {
        MixPlugin(plugin);
      }).toThrow();
    });
  });

  it('should return the same value if given argument is MochaMixPlugin', function () {
    var expected = MixPlugin(EmptyPluginGenerator);

    expect(MixPlugin(expected)).toBe(expected);
  });
});
