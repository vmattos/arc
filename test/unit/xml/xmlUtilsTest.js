var should = require('should')
  , xmlUtils = require('../../../src/xml/xml-utils');

describe('xmlUtils', function() {
  it('should have parse function', function() {
    xmlUtils.should.have.property('parse')
  });

  it('should have parseCode function', function() {
    xmlUtils.should.have.property('parseCode')
  });
});