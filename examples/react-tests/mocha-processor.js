var babelRegister = require('babel-register');
var MochaMix = require('mocha-mix');
var ReactPlugin = require('mocha-mix-react');
var JsdomPlugin = require('mocha-mix-jsdom');
var MockeryPlugin = require('mocha-mix-mockery');

babelRegister();

MochaMix.use(JsdomPlugin());
MochaMix.use(ReactPlugin);

// Makee sure
// requir('react') and require('react-dom') is called after JsdomPlugin is invoked.
MochaMix.use(MockeryPlugin({
  unmockedModules: [{
    import: 'react',
    mock: require('react')
  }, {
    import: 'react-dom',
    mock: require('react-dom')
  }]
}));
