/**
 *
 * @author Nicolas Wan
 *
 * JSON API
 *
 * public static Object getPathValue(Object data, String path);
 *
 * public static Object setPathValue(Object data, String path, Mixed value);
 *
 * */

~function() {

	var dotReg = /\./,
		numberReg = /^\d+$/;

	JSON.getPathValue = function(data, path) {

		var names = String.split(path, dotReg),
			i = 0, length = names.length,
			result = data;

		for (; i < length; ++i) {

			result = result[names[i]];

			if (result === null || result === undefined) {

				break;
			}
		}

		return result;
	};

	function setPathValue(data, names, value) {

		var name = names.shift(),
			result;

		if (names.length === 0) {

			data[name] = value;

			return;
		}

		result = data[name];

		if (!Array.isArray(result) && !Object.isObject(result)) {

			if (numberReg.test(names[0])) {

				result = data[name] = [];
			}
			else {

				result = data[name] = {};
			}
		}

		setPathValue(result, names, value);
	}

	JSON.setPathValue = function(data, path, value) {

		setPathValue(data, String.split(path, dotReg), value);

		return data;
	};

}();
