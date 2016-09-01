var path = require('./nicolas_modules/path'),
	targetPath = path.buildPath() + 'testing/';

if (path.isDir(targetPath)) {

	path.clear(path.buildTestingPath());
}

console.log('目录 build testing 清理完成');
