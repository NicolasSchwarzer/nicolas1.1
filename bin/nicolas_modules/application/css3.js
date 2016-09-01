var fs = require('fs'),
	path = require('../path'),
	exports = module.exports;

exports.data = function(name) {

	var css3Path = path.applicationsCSS3Path() + name + '.scss';

	if (path.isFile(css3Path)) {

		return fs.readFileSync(css3Path);
	}

	return '';
}
