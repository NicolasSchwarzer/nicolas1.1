/**
 *
 * @author Nicolas Wan
 *
 * Array API
 *
 * public static Array isArray(Mixed data);
 *
 * public static Array from(Array data);
 *
 * public static Mixed|undefined forEach(Mixed[] data, Function func [, Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static Array join([Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static Array unique(Array data);
 *
 * public static Boolean push(Array data, Mixed item);
 *
 * public static Boolean remove(Array data, Mixed item);
 *
 * public static Boolean removeAll(Mixed data);
 *
 * */

~function() {

	if (!('isArray' in Array)) {

		Array.isArray = function(data) {

			return Object.prototype.toString.call(data) === '[object Array]';
		};
	}

	if (!('from' in Array)) {

		Array.from = function(data) {

			var i = 0, length = data.length,
				result = [];

			for (; i < length; ++i) {

				result.push(data[i]);
			}

			return result;
		};
	}

	Array.forEach = function(data, func) {

		var i = 0, length = data.length,
			args = Array.from(arguments),
			start, result;

		args.splice(0, 2);
		args.splice(start = args.length, 0, 1, 2, 3);
		
		for (; i < length; ++i) {

			args[start] = data[i];
			args[start + 1] = i;
			args[start + 2] = data;

			result = func.apply(undefined, args);

			if (result !== undefined) {

				return result;
			}
		}
	};

	function join(result, item) {

		Array.push(result, item);
	}

	Array.join = function() {

		var result = [];

		Array.forEach(arguments, join, result);

		return result;
	};

	function unique(result, item) {

		if (result.indexOf(item) === -1) {

			result.push(item);
		}
	}

	Array.unique = function(data) {

		var result = [];

		Array.forEach(data, unique, result);

		return result;
	};

	function push(data, item) {

		Array.push(data, item);
	}

	Array.push = function(data, item) {

		if (item instanceof Array) {

			var oldLength = data.length;

			Array.forEach(item, push, data);

			if (data.length > oldLength) {

				return true;
			}
		}
		else {

			if (data.indexOf(item) === -1) {

				data.push(item);

				return true;
			}
		}

		return false;
	};

	function remove(data, item) {

		Array.remove(data, item);
	}

	Array.remove = function(data, item) {

		if (item instanceof Array) {

			var oldLength = data.length;

			Array.forEach(item, remove, data);

			if (data.length < oldLength) {

				return true;
			}

			return false;
		}
		
		var index, result = false;

		while ((index = data.indexOf(item)) !== -1) {

			data.splice(index, 1);

			result = true;
		}

		return result;
	};

	Array.removeAll = function(data) {

		if (data.length) {

			data.length = 0;

			return true;
		}

		return false;
	};
}();
