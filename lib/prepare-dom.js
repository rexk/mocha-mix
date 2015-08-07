// Set browser globals,
// This file needs to required before any react component is rendered
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.Event = window.Event;