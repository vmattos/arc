parser = {};

parser.parseTitleTags = function(string) {

  var regexTagH1 = /<h1>(.+?)<\/h1>/;
  var regexTagH2 = /<h2>(.+?)<\/h2>/;
  var regexTagH3 = /<h3>(.+?)<\/h3>/;

  for (var i = 0; i < string.length; i++) {
    if(regexTagH1.test(string)) {
      string = string.replace(regexTagH1, "# $1");
    }
    if(regexTagH2.test(string)) {
      string = string.replace(regexTagH2, "## $1");
    }
    if(regexTagH3.test(string)) {
      string = string.replace(regexTagH3, "### $1");
    }
  }

  return string;
}

parser.parseItalic = function(string) {

  var regexTagI = /<i>(.+?)<\/i>/;
  var regexTagEm = /<em>(.+?)<\/em>/;

  for (var i = 0; i < string.length; i++) {
    string = string.replace(/\*([^\*\n]*)\*/, "_$1_");
    if(regexTagI.test(string)) {
      string = string.replace(regexTagI, "_$1_");
    }
    if(regexTagEm.test(string)) {
      string = string.replace(regexTagEm, "_$1_");
    }
  }

  return string;
}

parser.parseBold = function(string) {

  var regexTagB = /<b>(.+?)<\/b>/;
  var regexTagStrong = /<strong>(.+?)<\/strong>/;

  for (var i = 0; i < string.length; i++) {
    string = string.replace("__", "**");
    if(regexTagB.test(string)) {
      string = string.replace(regexTagB, "**$1**");
    }
    if(regexTagStrong.test(string)) {
      string = string.replace(regexTagStrong, "**$1**");
    }
  }

  return string;
}

parser.parseMiniCode = function(string) {

   var regexTagMiniCode = /<code>(.+?)<\/code>/;

  for (var i = 0; i < string.length; i++) {
    if(regexTagMiniCode.test(string)) {
      string = string.replace(regexTagMiniCode, "`$1`");
    }
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

  var regexp = /<img\s+src="(http[s]?:\/\/s3.amazonaws.com\/[\w:\/.-]+)"\w*\s*\/?>/g,
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