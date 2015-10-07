var isPrepared = false;
// Set browser globals,
// This file needs to required before any react component is rendered
var keys = [];

/**
 * prepareJsDom creates empty document using jsdom
 *
 * @see https://github.com/tmpvar/jsdom#how-it-works
 * @param {jsdom.Config}    options    options object for jsdom
 */
function prepareJsDom(options) {
  if (isPrepared) {
    // global.window is already declared
    // No need to run
    return;
  }
  var jsdomOptions = Object.assign({}, options);
  var jsdom = require('jsdom').jsdom;
  var document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>', options);
  var window = document.parentWindow || document.defaultView;
  global.window = window;
  for (var key in window) {
    if (key in global) {
      continue;
    }
    keys.push(key);
    global[key] = window[key];
  }
  isPrepared = true;
};

/**
 *
 * @return {[type]} [description]
 */
function tearDownJsdom() {
  keys.forEach(function (key) {
    delete globa[key];
  });

  delete global.window;
  isPrepared = false;
};

/**
 *
 * @module jsdom
 */
module.exports = {
  prepareJsDom: prepareJsDom,
  tearDownJsdom: tearDownJsdom
};
