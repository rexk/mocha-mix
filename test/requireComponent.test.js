var compilers = require('../lib/compilers');
compilers.registerBabel();

describe('@requireComponent', function () {
  var MochaMix = require('../lib/mocha-mix');
  var expect = require('expect');
  var helpers = require('../lib/helpers');

  before(function () {
    helpers.enableMockery();
  });

  after(function () {
    helpers.disableMockery();
  });

  it('should return Component with mocks', function () {
    var mix = MochaMix.mix({
      require: './examples/src/components/Avatar',

      mocks: {
        ProfilePic: './ProfilePic',

        ProfileLink: './ProfileLink'
      }
    });

    var Avatar = mix.requireComponent();
    expect(Avatar.displayName).toContain('Avatar');
    expect(mix.mocks.ProfilePic).toExist();
    expect(mix.mocks.ProfileLink).toExist();
  });

});
