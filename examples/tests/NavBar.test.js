describe('NavBar', function () {
  var expect = require('expect');
  var MochaMix = require('../../');
  MochaMix.registerBabel();
  var stubRouter = MochaMix.contexts.ReactRouter;
  var mix = MochaMix.mix({
    require: './examples/src/components/NavBar',
    context: stubRouter
  });

  before(mix.before);
  after(mix.after);

  it('should transition to "route3"', function () {
    var navBar = mix.renderComponent();

    var button = MochaMix.elementQuerySelector(navBar, 'button');
    MochaMix.simulateEvent(button, 'click');
    var transitionToCall = navBar.context.router.transitionTo.getCall(0);
    // We are only interested in the first argument for the transitionTo call
    expect(transitionToCall.args[0]).toBe('route3');
  });

  it('should be a fresh call', function () {
    var navBar = mix.renderComponent();
    var button = MochaMix.elementQuerySelector(navBar, 'button');
    MochaMix.simulateEvent(button, 'click');
    var transitionToSpy = navBar.context.router.transitionTo;

    // We are only interested in the first argument for the transitionTo call
    expect(transitionToSpy.getCall(0)).toExist();
    expect(transitionToSpy.getCall(1)).toNotExist();
  });
});
