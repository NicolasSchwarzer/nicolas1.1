var containerEl = exports.firstElementChild;

Object.defineProperties(exports, {

	activeIndex: {

		set: function(value) {

			var els = containerEl.children;

			if (value >= 0 && value < els.length) {

				this.dataset.nicolasAttrActiveIndex = value;

				els[value].radioCls('nicolas-component-layout-card-activate');
			}
		},

		get: function() {

			return Number(this.getAttribute('data-nicolas-attr-active-index')) || 0;
		}
	}
});

exports.addEventListener2('ready', function() {

	exports.activeIndex = exports.activeIndex;
});
