var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	name = process.argv[2], hasSrc = process.argv[3] === '-r' ? true : false;

require('./nicolas_modules/string');

name = String.standardizeName(name);

if (/^component/.test(name)) {

	console.log('Error: 请输入页面名');

	return;
}

if (path.isFile(path.applicationsHTML5Path() + name + '.html')) {

	console.log('页面 ' + name + ' 已存在');

	return;
}

fs.writeFileSync(path.applicationsHTML5Path() + name + '.html', fs.readFileSync(path.templatesApplicationHTMLPath()));

fs.writeFileSync(path.applicationsCSS3Path() + name + '.scss', fs.readFileSync(path.templatesApplicationSCSSPath()));

fs.writeFileSync(path.applicationsJavascriptsPath() + name + '.js', fs.readFileSync(path.templatesApplicationJavascriptPath()));

if (hasSrc) {

	var srcPath = path.applicationsResourcesPath() + name;

	if (path.isDir(srcPath)) {

		path.clear(srcPath);
	}
	else {

		fs.mkdirSync(srcPath);
	}
}

console.log('页面 ' + name + ' 创建完成');
