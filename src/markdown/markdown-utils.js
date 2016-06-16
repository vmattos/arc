var fs = require('fs')
  , xmlUtils = require('../xml/md-xml-utils')
  , mdUtils = {};


mdUtils.createDirectory = function(courseParams) {
  var courseName = courseParams.courseName;
  var path = 'Markdown/' + courseName;

  courseParams.path = path;
  fs.mkdir(path, function(err) {
    if (err) console.log(err);
  });
}

mdUtils.createImageDirectory = function(courseParams) {
  var courseName = courseParams.courseName;
  var imagePath = 'Markdown/' + courseName + '/images';

  fs.mkdir(imagePath, function(err) {
    if (err) console.log(err);
  });
}

mdUtils.createMds = function(courseParams) {

  var secoes = courseParams.totalSections;

  secoes.forEach(function(secao, index) {
    var prefix = index < 9 ? '0' + (index+1) : '' + (index+1);
    var sectionTitle = secao.titulo[0];
    var title = prefix + '-' + sectionTitle.replace(/ /g, '-')
    title += '.md';

    var path = courseParams.path + '/' + title;
    
    var text = mdUtils.getText(secao);

    var textExercises = mdUtils.getExercises(secao);

    textExercises = xmlUtils.parseMd(textExercises, courseParams);
    textExercises = xmlUtils.replaceCodes(textExercises);
    textExercises = xmlUtils.replaceMiniCodes(textExercises);

    text = text + textExercises;

    fs.writeFile(path, new Buffer(text));
  });
}

mdUtils.getText = function(section) {

  var chapter = '# ' + section.titulo[0] + '\n\n';
  var text = chapter + section.explicacao[0];

  return text;
}

mdUtils.getExercises = function(section) {

  var sectionExercise = "\n## Exercícios\n",
      exercises = section.exercicios[0],
      index = 0,
      openQuestion = function() {
        return "\n" + ++index + ". ";
      },
      openExercises = exercises['exercicio-aberto'],
      multipleChoiceExercises = exercises['exercicio-multiplaEscolha'],
      questions = "",
      openAnswer = "\n<!--@answer\n",
      closeAnswer = "-->\n";

  if(!!openExercises) {

    openExercises.forEach(function(openExercise) {

      var enunciado = openExercise.enunciado[0].replace("\n", "");

      var description = openQuestion() + enunciado;

      questions += description;

      questions += openAnswer + openExercise.resposta + closeAnswer;

    });
  }

  if(!!multipleChoiceExercises) {
    
    multipleChoiceExercises.forEach(function(multipleChoiceExercise) {

      var enunciado = multipleChoiceExercise.enunciado[0].replace("\n", "");

      var description = openQuestion() + enunciado;

      var choices = multipleChoiceExercise.alternativas[0].alternativa;

      choices.forEach(function(choice){
        description += "\n* " + choice.texto[0].replace(/\n/, "");
      });

      questions += description;

      questions += openAnswer + multipleChoiceExercise.resposta[0].texto + closeAnswer;

    });
  }

  var text = sectionExercise + questions;

  return text;
}

module.exports = mdUtils;