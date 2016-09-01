var sphereData, locked = false,
	minScrollValue = 0, maxScrollValue = 0,
	maxVelocity = 6;

var itemEls = exports.firstElementChild.children,
	headEl = itemEls[0], frontEl = headEl, frontIndex = 0;

var boundMomentum = new BoundMomentumEasing,
	bounce = new EaseOutEasing,
	bounceHelper = new EaseOutEasing, bounceHelperLock = false;

var lastValue;

var originalIsEnded = boundMomentum.isEnded,

	onAnimationScroll = function(value) {

		exports.scrollValue = value;
	},

	animationScrollValueHelper = function() {

		var scrollValue = exports.scrollValue,
			deltaValue = scrollValue % 18,
			boundValue;

		boundValue = scrollValue - deltaValue + (deltaValue < 9 ? 0 : 18);

		bounceHelper.setConfig({
			startTime: Date.now(),
			startValue: scrollValue,
			endValue: boundValue
		});

		bounceHelper.run();
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
	minMomentumValue: 0,
	callback: onAnimationScroll
});

bounce.setConfig({
	duration: 400,
	callback: onAnimationScroll
});

bounceHelper.setConfig({
	duration: 400,
	callback: onAnimationScroll
});

boundMomentum.isEnded = function() {

	var me = this,
		result = originalIsEnded.call(me);

	if (!me.isOutOfBound && result) {

		animationScrollValueHelper();
	}

	return result;
};

function rotate(value, el, index) {

	el.rotateX = value - index * 18;
}

Object.defineProperties(exports, {

	minScrollValue: {

		set: function(value) {

			minScrollValue = value;
		},

		get: function() {

			return minScrollValue;
		}
	},

	maxScrollValue: {

		set: function(value) {

			maxScrollValue = value;
		},

		get: function() {

			return maxScrollValue;
		}
	},

	scrollValue: {

		set: function(value) {

			var me = this,
				oldValue = me.scrollValue,
				index = Math.round(value / 18) % 20;

			Array.forEach(itemEls, rotate, value);

			if (index < 0) {

				index += 20;
			}

			if (index !== frontIndex) {

				frontEl.removeCls('nicolas-component-scroller-sphere-closest');

				frontEl = itemEls[index];

				frontEl.addCls('nicolas-component-scroller-sphere-closest');

				frontIndex = index;

				exports.dispatchEvent2('valuechange', me.value);
			}

			exports.dispatchEvent2('scroll', value, oldValue);
		},

		get: function() {

			return headEl.rotateX;
		}
	},

	data: {

		set: function(data) {

			var i = 0, length = itemEls.length,
				dataLength = data.length,
				el, value, value2;

			delete sphereData;

			sphereData = [];

			for (; i < length; ++i) {

				el = itemEls[i];

				if (i < dataLength) {

					value = data[i];

					sphereData.push(value);

					value2 = value instanceof Object ? value.value : value;

					el.innerHTML = value2 === undefined ? '' : value2;
				}
				else {

					el.innerHTML = '';
				}
			}
		},

		get: function() {

			return sphereData || [];
		}
	},

	value: {

		set: function(value) {

			var me = this,
				baseScrollValue = Math.floor(Math.round(me.scrollValue) / 360) * 360,
				data = me.data, itemValue,
				i = 0, length = data.length;

			bounceHelperLock = true;

			me.stop();

			for (; i < length; ++i) {

				itemValue = data[i];

				if (itemValue === undefined) {

					continue;
				}

				if (itemValue instanceof Object) {

					if (value instanceof Object) {

						if (itemValue.key === value.key && itemValue.value === value.value) {

							break;
						}
					}
					else {

						if (itemValue.key === value || itemValue.value === value) {

							break;
						}
					}
				}
				else {

					if (itemValue === value || itemValue === value.key || itemValue === value.value) {

						break;
					}
				}
			}

			i = i < 20 ? i : 0;

			bounceHelper.setConfig({
				startTime: Date.now(),
				startValue: me.scrollValue,
				endValue: baseScrollValue + i * 18
			});

			bounceHelper.run();
		},

		get: function() {

			var value = this.data[frontIndex];

			if (value === undefined) {

				return lastValue;
			}

			return lastValue = value;
		}
	},

	locked: {

		get: function() {

			return locked;
		}
	}
});

exports.stop = function() {

	bounceHelper.stop();

	bounce.stop();

	boundMomentum.stop();
};

exports.lock = function() {

	locked = true;
	boundMomentum.stop();
};

exports.unlock = function() {

	locked = false;
};

exports.reset = function() {

	var me = this;

	me.data = [];

	me.stop();

	me.scrollValue = 0;

	me.unlock();

	me.dispatchEvent2('valuechange', me.value);
};

exports.addEventListener2('dragstart', function(el, e) {

	var me = this;

	if (me.locked) {

		return;
	}

	bounceHelperLock = false;

	me.stop();
});

exports.addEventListener2('drag', function(el, e) {

	var me = this,
		scrollValue = me.scrollValue;

	if (me.locked) {

		return;
	}

	if (bounceHelperLock) {

		return;
	}

	if (scrollValue < me.minScrollValue || scrollValue > me.maxScrollValue) {

		me.scrollValue = scrollValue - e.deltaY2 / 3;
	}
	else {

		me.scrollValue = scrollValue - e.deltaY2;
	}
});

exports.addEventListener2('dragend', function(el, e) {

	var me = this, scrollValue = me.scrollValue,
		minScrollValue = me.minScrollValue, maxScrollValue = me.maxScrollValue,
		velocity = e.velocityY, boundValue;

	if (me.locked) {

		return;
	}

	if (bounceHelperLock) {

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
