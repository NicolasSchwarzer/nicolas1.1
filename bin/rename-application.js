var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	nameFrom = process.argv[2],
	nameTo = process.argv[3];

require('./nicolas_modules/string');

nameFrom = String.standardizeName(nameFrom);

nameTo = String.standardizeName(nameTo);

if (/^component/.test(nameFrom)) {

	console.log('Error: 请指定为页面名');

	return;
}

if (/^component/.test(nameTo)) {

	console.log('Error: 请重命名为页面名');

	return;
}

if (!path.isFile(path.applicationsHTML5Path() + nameFrom + '.html')) {

	console.log('指定页面 ' + nameFrom + ' 不存在');

	return;
}

if (path.isFile(path.applicationsHTML5Path() + nameTo + '.html')) {

	console.log('重命名页面 ' + nameTo + ' 已存在');

	return;
}

fs.renameSync(path.applicationsHTML5Path() + nameFrom + '.html', path.applicationsHTML5Path() + nameTo + '.html');

fs.renameSync(path.applicationsCSS3Path() + nameFrom + '.scss', path.applicationsCSS3Path() + nameTo + '.scss');

fs.renameSync(path.applicationsJavascriptsPath() + nameFrom + '.js', path.applicationsJavascriptsPath() + nameTo + '.js');

var srcPath = path.applicationsResourcesPath() + nameFrom;

if (path.isDir(srcPath)) {

	fs.renameSync(srcPath, path.applicationsResourcesPath() + nameTo);
}

console.log('页面 ' + nameFrom + ' 重命名为 ' + nameTo);
