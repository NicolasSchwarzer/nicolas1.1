var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	name = process.argv[2];

require('./nicolas_modules/string');

name = String.standardizeName(name);

if (/^component/.test(name)) {

	console.log('Error: 请输入页面名');

	return;
}

if (!path.isFile(path.applicationsHTML5Path() + name + '.html')) {

	console.log('页面 ' + name + ' 不存在');

	return;
}

fs.unlinkSync(path.applicationsHTML5Path() + name + '.html');

fs.unlinkSync(path.applicationsCSS3Path() + name + '.scss');

fs.unlinkSync(path.applicationsJavascriptsPath() + name + '.js');

var srcPath = path.applicationsResourcesPath() + name;

if (path.isDir(srcPath)) {

	path.clear(srcPath, true);
}

console.log('页面 ' + name + ' 已删除');
