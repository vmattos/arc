parser = {};

parser.parseItalic = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace(/\*([^\*\n]*)\*/, "::$1::");
    string = string.replace("<i>", "::");
    string = string.replace("</i>", "::");
  }

  return string;
}

parser.parseBold = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace("::::", "**");
    string = string.replace("<b>", "**");
    string = string.replace("</b>", "**");
  }

  return string;
}

parser.parseMiniCode = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace("`", "%%");
    string = string.replace("<code>", "%%");
    string = string.replace("</code>", "%%");
  }

  return string;
}

parser.parseImages = function(string) {

  var regexp = /<img\s+src=".*\/(.*\.png)"\s?\/?>/;

  for(var i=0; i < string.length; i++) {
    if(regexp.test(string)) {
      string = string.replace(regexp, "[img images/$1]");
    }
  }

  return string;
}

parser.parseLinks = function(string) {

  var regexp = /<a\s+href="([?=\w:\/.-]+)".*>(.+)<\/a>/;

  for(var i=0; i < string.length; i++) {
    if(regexp.test(string)) {
      string = string.replace(regexp, "$2: $1");
    }
  }

  return string;
}

parser.getImageLinks = function(string) {

  var regexp = /<img\s+src="(http:\/\/s3.amazonaws.com\/[\w:\/.-]+)"\w*\s*\/?>/g,
      match = regexp.exec(string), 
      imagesLinkList = [];

  while (match != null) {
    imagesLinkList.push(match[1]);
    match = regexp.exec(string);
  }

//  imagesLinkList.forEach(function(image) {
//    console.log(image);
//  });

  return imagesLinkList;

}

module.exports = parser;