/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Transform Properties
 *
 * public property Number translateX
 *
 * public property Number translateY
 *
 * public property Number scale
 *
 * public property Number rotate
 *
 * */

~function() {

	var regs = {};

	function getRegExp(name) {

		if (regs.hasOwnProperty(name)) {

			return regs[name];
		}

		return regs[name] = new RegExp(name + '\\((-?\\d+(?:\\.\\d+)?(?:e[+-]\\d+)?)(?:px|deg)?\\)');
	}

	function setTransformFunc(el, name, value) {

		var reg = getRegExp(name),
			transform = el.getStyle('transform'),
			transformFunc = name + '(' + value + ')';

		if (reg.test(transform)) {

			el.setStyle('transform', transform.replace(reg, transformFunc));
		}
		else {

			el.setStyle('transform', transform + transformFunc);
		}
	}

	function getTransformValue(el, name) {

		var matchResult = el.getStyle('transform').match(getRegExp(name));

		return matchResult ? matchResult[1] : undefined;
	}

	Object.defineProperties(this, {

		'translateX': {

			set: function(value) {

				setTransformFunc(this, 'translateX', value + 'px');
			},

			get: function() {

				return Number(getTransformValue(this, 'translateX')) || 0;
			}
		},

		'translateY': {

			set: function(value) {

				setTransformFunc(this, 'translateY', value + 'px');
			},

			get: function() {

				return Number(getTransformValue(this, 'translateY')) || 0;
			}
		},

		'scale': {

			set: function(value) {

				setTransformFunc(this, 'scale', value);
			},

			get: function() {

				var value = getTransformValue(this, 'scale');

				return value !== undefined ? Number(value) : 1;
			}
		},

		'rotate': {

			set: function(value) {

				setTransformFunc(this, 'rotate', value + 'deg');
			},

			get: function() {

				return Number(getTransformValue(this, 'rotate')) || 0;
			}
		},

		'rotateX': {

			set: function(value) {

				setTransformFunc(this, 'rotateX', value + 'deg');
			},

			get: function() {

				return Number(getTransformValue(this, 'rotateX')) || 0;
			}
		}
	});

}.call(HTMLElement.prototype);
