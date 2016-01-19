import React from 'react';

class SingleComponent extends React.Component {
  render() {
    return (
      <div>I am single component</div>
    )
  }
}

SingleComponent.defaultProps = {
  name: 'SingleSingle'
};

export default SingleComponent;
