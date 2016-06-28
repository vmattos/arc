var parseString = require('xml2js').parseString
  , util = require('util')
  , parser = require('../parser/parser-md.js')
  , xmlUtils = {}
  , fs = require('fs')
  , request = require('request');

xmlUtils.codeGroups = [];
xmlUtils.miniCodeGroups = [];

xmlUtils.parse = function(courseParams) {

  for (i in courseParams.xmls) {
    xmlUtils.codeGroups = [];
    xmlUtils.miniCodeGroups = [];

    parseString(courseParams.xmls[i], function(err, result) {
      if (err) console.log(err);

      var secoes = result.curso.secoes[0].secao;

      secoes.forEach(function(secao) {
        var explanation = secao.explicacao[0];

        explanation = xmlUtils.parseMd(explanation, courseParams);
        explanation = xmlUtils.replaceCodes(explanation);
        explanation = xmlUtils.replaceMiniCodes(explanation);

        secao.explicacao[0] = explanation;
      });

      courseParams.mds.push(result)
    });
  }
}

xmlUtils.parseCode = function(string) {
  var mdCode = '```',
      codeGroups = [];

  while(string.indexOf(mdCode) != -1) {
    var index1 = string.indexOf(mdCode),
        index2 = string.indexOf(mdCode, index1+1),
        codeGroup = string.substring(index1+3, index2);

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
  var mdMiniCode = '`',
      miniCodeGroups = [];

  while(string.indexOf(mdMiniCode) != -1) {
    var index1 = string.indexOf(mdMiniCode),
        index2 = string.indexOf(mdMiniCode, index1+1),
        miniCodeGroup = string.substring(index1+1, index2);

    miniCodeGroups.push(miniCodeGroup);

    string = string
              .replace('`', '[miniCode]')
              .replace('`', '[/miniCode]')
              .replace(/(\[miniCode\])(.*?)(\[\/miniCode\])/g, '$1$3');
  }

  this.miniCodeGroups = miniCodeGroups;

  return string;
}

xmlUtils.parseMd = function(string, courseParams) {

  xmlUtils.downloadImages(string, courseParams);

  string = xmlUtils.parseCode(string);
  string = parser.parseMiniCode(string);
  string = xmlUtils.parseMiniCode(string);
  string = parser.parseTitleTags(string);
  string = parser.parseItalic(string);
  string = parser.parseBold(string);
  string = parser.parseLinks(string);
  string = parser.parseMarkdownLinks(string);
  string = parser.parseImages(string);

  return string;
}

xmlUtils.replaceCodes = function(string) {

  var regex = /\[code\]\[\/code\]/;

  if(regex.test(string)) {
    var code = xmlUtils.codeGroups.shift();
    string = string.replace("[code][/code]", "```" + code + "```");

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
    string = string.replace("[miniCode][/miniCode]", "`" + miniCode + "`");

    if(regex.test(string)) {
      string = xmlUtils.replaceMiniCodes(string);
    }
  }

  return string;
}

xmlUtils.downloadImages = function(string, courseParams) {

  var listImageUrls = parser.getImageUrls(string),
      imagesPath = courseParams.imagesPath,
      download = function(url, filename, callback) {
        request.head(url, function(err, res, body) {
          request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };

  listImageUrls.forEach(function(imageUrl) {
    var regexp = /([\w-]+\.png)/g, 
        match = regexp.exec(imageUrl), 
        imageName = match[1],
        imageDir = imagesPath + '/' + imageName;

    download(imageUrl, imageDir, function() {
      console.log('Downloading image from: ' + imageUrl);
    });
  });
}

module.exports = xmlUtils;