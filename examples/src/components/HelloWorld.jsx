var React = require('react');

module.exports = React.createClass({

  displayName: 'HelloWorld',

  getDefaultProps: function () {
    return {
      onClick: Function.prototype,
      name: ''
    };
  },

  getNameString: function () {
    return this.props.name ? this.props.name : 'No Name';
  },

  render: function () {
    var nameString = this.getNameString();

    return (
      <div className='helloWorld'
        onClick={this.props.onClick}>
        Hello World!! My name is {nameString}
      </div>
    );
  }
});
