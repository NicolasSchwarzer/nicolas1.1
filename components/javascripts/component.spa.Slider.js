var shelterEl = exports.querySelector('div.nicolas-component-spa-slider-shelter'),
	onShow, onHide, emptyFunc = function() {},
	hideTimeoutId, showTimeoutId, duration = 500;

Object.defineProperties(exports, {

	page: {

		get: function() {

			return this.dataset.nicolasAttrPage || '';
		}
	},

	containerEl: {

		get: function() {

			return this.firstElementChild;
		}
	},

	onShow: {

		set: function(func) {

			if (func instanceof Function) {

				onShow = func;
			}
		},

		get: function() {

			return onShow || emptyFunc;
		}
	},

	onHide: {

		set: function(func) {

			if (func instanceof Function) {

				onHide = func;
			}
		},

		get: function() {

			return onHide || emptyFunc;
		}
	}
});

function clear() {

	exports.removeCls('nicolas-component-spa-slider-from-center-to-left');

	exports.removeCls('nicolas-component-spa-slider-from-left-to-center');

	exports.removeCls('nicolas-component-spa-slider-from-center-to-right');

	exports.removeCls('nicolas-component-spa-slider-from-right-to-center');
}

function onHideTimeout() {

	exports.down();

	clear();

	shelterEl.setStyle('display', 'none');

	exports.onHide(exports.containerEl);
}

function onShowTimeout() {

	exports.up2();

	clear();

	shelterEl.setStyle('display', 'none');
}

exports.up = function() {

	this.setStyle('z-index', 1);
};

exports.up2 = function() {

	this.setStyle('z-index', 2);
};

exports.down = function() {

	this.setStyle('z-index', 0);
};

exports.reset = function() {

	this.down();

	clear();
};

exports.hide = function(toLeft) {

	var me = this;

	clearTimeout(hideTimeoutId);

	clearTimeout(showTimeoutId);

	toLeft = toLeft === false ? toLeft : true;

	shelterEl.setStyle('display', 'block');

	me[toLeft ? 'up' : 'up2']();

	clear();

	me.addCls(toLeft ? 'nicolas-component-spa-slider-from-center-to-left' : 'nicolas-component-spa-slider-from-center-to-right');

	hideTimeoutId = setTimeout(onHideTimeout, duration);
};

exports.show = function(fromRight) {

	var me = this;

	clearTimeout(hideTimeoutId);

	clearTimeout(showTimeoutId);

	fromRight = fromRight === false ? fromRight : true;

	shelterEl.setStyle('display', 'block');

	me[fromRight ? 'up2' : 'up']();

	clear();

	me.addCls(fromRight ? 'nicolas-component-spa-slider-from-right-to-center' : 'nicolas-component-spa-slider-from-left-to-center');

	showTimeoutId = setTimeout(onShowTimeout, duration);
};
