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

parser.parseImages = function(string) {
  var regexp = /<img src=".*\/(.*\.png)" \/>/;

  if(regexp.test(string)) {
    string = string.replace(regexp, "[img images/$1]");
    console.log(string.replace(regexp, "[img images/$1]"))
  }

  return string;
}

module.exports = parser;
