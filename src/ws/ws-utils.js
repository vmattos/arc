var wsUtils = {};

wsUtils.getUrls =  function(op) {
  var urls = []; 

  for(course in op.courses) {
    var course = op.courses[course];
    var url = op.alura + op.path + course + op.hash;
    urls.push(url);
  }

  return urls;
}

module.exports = wsUtils;