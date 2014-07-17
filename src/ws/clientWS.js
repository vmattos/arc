var wsUtils = require('./ws-utils.js')
  , options = require('./ws-options')
  , courses = Object.keys(options.courses)
  , urls = wsUtils.getUrls(options);

// Params to generate full AFC
var courseParams = {
  courseName: options.courseName || courses[0],
  xmls: []
};

wsUtils.fillCourseXmlList(courseParams, urls, options, courses, true);