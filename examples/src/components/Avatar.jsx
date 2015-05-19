var React = require('react');
var ProfilePic = require('./ProfilePic');
var ProfileLink = require('./ProfileLink');

var Avatar = React.createClass({
  displayName: 'Avatar',

  render: function() {
    return (
      <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
      </div>
    );
  }
});

module.exports = Avatar;
