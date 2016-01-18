var MochaMix = require('./src/index');
MochaMix.registerBabel();
MochaMix.prepareJsDom();

var MochaMix = require('mocha-mix');
var mochaMixJsdom = require('mocha-mix-jsdom-3');
var mochaMixNoStyles = require('mocha-mix-no-style');
var createMockGenerator = MochaMix.createMockGenerator;
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
// class MixMockGenerator : Function
//   __isMixMockGenerator
//
// class MochaMix
//   MockGenerator: function
//   use: function
//   mix: function
//   before: function
//   after: function
//   beforeEach: function
//   afterEach: function
//   setTestHookGetter: function
//   setDefaultMockGenerator: function
//
//
// class MixRecipe
//   roodDir: string  default process.cwd
//   import: string required module path or module name
//   mocks: List<MockDescription>
//
// class MixMockDescription
//   import: string required
//   mock: one of MixMockGenerator or anything else   default to defaultMockGenerator
//
// class Mixer
//   import: function
//   importAsWildcard: function
//   registerMock: function
//   clearMock: function
//   mocks
//
// class MixResult
//   mocks: Map<string, any>
//
// class MixPlugin
//   before: function
//   after: function
//   beforeEach: function
//   afterEach: function,
//   setTestHook: function,
//   setDefaultMockGenerator: Function
//
//
// function BeforeHook
// function BeforeEachHook
// function AfterHook
// function AfterEachHook
// function createMockGenerator
// function use
