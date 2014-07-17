var wsUtils = {};

wsUtils.getUrls =  function(op) {
  var urls = []; 

  if(Object.keys(op.courses).length < 1) throw new Error('No course was found.');

  for(course in op.courses) {
    var course = op.courses[course];
    var url = op.alura + op.path + course + op.hash;
    urls.push(url);
  }

  return urls;
}

module.exports = wsUtils;