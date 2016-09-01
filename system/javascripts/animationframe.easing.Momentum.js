/*
 *
 * Reference Code
 *
 * MomentumEasing API
 *
 * */

window.MomentumEasing = function() {

};

MomentumEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	Object.defineProperties(prototype, {

		'friction': {

			set: function(value) {

				var me = this,
	                theta = Math.log(1 - (value / 10));

	            me.$theta = theta;
	            me.$alpha = theta / me.acceleration;
	            me.$friction = value;
			},

			get: function() {

				return this.$friction;
			}
		},

		'acceleration': {

			set: function(value) {

				var me = this;
	            
	            me.$velocity = me.startVelocity * value;
	            me.$alpha = me.$theta / value;
	            me.$acceleration = value;
			},

			get: function() {

				return this.$acceleration;
			}
		},

		'startVelocity': {

			set: function(value) {

				var me = this;
	            
	            me.$velocity = value * me.acceleration;
			},

			get: function() {

				return this.$velocity;
			}
		},

		'frictionFactor': {

			get: function() {

				var me = this;

	            return Math.exp((Date.now() - me.startTime) * me.$alpha);
			}
		},

		'velocity': {

			get: function() {

				var me = this;
	            
	            return me.frictionFactor * me.startVelocity;
			}
		}
	});

	prototype.$alpha = 0,
	prototype.acceleration = 30,
	prototype.friction = 0,
	prototype.startVelocity = 0;

	prototype.getValue = function() {
	    
	    var me = this ;
	    
	    return me.startValue + me.startVelocity * (1 - me.frictionFactor) / me.$theta;
	};

}.call(MomentumEasing.prototype);
