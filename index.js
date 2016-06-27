var wsUtils = require('./src/ws/ws-utils.js')
  , xmlUtils = require('./src/xml/md-xml-utils')
  , mdUtils = require('./src/markdown/markdown-utils')
  , options = require('./src/ws/ws-options')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , courses = Object.keys(options.courses)
  , urls = wsUtils.getUrls(options);

// Params to generate full Markdown File
var CourseParams = function() {
  this.courseName =  options.courseName || courses[0],
  this.path = 'Markdown/' + this.courseName,
  this.imagesPath = this.path + '/images',
  this.xmls = [],
  this.mds = [],
  this.totalSections = []
};

util.inherits(CourseParams, EventEmitter);

var courseParams = new CourseParams();

wsUtils.fillCourseXmlList(courseParams, urls, options, courses, true);

courseParams.on('newXml', function() { 

  if(courses.length == this.xmls.length) {
    xmlUtils.parse(courseParams);

    courseParams.mds.forEach(function(md) {
      var sections = md.curso.secoes[0].secao;

      sections.forEach(function(section) {
        courseParams.totalSections.push(section);
      });
    });

    mdUtils.createDirectory(courseParams);
    mdUtils.createImageDirectory(courseParams);
    mdUtils.createMds(courseParams);
  }
});