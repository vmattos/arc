var md = require('node-markdown').Markdown;

parser = {};

parser.parseItalic = function(string) {
  string = md(string, true, "em");

  var italicRegexp = /<em>/g;
  var italics = string.match(italicRegexp);

  for(i in italics) {
    string = string.replace("<em>", "::");
    string = string.replace("</em>", "::");
  }

  return string;
}

parser.parseMiniCode = function(string) {
  
  for (var i = 0; i < string.length; i++) {
  	string = string.replace('`', '%%')
  }

  return string;
}

module.exports = parser;
