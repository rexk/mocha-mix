/**
 * creates ReactRourter stub conext with
 * given sinon instance or sinon.sandbox
 *
 * @param  {sinon}    sinon   sinon instance to create spy
 * @return {object}           context object with stub router
 */
module.exports = function (sinon) {
  console.warn(
    '!!!WARNING!!! createReactRouterStub is depcrecated'
  );
  
  var RouterStub = function () {};
  Object.assign(RouterStub, {
    makePath: sinon.spy(),
    makeHref: sinon.spy(),
    transitionTo: sinon.spy(),
    replaceWith: sinon.spy(),
    goBack: sinon.spy(),
    getCurrentPath: sinon.spy(),
    getCurrentRoutes: sinon.spy(),
    getCurrentPathname: sinon.spy(),
    getCurrentParams: sinon.spy(),
    getCurrentQuery: sinon.spy(),
    isActive: sinon.spy(),
    getRouteAtDept: sinon.spy(),
    setRouteComponentAtDepth: sinon.spy()
  });
  return {
    router:RouterStub
  };
};
