/**
 *
 * Reference Code
 *
 * BounceEasing API
 *
 * */

window.BounceEasing = function() {

};

BounceEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	prototype.springTension = 0.3;
	prototype.acceleration = 30;
	prototype.startVelocity = 0;

	prototype.getValue = function() {

		var me = this,
			theta = (Date.now() - me.startTime) / me.acceleration;

		return me.startValue - me.startVelocity * theta * Math.pow(Math.E, -me.springTension * theta);
	};

}.call(BounceEasing.prototype);
