var path = require('path');
var expect = require('expect');
var compilers = require('../lib/compilers');
var disableStyles = compilers.disableStyles;

describe('@disableStyles', function () {
  var extensions = ['.less', '.css', '.sass'];
  before(function () {
    disableStyles();
  });

  after(function (){
    extensions.forEach(function (extension) {
      delete require.extensions[extension];
    });
  });

  extensions.forEach(function (extension) {
    var requirePath = path.join(__dirname, '../examples/assets/styles/sample' + extension);
    it('should not throw exception for ' + extension, function () {
      expect(function () {
        require(requirePath)
      }).toNotThrow();
    });
  });
});
