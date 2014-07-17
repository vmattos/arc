var wsUtils = require('./ws-utils.js')
  , options = require('./ws-options')
  , courses = Object.keys(options.courses)
  , urls = wsUtils.getUrls(options);

// Params to generate full AFC
var courseParms = {
  courseName: options.courseName || courses[0],
  xmls: []
};

wsUtils.fillCourseXmlList(courseParms, urls, options, courses);