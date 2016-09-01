/**
 *
 * @author Nicolas Wan
 *
 * Observer API
 *
 * public instance undefined addEventListener(String name, Function func);
 *
 * public instance undefined removeEventListener(String name, Function func);
 *
 * public instance Boolean hasEventListener(String name);
 *
 * public instance undefined|false dispatchEvent(String name [, Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public instance undefined clearEventListeners;
 *
 * public instance undefined suspendEvents;
 *
 * public instance undefined resumeEvents;
 *
 * */

window.Observer = function() {

};

~function() {

	var prototype = this;

	prototype.addEventListener = function(name, func) {

		var me = this,
			listeners = me.$listeners;

		if (!listeners) {

			listeners = {};
		}

		if (!listeners.hasOwnProperty(name)) {

			listeners[name] = [];
		}

		Array.push(listeners[name], func);

		me.$listeners = listeners;
	};

	prototype.removeEventListener = function(name, func) {

		var listeners = this.$listeners;

		if (!listeners) {

			return;
		}

		if (listeners = listeners[name]) {

			var index = listeners.indexOf(func);

			if (index !== -1) {

				listeners[index] = undefined;
			}
		}
	};

	prototype.hasEventListener = function(name) {

		var listeners = this.$listeners;

		if (listeners) {

			return listeners.hasOwnProperty(name);
		}

		return false;
	};

	prototype.dispatchEvent = function(name) {

		var me = this,
			listeners = me.$listeners;

		if (!listeners) {

			return;
		}

		if (listeners = listeners[name]) {

			var args = Array.from(arguments);

			args[0] = me;

			if (me.$suspendEvents !== true && Array.forEach(listeners, executeEventListener, me, args) === false) {

				return false;
			}

			Array.remove(listeners, undefined);
		}
	};

	prototype.clearEventListeners = function() {

		var me = this;

		Object.forEach(me.$listeners || {}, clearEventListener, me);

		me.resumeEvents();

		delete me.$listeners;
	};

	prototype.suspendEvents = function() {

		this.$suspendEvents = true;
	};

	prototype.resumeEvents = function() {

		delete this.$suspendEvents;
	};

	function clearEventListener(target, name, listeners) {

		Array.forEach(listeners, removeEventListener, target, name);
	}

	function removeEventListener(target, name, listener) {

		target.removeEventListener(name, listener);
	}

	function executeEventListener(target, args, listener) {

		if (listener) {

			if (listener.apply(target, args) === false) {

				return false;
			}
		}
	}

}.call(Observer.prototype);
