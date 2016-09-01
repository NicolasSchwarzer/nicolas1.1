/**
 *
 * @author Nicolas Wan
 *
 * Reset Default Behavior
 *
 * */

~function() {

	function doPreventDefault(e) {

		e.preventDefault();
	}

	window.addEventListener('DOMContentLoaded', function() {

		var bodyEl = document.body;

		if (Feature.isTouch) {

			bodyEl.addEventListener('touchmove', doPreventDefault);
		}
		else {

			bodyEl.addEventListener('contextmenu', doPreventDefault);
		}
	});
}();
