~function() {

	window.addEventListener2('ready', function() {

		var sliderEls = document.querySelectorAll('div[data-nicolas-component="spa.Slider"]'),
			index = 0;

		sliderEls[0].up2();

		function forward() {

			var el, el2;

			if (index < 2) {

				locked = true;

				el = sliderEls[index];

				el2 = sliderEls[++index];

				el2.show();

				el.hide();
			}
		}

		function back() {

			var el, el2;

			if (index > 0) {

				locked = true;

				el = sliderEls[index];

				el2 = sliderEls[--index];

				el2.show(false);

				el.hide(false);
			}
		}

		window.addEventListener2('tap', function(el, e) {

			var targetEl = e.target.findParent('div.content');

			if (targetEl) {

				if (e.pageX2 >= screen.width / 2) {

					forward();
				}
				else {

					back();
				}
			}
		});
	});
}();
