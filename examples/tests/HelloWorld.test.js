describe('HelloWorld', function () {
  var MochaMix = require('../../index.js');
  MochaMix.registerBabel();
  var sinon = require('sinon');
  var expect = require('expect');
  var mix = MochaMix.mix({
    require: './examples/src/components/HelloWorld'
  });

  before(mix.before);
  after(mix.after);

  it('should return No Name', function () {
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

  it('should render nameString', function () {
    var HelloWorld = mix.requireComponent();
    MochaMix.assertRender(HelloWorld, {
      name: 'RexK'
    }, 'RexK');
  });
});
