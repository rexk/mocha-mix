import React from 'react';
import ProfilePic from './ProfilePic';
import ProfileLink from './ProfileLink';

class Avatar extends React.Component {
  render() {
    return (
      <div>
        <ProfilePic username={this.props.username} onClick={this.props.onClick}/>
        <ProfileLink username={this.props.username} />
      </div>
    );
  }
}

Avatar.propTypes = {
  username: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Avatar.defaultProps = {
  onClick: Function.prototype
};

export default Avatar;
