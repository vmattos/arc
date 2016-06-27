var spawn = require('child_process').spawn
  , wsUtils = {};

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

wsUtils.fetchXml = function(courseParams, urls, options, courses) {
  var verbose = arguments[4],
      actual = i,
      url = urls[actual],
      xml = '',
      curl = spawn('curl', [url]),
      currentCourse = courses[actual];

  if(verbose)
    console.log('Fetching XML for ' + currentCourse + ' (' + url + ')');

  curl.stdout.on('data', function(data) {
    xml += data;
  });

  curl.on('close', function(code) {
    if(verbose)
      code == 0 ? 
        console.log('Finished receiving XML for ' + currentCourse)
        : console.log('Child process (curl) exited with code ' + code);


    courseParams.xmls.push(xml);

    try {
      courseParams.emit('newXml');
    } catch(e) {
      // Do nothing
    }
    
  }); 
}

wsUtils.fillCourseXmlList = function(courseParams, urls, options, courses) {
  for(i in urls) {
    this.fetchXml.apply(this, arguments);
  }
}

module.exports = wsUtils;