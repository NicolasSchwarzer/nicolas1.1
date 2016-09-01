/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'tap';
 *
 * */

~function() {

	var maxMoveDistance = 8;

	function onTouchStart(e) {

		var el = this;

		ObserverHelper.process(e);

		el.$nicolasTapStartPoint = [e.pageX2, e.pageY2];

		el.addEventListener('touchmove', onTouchMove);
		el.addEventListener('touchend', onTouchEnd);
	}
	
	function onTouchMove(e) {

		var el = this,
			x, y;

		ObserverHelper.process(e);

		x = e.pageX2, y = e.pageY2;

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			removeEventListeners(el);

			el.dispatchEvent2('tap', e);
		}

		if (Math.distance2(el.$nicolasTapStartPoint, [x, y]) >= maxMoveDistance) {

			removeEventListeners(el);
		}
	}

	function onTouchEnd(e) {

		var el = this;

		removeEventListeners(el);

		el.dispatchEvent2('tap', ObserverHelper.process(e, true));
	}

	function removeEventListeners(el) {

		el.removeEventListener('touchmove', onTouchMove);

		el.removeEventListener('touchend', onTouchEnd);

		delete el.$nicolasTapStartPoint;
	}

	function onClick(e) {

		this.dispatchEvent2('tap', ObserverHelper.process(e));
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'tap') {

			if (Feature.isTouch) {

				el.addEventListener('touchstart', onTouchStart);
			}
			else {

				el.addEventListener('click', onClick);
			}
		}
	});

	window.addEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'tap') {

			if (Feature.isTouch) {

				el.removeEventListener('touchstart', onTouchStart);
			}
			else {

				el.removeEventListener('click', onClick);
			}
		}
	});
}();
