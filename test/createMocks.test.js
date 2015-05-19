describe('@createMocks', function () {
  var MochaMix = require('../lib/mocha-mix');
  var expect = require('expect');
  var mockSpec = {
    ProfileLink: './ProfileLink',

    Router: {
      require: 'react-router',

      modules: {
        Link: true,

        Navigation: false
      }
    },

    Lodash: {
      require: 'lodash',
      react: false
    }
  };

  it('should return react stub for the string value', function () {
    var spec = {
      ProfileLink: './ProfileLink'
    };

    var mocks = MochaMix.createMocks(spec);
    expect(mocks.ProfileLink).toExist();
    expect(mocks.ProfileLink.displayName).toBe('ProfileLink stub');
  });

  it('should return react stub for the spec object', function () {
    var spec = {
      ProfileLink: {
        require: './ProfileLink'
      }
    };

    var mocks = MochaMix.createMocks(spec);
    expect(mocks.ProfileLink).toExist();
    expect(mocks.ProfileLink.displayName).toBe('ProfileLink stub');
  });

  it('should return custom mock', function () {
    var Stub = {
      name: 'hello'
    };

    var spec = {
      Lodash: {
        require: 'lodash',
        react: false,
        mock: Stub
      }
    };

    var mocks = MochaMix.createMocks(spec);
    expect(mocks.Lodash.name).toBe(Stub.name);
  });

  it('should return react mocks for Router.Link', function () {
    var spec = {
      Router: {
        require: 'react-router',

        modules: {
          Link: true
        }
      }
    };

    var mocks = MochaMix.createMocks(spec);
    expect(mocks.Router.Link).toExist();
    expect(mocks.Router.Link.displayName).toBe('Link stub');
  });
});
