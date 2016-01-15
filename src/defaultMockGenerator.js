var createMockGenerator = require('./createMockGenerator');

var defaultMockGenerator = createMockGenerator(function () {
  return {
    __emptyDefaultMock: true
  };
});

module.exports = defaultMockGenerator;
