var path = require('./nicolas_modules/path'),
	targetPath = path.buildPath() + 'production/';

if (path.isDir(targetPath)) {

	path.clear(path.buildProductionPath());
}

console.log('目录 build production 清理完成');
