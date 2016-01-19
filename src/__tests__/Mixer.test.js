var MochaMix = require('../MochaMix');
var Mxier = require('../Mixer');
var expect = require('expect');
var sinon = require('sinon');

describe('Mixer', function () {
  var mochaMix = MochaMix();
  var mixer = mochaMix.mix({
    rootDir: __dirname,
    import: './ES6ModuleMock'
  });

  it('should import a module', function () {
    var defaultImport = mixer.import();
    var actual = defaultImport();
    expect(actual).toBe('I am default');
  });

  it('should "require" a module', function () {
    var commonJSModule = mixer.require();
    var expected = ['namedExport1', 'namedExport2', 'default'].sort();
    var actual = Object.keys(commonJSModule).sort();
    expect(actual).toEqual(expected);
  });

  it('should import a module as wildCard', function () {
    var commonJSModule = mixer.require();
    var expected = ['namedExport1', 'namedExport2', 'default'].sort();
    var actual = Object.keys(commonJSModule).sort();
    expect(actual).toEqual(expected);
  });

  it('should registerMock', function () {
    var TestMock = function () {
      return 'testmock';
    };

    mixer.registerMock('TestMock', TestMock);
    expect(mixer.mocks.TestMock).toBe(TestMock);
  });

  it('should clearMock', function () {
    var TestMock1 = function () {
      return 'testmock1';
    };

    var TestMock2 = function () {
      return 'testmock2';
    };

    mixer.registerMock('TestMock1', TestMock1);
    mixer.registerMock('TestMock2', TestMock2);
    mixer.clearMock('TestMock2');
    expect(mixer.mocks.TestMock1).toBe(TestMock1);
    expect(mixer.mocks.TestMock2).toBe(undefined);
  });

  it('should clearAllMocks', function () {
    var TestMock1 = function () {
      return 'testmock1';
    };

    var TestMock2 = function () {
      return 'testmock2';
    };

    mixer.registerMock('TestMock1', TestMock1);
    mixer.registerMock('TestMock2', TestMock2);
    mixer.clearAllMocks();
    expect(mixer.mocks.TestMock1).toBe(undefined);
    expect(mixer.mocks.TestMock2).toBe(undefined);
  });
});
