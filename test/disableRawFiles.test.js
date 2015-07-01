var path = require('path');
var expect = require('expect');
var compilers = require('../lib/compilers');
var disableRawFiles = compilers.disableRawFiles;

describe('@disableRawFiles', function () {
  var extensions = ['.svg', '.png', '.jpeg', '.jpg', '.gif'];
  before(function () {
    disableRawFiles();
  });

  after(function (){
    extensions.forEach(function (extension) {
      delete require.extensions[extension];
    });
  });

  extensions.forEach(function (extension) {
    var requirePath = path.join(__dirname, '../examples/assets/images/sample' + extension);
    it('should not throw exception for ' + extension, function () {
      expect(function () {
        require(requirePath)
      }).toNotThrow();
    });
  });
});
