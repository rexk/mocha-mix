describe('Avatar', function () {
  var MochaMix = require('../../');
  MochaMix.registerBabel();
  var expect = require('expect');
  var mix = MochaMix.mix({

    require: './examples/src/components/Avatar',

    mocks: {
      ProfilePic: './ProfilePic',
      ProfileLink: '.ProfileLink'
    }
  });

  before(mix.before);
  after(mix.after);

  it('should pass username to ProfileLink', function () {
    var expected = 'Rex Kim';
    var avatar = mix.renderComponent({ username: expected });
    var ProfilePic = mix.mocks.ProfilePic;
    var profilePic = MochaMix.findRenderedComponentWithType(avatar, ProfilePic);
    expect(profilePic.props.username).toBe(expected);
  });
});
