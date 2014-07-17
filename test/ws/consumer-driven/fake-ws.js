// This is a fake WS used for consumer-driven tests

var http = require('http');

function createServer() {

  var server = http.createServer(function(req, res) {
    if(req.url == "/ws/fake/fake1/fAk3h45h") {
      res.write('<xml>fake1</xml>');
      res.end();
    }

    if(req.url == "/ws/fake/fake2/fAk3h45h") {
      res.write('<xml>fake2</xml>');
      res.end();

      server.close();
    }  
  })

  return server;
}

exports.createServer = createServer;