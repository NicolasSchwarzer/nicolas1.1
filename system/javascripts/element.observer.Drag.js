/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'dragstart';
 *
 * public event TouchEvent|MouseEvent 'drag';
 *
 * public event TouchEvent|MouseEvent 'dragend';
 * 'dragend' some times does not dispatch on iOS, because of 'touchend' not dispatched, which requires further research;
 *
 * */

~function() {

	var minMoveDistance = 8;

	function onTouchStart(e) {

		var el = this;

		ObserverHelper.process(e);

		el.$nicolasDragStartPoint = [e.pageX2, e.pageY2];

		el.addEventListener('touchmove', onTouchMove);
		el.addEventListener('touchend', onTouchEnd);
	}

	function onTouchMove(e) {

		var el = this,
			x, y;

		ObserverHelper.process(e);

		x = e.pageX2, y = e.pageY2;

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			el.dispatchEvent2('touchend');
		}

		if (Math.distance2([x, y], el.$nicolasDragStartPoint) >= minMoveDistance) {

			removeTouchEventListeners(el);

			onDragStart.call(el, e);
		}
	}

	function onTouchEnd() {

		removeTouchEventListeners(this);
	}

	function removeTouchEventListeners(el) {

		el.removeEventListener('touchmove', onTouchMove);

		el.removeEventListener('touchend', onTouchEnd);

		delete el.$nicolasDragStartPoint;
	}

	function processEventProperties(el, e) {

		var startPoint = el.$nicolasDragStartPoint,
			previousPoint = el.$nicolasDragPreviousPoint,
			x = e.pageX2, y = e.pageY2;

		e.deltaX = x - startPoint[0];
		e.deltaY = y - startPoint[1];

		e.deltaX2 = x - previousPoint[0];
		e.deltaY2 = y - previousPoint[1];

		e.$nicolasPreviousTime = el.$nicolasDragPreviousTime;
	}

	function onDragStart(e) {

		var el = this;

		el.$nicolasDragEvent = e;

		el.dispatchEvent2('dragstart', e);

		el.$nicolasDragStartPoint = [e.pageX2, e.pageY2];
		el.$nicolasDragPreviousPoint = [e.pageX2, e.pageY2];
		el.$nicolasDragPreviousTime = Date.now();

		processEventProperties(el, e);

		el.addEventListener('touchmove', onDrag);
		el.addEventListener('touchend', onDragEnd);		
	}

	function onDrag(e) {

		var el = this,
			x, y, point;

		ObserverHelper.process(e);

		el.$nicolasDragEvent = e;

		x = e.pageX2, y = e.pageY2;

		processEventProperties(el, e);

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			el.dispatchEvent2('touchend');
		}
		else {

			el.dispatchEvent2('drag', e);

			point = el.$nicolasDragPreviousPoint;
			point[0] = x, point[1] = y;
			el.$nicolasDragPreviousTime = Date.now();
		}
	}

	function onDragEnd() {

		var el = this,
			e = el.$nicolasDragEvent,
			duration = Date.now() - e.$nicolasPreviousTime;

		if (duration > 0 && duration < 50) {

			e.velocityX = e.deltaX2 / duration;
			e.velocityY = e.deltaY2 / duration;
		}
		else {

			e.velocityX = 0;
			e.velocityY = 0;
		}

		removeDragEventListeners(el);

		el.dispatchEvent2('dragend', e);

		delete el.$nicolasDragEvent;
	}

	function removeDragEventListeners(el) {

		el.removeEventListener('touchmove', onDrag);

		el.removeEventListener('touchend', onDragEnd);

		delete el.$nicolasDragStartPoint;

		delete el.$nicolasDragPreviousPoint;

		delete el.$nicolasDragPreviousTime;
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'dragstart' || name === 'drag' || name === 'dragend') {

			if (!el.hasEventListener('dragstart') && !el.hasEventListener('drag') && !el.hasEventListener('dragend')) {

				el.addEventListener('touchstart', onTouchStart);
			}
		}
	});

	window.addEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'dragstart' || name === 'drag' || name === 'dragend') {

			if (!el.hasEventListener('dragstart') && !el.hasEventListener('drag') && !el.hasEventListener('dragend')) {

				el.removeEventListener('touchstart', onTouchStart);
			}
		}
	});

}();
