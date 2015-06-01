describe('@assert', function () {
  var React = require('react');
  var MochaMix = require('../');
  var ProfileLink = require('../examples/src/components/ProfileLink');

  describe('@assertRender', function () {
    it('should assert with 3 arguments', function () {
      MochaMix.assertRender(
        ProfileLink,
        { username: 'rexk' },
        'https://www.facebook.com/rexk'
      );
    });

    it('should assert with 2 arguments', function () {
      MochaMix.assertRender(
        <ProfileLink username='rexk' />,
        'https://www.facebook.com/rexk'
      );
    })
  });

  describe('@assertNotRender', function () {
    it('should assert with 3 arguments', function () {
      MochaMix.assertNotRender(
        ProfileLink,
        { username: 'rexk' },
        'https://www.facebook.com/othername'
      );
    });

    it('should assert with 2 arguments', function () {
      MochaMix.assertNotRender(
        <ProfileLink username='rexk' />,
        'https://www.facebook.com/othername'
      );
    })
  });
});
