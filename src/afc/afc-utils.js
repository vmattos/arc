var fs = require('fs')
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

  var exercises = section.exercicios[0];
  var answers = {};

  var openExercises = exercises['exercicio-aberto'];
  var multipleChoiceExercises = exercises['exercicio-multiplaEscolha'];

  var openQuestion = "[question]\n"
  var questions = "";
  var closeQuestion = "[/question]\n"

  openExercises.forEach(function(openExercise) {

    questions += openQuestion;

    var description = openExercise.enunciado[0];

    questions += description + closeQuestion;

    answers[openExercise.numero] = openExercise.resposta;

  });

  multipleChoiceExercises.forEach(function(multipleChoiceExercise) {

    questions += openQuestion;

    var description = multipleChoiceExercise.enunciado[0];

    var openList = "[list]\n";

    var choices = multipleChoiceExercise.alternativas[0];

    var tagChoices = openList;

    choices.forEach(function(choice){
      tagChoices += "* " + choice.texto + "\n";
    });

    questions += description + tagChoices + closeQuestion;

    answers[multipleChoiceExercise.numero] = multipleChoiceExercise.resposta;

  });

  var text = sectionExercise + openTagExercise + questions + closeTagExercise;

  return text;
}

module.exports = afcUtils;