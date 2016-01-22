# mocha-mix

[![npm version](https://badge.fury.io/js/mocha-mix.svg)](http://badge.fury.io/js/mocha-mix)
[![Build Status](https://travis-ci.org/rexk/mocha-mix.svg)](https://travis-ci.org/rexk/mocha-mix)
[![bitHound Score](https://www.bithound.io/github/rexk/mocha-mix/badges/score.svg)](https://www.bithound.io/github/rexk/mocha-mix)
[![Dependency Status](https://david-dm.org/rexk/mocha-mix.svg)](https://david-dm.org/rexk/mocha-mix)
[![devDependency Status](https://david-dm.org/rexk/mocha-mix/dev-status.svg)](https://david-dm.org/rexk/mocha-mix#info=devDependencies)
[![peerDependency Status](https://david-dm.org/rexk/mocha-mix/peer-status.svg)](https://david-dm.org/rexk/mocha-mix#info=peerDependencies)
[![Code Climate](https://codeclimate.com/github/rexk/mocha-mix/badges/gpa.svg)](https://codeclimate.com/github/rexk/mocha-mix)
[![Test Coverage](https://codeclimate.com/github/rexk/mocha-mix/badges/coverage.svg)](https://codeclimate.com/github/rexk/mocha-mix/coverage)

`mocha-mix` started as a out-of-box unit testing tool for ReactJS. It focuses more toward providing interface for creating `easy mocking and testing scope isolation`.

## Install

```bash
npm install --save-dev mocha-mix
```

## Plugins

* `mocha-mix-jsdom`: Exposes `window` and `document` to global scope. Useful to test React using `mocha`.
* `mocha-mix-jsdom-3`: `mocha-mix-jsdom` using `jsdom@3.x`. Useful for those who uses node@0.12.x or lower.
* `mocha-mix-react`: Provides helpful default mock generator for React unit testing.
* `mocha-mix-react.0.13`: `mocha-mix-react` using `react@0.13.x`
* `mocha-mix-mockery`: Uses `mockery` as mock engine.
* `mocha-mix-jest`: Uses jest as mock engine. (In progress)
* `mocha-mix-jasmine`: Provides test hooks getter for jasmine. (In progress)

## API References

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
