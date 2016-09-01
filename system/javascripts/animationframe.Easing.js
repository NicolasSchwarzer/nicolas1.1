/**
 * 
 * Reference Code
 *
 * Easing API
 *
 * */

window.Easing = function() {

};

~function() {

	var prototype = this;

	prototype.startValue = 0;

	Object.defineProperties(prototype, {

		'startTime': {

			set: function(value) {

				this.$startTime = value;
			},

			get: function() {

				var me = this;

				return me.$startTime || (me.$startTime = Date.now());
			}
		},

		'callback': {

			set: function(value) {

				this.$func = value;
			},

			get: function() {

				var me = this;

				return me.$func || (me.$func = function() {});
			}
		}
	});

	prototype.setConfig = function(config) {

		var me = this,
			name;

		for (name in config) {

			if (config.hasOwnProperty(name)) {

				me[name] = config[name];
			}
		}
	};

	function run() {

		var me = this,
			ended = me.isEnded();

		me.callback(me.getValue(), ended);

		if (ended) {

			me.reset();

			return false;
		}
	}

	prototype.run = function() {

		var me = this;

		me.$animationFrameId = AnimationFrame.run(run, me);
	};

	prototype.stop = function() {

		var me = this;

		me.reset();

		AnimationFrame.stop(me.$animationFrameId);
	}

	prototype.isEnded = function() {

		return true;
	};

	prototype.getValue = function() {

	};

	prototype.reset = function() {

	};

}.call(Easing.prototype);
