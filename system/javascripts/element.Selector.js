/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Selector API
 *
 * public instance Boolean is(String selector);
 *
 * public instance HTMLElement|null findParent(String selector [, HTMLElement stopEl]);
 *
 * */

~function() {

	var prototype = this;

	prototype.is = function(selector) {

		var me = this,
			el = me, parentEl;

		while (parentEl = el.parentElement) {

			if (Array.from(parentEl.querySelectorAll(selector)).indexOf(me) !== -1) {

				return true;
			}

			el = parentEl;
		}

		return false;
	};

	prototype.findParent = function(selector, stopEl) {

		var el = this;

		do {

			if (el.is(selector)) {

				return el;
			}

			if (el === stopEl) {

				break;
			}

			el = el.parentElement;

		} while (el);

		return null;
	};

}.call(HTMLElement.prototype);
