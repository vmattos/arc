var should = require('should')
  , xmlUtils = require('../../../src/xml/xml-utils');

describe('xmlUtils', function() {
  it('should have parse function', function() {
    xmlUtils.should.have.property('parse')
  });

  it('should have parseCode function', function() {
    xmlUtils.should.have.property('parseCode')
  });

  describe('parseCode', function() {

    it('should replace markdown markers by [code] tag', function() {
      var string = '``````';
      string = xmlUtils.parseCode(string);

      string.should.equal('[code][/code]');
    });

    it('should extract code content', function() {
      var string = '```String xpto = "Johnny Quest"```';
      string = xmlUtils.parseCode(string);

      string.should.not.containEql('Johnny Quest');
    });
  });
});