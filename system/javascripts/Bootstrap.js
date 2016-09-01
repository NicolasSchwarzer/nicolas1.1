/**
 *
 * @author Nicolas Wan
 *
 * Component Life Cycle
 *
 * */

~function() {

	var viewportEl;

	window.addEventListener('DOMContentLoaded', function() {

		NICOLAS.initialize();

		viewportEl = document.querySelector('body > div[data-nicolas-component="Viewport"]');
	});

	window.addEventListener('load', function() {

		NICOLAS.ready();

		window.dispatchEvent2('ready');

		if (viewportEl) {

			viewportEl.addCls('nicolas-ready');
		}
	});

	window.addEventListener('unload', function() {

		NICOLAS.destroy();
	});
}();
