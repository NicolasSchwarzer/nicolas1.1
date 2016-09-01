var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	name = process.argv[2];

require('./nicolas_modules/string');

name = String.standardizeName(name);
fileName = String.standardizeName('component.' + name);

if (!path.isFile(path.componentHTML5Path() + fileName + '.html')) {

	console.log('组件 ' + name + ' 不存在');

	return;
}

fs.unlinkSync(path.componentHTML5Path() + fileName + '.html');

fs.unlinkSync(path.componentCSS3Path() + fileName + '.scss');

fs.unlinkSync(path.componentJavascriptsPath() + fileName + '.js');

var srcPath = path.componentResourcesPath() + fileName;

if (path.isDir(srcPath)) {

	path.clear(srcPath, true);
}

console.log('组件 ' + name + ' 已删除');
