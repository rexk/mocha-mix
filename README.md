# mocha-mix
`mocha-mix` is a tool that make it easy to test ReactJS files and includes some helpers for testing and mocking modules and components. Mix it with `mocha` with ease, and fast testing.

The main feature of `mocha-mix` are:
* Allows your to require `.jsx`, `es6`, `es6.js` in your test
* Includes some helpers to simplify the test of React Components
* Assertion methods to check the component renders the correct html based on the given `props` (from Yahoo's jsx-test)
* Ability to specify modules and components to be mocked.
* Works with `mocha`.

## Why not Jest?
Jest is wonderful testing tool with automatic mocking and easy set up. It is not, however
great tool, if you already have existing test setup in `mocha` and wishes to keep
the testing framework. Jest also mocks everything by default, and if you are looking
for more targeted mocking, Jest is not the tool. Just like me.

## Inspiration
I am grateful http://www.hammerlab.org for posting `Testing React Web Apps with Mocha`.
Most of implementation is based on the post. I also thank you for https://github.com/yahoo/jsx-test for
creating simple solution for jsx-test.

## Install
```
npm install --save-dev mocha-mix
```

## Examples

### Dumb Component Test
```js
// ./src/components/HelloWorld.jsx
module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      onClick: Function.prototype,
      name: ''
    }
  },

  getNameString: function () {
    return this.props.name ? this.props.name : 'No Name';
  },

  render: function () {
    var nameString = this.getNameString();

    return (
      <div className='helloWorld'
        onClick={this.props.onClick}>
        Hello World!! My name is {nameString}
      </div>
    );
  }
});
```

```js
// ./tests/HelloWorld.test.js
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
```

### Composite Tests (without context)
Let's write a test code from facebook's Composite Example `Avatar`
```js
// ./src/components/Avatar.jsx
var React = require('react');
var ProfilePic = require('./ProfilePic');
var ProfileLink = require('./ProfileLink');

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
      </div>
    );
  }
});

// ./src/components/ProfilePic.jsx
var ProfilePic = React.createClass({
  render: function() {
    return (
      <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
    );
  }
});

// ./src/components/ProfileLink.jsx
var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={'https://www.facebook.com/' + this.props.username}>
        {this.props.username}
      </a>
    );
  }
});
```

Let's say that I already have unit test for `ProfileLink` and `ProfileLink` and I am fairly
certain they would work and All I care about the Avatar is that I want to make sure that the two sub components
received the proper props from Avatar.

```js
describe('Avatar', function () {
  var MochaMix = require('mocha-mix');
  var expect = require('expect');
  var mochaMix = MochaMix.mix({
    // require path from process.cwd()
    require: './src/components/Avatar'),

    reactMocks: {
      // Same require path as in Avatar.jsx file
      ProfilePic: './PofilePic',
      ProfileLink: './ProfileLink'
    }

  });

  before(mochaMix.before);
  after(mochaMix.after);

  it('should pass username to ProfilePic', function () {
    var expected = 'Rex Kim';
    mochaMix.renderComponent({ username: expected });

    // Mocked ReactClass for ProfilePic
    var ProfilePic = mochaMix.reactMocks.ProfilePic;
    var profilePic = mochaMix.findRenderedComponentWithType(ProfilePic);
    expect(profilePic.props.username).toBe(expected);
  });

});
```

### Composite Tests (with context)
Let's try to test composite which users react router
```js
// ./src/NavBar.jsx
var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({

  mixins: [ Navigation ],

  handleClick: function () {
    this.transitionTo('route3');
  },

  render: function () {
    return (
      <div>
        <button onClick={this.handleClick}>To Route 3</button>
      </div>
    );
  },
});
```

As for the example above, there is two way to test this. Mock the `Navigation`
mixin to spy on `transitionTo` or spy on `context.router.transitionTo`. For the
sake of example, let's spy on the context

```js
describe('NavBar', function () {
  var React = require('react');
  var MochaMix = require('mocha-mix');
  var mochaMix = mochaMix.mix({
    require: './src/NavBar',

    ComponentWrapper: MochaMix.ReactRouterContextWrapper
  });

  before(mochaMix.before);
  after(mochaMix.after);

  it('should transition to "route3"', function () {
    var navBar = mochaMix.renderComponent();
    var button = mochaMix.querySelector(navBar, 'button');
    mochaMix.simulateEvent(button, 'click');
    var transitionToCall = navBar.context.transitionTo.getCall[0];

    // We are only interested in the first argument for the transitionTo call
    expect(transitionToCall.args[0]).toBe('route3');
  });
});
```
