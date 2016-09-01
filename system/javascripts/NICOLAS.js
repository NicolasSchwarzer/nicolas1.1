/**
 *
 * @author Nicolas Wan
 *
 * Component Life Cycle API
 *
 * public instance undefined initialize([HTMLElement el]);
 *
 * public instance undefined ready([HTMLElement el]);
 *
 * public instance undefined destroy([HTMLElement el]);
 *
 * */

window.NICOLAS = {};

~function() {

	var prototype = this,
		attribute = 'data-nicolas-component',
		prefix = 'nicolasInitializeComponent';

	function initializeElement(el) {

		if (el.$initialized === true) {

			return;
		}

		if (el instanceof SVGElement) {

			return;
		}

		if (el.hasAttribute(attribute)) {

			var name = prefix + String.capitalize(String.dot2CamelCase(el.dataset.nicolasComponent));

			window[name](el);
		}

		el.$initialized = true;

		Array.forEach(el.children, initializeElement);
	}

	prototype.initialize = function(el) {

		initializeElement(el || document.body);
	};

	function readyElement(el) {

		if (el.$readied === true) {

			return;
		}

		if (el instanceof SVGElement) {

			return;
		}

		Array.forEach(el.children, readyElement);

		if (el.hasAttribute(attribute)) {

			el.dispatchEvent2('ready');
		}

		el.$readied = true;
	}

	prototype.ready = function(el) {

		readyElement(el || document.body);
	};

	function destroyElement(el) {

		if (el instanceof SVGElement) {

			return;
		}

		el.clearEventListeners();

		Array.forEach(el.children, destroyElement);
	}

	prototype.destroy = function(el) {

		destroyElement(el || document.body);
	};

}.call(NICOLAS);
