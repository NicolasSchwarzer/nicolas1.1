/**
 *
 * @author Nicolas Wan
 *
 * IDGenerator API
 *
 * public instance String id([HTMLElement el [, String prefix]]);
 *
 * */

window.IDGenerator = {};

~function() {

	var prefix = 'nicolas-',
		count = 1;

	function id(isHTMLElement, name) {

		var id = String.join(prefix, name, count++);

		if (isHTMLElement === true && document.getElementById(id)) {

			return id(true, name);
		}

		return id;
	}

	this.id = function(el, prefix) {

		if (!el) {

			return id(false, prefix);
		}
		
		if (el.id === '') {

			el.id = id(true, prefix);
		}

		return el.id;
	};

}.call(IDGenerator);
