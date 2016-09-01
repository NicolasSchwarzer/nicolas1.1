var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	nameFrom = process.argv[2],
	nameTo = process.argv[3],
	fileNameFrom, fileNameTo;

require('./nicolas_modules/string');

nameFrom = String.standardizeName(nameFrom);

fileNameFrom = String.standardizeName('component.' + nameFrom);

nameTo = String.standardizeName(nameTo);

fileNameTo = String.standardizeName('component.' + nameTo);

if (!path.isFile(path.componentHTML5Path() + fileNameFrom + '.html')) {

	console.log('指定组件 ' + nameFrom + ' 不存在');

	return;
}

if (path.isFile(path.componentHTML5Path() + fileNameTo + '.html')) {

	console.log('重命名组件 ' + nameTo + ' 已存在');

	return;
}

fs.renameSync(path.componentHTML5Path() + fileNameFrom + '.html', path.componentHTML5Path() + fileNameTo + '.html');

fs.renameSync(path.componentCSS3Path() + fileNameFrom + '.scss', path.componentCSS3Path() + fileNameTo + '.scss');

fs.renameSync(path.componentJavascriptsPath() + fileNameFrom + '.js', path.componentJavascriptsPath() + fileNameTo + '.js');

var srcPath = path.componentResourcesPath() + fileNameFrom;

if (path.isDir(srcPath)) {

	fs.renameSync(srcPath, path.componentResourcesPath() + fileNameTo);
}

console.log('组件 ' + nameFrom + ' 重命名为 ' + nameTo);
