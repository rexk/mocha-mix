var sinon = require('sinon');

function RouterStub() {}

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

module.exports = RouterStub;
