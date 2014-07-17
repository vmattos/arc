var should = require('should')
  , wsUtils = require('../../src/ws/ws-utils.js');

describe('wsUtils', function() {

  it('should have getUrls function', function() {
    wsUtils.should.have.property('getUrls');
  });

  describe('getUrls', function() {

    var wsOptions = {}

    beforeEach(function() {
      wsOptions = {
        alura: "http://fakealura.com.br",
        path: "/ws/fake/",
        hash: "/fAk3h45h",

        courses: {
        }
      }
    });

    it('should return url given 1 course', function() {
      wsOptions.courses.module1 = "module1";

      var urls = wsUtils.getUrls(wsOptions);
      urls.should.have.length(1);
    });

    it('should return urls given 2 courses', function() {
      wsOptions.courses.module1 = "module1";
      wsOptions.courses.module2 = "module2";

      var urls = wsUtils.getUrls(wsOptions);
      urls.should.have.length(2);
    });
  });
});