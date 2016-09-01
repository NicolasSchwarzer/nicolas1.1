var max = Math.max,
	locked = false, maxVelocity = 6,
	boundMomentum = new BoundMomentumEasing, bounce = new EaseOutEasing,
	containerEl = exports.firstElementChild, bodyEl = containerEl.firstElementChild,
	onAnimationScroll = function(value) {

		exports.scrollValue = value;
	};

boundMomentum.momentum.setConfig({
	acceleration: 30,
	friction: 0.5
});

boundMomentum.bounce.setConfig({
	acceleration: 30
});

boundMomentum.setConfig({
	minVelocity: 1,
	callback: onAnimationScroll
});

bounce.setConfig({
	duration: 400,
	callback: onAnimationScroll
});

Object.defineProperties(exports, {

	scrollValue: {

		set: function(value) {

			var lastValue = -bodyEl.translateY;

			bodyEl.translateY = -value;

			this.dispatchEvent2('scroll', value, lastValue);
		},

		get: function() {

			return -bodyEl.translateY;
		}
	},

	scrollHeight2: {

		set: function(value) {

			bodyEl.height = value;
		},

		get: function() {

			return max(bodyEl.height, bodyEl.offsetHeight);
		}
	},

	maxScrollValue: {

		get: function() {

			return exports.scrollHeight2 - containerEl.clientHeight;
		}
	},

	minScrollValue: {

		get: function() {

			return 0;
		}
	},

	locked: {

		get: function() {

			return locked;
		}
	}
});

exports.stop = function() {

	boundMomentum.stop();

	bounce.stop();
};

exports.lock = function() {

	locked = true;

	if (!boundMomentum.isOutOfBound) {

		boundMomentum.stop();
	}
};

exports.unlock = function() {

	locked = false;
};

exports.reset = function() {

	var me = this;

	me.stop();

	me.scrollValue = 0;

	locked = false;
};

containerEl.addEventListener2('dragstart', function() {

	if (exports.locked) {

		return;
	}

	exports.stop();
});

containerEl.addEventListener2('drag', function(el, e) {

	var scrollValue = exports.scrollValue;

	if (exports.locked) {

		return;
	}

	if (scrollValue < exports.minScrollValue || scrollValue > exports.maxScrollValue) {

		exports.scrollValue = scrollValue - e.deltaY2 / 3;
	}
	else {

		exports.scrollValue = scrollValue - e.deltaY2;
	}
});

containerEl.addEventListener2('dragend', function(el, e) {

	var scrollValue = exports.scrollValue,
		minScrollValue = exports.minScrollValue, maxScrollValue = exports.maxScrollValue,
		velocity = e.velocityY, boundValue;

	if (exports.locked) {

		return;
	}

	if (scrollValue < minScrollValue) {

        boundValue = minScrollValue;
    }
    else if (scrollValue > maxScrollValue) {

        boundValue = maxScrollValue;
    }

    if(boundValue !== undefined) {
      
		bounce.setConfig({
			startTime: Date.now(),
			startValue: scrollValue,
			endValue: boundValue
        });
   
        bounce.run();

        return;
    }

    if (velocity === 0) {

        return;
    }

    if (velocity < -maxVelocity) {

        velocity = -maxVelocity;
    }
    else if (velocity > maxVelocity) {

        velocity = maxVelocity;
    }

    boundMomentum.momentum.setConfig({
        startTime: Date.now(),
        startValue: scrollValue,
        startVelocity: velocity
    });

    boundMomentum.setConfig({
        maxMomentumValue: maxScrollValue,
        minMomentumValue: minScrollValue,
        startValue: scrollValue,
        startVelocity: velocity
    });

    boundMomentum.run();
});
