/**
 * registerBabel enables babel compiler
 *
 * use .babelrc for options
 * @method registerBabel
 *
 * @param {object}             options
 * @param {babel/register}     babelRegister
 */
function registerBabel(options, babelRegister) {
  babelRegister = babelRegister || require('babel-core/register');
  babelRegister(options);
}

/**
 * disableStyles disables server-side require for style
 * files with following extensions:
 *  less, css, sass
 *
 * This method is useful, if one is trying to test webpack bundles
 * using mocha at the server-side.
 *
 * This method must be called after @registerBabel or @enableJSXFiles
 * due to behaviour of require extension order
 *
 * @method disableStyles
 */

function disableStyles() {
  require.extensions = require.extensions || {};
  require.extensions['.less'] = Function.prototype;
  require.extensions['.css'] = Function.prototype;
  require.extensions['.sass'] = Function.prototype;
}

/**
 * disableRawFiles disables server-side require for raw
 * files with following extensions:
 *   svg, png, jpeg, jpg, gif
 *
 * This method is useful, if one is trying to test webpack bundles
 * using mocha at the server-side.
 *
 * This method must be called after @registerBabel or @enableJSXFiles
 * due to behaviour of require extension order
 *
 * @method disableRawFiles
 */
function disableRawFiles() {
  require.extensions = require.extensions || {};
  require.extensions['.svg'] = Function.prototype;
  require.extensions['.png'] = Function.prototype;
  require.extensions['.jpeg'] = Function.prototype;
  require.extensions['.jpg'] = Function.prototype;
  require.extensions['.gif'] = Function.prototype;
}

/**
 * @module compilers
 */
module.exports = {
  registerBabel: registerBabel,
  disableStyles: disableStyles,
  disableRawFiles: disableRawFiles
};
