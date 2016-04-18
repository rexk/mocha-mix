var path = require('path');
var REGEX_IS_RELATIVE = /^\./i;

function getModulePath(importPath, rootDir) {
  if (REGEX_IS_RELATIVE.test(importPath)) {
    return path.join(rootDir, importPath);
  }

  // must be npm module name such as 'react', 'react/lib/...'
  // or must be absolute path
  return importPath;
}

module.exports = getModulePath;
