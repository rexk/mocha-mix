import React from 'react';
import { Navigation } from 'react-router';

export default React.createClass({
  mixins: [ Navigation ],

  handleClick() {
    this.transitionTo('route3');
  },

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>To Route 3</button>
      </div>
    );
  }
});
