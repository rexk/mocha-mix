var MockGenerator = require('./MockGenerator');

function DefaultMock() {
  return {
    __emptyDefaultMock: true
  };
}

module.exports = MockGenerator(DefaultMock);
