/**
 *
 * Reference Code
 *
 * EaseOutEasing API
 *
 * */

window.EaseOutEasing = function() {

};

EaseOutEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	prototype.exponent = 4;
	prototype.duration = 1500;

	Object.defineProperties(prototype, {

		'distance': {

			get: function() {

				var me = this;

				return me.endValue - me.startValue;
			}
		}
	});

	prototype.isEnded = function() {

		var me = this;

		return Date.now() - me.startTime > me.duration;
	};

	prototype.getValue = function() {

		var me = this,
			currentValue = me.startValue + (1 - Math.pow(1 - (Date.now() - me.startTime) / me.duration, me.exponent)) * me.distance;

		if (me.isEnded()) {

			return me.endValue;
		}

		return currentValue;
	};

}.call(EaseOutEasing.prototype);
