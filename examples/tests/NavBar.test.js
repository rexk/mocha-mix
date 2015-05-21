describe('NavBar', function () {
  var expect = require('expect');
  var MochaMix = require('../../');
  var sandbox = MochaMix.sandbox;
  var stubContexts = MochaMix.stubContexts;
  MochaMix.registerBabel();
  var stubRouter = stubContexts.createReactRouterStub(sandbox);
  var mix = MochaMix.mix({
    require: './examples/src/components/NavBar',
    context: stubRouter
  });

  before(mix.before);
  after(mix.after);
  afterEach(function () {
    sandbox.reset();
  });

  it('should transition to "route3"', function () {
    var navBar = mix.renderComponent();
    var button = MochaMix.elementQuerySelector(navBar, 'button');
    var transitionToSpy = navBar.context.router.transitionTo;
    MochaMix.simulateEvent(button, 'click');
    var transitionToCall = transitionToSpy.getCall(0);

    // We are only interested in the first argument for the transitionTo call
    expect(transitionToCall.args[0]).toBe('route3');
  });

  it('should be a fresh call', function () {
    var navBar = mix.renderComponent();
    var button = MochaMix.elementQuerySelector(navBar, 'button');
    var transitionToSpy = navBar.context.router.transitionTo;
    expect(transitionToSpy.called).toNotExist('spy is not resetted');
    MochaMix.simulateEvent(button, 'click');
    // We are only interested in the first argument for the transitionTo call
    expect(transitionToSpy.called).toExist('spy is not called');
  });
});
