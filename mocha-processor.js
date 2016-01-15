var MochaMix = require('./index.js');
MochaMix.registerBabel();
MochaMix.prepareJsDom();

var MochaMix = require('mocha-mix');
var mochaMixJsdom = require('mocha-mix-jsdom-3');
var mochaMixNoStyles = require('mocha-mix-no-style');
var createMockGenerator = MochaMix.createMockGenerator;
MochaMix.use(mochaMixBabel6());
MochaMix.use(mochaMixReact());
MochaMix.use(useMochaHook());
MochaMix.use(mochaMixJsdom());
MochaMix.use(defaultReactMock())
MochaMix.use(mochaMixNoStyles());
MochaMix.use(mochaMixMockery());

var mix = MochaMix.mix({
  root: __dirname,
  import: 'module-name',
  mocks: {
    Radium: {
      import: 'Radium',
      mock: Component => Component
    },
    TextField: '../TextField',
    ReactRouter: {
      import: 'react-router',
      mock: createMockGenerator((options) => {
        let original = options.original;
        let mockRouter = {};
        mockRouter.Nav = createReactMock('DIV');
        return mockRouer;
      })
    }
  }
})

var ComplexComponent = mix.import();

//
// class MockaMixRegistry
//   before: Array<Function>
//   after: Array<Function>
//   beforeEach: Array<Function>
//   afterEach: Array<Function>
//   getTestHooks: function
//   testHooks: {
//     before: function,  default to global.before,
//     after: function,  default to global.after,
//     beforeEach: function, default to global.beforeEach,
//     afterEach: function, default to global.afterEach
//   },
//
// class MochaMix
//   createMockGenerator: function
//   use: function
//   mix: function
//
// class MixRoot
//   root: string  default process.cwd
//   import: string required module path or module name
//   mocks: Map<string, MixMockDescription> or Map<string, string>,
//   originals: Map<string, any>
//
// class MixMockDescription
//   import: string required
//   mock: MixMockGenerator or anything else   default to defaultMockGenerator
//
// class Mixer
//   mixRoot: MixRoot,
//   import: function
//   importAsWildcard: function
//
// class MixResult
//   mocks: Map<string, any>
//
// class MixPlugin
//   before: function
//   after: function
//   beforeEach: function
//   afterEach: function,
//   getTestHook: function,
//   defaultMockGenerator:
//
//
// function BeforeHook
// function BeforeEachHook
// function AfterHook
// function AfterEachHook
// function createMockGenerator
// function use
