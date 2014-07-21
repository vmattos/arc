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

    text += afcUtils.setExercises(secao);

    fs.writeFile(path, new Buffer(text));
  });
}

afcUtils.setText = function(section) {
  var chapter = '[chapter ' + section.titulo[0] + ']\n\n';
  var text = chapter + section.explicacao[0];

  return text
}

afcUtils.setExercises = function(section) {
  var sectionExercise = "[section Exercícios]\n";
  var openTagExercise = "[exercise]\n";
  var exercises = section.exercicios[0];
  var answers = {};
  var openExercises = exercises['exercicio-aberto'];
  var multipleChoiceExercises = exercises['exercicio-multiplaEscolha'];

  openExercises.forEach(function(exercise) {
    var question = exercise.enunciado[0];
  });


  multipleChoiceExercises.forEach(function(exercise) {
    var question = exercise.enunciado[0];
    console.log(question);
  });
  // console.log(openExercises)
  // for(var i in exercises) {
  //   var exercise = exercises[i];

  //   var tagChoices = "";
  //   var openQuestion = "[question]\n";
  //   var enunciation = exercise.enunciado;

  //   if (!exercise.match("/aberto/")) {

    //   var openList = "[list]\n";
    //   var choices = exercise.alternativas[0];

    //   tagChoices = openList;

    //   choices.forEach(function(choice){
    //     tagChoices += "* " + choice.texto + "\n";
    //   });
    //   var closeList = "[/list]\n";

    //   tagChoices += closeList;
    // }

    // var closeQuestion = "[/question]\n"

    // answers[exercise.numero] = exercise.resposta;
  // }

  // var closeTagExercise = "[/exercise]\n";

  // var exerciseText = sectionExercise + openTagExercise + openQuestion + enunciation + 
  //   tagChoices + closeQuestion + closeTagExercise;

  return "";
}

module.exports = afcUtils;