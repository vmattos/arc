var spawn = require('child_process').spawn
  , wsUtils = require('./ws-utils.js')
  , options = require('./ws-options')
  , courses = Object.keys(options.courses);
  , urls = wsUtils.getUrls(options);

// Params to generate full AFC
var courseParms = {
  courseName: options.courseName || courses[0],
  xmls: []
};


for(i in urls) {
  (function() {
    var atual = i;
    var url = urls[atual]
    var xml = ''
    var curl = spawn('curl', [url]);

    console.log('Fetching XML for ' + courses[atual] + '(' + url + ')');

    curl.stdout.on('data', function(data) {
      xml += data;
    });

    curl.on('close', function(code) {
      code == 0 ? 
        console.log('Finished receiving XML for ' + courses[atual])
        : console.log('Child process (curl) exited with code ' + 0);
    }); 
  })();
}

