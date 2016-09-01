var systemCSS3 = require('./nicolas_modules/system/css3'),
	systemJavascript = require('./nicolas_modules/system/javascript'),
	component = require('./nicolas_modules/component/component'),
	applicationHTML5 = require('./nicolas_modules/application/html5'),
	applicationCSS3 = require('./nicolas_modules/application/css3'),
	applicationJavascript = require('./nicolas_modules/application/javascript'),
	applicationResource = require('./nicolas_modules/application/resource'),
	path = require('./nicolas_modules/path'),
	compass = require('./nicolas_modules/compass'),
	fs = require('fs'),
	htmlMinifier = require('html-minifier').minify,
	cleanCSS = new (require('clean-css')),
	uglifyJS = require('uglify-js').minify,
	componentReg = /^component/,
	name = process.argv[2];

require('./nicolas_modules/string');

function writeProductionDir(name) {

	var pagePath = path.applicationsHTML5Path();

	if (!path.isFile(pagePath + name + '.html')) {

		console.log('Error: 页面 ' + name + ' 不存在');

		return;
	}

	var productionPath = path.buildProductionPath(),
		productionFilePath = productionPath + name,
		html5Data = applicationHTML5.data(name),
		compName, compNames = component.getComponentNames(html5Data),
		i = 0, length = compNames.length,
		css3Data = [systemCSS3.data()],
		javascriptData = [systemJavascript.data()];

	for (; i < length; ++i) {

		compName = compNames[i];

		css3Data.push(component.getComponentCSS(compName));

		javascriptData.push(component.getComponentJavascript(compName));

		component.copyResources(compName, productionPath);
	}

	css3Data.push(applicationCSS3.data(name));

	javascriptData.push(applicationJavascript.data(name));

	fs.writeFileSync(productionFilePath + '.html', htmlMinifier(html5Data, {
		removeAttributeQuotes: true,
		collapseWhitespace: true
	}));

	fs.writeFileSync(productionFilePath + '.css', cleanCSS.minify(compass.compile(css3Data.join('\n'))).styles);

	fs.writeFileSync(productionFilePath + '.js', uglifyJS(javascriptData.join('\n'), {
		fromString: true
	}).code);

	applicationResource.transferResources(name, false);

	console.log('页面 ' + name + ' 编译压缩完成');
}

name = String.standardizeName(name);

if (componentReg.test(name)) {

	console.log('Error: 请编译页面');

	return;
}

writeProductionDir(name);
