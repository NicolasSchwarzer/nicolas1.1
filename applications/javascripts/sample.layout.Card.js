~function() {

	window.addEventListener2('ready', function() {

		var cardEl = document.querySelector('#cardEl'),
			footerEl = document.querySelector('#footerEl'),
			els = Array.from(footerEl.children);

		footerEl.addEventListener2('tap', function(el, e) {

			var target = e.target.findParent('button');

			if (target) {

				cardEl.activeIndex = els.indexOf(target);
			}
		});
	});
}();
