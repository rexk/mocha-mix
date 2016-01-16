var createMockGenerator = require('./createMockGenerator');

function defaultMock() {
  return {
    __emptyDefaultMock: true
  };
}

var defaultMockGenerator = createMockGenerator(defaultMock);

module.exports = defaultMockGenerator;
