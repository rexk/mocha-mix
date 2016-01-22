import React from 'react';
import MochaMix from 'mocha-mix';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

describe('SingleComponent', function () {
  const mix = MochaMix.mix({
    rootDir: __dirname,
    import: '../SingleComponent'
  });
  it('should have defaultProps assigned', function (done) {
    const SingleComponent = mix.import();
    let singleComponent = TestUtils.renderIntoDocument(<SingleComponent />);
    expect(singleComponent.props.name).toEqual('SingleSingle');
    done();
  });
});
