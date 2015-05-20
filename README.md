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
describe('HelloWorld', function () {
  var MochaMix = require('mocha-mix');
  var sinon = require('sinon');
  var expect = require('expect');
  var mix = MochaMix.mix({
    require: './src/components/HelloWorld'
  });

  before(mix.before);
  after(mix.after);

  it('should return No Name', function () {
    var helloWorld = mix.renderComponent();
    var actual = helloWorld.getNameString();

    // Testing ReactClass method directly
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

    // Or use yahoo/jsx-test assert method for regex pattern match
    MochaMix.assertRender(HelloWorld, {
      name: 'RexK'
    }, 'RexK');
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

    mocks: {
      // Same require path as in Avatar.jsx file
      ProfilePic: './PofilePic',
      ProfileLink: './ProfileLink'
    }

  });

  before(mochaMix.before);
  after(mochaMix.after);

  it('should pass username to ProfilePic', function () {
    var expected = 'Rex Kim';
    var avatar = mochaMix.renderComponent({ username: expected });

    // Mocked ReactClass for ProfilePic
    var ProfilePic = mochaMix.mocks.ProfilePic;

    // Methods for React.addons.TestUtils are aliased for easy access
    var profilePic = MochaMix.findRenderedComponentWithType(avatar, ProfilePic);
    expect(profilePic.props.username).toBe(expected);
  });

});
```

### Composite Tests (with context)
Let's try to test composite which users react router
```js
// ./src/NavBar.es6
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
    require: './src/components/NavBar',
    context: MochaMix.contexts.ReactRouter
  });

  before(mochaMix.before);
  after(mochaMix.after);

  it('should transition to "route3"', function () {
    var navBar = mix.renderComponent();
    var button = MochaMix.elementQuerySelector(navBar, 'button');
    MochaMix.simulateEvent(button, 'click');
    var transitionToCall = navBar.context.router.transitionTo.getCall(0);
    // We are only interested in the first argument for the transitionTo call
    expect(transitionToCall.args[0]).toBe('route3');
  });
});
```

### Composites Tests (with modules with properties)
```js
import React from 'react';
import { Navigation } from 'react-router';

export default React.createClass({
  mixins: [ Navigation ],

  handleClick() {
    this.transitionTo('route3');
  },

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>To Route 3</button>
      </div>
    );
  }
});
```

```js
describe('NavBarWithLink', function () {
  var expect = require('expect');
  var MochaMix = require('../../');
  var stubRouter = MochaMix.contexts.ReactRouter;
  var mix = MochaMix.mix({
    require: './src/components/NavBarWithLink',
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

  it('should transition to "route3"', function () {
    var navBar = mix.renderComponent();

    var Link = mix.mocks.Router.Link;
    var link = MochaMix.findRenderedComponentWithType(navBar, Link);
    // We want to make sure props for link is proper route
    expect(link.props.to).toBe('route3');
  });

});

```

### Mocking non-react components
```js
// ./src/components/ShinyComponent.es6
import React from 'react';
import ShinyObject from '../shyny';

export default React.createClass({

  handleClick() {
    this.transitionTo('route3');
  },

  render() {
    return (
      <div>
        { ShinyObject.boom() }
      </div>
    );
  }
});

```

```js
describe('NavBarWithLink', function () {
  var MochaMix = require('../../');
  var shinyMock = {
    boom: function () {
      return 'mocking boom';
    }
  };
  var mix = MochaMix.mix({
    require: './src/components/ShinyComponent',
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

```
