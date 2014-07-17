var fs = require('fs')
  , afcUtils = {};


afcUtils.createDirectory = function(courseParams) {
  var courseName = courseParams.courseName;
  var path = './AFC/' + courseName;

  courseParams.path = path;
  fs.mkdir( path, function(err) {
    if (err) console.log(err);
  });
}

afcUtils.createAfcs = function(courseParams) {
  var secoes = courseParams.totalSections;

  secoes.forEach(function(secao, index) {
    var prefix = index < 9 ? '0' + (index+1) : '' + (index+1);
    var sectionTitle = secao.titulo[0];
    var title = prefix + '-' + sectionTitle.replace(/ /g, '-')
    title += '.afc';

    var path = courseParams.path + '/' + title;
    
    var text = afcUtils.setText(secao);

    fs.writeFile(path, new Buffer(text));
  });
}

afcUtils.setText = function(section) {
  var chapter = '[chapter ' + section.titulo[0] + ']';
  var text = chapter + section.explicacao[0];

  return text
}

module.exports = afcUtils;