import React from 'react';
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
  beforeEach(function () {
    Avatar = mix.import();
  });

  it('should pass username to ProfileLink and ProfilePic', function () {
    const username = 'rexk';
    const {ProfileLink, ProfilePic} = mix.mocks;
    let avatar = renderIntoDocument(<Avatar username={username} />);
    let profileLink = findRenderedComponentWithType(avatar, ProfileLink);
    let profilePic = findRenderedComponentWithType(avatar, ProfilePic);
    expect(profileLink.props.username).toBe(username);
    expect(profilePic.props.username).toBe(username);
  });

  it('should trigger onClick', function () {
    const username = 'rexk';
    const onClickSpy = expect.createSpy();
    const {ProfilePic} = mix.mocks;
    let avatar = renderIntoDocument(
      <Avatar
        username={username}
        onClick={onClickSpy} />
    );
    let profilePic = findRenderedComponentWithType(avatar, ProfilePic);
    // triger onClick from profilePic
    profilePic.props.onClick();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
