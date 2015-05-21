describe('NavBarWithLink', function () {
  var expect = require('expect');
  var MochaMix = require('../../');
  var stubContexts = MochaMix.stubContexts;
  var sandbox = MochaMix.sandbox;
  MochaMix.registerBabel();
  var stubRouter = stubContexts.createReactRouterStub(sandbox);
  var mix = MochaMix.mix({
    require: './examples/src/components/NavBarWithLink',
    context: stubRouter,
    mocks: {
      Router: {
        require: 'react-router',
        modules: {
          Link: true
        }
      }
    }
  });

  before(mix.before);
  after(mix.after);
  afterEach(function () {
    sandbox.reset();
  });

  it('should transition to "route3"', function () {
    var navBar = mix.renderComponent();

    var Link = mix.mocks.Router.Link;
    var link = MochaMix.findRenderedComponentWithType(navBar, Link);
    // We want to make sure props for link is proper route
    expect(link.props.to).toBe('route3');
  });

});
