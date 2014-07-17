var should = require('should')
  , wsUtils = require('../../../src/ws/ws-utils.js')
  , fakeWs = require('./fake-ws')
  , port = process.env.PORT || 5000
  , server = fakeWs.createServer();

var courseParams = {}
        , wsOptions = {}
        , urls = []
        , courses = [];

      courseParams = {
        courseName: 'Test',
        xmls: []
      }

      wsOptions = {
        alura: "http://localhost:" + port,
        path: "/ws/fake/",
        hash: "/fAk3h45h",

        courses: {
          module1: "fake1",
          module2: "fake2"
        }
      }

      urls = wsUtils.getUrls(wsOptions);
      courses = Object.keys(wsOptions.courses);

      

describe('wsUtils consumer-driven tests', function(){

  it('should have fillCourseXmlList function', function() {
    wsUtils.should.have.property('fillCourseXmlList');
  });

  server.listen(port, function() {
  
    wsUtils.fillCourseXmlList(courseParams, urls, wsOptions, courses);

    describe('fillCourseXmlList', function() {
      

      it('should fill courseParams xml list', function() {
        courseParams.xmls.should.not.empty;
      });

    });

    describe('courseParams', function() {

      it('should have xmls array with lenght 2', function() {
        courseParams.xmls.should.have.length(2);
      });
    });

  });

});
