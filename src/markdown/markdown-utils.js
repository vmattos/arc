var fs = require('fs')
  , xmlUtils = require('../xml/md-xml-utils')
  , mdUtils = {};


mdUtils.createDirectory = function(courseParams) {
  var path = courseParams.path;

  fs.mkdir(path, function(err) {
    if (err) console.log(err);
  });
}

mdUtils.createImageDirectory = function(courseParams) {
  var imagesPath = courseParams.imagesPath;

  fs.mkdir(imagesPath, function(err) {
    if (err) console.log(err);
  });
}

mdUtils.removeAccents = function(string) {

  var map = { 
    "â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A",
    "ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E",
    "î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I",
    "ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","õ":"o","Õ":"O",
    "û":"u","Û":"U","ù":"u","Ù":"U","ú":"u","Ú":"U","ü":"u","Ü":"U",
    "ç":"c","Ç":"C"
  };

  string = string.replace(/[\W\[\] ]/g, function(a) {
    return map[a]||a;
  });

  return string;
}

mdUtils.createMds = function(courseParams) {

  var secoes = courseParams.totalSections;

  secoes.forEach(function(secao, index) {

    var prefix = index < 9 ? '0' + (index+1) : '' + (index+1),
        sectionTitle = secao.titulo[0],
        title = prefix + '-' + sectionTitle.replace(/ /g, '-');

    title = mdUtils.removeAccents(title);
    title += '.md';

    var path = courseParams.path + '/' + title,
        text = mdUtils.getText(secao),
        textExercises = mdUtils.getExercises(secao);

    textExercises = xmlUtils.parseMd(textExercises, courseParams);
    textExercises = xmlUtils.replaceCodes(textExercises);
    textExercises = xmlUtils.replaceMiniCodes(textExercises);

    text = text + textExercises;

    fs.writeFile(path, new Buffer(text));
  });
}

mdUtils.getText = function(section) {

  var chapter = '# ' + section.titulo[0] + '\n\n',
      text = chapter + section.explicacao[0];

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

      var enunciado = openExercise.enunciado[0].replace("\n", ""), 
          description = openQuestion() + enunciado;

      questions += description;

      questions += openAnswer + openExercise.resposta + closeAnswer;

    });
  }

  if(!!multipleChoiceExercises) {
    
    multipleChoiceExercises.forEach(function(multipleChoiceExercise) {

      var enunciado = multipleChoiceExercise.enunciado[0].replace("\n", ""),
          description = openQuestion() + enunciado,
          choices = multipleChoiceExercise.alternativas[0].alternativa;

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