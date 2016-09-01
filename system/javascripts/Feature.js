/**
 *
 * @author Nicolas Wan
 *
 * Feature API
 *
 * public property Boolean isTouch;
 *
 * public instance String getSupportedPropertyName(Mixed object, String name);
 *
 * */

window.Feature = {};

~function() {

	var prototype = this;

	Object.defineProperties(prototype, {

		'isTouch': {

			get: function() {

				return OS.isIOS || OS.isAndroid;
			}
		}
	});

	prototype.getSupportedPropertyName = function(object, name) {

		var vendorName = '-webkit-' + name;

		if (name in object) {

			return name;
		}
		else if (vendorName in object) {

			return vendorName;
		}
	};

}.call(Feature);
