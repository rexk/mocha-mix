describe('NavBarWithLink', function () {
  var MochaMix = require('../../');
  var shinyMock = {
    boom: function () {
      return 'mocking boom';
    }
  };
  var mix = MochaMix.mix({
    require: './examples/src/components/ShinyComponent',
    mocks: {
      ShinyObject: {
        require: '../shiny',
        react: false,
        mock: shinyMock
      }
    }
  });

  before(mix.before);
  after(mix.after);

  it('should render "mocking boom" instead of "real boom"', function () {
    MochaMix.assertRender(
      mix.requireComponent(), {},
      'mocking boom'
    );


    MochaMix.assertNotRender(
      mix.requireComponent(), {},
      'real boom'
    );
  });

});
