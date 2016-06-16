parser = {};

parser.parseTitleTags = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace("<h1>", "#");
    string = string.replace("</h1>", "");
    string = string.replace("<h2>", "##");
    string = string.replace("</h2>", "");
    string = string.replace("<h3>", "###");
    string = string.replace("</h3>", "");
  }

  return string;
}

parser.parseItalic = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace(/\*([^\*\n]*)\*/, "_$1_");
    string = string.replace("<i>", "_");
    string = string.replace("</i>", "_");
    string = string.replace("<em>", "_");
    string = string.replace("</em>", "_");
  }

  return string;
}

parser.parseBold = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace("__", "**");
    string = string.replace("<b>", "**");
    string = string.replace("</b>", "**");
    string = string.replace("<strong>", "**");
    string = string.replace("</strong>", "**");
  }

  return string;
}

parser.parseMiniCode = function(string) {

  for (var i = 0; i < string.length; i++) {
    string = string.replace("<code>", "`");
    string = string.replace("</code>", "`");
  }

  return string;
}

parser.parseImages = function(string) {

  var regexp = /<img\s+src=".*\/(.*\.png)"\s?\/?>/;

  for(var i=0; i < string.length; i++) {
    if(regexp.test(string)) {
      string = string.replace(regexp, "![ {w=50}](images/$1)");
    }
  }

  return string;
}

parser.parseLinks = function(string) {

  var regexTagA = /<a\s+href="([?=\w:\/.-]+)".*>(.+)<\/a>/;
  var regexMd = /\[(\w+)\]\(([?=\w:\/.-]+)\)/;

  for(var i=0; i < string.length; i++) {
    if(regexTagA.test(string)) {
      string = string.replace(regexTagA, "$2: $1");
    }
    if(regexMd.test(string)) {
      string = string.replace(regexMd, "$1: $2");
    }
  }

  return string;
}

parser.getMarkdownLinks = function(string) {

  var regexLink = /(\[\d\]:\s?)(.*)/g,
      match = regexLink.exec(string),
      markdownLinkList = [];

  while (match != null) {
    markdownLinkList.push(match[2]);
    match = regexLink.exec(string);
  }

//  markdownLinkList.forEach(function(image) {
//    console.log(image);
//  });

  return markdownLinkList;

}

parser.parseMarkdownLinks = function(string) {

  var regexMd = /\[(.*?)\](\[\d\])/,
      regexLink = /\[\d\]:\s?.*/,
      markdownLinkList = parser.getMarkdownLinks(string),
      index = 0;
  
  for(var i=0; i < string.length; i++) {
    if(regexMd.test(string)) {
      string = string.replace(regexMd, "$1: " + markdownLinkList[index]);
      string = string.replace(regexLink, "");
      index++;
    }
    if(regexLink.test(string)) {
      string = string.replace(regexLink, "");
    }
  }

  return string

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