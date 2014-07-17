var should = require('should')
  , wsUtils = require('../../src/ws/ws-utils.js');

describe('wsUtils', function() {

  it('should have getUrls function', function() {
    wsUtils.should.have.property('getUrls');
  });
});