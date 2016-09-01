/**
 *
 * @author Nicolas Wan
 *
 * OS API
 *
 * public property Boolean isIOS;
 *
 * public property Boolean isAndroid;
 *
 * public property Boolean isMac;
 *
 * public property Boolean isWindows;
 *
 * */

window.OS = {};

~function() {

	var userAgent = navigator.userAgent;

	Object.defineProperties(this, {

		'isIOS': {

			get: function() {

				return /iPhone|iPad/.test(userAgent);	
			}
		},

		'isAndroid': {

			get: function() {

				return /Android/.test(userAgent);
			}
		},

		'isMac': {

			get: function() {

				return /Mac/.test(userAgent) && !this.isIOS;
			}
		},

		'isWindows': {

			get: function() {

				return /Windows/.test(userAgent);
			}
		}
	});
}.call(OS);
