describe('@registerMocks', function () {
  var MochaMix = require('../');
  var expect = require('expect');
  var mockery = require('mockery');

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

    var mocks = MochaMix.createMocks(spec);
    MochaMix.registerMocks(spec, mocks);

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

    var mocks = MochaMix.createMocks(spec);
    MochaMix.registerMocks(spec, mocks);

    var Router = require('react-router');
    var Link = Router.Link;

    expect(Link).toBe(mocks.Router.Link);
    expect(Router.Navigation).toExist();
    expect(typeof Router.Navigation.goBack).toBe('function');
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
    var mocks = MochaMix.createMocks(spec);
    MochaMix.registerMocks(spec, mocks);
    expect(mocks.expect).toBe(Stub);
  });
});
