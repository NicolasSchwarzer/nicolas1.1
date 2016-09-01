var fs = require('fs'),
	path = require('../path'),
	exports = module.exports;

exports.data = function(name) {

	var javascriptPath = path.applicationsJavascriptsPath() + name + '.js';

	if (path.isFile(javascriptPath)) {

		return fs.readFileSync(javascriptPath);
	}

	return '';
}
