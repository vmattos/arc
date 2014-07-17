var wsUtils = require('./src/ws/ws-utils.js')
  , xmlUtils = require('./src/xml/xml-utils')
  , options = require('./src/ws/ws-options')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , courses = Object.keys(options.courses)
  , urls = wsUtils.getUrls(options);

// Params to generate full AFC
var CourseParams = function() {
  this.courseName =  options.courseName || courses[0],
  this.xmls = [],
  this.afcs = []
};

util.inherits(CourseParams, EventEmitter);

var courseParams = new CourseParams();

wsUtils.fillCourseXmlList(courseParams, urls, options, courses, true);

courseParams.on('newXml', function() { 

  if(courses.length == this.xmls.length) {
    this.afcs = xmlUtils.parse(courseParams);
  }
});