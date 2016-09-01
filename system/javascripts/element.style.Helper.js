/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Extended Properties
 *
 * public property Number width;
 *
 * public property Number height;
 *
 * public property Number offsetLeft2;
 *
 * public property Number offsetTop2;
 *
 * */

~function() {

	var pxReg = /px$/;

	Object.defineProperties(this, {

		'width': {

			set: function(value) {

				this.setStyle('width', value + 'px');
			},

			get: function() {

				var me = this;

				return Number(me.getStyle('width').replace(pxReg, '')) || me.offsetWidth;
			}
		},

		'height': {

			set: function(value) {

				this.setStyle('height', value + 'px');
			},

			get: function() {

				var me = this;

				return Number(me.getStyle('height').replace(pxReg, '')) || me.offsetHeight;
			}
		},

		'offsetLeft2': {

			get: function() {

				var me = this,
					parentEl = me.offsetParent;

				if (parentEl) {

					return me.offsetLeft + parentEl.offsetLeft2;
				}
				else {

					return me.offsetLeft;
				}
			}
		},

		'offsetTop2': {

			get: function() {

				var me = this,
					parentEl = me.offsetParent;

				if (parentEl) {

					return me.offsetTop + parentEl.offsetTop2;
				}
				else {

					return me.offsetTop;
				}
			}
		}
	});

}.call(HTMLElement.prototype)
