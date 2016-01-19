# mocha-mix

[![npm version](https://badge.fury.io/js/mocha-mix.svg)](http://badge.fury.io/js/mocha-mix)
[![Build Status](https://travis-ci.org/rexk/mocha-mix.svg)](https://travis-ci.org/rexk/mocha-mix)
[![bitHound Score](https://www.bithound.io/github/rexk/mocha-mix/badges/score.svg)](https://www.bithound.io/github/rexk/mocha-mix)
[![Dependency Status](https://david-dm.org/rexk/mocha-mix.svg)](https://david-dm.org/rexk/mocha-mix)
[![devDependency Status](https://david-dm.org/rexk/mocha-mix/dev-status.svg)](https://david-dm.org/rexk/mocha-mix#info=devDependencies)
[![peerDependency Status](https://david-dm.org/rexk/mocha-mix/peer-status.svg)](https://david-dm.org/rexk/mocha-mix#info=peerDependencies)
[![Code Climate](https://codeclimate.com/github/rexk/mocha-mix/badges/gpa.svg)](https://codeclimate.com/github/rexk/mocha-mix)
[![Test Coverage](https://codeclimate.com/github/rexk/mocha-mix/badges/coverage.svg)](https://codeclimate.com/github/rexk/mocha-mix/coverage)

`mocha-mix` is a tool that make it easy to test ReactJS files and includes some helpers for testing and mocking modules and components. Mix it with `mocha` with ease, and fast testing.

The main feature of `mocha-mix` are:
* Allows you to require `.jsx`, `es6`, `js` in your test
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
creating a simple, yet powerful solution for jsx-test.

## Install
```
npm install --save-dev mocha-mix
```

## API Refernce

### `MochaMix`

#### `mix`

Returns a new Mixer with given recipe object.
> mix(recipe: Recipe): Mixer

#### `use`

Takes given functional argument as a plugin.
> use(plugin: Function): void

#### `setTestHooksGetter`

Replaces a testHookGetter with given getter Function.
> setTestHooksGetter(getter: Function): void

#### `setDefaultMockGenerator`

Replaces a defaultMockGenerator with given generator function
> setDefaultMockGenerator(generator: Function or MockGenerator): void

#### `before`

Registers given function as beforeAll hook
> before(hook: Function or MixHook): void


#### `before`

Registers given function as beforeAll hook
> before(hook: Function or MixHook): void

#### `beforeEach`

Registers given function as beforeEach hook
> beforeEach(hook: Function or MixHook): void

#### `afterEach`

Registers given function as afterEach hook
> afterEach(hook: Function or MixHook): void

#### `after`

Registers given function as after hook
> after(hook: Function or MixHook): void

#### `clearHook`

clears all registered named hooks with given hookName
> clearHook(hookName: string): void

#### `clearAllHooks`

clears all registered hooks
> clearAllHooks(void): void

#### `MockGenerator`

Returns a function which wraps the given function. In testing runtime,
MockDescription instance will be passed down to the generator for further
customization.

> MockGenerator(generator: Function): GeneratorWrapper

#### `MixHook`

Returns a function which wraps the given test hook function.
> MixHook(hook: Function): Wrapper

#### `MixPlugin`

Returns a function if the given plugin function is valid.
> MixPlugin(plugin: Function): Function

#### `Mixer`

Returns mixer instance.

> Mixer(MixRecipe): Mixer

##### `import`

Returns a default module. Follows ES6 Module standard.
> import(void): Any

##### `require`

Returns a module using commonJS pattern.
> require(void): Any

##### `importAsWildcard`

Returns a module as wildcard import. Follows ES6 Module standard.

##### `registerMocks`

Registers mock reference so that in can be referenced in a test scope.
> registerMock(name: String, mock: Any): void

##### `clearMock`

Clears a mock reference with given name reference.
> clearMock(name: String): void

##### `clearAllMocks`

Clears all mock references
> clearAllMocks(void): void

### `MixRecipe`

MixRecipe is a guide object.

#### `rootDir`

> rootDir: string
> defaults: process.cwd()
