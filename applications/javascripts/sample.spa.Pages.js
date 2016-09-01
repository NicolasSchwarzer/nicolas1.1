~function() {

	window.addEventListener2('ready', function() {

		var pagesEl = document.querySelector('div[data-nicolas-component="spa.Pages"]');

		Array.forEach(pagesEl.children, function(el, index, els) {

			el.onHide = function(el) {

				el.firstElementChild.innerHTML = '';
			};

			el.onShow = function(el, params) {

				el.firstElementChild.innerHTML = params.value || 1;
			};

			if (index < els.length - 1) {

				el.addEventListener2('tap', function(el, e) {

					if (e.target.findParent('div.content')) {

						pagesEl.href(index === 0 ? 'second' : 'third', {
							value: index + 2
						});
					}
				});
			}
		});

		pagesEl.run();
	});
}();
