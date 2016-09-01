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
	htmlBeautifier = require('js-beautify').html,
	componentReg = /^component/,
	name = process.argv[2];

require('./nicolas_modules/string');

function writeTestingDir(name) {

	var pagePath = path.applicationsHTML5Path();

	if (!path.isFile(pagePath + name + '.html')) {

		console.log('Error: 页面 ' + name + ' 不存在');

		return;
	}

	var testingPath = path.buildTestingPath(),
		testingFilePath = testingPath + name,
		html5Data = applicationHTML5.data(name),
		compName, compNames = component.getComponentNames(html5Data),
		i = 0, length = compNames.length,
		css3Data = [systemCSS3.data()],
		javascriptData = [systemJavascript.data()];

	for (; i < length; ++i) {

		compName = compNames[i];

		css3Data.push(component.getComponentCSS(compName));

		javascriptData.push(component.getComponentJavascript(compName));

		component.copyResources(compName, testingPath);
	}

	css3Data.push(applicationCSS3.data(name));

	javascriptData.push(applicationJavascript.data(name));

	fs.writeFileSync(testingFilePath + '.html', htmlBeautifier(html5Data));

	fs.writeFileSync(testingFilePath + '.css', compass.compile(css3Data.join('\n')));

	fs.writeFileSync(testingFilePath + '.js', javascriptData.join('\n'));

	applicationResource.transferResources(name, true);

	console.log('页面 ' + name + ' 编译完成');
}

name = String.standardizeName(name);

if (componentReg.test(name)) {

	console.log('Error: 请编译页面');

	return;
}

writeTestingDir(name);
