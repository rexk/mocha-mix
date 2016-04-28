var expect = require('expect');
var MockDescription = require('../MockDescription');
var defaultMockGenerator = require('../defaultMockGenerator');

describe('MockDescription', function () {
  it('should throw error if import path is invalid', function () {
    var invalidImportPaths = [
      '',
      undefined,
      null,
      true,
      1,
      1.3,
      false
    ];

    invalidImportPaths.forEach(function (value) {
      expect(function () {
        var description = {
          import: value
        };
        MockDescription('testMock', description, defaultMockGenerator);
      }).toThrow();
    });
  });

  it('should return object with import path, if given description is a string', function () {
    var importPath = '../test.module';
    var mockName = 'TestModule';
    var targetPath = '/Somewhere/myfile';
    var expected = {
      mockName: mockName,
      import: importPath,
      mock: defaultMockGenerator,
      options: {
        targetPath: targetPath,
      }
    };

    var actual = MockDescription(mockName, importPath, defaultMockGenerator, expected.options);
    expect(actual).toEqual(expected);
  });

  it('should return with given mock', function () {
    var mockName = 'TestModule';
    var importPath = '../test.module';
    var expectedMock = {
      __expectedMock: true
    };
    var description = {
      import: importPath,
      mock: expectedMock
    };

    var actual = MockDescription(mockName, description, defaultMockGenerator);
    expect(actual.mock()).toEqual(expectedMock);
  });

});
