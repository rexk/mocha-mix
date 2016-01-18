import React from 'react';
import ReactDOM from 'react-dom';
import MochaMix from 'mocha-mix';
import expect from 'expect';
import {
  findRenderedComponentWithType,
  renderIntoDocument
} from 'react-addons-test-utils';

describe.only('Avatar', function () {
  const mix = MochaMix.mix({
    rootDir: __dirname,
    import: '../Avatar',
    mocks: {
      ProfileLink: './ProfileLink',
      ProfilePic: './ProfilePic'
    }
  });
  let Avatar;
  this.timeout(10000);
  beforeEach(function (done) {
    console.log('import');
    let before = Date.now();
    Avatar = mix.import();
    console.log('after', Date.now() - before + 'ms');
    done();
  })

  it('should pass username to ProfileLink and ProfilePic', () => {
    const username = 'rexk';
    const {ProfileLink, ProfilePic} = mix.mocks;
    let before = Date.now();
    console.log('renderIntoDocs');
    let avatar = renderIntoDocument(<Avatar username={username} />);
    console.log('took: ', before - Date.now() + 'ms');
    let profileLink = findRenderedComponentWithType(avatar, ProfileLink);
    let profilePic = findRenderedComponentWithType(avatar, ProfilePic);
    expect(profileLink.props.username).toBe(username);
    expect(profilePic.props.username).toBe(username);
  });

  it('should insert into dom', function () {
    const username = 'rexk';
    const {ProfileLink, ProfilePic} = mix.mocks;
    console.log('mocks', mix.mocks);
    let now = Date.now();
    console.log('start');
    const mountNode = document.createElement('DIV');
    document.body.appendChild(mountNode);
    let avatar = ReactDOM.render(<Avatar username={username} />, mountNode);
    console.log('end', Date.now() - now + 'ms');
    let profileLink = findRenderedComponentWithType(avatar, ProfileLink);
    let profilePic = findRenderedComponentWithType(avatar, ProfilePic);
    expect(profileLink.props.username).toBe(username);
    expect(profilePic.props.username).toBe(username);
  });
});
