var fs = require('fs'),
	exports = module.exports,
	paths = module.paths[0].split(/\//),
	length = paths.length, i = 0,
	basePath = [];

while (true) {

	if (paths[(length--) - 1] === 'bin') {

		break;
	}
}

for (; i < length; ++i) {

	basePath.push(paths[i]);
}

basePath = basePath.join('/').replace(/^\s*\//, '/');

exports.isDir = function(path) {

	return fs.existsSync(path) && fs.statSync(path).isDirectory();
};

exports.isFile = function(path) {

	return fs.existsSync(path) && fs.statSync(path).isFile();
};

exports.copy = function(src, dest) {

	var me = this,
		dirNameReg = /([^\/]+)\/?$/,
		slashReg = /\/$/,
		dest = slashReg.test(dest) ? dest : dest + '/';

	if (me.isDir(src)) {

		var dir = src.match(dirNameReg)[1] + '/',
			src = slashReg.test(src) ? src : src + '/',
			paths = fs.readdirSync(src),
			i = 0, length = paths.length;

		dest = dest + dir;

		if (!me.isDir(dest)) {

			fs.mkdirSync(dest);
		}

		for (; i < length; ++i) {

			me.copy(src + paths[i], dest);
		}
	}
	else if (me.isFile(src)) {

		var file = src.match(dirNameReg)[1];

		dest = dest + file;

		fs.writeFileSync(dest, fs.readFileSync(src));
	}
};

exports.clear = function(path, isChild) {

	var me = this;

	if (me.isDir(path)) {

		var path = /\/$/.test(path) ? path : path + '/',
			paths = fs.readdirSync(path),
			i = 0, length = paths.length;

		for (; i < length; ++i) {

			me.clear(path + paths[i], true);
		}

		isChild && fs.rmdirSync(path);
	}
	else if (me.isFile(path)) {

		fs.unlinkSync(path);
	}
};

exports.uniquePaths = function(paths) {

	var i = 0, length = paths.length,
		path,
		result = [];

	for (; i < length; ++i) {

		path = paths[i];

		if (result.indexOf(path) === -1) {

			result.push(path);
		}
	}

	return result;
};

exports.templatesNicolasCompassPath = function() {

	return basePath + '/templates/.nicolas-compass/';
};

exports.templatesApplicationHTMLPath = function() {

	return basePath + '/templates/application/application.html';
};

exports.templatesApplicationSCSSPath = function() {

	return basePath + '/templates/application/application.scss';
};

exports.templatesApplicationJavascriptPath = function() {

	return basePath + '/templates/application/application.js';
};

exports.binNicolasCompassPath = function() {

	return basePath + '/bin/';
};

exports.buildPath = function() {

	var path = basePath + '/build/';

	if (!this.isDir(path)) {

		fs.mkdirSync(path);
	};

	return path;
};

exports.buildTestingPath = function() {

	var me = this,
		path = me.buildPath() + 'testing/';

	if (!me.isDir(path)) {

		fs.mkdirSync(path);
	}

	return path;
};

exports.buildProductionPath = function() {

	var me = this,
		path = me.buildPath() + 'production/';

	if (!me.isDir(path)) {

		fs.mkdirSync(path);
	}

	return path;
};

exports.systemCSS3Path = function() {

	return basePath + '/system/css3/';
};

exports.systemJavascriptsPath = function() {

	return basePath + '/system/javascripts/';
};

exports.componentHTML5Path = function() {

	return basePath + '/components/html5/';
};

exports.componentCSS3Path = function() {

	return basePath + '/components/css3/';
};

exports.componentJavascriptsPath = function() {

	return basePath + '/components/javascripts/';
};

exports.componentResourcesPath = function() {

	return basePath + '/components/resources/';
};

exports.applicationsHTML5Path = function() {

	return basePath + '/applications/html5/';
};

exports.applicationsCSS3Path = function() {

	return basePath + '/applications/css3/';
};

exports.applicationsJavascriptsPath = function() {

	return basePath + '/applications/javascripts/';
};

exports.applicationsResourcesPath = function() {

	return basePath + '/applications/resources/';
}
