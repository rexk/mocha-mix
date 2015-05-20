var compilers = require('../lib/compilers');
compilers.registerBabel();

describe('@requireComponent', function () {
  var MochaMix = require('../index.js');
  var TestUtils = require('react/addons').addons.TestUtils;
  var expect = require('expect');
  var sinon = require('sinon');
  var helpers = require('../lib/helpers');

  describe('Avatar', function () {
    var mix = MochaMix.mix({
      require: './examples/src/components/Avatar',
      mocks: {
        ProfilePic: './ProfilePic',
        ProfileLink: './ProfileLink'
      }
    });

    before(function () {
      helpers.enableMockery();
      mix.registerMocks();
    });

    after(function () {
      helpers.disableMockery();
    });

    it('should return Component with mocks', function () {
      var Avatar = mix.requireComponent();
      expect(Avatar.displayName).toContain('Avatar');
      expect(mix.mocks.ProfilePic).toExist();
      expect(mix.mocks.ProfileLink).toExist();
    });

    it('should render Component with proper mocks and props', function () {
      var Avatar = mix.requireComponent();
      var avatar = helpers.renderComponent(Avatar, { username: 'rexk' });
      var ProfileLink = mix.mocks.ProfileLink;
      var profileLink = TestUtils.findRenderedComponentWithType(avatar, ProfileLink);
      var username = profileLink.props.username;
      expect(username).toBe('rexk');
    });
  });

  describe('HelloWorld', function () {
    var mix = MochaMix.mix({
      require: './examples/src/components/HelloWorld'
    });

    before(function () {
      helpers.enableMockery();
      mix.registerMocks();
    });

    after(function () {
      helpers.disableMockery();
    });

    it('should return Component', function () {
      var HelloWorld = mix.requireComponent();
      expect(HelloWorld.displayName).toContain('HelloWorld');
    });

    it('should return "No Name"', function () {
      var helloWorld = mix.renderComponent();
      var actual = helloWorld.getNameString();
      expect(actual).toBe('No Name');
    });

    it('should call props.onClick', function () {
      var onClick = sinon.spy();
      var helloWorld = mix.renderComponent({
        onClick: onClick
      });
      MochaMix.simulateEvent(helloWorld, 'click');
      expect(onClick.calledOnce).toBe(true);
    });
  });
});
