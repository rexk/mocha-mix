describe('@registerMocks', function () {
  var expect = require('expect');
  var mockery = require('mockery');
  var MockUtils = require('../lib/MockUtils');
  var mapMocks = MockUtils.mapMocks;

  beforeEach(function () {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  afterEach(function () {
    mockery.disable();
  });


  it('should register the react stub component as mock', function () {
    var spec = {
      ProfileLink: './ProfileLink'
    };

    var mocks = MockUtils.createNormalizedSpec(spec);
    MockUtils.registerMocks(mocks);
    mocks = mapMocks(mocks);
    var ProfileLink = require('./ProfileLink');
    expect(ProfileLink).toBe(mocks.ProfileLink);
  });

  it('should register react-router.Link as React stub', function () {
    var spec = {
      Router: {
        require: 'react-router',

        modules: {
          Link: true
        }
      }
    };

    var mocks = MockUtils.createNormalizedSpec(spec);
    MockUtils.registerMocks(mocks);
    mocks = mapMocks(mocks);

    var Router = require('react-router');
    var Link = Router.Link;

    expect(Link).toBe(mocks.Router.Link);
  });

  it('should register non react mock', function () {
    var Stub = {
      name: 'I am mock'
    };

    var spec = {
      expect: {
        require: 'expect',
        react: false,
        mock: Stub
      }
    };
    var mocks = MockUtils.createNormalizedSpec(spec);
    MockUtils.registerMocks(mocks);
    mocks = mapMocks(mocks);

    expect(mocks.expect).toBe(Stub);
  });
});
