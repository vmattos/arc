var parseString = require('xml2js').parseString
  , util = require('util')
  , parser = require('../parser/parser-afc.js')
  , xmlUtils = {}
  , fs = require('fs')
  , request = require('request');

xmlUtils.codeGroups = [];
xmlUtils.miniCodeGroups = [];

var listImageLinks = [];

xmlUtils.parse = function(courseParams) {

  for (i in courseParams.xmls) {
    xmlUtils.codeGroups = [];
    xmlUtils.miniCodeGroups = [];

    parseString(courseParams.xmls[i], function(err, result) {
      if (err) console.log(err);

      var secoes = result.curso.secoes[0].secao;

      secoes.forEach(function(secao) {
        var explanation = secao.explicacao[0];

        explanation = xmlUtils.parseAfc(explanation, courseParams);
        explanation = xmlUtils.replaceCodes(explanation);
        explanation = xmlUtils.replaceMiniCodes(explanation);

        secao.explicacao[0] = explanation;
      });

      courseParams.afcs.push(result)
    });
  }
}

xmlUtils.parseCode = function(string) {
  var mdCode = '```';
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

xmlUtils.parseMiniCode = function(string) {
  var mdMiniCode = '`';
  var miniCodeGroups = [];

  while(string.indexOf(mdMiniCode) != -1) {
    var index1 = string.indexOf(mdMiniCode);
    var index2 = string.indexOf(mdMiniCode, index1+1);
    var miniCodeGroup = string.substring(index1+1, index2);

    miniCodeGroups.push(miniCodeGroup);

    string = string
              .replace('`', '[miniCode]')
              .replace('`', '[/miniCode]')
              .replace(/(\[miniCode\])(.*?)(\[\/miniCode\])/g, '$1$3');
  }

  this.miniCodeGroups = miniCodeGroups;

  return string;
}

xmlUtils.parseAfc = function(string) {

  listImageLinks = parser.getImageLinks(string);
  xmlUtils.downloadImages(listImageLinks, courseParams);

  string = xmlUtils.parseCode(string);
  string = parser.parseMiniCode(string);
  string = xmlUtils.parseMiniCode(string);
  string = parser.parseItalic(string);
  string = parser.parseBold(string);
  string = parser.parseLinks(string);
  string = parser.parseImages(string);

  return string;
}

xmlUtils.replaceCodes = function(string) {

  var regex = /\[code\]\[\/code\]/;

  if(regex.test(string)) {
    var code = xmlUtils.codeGroups.shift();
    string = string.replace("[code][/code]", "[code]" + code + "[/code]");

    if(regex.test(string)) {
      string = xmlUtils.replaceCodes(string);
    }
  }

  return string;
}

xmlUtils.replaceMiniCodes = function(string) {

  var regex = /\[miniCode\]\[\/miniCode\]/;

  if(regex.test(string)) {
    var miniCode = xmlUtils.miniCodeGroups.shift();
    string = string.replace("[miniCode][/miniCode]", "%%" + miniCode + "%%");

    if(regex.test(string)) {
      string = xmlUtils.replaceMiniCodes(string);
    }
  }

  return string;
}

xmlUtils.downloadImages = function(listImageLinks, courseParams) {

  var courseName = courseParams.courseName, 
      imagePath = 'AFC/' + courseName + '/images',
      download = function(uri, filename, callback) {
        request.head(uri, function(err, res, body){
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };

  listImageLinks.forEach(function(imageLink) {
    var regexp = /([\w-]+\.png)/g, 
        match = regexp.exec(imageLink), 
        filename = imagePath + '/' + match[1];

    download(imageLink, filename, function(){
      console.log('Downloading image from: ' + imageLink);
    });
  });
}

module.exports = xmlUtils;