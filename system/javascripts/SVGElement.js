/**
 *
 * @author Nicolas Wan
 *
 * SVGElement Extended Properties
 *
 * public property Array children
 *
 * */

~function() {

	var prototype = SVGElement.prototype;

	function appendSVGElementChild(data, el) {

		if (el instanceof SVGElement || el instanceof HTMLElement) {

			data.push(el);
		}
	}

	if (!('children' in prototype)) {

		Object.defineProperties(prototype, {

			children: {

				get: function() {

					var result = [];

					Array.forEach(this.childNodes, appendSVGElementChild, result);

					return result;
				}
			}
		});
	}

}();
