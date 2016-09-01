/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'activatestart';
 *
 * public event TouchEvent|MouseEvent 'activateend';
 *
 * */

~function() {

	var duration = 300;

	function onTouchStart(e) {

		startElementActivation(this, e);
	}

	function onTap(el, e) {

		clearTimeout(el.$nicolasActiveId);

		el.$nicolasActiveId = setTimeout(function() {

			endElementActivation(el, e);

		}, duration);
	}

	function onDragStart(el, e) {

		clearTimeout(el.$nicolasActiveId);

		endElementActivation(el, e);
	}

	function startElementActivation(el, e) {

		if (el.$nicolasActivated !== true) {

			el.$nicolasActivated = true;

			el.dispatchEvent2('activatestart', e);
		}
	}

	function endElementActivation(el, e) {

		if (el.$nicolasActivated === true) {

			el.dispatchEvent2('activateend', e);

			delete el.$nicolasActivated;
		}
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'activatestart' || name === 'activateend') {

			el.addEventListener('touchstart', onTouchStart);

			el.addEventListener2('tap', onTap);

			el.addEventListener2('dragstart', onDragStart);
		}
	});

	window.removeEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'activatestart' || name === 'activateend') {

			el.removeEventListener('touchstart', onTouchStart);

			el.removeEventListener2('tap', onTap);

			el.removeEventListener2('dragstart', onDragStart);
		}
	});

}();
