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
