var parseString = require('xml2js').parseString
  , util = require('util')
  , parser = require('../parser/parser.js')
  , xmlUtils = {};

xmlUtils.codeGroups = [];

xmlUtils.parse = function(courseParams) {

  for (i in courseParams.xmls) {
    xmlUtils.codeGroups = [];


    parseString(courseParams.xmls[i], function(err, result) {
      if (err) console.log(err);

      var secoes = result.curso.secoes[0].secao;

      secoes.forEach(function(secao) {
        var explanation = secao.explicacao[0];

        explanation = xmlUtils.parseCode(explanation);
        explanation = parser.parseItalico(explanation);

        secao.explicacao[0] = explanation;
      });

      courseParams.afcs.push(result)
    });
  }
}

xmlUtils.parseCode = function(string) {
  var mdCode = '```'
  var codeGroups = [];

  while(string.indexOf(mdCode) != -1) {
    var index1 = string.indexOf(mdCode);
    var index2 = string.indexOf(mdCode, index1+1);
    var codeGroup = string.substring(index1+3, index2);

    codeGroups.push(codeGroup);

    string = string
              .replace('```', '[code]')
              .replace('```', '[/code]')
              .replace(codeGroup, '');
  }

  this.codeGroups = codeGroups;

  return string;
}

module.exports = xmlUtils;



