import React from 'react';
import ShinyObject from '../shiny';

export default React.createClass({

  handleClick() {
    this.transitionTo('route3');
  },

  render() {
    return (
      <div>
        { ShinyObject.boom() }
      </div>
    );
  }
});
