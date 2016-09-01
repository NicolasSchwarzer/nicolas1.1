var fs = require('fs'),
	path = require('../path'),
	basePath = path.systemJavascriptsPath(),
	exports = module.exports;

function getFilePaths() {

	var names = fs.readdirSync(basePath), name,
		configs = JSON.parse(fs.readFileSync(basePath + 'SCHEMA.json')), cfg,
		reg = /\*/g,
		result = [];

	for (var i = 0; i < configs.length; ++i) {

		cfg = configs[i];

		if (reg.test(cfg)) {

			cfg = cfg.replace(reg, '');

			for (var j = 0; j < names.length; ++j) {

				name = names[j];

				if (name.search(cfg) === 0) {

					result.push(basePath + name);
				}
			}
		}
		else {

			cfg += '.js';

			if (names.indexOf(cfg) !== -1) {

				result.push(basePath + cfg);
			}
		}
	}

	return path.uniquePaths(result);
}

exports.data = function() {

	var paths = getFilePaths(),
		i = 0, length = paths.length,
		result = [];

	for (; i < length; ++i) {

		result.push(fs.readFileSync(paths[i]));
	}

	return result.join('\n');
}
