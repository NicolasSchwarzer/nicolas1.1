/**
 *
 * @author Nicolas Wan
 *
 * Ajax API
 *
 * public instance undefined request(String url, Object config)
 *
 * */

window.Ajax = {};

~function() {

	this.request = function(url, config) {

		var xhr = new XMLHttpRequest;

		config = config || {};

		if (config.hasOwnProperty('query')) {

			url = String.urlAppend(url, config.query);
		}

		xhr.open(config.method || 'POST', String.urlAppend(url, {
			'_dc': new Date
		}), true);

		if (config.json === true) {

			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		}
		else {

			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		xhr.addEventListener('readystatechange', function() {

			if(xhr.readyState === 4 && xhr.status === 200) {

				if (config.hasOwnProperty('callback')) {

					var result = xhr.responseText;

					try {

						result = JSON.parse(result);
					}
					catch(err) {

					}

					config.callback(result);
				}
			}
		});

		if (config.hasOwnProperty('params')) {

			if (config.json === true) {

				xhr.send(JSON.stringify(config.params));
			}
			else {

				xhr.send(Object.toQueryString(config.params));
			}
		}
		else {

			if (config.json === true) {

				xhr.send(JSON.stringify({}));
			}
			else {

				xhr.send();
			}
		}
	};
}.call(Ajax);
