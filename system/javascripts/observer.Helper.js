/**
 *
 * @author Nicolas Wan
 *
 * Observer Helper API
 *
 * public instance TouchEvent|MouseEvent process(TouchEvent|MouseEvent event [, Boolean isTouchEnd]);
 *
 * */

window.ObserverHelper = {};

~function() {

	this.process = function(event, isTouchEnd) {

		if (Feature.isTouch) {

			var touches = isTouchEnd === true ? event.changedTouches : event.touches,
				touch;

			if (touches.length === 1) {

				touch = touches[0];

				event.pageX2 = touch.pageX;
				event.pageY2 = touch.pageY;
			}
		}
		else {

			event.pageX2 = event.pageX;
			event.pageY2 = event.pageY;
		}

		return event;
	};

}.call(ObserverHelper);
