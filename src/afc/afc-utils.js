var fs = require('fs')
  , xmlUtils = require('../xml/xml-utils')
  , afcUtils = {};


afcUtils.createDirectory = function(courseParams) {
  var courseName = courseParams.courseName;
  var path = 'AFC/' + courseName;

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

    var textExercises = afcUtils.setExercises(secao);

    textExercises = xmlUtils.parseAfc(textExercises);

    textExercises = xmlUtils.replaceCodes(textExercises);

    text = text + textExercises;

    fs.writeFile(path, new Buffer(text));
  });
}

afcUtils.setText = function(section) {

  var chapter = '[chapter ' + section.titulo[0] + ']\n\n';
  var text = chapter + section.explicacao[0];

  return text;
}

afcUtils.setExercises = function(section) {

  var sectionExercise = "[section Exercícios]\n";
  var openTagExercise = "[exercise]\n";
  var closeTagExercise = "[/exercise]\n";

  var exercises = section.exercicios[0];

  var openExercises = exercises['exercicio-aberto'];
  var multipleChoiceExercises = exercises['exercicio-multiplaEscolha'];

  var openQuestion = "[question]\n"
  var closeQuestion = "\n[/question]\n"

  var questions = "";

  var answers = {};

  if(!!openExercises) {

    openExercises.forEach(function(openExercise) {

      questions += openQuestion;

      var description = openExercise.enunciado[0];

      questions += description + closeQuestion;

      answers[openExercise.numero] = openExercise.resposta;

    });
  }


  if(!!multipleChoiceExercises) {
    
    multipleChoiceExercises.forEach(function(multipleChoiceExercise) {

      questions += openQuestion;

      var description = multipleChoiceExercise.enunciado[0];

      var openList = "\n[list]\n";

      var closeList = "\n[/list]\n";

      var choices = multipleChoiceExercise.alternativas[0].alternativa;

      var tagChoices = openList;

      choices.forEach(function(choice){
        tagChoices += "* " + choice.texto[0].replace(/\n/, "") + "\n";
      });

      tagChoices += closeList;

      questions += description + tagChoices + closeQuestion;

      answers[multipleChoiceExercise.numero] = multipleChoiceExercise.resposta;

    });
  }

  var text = sectionExercise + openTagExercise + questions + closeTagExercise;

  return text;
}

module.exports = afcUtils;