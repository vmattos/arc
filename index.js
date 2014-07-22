var wsUtils = require('./src/ws/ws-utils.js')
  , xmlUtils = require('./src/xml/xml-utils')
  , afcUtils = require('./src/afc/afc-utils')
  , options = require('./src/ws/ws-options')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , courses = Object.keys(options.courses)
  , urls = wsUtils.getUrls(options);

// Params to generate full AFC
var CourseParams = function() {
  this.courseName =  options.courseName || courses[0],
  this.xmls = [],
  this.afcs = [],
  this.totalSections = []
};

util.inherits(CourseParams, EventEmitter);

var courseParams = new CourseParams();

wsUtils.fillCourseXmlList(courseParams, urls, options, courses, true);

courseParams.on('newXml', function() { 

  if(courses.length == this.xmls.length) {
    xmlUtils.parse(courseParams);

    courseParams.afcs.forEach(function(afc) {
      var sections = afc.curso.secoes[0].secao;

      sections.forEach(function(section) {
        courseParams.totalSections.push(section);
      });
    });

    afcUtils.createDirectory(courseParams);
    afcUtils.createAfcs(courseParams);
  }
});