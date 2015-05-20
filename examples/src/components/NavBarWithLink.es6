import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  displayName: 'NavWithLink',

  render() {
    return (
      <div>
        <Link to='route3'>To Route 3</Link>
      </div>
    );
  }
});
