var React = require('react');
var RouterStub = require('../stubs/RouterStub');

module.exports = function (Component) {

  return React.createClass({

    displayName: (Component.displayName || 'Component') + ':withContext(ReactRouter)',

    childContextTypes: {
      router: React.PropTypes.func
    },

    getChildContext: function () {
      return {
        router: new RouterStub()
      };
    },

    render: function () {
      return React.createElement(Component, React.__spread({}, this.props));
    }

  });
};
