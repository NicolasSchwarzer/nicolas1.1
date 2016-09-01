/**
 *
 * @author Nicolas Wan
 *
 * Redefine Event Mechanism
 *
 * public instance undefined addEventListener(String name, Function func);
 *
 * public instance undefined removeEventListener(String name, Function func);
 *
 * public instance undefined|false dispatchEvent2(String name [, Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public instance Boolean hasEventListener(String name);
 *
 * public instance undefined clearEventListeners;
 *
 * public instance undefined suspendEvents;
 *
 * public instance undefined resumeEvents;
 *
 * public instance undefined addEventListener2(String name, Function func);
 *
 * public instance undefined removeEventListener2(String name, Function func);
 *
 * */

~function() {

	var transitionProperty = 'transition-property',
		addExtendedEventListener = 'AddExtendedEventListener',
		removeExtendedEventListener = 'RemoveExtendedEventListener',
		browserCompatibleEventNames = {
			animationiteration: 'webkitAnimationIteration',
			animationstart: 'webkitAnimationStart',
			animationend: 'webkitAnimationEnd',
			transitionend: 'webkitTransitionEnd'
		},
		touchCompatibleEventNames = {
			touchstart: 'mousedown',
			touchmove: 'mousemove',
			touchend: 'mouseup'
		},
		ObserverClass = Observer.prototype;

	function getEventName(el, name) {

		if (browserCompatibleEventNames.hasOwnProperty(name) && Feature.getSupportedPropertyName(el.style, transitionProperty) !== transitionProperty) {

			return browserCompatibleEventNames[name];
		}
		else if (!Feature.isTouch && touchCompatibleEventNames.hasOwnProperty(name)) {

			return touchCompatibleEventNames[name];
		}

		return name;
	}

	function redefineEventMechanism(prototype) {

		var originalAddEventListener = prototype.addEventListener,
			originalRmoveEventListener = prototype.removeEventListener;

		prototype.addEventListener = function(name, func) {

			var me = this,
				args = Array.from(arguments);

			args[0] = name = getEventName(me, name);

			originalAddEventListener.apply(me, args);

			ObserverClass.addEventListener.call(me, name, func); // Observer doesn't support capture or bubble yet, here we don't use the third argument
		};

		prototype.removeEventListener = function(name, func) {

			var me = this,
				args = Array.from(arguments);

			args[0] = name = getEventName(me, name);

			originalRmoveEventListener.apply(me, args);

			ObserverClass.removeEventListener.call(me, name, func);
		};

		Object.copyTo(prototype, ObserverClass, [{
				from: 'dispatchEvent',
				to: 'dispatchEvent2' // dispatchEvent2 also supports original events (e.g. touchstart), for unit test
			},
			'hasEventListener',
			'clearEventListeners',
			'suspendEvents',
			'resumeEvents'
		]);

		prototype.addEventListener2 = function(name, func) {

			var me = this;

			if (!me.hasEventListener(name) && name !== addExtendedEventListener && name !== removeExtendedEventListener) {

				window.dispatchEvent2(addExtendedEventListener, me, name);
			}

			ObserverClass.addEventListener.call(me, name, func);
		};

		prototype.removeEventListener2 = function(name, func) {

			var me = this;

			ObserverClass.removeEventListener.call(me, name, func);

			if (!me.hasEventListener(name) && name !== addExtendedEventListener && name !== removeExtendedEventListener) {

				window.dispatchEvent2(removeExtendedEventListener, me, name);
			}
		};
	}

	redefineEventMechanism(HTMLElement.prototype);

	redefineEventMechanism(window);
}();
