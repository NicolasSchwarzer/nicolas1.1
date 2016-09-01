/**
 *
 * @author Nicolas Wan
 *
 * String API
 *
 * public static String capitalize(String value);
 *
 * public static String join([Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static String split(String value, Mixed separator [, Number limit])
 *
 * public static String hyphen2CamelCase(String value);
 *
 * public static String camelCase2Hyphen(String value);
 *
 * public static String dot2CamelCase(String value);
 *
 * public static String camelCase2Dot(String value);
 *
 * public static String urlAppend(String url, Object params);
 *
 * */

~function() {

	var hyphenReg = /-/,
		upperCaseReg = /[A-Z]/g,
		dotReg = /\./,
		hyphenRep = '-$&',
		emptyStr = '',
		hyphenStr = '-',
		dotStr = '.';

	String.capitalize = function(value) {

		return value.charAt(0).toUpperCase() + value.substr(1);
	};

	String.join = function() {

		var data = Array.from(arguments);

		Array.remove(data, undefined);
		Array.remove(data, null);

		return data.join(emptyStr);
	};

	String.split = function(value, separator, limit) {

		var result = value.split(separator, limit);

		Array.remove(result, '');

		return result;
	};

	String.hyphen2CamelCase = function(value) {

		return generateStringArray(value, hyphenReg, toUpperCase).join(emptyStr);
	};

	String.camelCase2Hyphen = function(value) {

		return generateStringArray(value.replace(upperCaseReg, hyphenRep), hyphenReg, toLowerCase).join(hyphenStr);
	};

	String.dot2CamelCase = function(value) {

		return generateStringArray(value, dotReg, toUpperCase).join(emptyStr);
	};

	String.camelCase2Dot = function(value) {

		var result = generateStringArray(value.replace(upperCaseReg, hyphenRep), hyphenReg, toLowerCase),
			lastIndex = result.length - 1;

		result[lastIndex] = String.capitalize(result[lastIndex]);

		return result.join(dotStr);
	};

	String.urlAppend = function(url, params) {

		var suffix = Object.toQueryString(params);

		if (suffix === '') {

			return url;
		}
		else {

			return url + (url.indexOf('?') === -1 ? '?' : '&') + suffix;
		}
	};

	function generateStringArray(value, splitReg, func) {

		var result = [];

		Array.forEach(value.split(splitReg), func, result);

		return result;
	}

	function toUpperCase(result, value, index) {

		if (index !== 0) {

			value = String.capitalize(value);
		}

		result.push(value);
	}

	function toLowerCase(result, value, index) {

		if (index !== 0) {

			value = value.toLowerCase();
		}

		result.push(value);
	}

}();
