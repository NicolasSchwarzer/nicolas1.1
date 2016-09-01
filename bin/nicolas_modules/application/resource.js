var path = require('../path');

exports.transferResources = function(name, isTesting) {

	var srcPath = path.applicationsResourcesPath() + name,
		destPath = isTesting ? path.buildTestingPath() : path.buildProductionPath();

	path.copy(srcPath, destPath);
};
