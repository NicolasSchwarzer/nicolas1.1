var exports = module.exports,
	fs = require('fs'),
	path = require('../path'),
	jsdom = require('jsdom').jsdom,
	htmlPath = path.componentHTML5Path(),
	cssPath = path.componentCSS3Path(),
	javascriptPath = path.componentJavascriptsPath(),
	resourcePath = path.componentResourcesPath();

require('../string');
require('../array');

function pushNames(names, node) {

	Array.forEach(node.children, pushNames, names);

	var name = node.getAttribute('data-nicolas-component');

	if (node.tagName === 'DIV' && name && names.indexOf(name) === -1) {

		names.push(name);
	}
}

exports.getComponentNames = function(html5Data) {

	var bodyNode = jsdom(html5Data).body,
		names = [];

	Array.forEach(bodyNode.children, pushNames, names);

	return names;
};

exports.getComponentHTML = function(name) {

	var targetPath = htmlPath + String.standardizeName('component.' + name) + '.html';

	if (path.isFile(targetPath)) {

		return jsdom(fs.readFileSync(targetPath));
	}
};

exports.getComponentCSS = function(name) {

	var targetPath = cssPath + String.standardizeName('component.' + name) + '.scss';

	if (path.isFile(targetPath)) {

		return fs.readFileSync(targetPath);
	}

	return '';
};

exports.getComponentJavascript = function(name) {

	name = String.standardizeName('component.' + name);

	var targetPath = javascriptPath + name + '.js',
		result = '';

	if (path.isFile(targetPath)) {

		result = fs.readFileSync(targetPath);
	}

	name = String.capitalizeName(name);

	result = 'function nicolasInitialize' + name + '(exports) {\n\n' + result;

	result = result.replace(/\n/g, '\n\t');

	return result + '\n}\n';
};

exports.copyResources = function(name, dest) {

	var targetPath = resourcePath + String.standardizeName('component.' + name);

	path.copy(targetPath, dest);
};
