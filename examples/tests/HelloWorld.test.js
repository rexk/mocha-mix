describe('HelloWorldComponent', function () {
  var MochaMix = require('mocha-mix');
  var sinon = require('sinon');
  var expect = require('expect');
  var mochaMix = MochaMix.mix({
    // require path from process.cwd()
    require: './src/components/HelloWorld'),
  });

  before(mochaMix.before);
  after(mochaMix.after);

  it('should return No Name', function () {
    var helloWorld = mochaMix.renderComponent();
    var actual = helloWorld.props.getNameString();
    expect(actual).toBe('No Name');
  });

  it('should call props.onClick', function () {
    var onClick = sinon.spy();
    var helloWorld = mochaMix.renderComponent({
      onClick: onClick
    });

    var div = mochaMix.querySelector(helloWorld, 'div');
    mochaMix.simulateEvent(div, 'click');
    expect(onClick.calledOnce).toBe(true);
  });
});
