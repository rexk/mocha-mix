// Set browser globals, needs to happen before react is required
// You must require jsxTest before any React stuff
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
global.Event = window.Event;
