(function() {

	var widths = String.split(exports.getAttribute('data-nicolas-attr-width') || '', /\s+/),
		numReg = /\d+(?:\.\d+)?/,
		bodyEl = exports.querySelector('.nicolas-component-picker-body-middle'),
		tplEl = bodyEl.firstElementChild;

	if (!widths.length) {

		widths.push('auto');
	}

	Array.forEach(widths, function(width, index) {

		var el;

		if (index > 0) {

			el = tplEl.cloneNode(true);

			bodyEl.appendChild(el);
		}
		else {

			el = tplEl;
		}

		if (numReg.test(width)) {

			el.setStyle('width', Number(width) + 'px');

			el.removeCls('nicolas-component-picker-column-flex');
		}
		else if (width === 'auto') {

			el.setStyle('width', '');

			el.addCls('nicolas-component-picker-column-flex');
		}
	});
})();

var props = {},
	scrollerEls = exports.querySelectorAll('[data-nicolas-component="scroller.Sphere"]');

var closeTimeoutId, duration = 500;

var onValueChange,
	emptyFunc = function() {};

function onCloseTimeout() {

	exports.removeCls('nicolas-component-picker-close');
}

function getValue(data, el) {

	data.push(el.value);
}

function run(el, index) {

	if (!el.data.length) {

		var data = exports['onRequestData' + (index + 1)](0, 15);

		if (data instanceof Array) {

			data = data.slice(0, 15);

			el.data = data;

			length = data.length - 1;

			el.maxScrollValue = (length < 0 ? 0 : length) * 18;
		}
	}
}

Array.forEach(scrollerEls, function(el, index) {

	++index;

	var onRequestDataPropName = 'onRequestData' + index,
		dataPropName = 'data' + index,
		valuePropName = 'value' + index,
		scrollValuePropName = 'scrollValue' + index,
		maxScrollValuePropName = 'maxScrollValue' + index;

	var baseScrollValue = 0,
		count = 0, requestStart = 0, firstTimeRequest = true,
		poolData = [];

	var onRequestData,

		requestPoolData = function() {

			if (count + 3 >= requestStart * 5) {

				var data = exports[onRequestDataPropName]((requestStart++) * 50, requestStart * 50),
					length;

				if (data instanceof Array) {

					data = data.slice(0, 50);

					length = data.length;

					poolData = poolData.concat(data);

					if (firstTimeRequest) {

						--length;

						el.maxScrollValue = (length < 0 ? 0 : length) * 18;
					}
					else {

						el.maxScrollValue += length * 18;
					}
				}
			}
		};

	props[onRequestDataPropName] = {

		set: function(func) {

			if (func instanceof Function) {

				onRequestData = func;
			}
		},

		get: function() {

			return onRequestData || emptyFunc;
		}
	};

	props[dataPropName] = {

		set: function(data) {

			el.data = data;
		},

		get: function() {

			return el.data;
		}
	};

	props[valuePropName] = {

		set: function(value) {

			el.value = value;
		},

		get: function() {

			return el.value;
		}
	};

	props[scrollValuePropName] = {

		set: function(value) {

			el.scrollValue = value;
		},

		get: function() {

			return el.scrollValue;
		}
	};

	props[maxScrollValuePropName] = {

		set: function(value) {

			el.maxScrollValue = value;
		},

		get: function() {

			return el.maxScrollValue;
		}
	};

	exports['reset' + index] = function() {

		poolData.length = 0;

		el.reset();

		poolData.length = 0;

		baseScrollValue = 0;

		count = 0;

		requestStart = 0;

		el.maxScrollValue = 0;

		firstTimeRequest = true;
	};

	el.addEventListener2('scroll', function(el, value, oldValue) {

		var data, helperData,
			countHelper;

		if (value >= oldValue) {

			if (value - baseScrollValue > 90) {

				if (firstTimeRequest) {

					requestPoolData();

					firstTimeRequest = false;
				}

				baseScrollValue += 90;

				data = poolData.slice(15 + (count++) * 5, 15 + count * 5);

				data.length = 5;

				helperData = el.data;

				countHelper = (count + 2) % 4;

				countHelper += countHelper < 0 ? 4 : 0;

				data.unshift(5), data.unshift(5 * countHelper);

				Array.prototype.splice.apply(helperData, data);

				el.data = helperData;

				requestPoolData();
			}
		}
		else {

			if (value < baseScrollValue) {

				if (firstTimeRequest) {

					requestPoolData();

					firstTimeRequest = false;
				}

				baseScrollValue -= 90;

				--count;

				data = count > 0 ? poolData.slice((count - 1) * 5, count * 5) : [];

				data.length = 5;

				helperData = el.data;

				countHelper = (count - 1) % 4;

				countHelper += countHelper < 0 ? 4 : 0;

				data.unshift(5), data.unshift(5 * countHelper);

				Array.prototype.splice.apply(helperData, data);

				el.data = helperData;
			}
		}
	});

	el.addEventListener2('valuechange', function() {

		exports.onValueChange.apply(exports, exports.value);
	});
});

Object.defineProperties(exports, Object.join(props, {

	onValueChange: {

		set: function(func) {

			if (func instanceof Function) {

				onValueChange = func;
			}
		},

		get: function() {

			return onValueChange || emptyFunc;
		}
	},

	value: {

		get: function() {

			var result = [];

			Array.forEach(scrollerEls, getValue, result);

			return result;
		}
	}
}));

exports.show = function() {

	var me = this;

	clearTimeout(closeTimeoutId);

	me.removeCls('nicolas-component-picker-close');

	me.addCls('nicolas-component-picker-open');
};

exports.hide = function() {

	var me = this;

	clearTimeout(closeTimeoutId);

	me.addCls('nicolas-component-picker-close');

	me.removeCls('nicolas-component-picker-open');

	closeTimeoutId = setTimeout(onCloseTimeout, duration);
};

exports.reset = function() {

	var me = this,
		i = 1, length = scrollerEls.length;

	for (; i <= length; ++i) {

		me['reset' + i]();
	}
};

exports.run = function() {

	var me = this;

	Array.forEach(scrollerEls, run);

	me.onValueChange.apply(me, me.value);
};

exports.addEventListener2('tap', function(el, e) {

	if (!e.target.findParent('.nicolas-component-picker-body')) {

		exports.hide();
	}
});
