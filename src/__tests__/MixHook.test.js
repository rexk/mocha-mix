var expect = require('expect');
var MixHook = require('../MixHook');

describe('MixHook', function () {

  function EmptyHook() {}
  function EmptyHookGenerator() { return EmptyHook; }

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
        MixHook(plugin);
      }).toThrow();
    });
  });

  it('should return the same value if given argument is MixHook', function () {
    var expected = MixHook(EmptyHookGenerator);

    expect(MixHook(expected)).toBe(expected);
  });

  it('should return true is given argument is MixHook', function () {
    var plugin = MixHook(EmptyHookGenerator);
    expect(MixHook.isMochaMixHook(plugin)).toBe(true);
  });

});
