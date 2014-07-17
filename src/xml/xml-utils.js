var parseString = require('xml2js').parseString
  , util = require('util')
  , xmlUtils = {};

xmlUtils.codeGroups = {};

xmlUtils.parse = function(courseParams) {
 //for (i in courseParams.xmls) {

    parseString(courseParams.xmls[0], function(err, result) {
      if (err) console.log(err);

      var secoes = result.curso.secoes[0].secao;
     // secoes.forEach(function(secao) {
        var explanation = secoes[0].explicacao[0];
        explanation = xmlUtils.parseCode(explanation);
        //console.log(explanation);
      //});
    });
  //}
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

  return string;
}

module.exports = xmlUtils;



