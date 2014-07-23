parser = {};

parser.parseItalic = function(string) {

  for (var i = 0; i < string.length; i++) {  
    string = string.replace(/\*([^\*]*)\*/, "::$1::");
  }

  return string;
}

parser.parseBold = function(string) {

  for (var i = 0; i < string.length; i++) {  
    string = string.replace("::::", "**");
  }

  return string;
}

parser.parseMiniCode = function(string) {
  
  for (var i = 0; i < string.length; i++) {
  	string = string.replace("`", "%%");
  }

  return string;
}

module.exports = parser;
