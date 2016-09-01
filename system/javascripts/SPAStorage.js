/**
 *
 * @author Nicolas Wan
 *
 * SPAStorage API
 *
 * public property Object data;
 *
 * public property Number index;
 *
 * public property String page;
 *
 * public property Object params;
 *
 * public property Number length;
 *
 * public instance undefined addData(String page [, Object params])
 *
 * */

window.SPAStorage = {};

~function() {

	var prototype = this,
		storage;

	Object.defineProperties(prototype, {

		data: {

			get: function() {

				if (!storage) {

					storage = sessionStorage.getItem(location.page);

					if (storage) {

						storage = JSON.parse(storage);
					}
					else {

						storage = {index: -1, pages: [], params: []};
					}
				}

				return storage;
			}
		},

		index: {

			set: function(value) {

				var me = this, length = me.length,
					storage = me.data;

				if (storage.index === -1) {

					return;
				}

				if (value < 0) {

					storage.index = 0;
				}
				else if (value >= length) {

					storage.index = length - 1;
				}
				else {

					storage.index = value;
				}
			},

			get: function() {

				return this.data.index;
			}
		},

		page: {

			get: function() {

				var storage = this.data;

				return storage.pages[storage.index] || '';
			}
		},

		params: {

			get: function() {

				var storage = this.data;

				return storage.params[storage.index] || {};
			}
		},

		length: {

			get: function() {

				return this.data.pages.length;
			}
		}
	});

	prototype.addData = function(page, params) {

		var storage = this.data, index = storage.index,
			pages = storage.pages, parameters = storage.params,
			length = pages.length;

		pages.splice(index + 1, length - index);

		pages.push(page || '');

		parameters.splice(index + 1, length - index);

		parameters.push(params || {});

		++storage.index;
	};

	window.addEventListener('unload', function() {

		sessionStorage.setItem(location.page, JSON.stringify(prototype.data));
	});

}.call(SPAStorage);
