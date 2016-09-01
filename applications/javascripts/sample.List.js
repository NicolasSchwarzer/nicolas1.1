~function() {

	window.addEventListener2('ready', function() {

		var listEl = document.querySelector('#listEl');

		listEl.onSaveItemDataToElement = function(value, el, index, length, data) {

			el.querySelector('div.content').innerHTML = value;
		};

		listEl.onClearItemElementData = function(el) {

			el.querySelector('div.content').innerHTML = '';
		};

		listEl.onRequestData = function(start, limit, insert) {

			Ajax.request('sample.List/data.json', {
				query: {
					first_name: 'nicolas',
					last_name: 'wan'
				},
				params: {
					page: start,
					limit: limit
				},
				callback: function(result) {

					insert(result.data);
				}
			});
		};

		listEl.run();
	});
}();
