var adaptive = true, min = Math.min,
	bodyEl = exports.firstElementChild,
	showEl = bodyEl.firstElementChild.firstElementChild,
	hideEl = bodyEl.lastElementChild.firstElementChild;

function setDiameter(value) {

	exports.dataset.nicolasAttrDiameter = value;

	bodyEl.width = value;

	bodyEl.height = value;

	hideEl.setStyle('border-radius', [value + 'px', value + 'px', 0, 0].join(' '));

	value -= 2;

	showEl.setStyle('border-radius', [value + 'px', value + 'px', 0, 0].join(' '));
}

function calcRing() {

	if (adaptive) {

		setDiameter(min(exports.clientWidth, exports.clientHeight));
	}
}

Object.defineProperties(exports, {

	diameter: {

		set: function(value) {

			if (adaptive) {

				adaptive = false;
			}

			setDiameter(value);
		},

		get: function() {

			return Number(exports.dataset.nicolasAttrDiameter) || 0;
		}
	},

	borderWidth: {

		set: function(value) {

			exports.dataset.nicolasAttrBorderWidth = value;

			showEl.setStyle('border-width', value + 'px');

			value += 2;

			hideEl.setStyle('border-width', value + 'px');
		},

		get: function() {

			return Number(exports.dataset.nicolasAttrBorderWidth) || 30;
		}
	},

	color: {

		set: function(value) {

			exports.dataset.nicolasAttrColor = value;

			exports.setStyle('background-color', value);

			hideEl.setStyle('border-color', value);
		},

		get: function() {

			return exports.dataset.nicolasAttrColor || '#fff';
		}
	},

	borderColor: {

		set: function(value) {

			exports.dataset.nicolasAttrBorderColor = value;

			showEl.setStyle('border-color', value);
		},

		get: function() {

			return exports.dataset.nicolasAttrBorderColor || '#0dc5c1';
		}
	}
});

exports.show = function() {

	this.removeCls('nicolas-component-loader-ring-hide');
};

exports.hide = function() {

	this.addCls('nicolas-component-loader-ring-hide');
};

window.addEventListener('resize', calcRing);

exports.addEventListener2('ready', function() {

	var diameter = exports.diameter;

	if (diameter) {

		exports.diameter = diameter;
	}
	else {

		calcRing();
	}

	exports.borderWidth = exports.borderWidth;

	exports.color = exports.color;

	exports.borderColor = exports.borderColor;
});
