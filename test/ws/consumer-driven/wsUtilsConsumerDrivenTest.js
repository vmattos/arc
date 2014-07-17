var should = require('should')
  , wsUtils = require('../../../src/ws/ws-utils.js')
  , fakeWs = require('./fake-ws')
  , port = process.env.PORT || 5000
  , server = fakeWs.createServer();

server.listen(port, function() {
  
  describe('wsUtils', function(){

    it('should have fillCourseXmlList function', function() {
      wsUtils.should.have.property('fillCourseXmlList');
    });

    describe('fillCourseXmlList', function() {
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

      wsUtils.fillCourseXmlList(courseParams, urls, wsOptions, courses);

      it('should fill courseParams xml list', function() {
        courseParams.xmls.should.not.empty;
      });

    });

  });

});
