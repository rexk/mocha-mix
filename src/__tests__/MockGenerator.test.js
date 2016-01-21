var expect = require('expect');
var MockGenerator = require('../MockGenerator');

describe('MockGenerator', function () {

  function EmptyMock() {}
  function EmptyMockGenerator() { return EmptyMock; }

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
        MockGenerator(plugin);
      }).toThrow();
    });
  });

  it('should return the same value if given argument is MockGenerator', function () {
    var expected = MockGenerator(EmptyMockGenerator);

    expect(MockGenerator(expected)).toBe(expected);
  });

  it('should return true is given argument is MockGenerator', function () {
    var plugin = MockGenerator(EmptyMockGenerator);
    expect(MockGenerator.isMochaMixMockGenerator(plugin)).toBe(true);
  });

});
