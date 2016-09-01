/**
 *
 * @author Nicolas Wan
 *
 * Location Extended Properties
 *
 * public property String page;
 *
 * public property Object params;
 *
 * */

~function() {

	var prototype = this,
		pageReg = /\/([^\/]+)$/;

	Object.defineProperties(prototype, {

		page: {

			get: function() {

				return this.href.match(pageReg)[1];
			}
		},

		params: {

			get: function() {

				return Object.fromQueryString(this.search.replace(/^\?/, ''));
			}
		}
	});

}.call(location);
