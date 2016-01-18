var babelRegister = require('babel-register');
var React = require('react');
var ReactDOM = require('react-dom');
var MochaMix = require('mocha-mix');
var ReactPlugin = require('mocha-mix-react');
var JsdomPlugin = require('mocha-mix-jsdom');
var MockeryPlugin = require('mocha-mix-mockery');

babelRegister();

MochaMix.use(MockeryPlugin({
  ignoreList: [{
    import: 'react',
    mock: React
  }, {
    import: 'react-dom',
    mock: ReactDOM
  }]
}));

MochaMix.use(JsdomPlugin);
MochaMix.use(ReactPlugin);
