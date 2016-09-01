/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement ClassList API
 *
 * public instance undefined addCls(String cls);
 *
 * public instance undefined removeCls(String cls);
 *
 * public instance Boolean hasCls(String cls);
 *
 * public instance undefined toggleCls(String cls);
 *
 * public instance undefined radioCls(String cls);
 *
 * */

~function() {

	var prototype = this,
		splitReg = /\s+/;

	function applyCls(el, method, cls) {

		cls = cls.trim();

		if (splitReg.test(cls)) {

			Array.forEach(cls.split(splitReg), applyCls, el, method);
		}
		else {

			el.classList[method](cls);
		}
	}

	prototype.addCls = function(cls) {

		applyCls(this, 'add', cls);
	};

	prototype.removeCls = function(cls) {

		applyCls(this, 'remove', cls);
	};

	function hasCls(el, cls) {

		if (el.hasCls(cls) === false) {

			return false;
		}
	}

	prototype.hasCls = function(cls) {

		var me = this;

		cls = cls.trim();

		if (splitReg.test(cls)) {

			if (Array.forEach(cls.split(splitReg), hasCls, me) === false) {

				return false;
			}

			return true;
		}
		else {

			return me.classList.contains(cls);
		}
	};

	function toggleCls(el, cls) {

		el.toggleCls(cls);
	}

	prototype.toggleCls = function(cls) {

		var me = this;

		cls = cls.trim();

		if (splitReg.test(cls)) {

			Array.forEach(cls.split(splitReg), toggleCls, me);
		}
		else {

			if (me.hasCls(cls)) {

				me.removeCls(cls);
			}
			else {

				me.addCls(cls);
			}
		}
	};

	function radioCls(cls, target, el) {

		if (el === target) {

			el.addCls(cls);
		}
		else {

			el.removeCls(cls);
		}
	}

	prototype.radioCls = function(cls) {

		var me = this,
			els = me.parentElement.children;

		Array.forEach(els, radioCls, cls, me);
	};

}.call(HTMLElement.prototype);
