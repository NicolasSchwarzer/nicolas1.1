/**
 *
 * @author Nicolas Wan
 *
 * OS API
 *
 * public property Boolean isIOS;
 *
 * public property Boolean isAndroid;
 *
 * public property Boolean isMac;
 *
 * public property Boolean isWindows;
 *
 * */

window.OS = {};

~function() {

	var userAgent = navigator.userAgent;

	Object.defineProperties(this, {

		'isIOS': {

			get: function() {

				return /iPhone|iPad/.test(userAgent);	
			}
		},

		'isAndroid': {

			get: function() {

				return /Android/.test(userAgent);
			}
		},

		'isMac': {

			get: function() {

				return /Mac/.test(userAgent) && !this.isIOS;
			}
		},

		'isWindows': {

			get: function() {

				return /Windows/.test(userAgent);
			}
		}
	});
}.call(OS);

/**
 *
 * @author Nicolas Wan
 *
 * Feature API
 *
 * public property Boolean isTouch;
 *
 * public instance String getSupportedPropertyName(Mixed object, String name);
 *
 * */

window.Feature = {};

~function() {

	var prototype = this;

	Object.defineProperties(prototype, {

		'isTouch': {

			get: function() {

				return OS.isIOS || OS.isAndroid;
			}
		}
	});

	prototype.getSupportedPropertyName = function(object, name) {

		var vendorName = '-webkit-' + name;

		if (name in object) {

			return name;
		}
		else if (vendorName in object) {

			return vendorName;
		}
	};

}.call(Feature);

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

/**
 *
 * @author Nicolas Wan
 *
 * Array API
 *
 * public static Array isArray(Mixed data);
 *
 * public static Array from(Array data);
 *
 * public static Mixed|undefined forEach(Mixed[] data, Function func [, Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static Array join([Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static Array unique(Array data);
 *
 * public static Boolean push(Array data, Mixed item);
 *
 * public static Boolean remove(Array data, Mixed item);
 *
 * public static Boolean removeAll(Mixed data);
 *
 * */

~function() {

	if (!('isArray' in Array)) {

		Array.isArray = function(data) {

			return Object.prototype.toString.call(data) === '[object Array]';
		};
	}

	if (!('from' in Array)) {

		Array.from = function(data) {

			var i = 0, length = data.length,
				result = [];

			for (; i < length; ++i) {

				result.push(data[i]);
			}

			return result;
		};
	}

	Array.forEach = function(data, func) {

		var i = 0, length = data.length,
			args = Array.from(arguments),
			start, result;

		args.splice(0, 2);
		args.splice(start = args.length, 0, 1, 2, 3);
		
		for (; i < length; ++i) {

			args[start] = data[i];
			args[start + 1] = i;
			args[start + 2] = data;

			result = func.apply(undefined, args);

			if (result !== undefined) {

				return result;
			}
		}
	};

	function join(result, item) {

		Array.push(result, item);
	}

	Array.join = function() {

		var result = [];

		Array.forEach(arguments, join, result);

		return result;
	};

	function unique(result, item) {

		if (result.indexOf(item) === -1) {

			result.push(item);
		}
	}

	Array.unique = function(data) {

		var result = [];

		Array.forEach(data, unique, result);

		return result;
	};

	function push(data, item) {

		Array.push(data, item);
	}

	Array.push = function(data, item) {

		if (item instanceof Array) {

			var oldLength = data.length;

			Array.forEach(item, push, data);

			if (data.length > oldLength) {

				return true;
			}
		}
		else {

			if (data.indexOf(item) === -1) {

				data.push(item);

				return true;
			}
		}

		return false;
	};

	function remove(data, item) {

		Array.remove(data, item);
	}

	Array.remove = function(data, item) {

		if (item instanceof Array) {

			var oldLength = data.length;

			Array.forEach(item, remove, data);

			if (data.length < oldLength) {

				return true;
			}

			return false;
		}
		
		var index, result = false;

		while ((index = data.indexOf(item)) !== -1) {

			data.splice(index, 1);

			result = true;
		}

		return result;
	};

	Array.removeAll = function(data) {

		if (data.length) {

			data.length = 0;

			return true;
		}

		return false;
	};
}();

/**
 *
 * @author Nicolas Wan
 *
 * Function API
 *
 * public instance Function bind([Mixed scope [, Mixed param1 [, ...[, Mixed paramN]]]]);
 *
 * */

~function() {

	var prototype = Function.prototype;

	if (!('bind' in prototype)) {

		prototype.bind = function(scope) {

			var me = this,
				args = Array.from(arguments).slice(1);

			if (scope === undefined || scope === null) {

				scope = window;
			}

			return function() {

				var extendedArgs = Array.from(arguments);

				extendedArgs.unshift(0);

				extendedArgs.unshift(args.length);

				Array.prototype.splice.apply(args, extendedArgs);

				me.apply(scope, args);
			};
		};
	}

}();

/**
 *
 * @author Nicolas Wan
 *
 * Object API
 *
 * public static Boolean isObject(Mixed data);
 *
 * public static undefined|Mixed forEach(Object data, Function func [, Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static Object copyTo(Object dest, Object source [, Array names]);
 *
 * public static Object applyTo(Object dest, Object source);
 *
 * public static Object join([Object param1 [, ...[, Object paramN]]]);
 *
 * public static Object fromQueryString(String data);
 *
 * public static String toQueryString(Object data);
 *
 * */

~function() {

	Object.isObject = function(data) {

		return Object.prototype.toString.call(data) === '[object Object]';
	};

	Object.forEach = function(data, func) {

		var name,
			args = Array.from(arguments),
			start, result;

		args.splice(0, 2);
		args.splice(start = args.length, 0, 1, 2, 3);

		for (name in data) {

			if (data.hasOwnProperty(name)) {

				args[start] = name;
				args[start + 1] = data[name];
				args[start + 2] = data;

				result = func.apply(undefined, args);

				if (result !== undefined) {

					return result;
				}
			}
		}
	};

	function copyTo(dest, source, name) {

		var from, to;

		if (typeof name === 'object') {

			from = name.from;
			to = name.to;
		}
		else {

			from = name;
			to = name;
		}

		dest[to] = source[from];
	}

	Object.copyTo = function(dest, source, names) {

		names = names || Object.keys(source);

		Array.forEach(names, copyTo, dest, source);

		return dest;
	};

	function applyTo(dest, source, name) {

		if (!dest.hasOwnProperty(name)) {

			dest[name] = source[name];
		}
	}

	Object.applyTo = function(dest, source) {

		Array.forEach(Object.keys(source), applyTo, dest, source);

		return dest;
	};

	function join(result, data) {

		Object.applyTo(result, data);
	}

	Object.join = function() {

		var result = {};

		Array.forEach(arguments, join, result);

		return result;
	};

	function fromQueryString(result, value) {

		var sections = value.split('=');

		result[decodeURIComponent(sections[0])] = decodeURIComponent(sections[1]);
	}

	Object.fromQueryString = function(data) {

		var params = data.split('&'),
			result = {};

		if (data) {

			Array.forEach(params, fromQueryString, result);
		}

		return result;
	};

	function toQueryString(result, name, value) {

		if (typeof value === 'object' && value instanceof Date) {

			value = value.getTime();
		}

		if (typeof value !== 'object' && value !== null && value !== undefined) {

			result.push(encodeURIComponent(name) + '=' + encodeURIComponent(String(value)));
		}
	}

	Object.toQueryString = function(data) {

		var result = [];

		Object.forEach(data, toQueryString, result);

		return result.join('&');
	};
}();

/**
 *
 * @author Nicolas Wan
 *
 * String API
 *
 * public static String capitalize(String value);
 *
 * public static String join([Mixed param1 [, ...[, Mixed paramN]]]);
 *
 * public static String split(String value, Mixed separator [, Number limit])
 *
 * public static String hyphen2CamelCase(String value);
 *
 * public static String camelCase2Hyphen(String value);
 *
 * public static String dot2CamelCase(String value);
 *
 * public static String camelCase2Dot(String value);
 *
 * public static String urlAppend(String url, Object params);
 *
 * */

~function() {

	var hyphenReg = /-/,
		upperCaseReg = /[A-Z]/g,
		dotReg = /\./,
		hyphenRep = '-$&',
		emptyStr = '',
		hyphenStr = '-',
		dotStr = '.';

	String.capitalize = function(value) {

		return value.charAt(0).toUpperCase() + value.substr(1);
	};

	String.join = function() {

		var data = Array.from(arguments);

		Array.remove(data, undefined);
		Array.remove(data, null);

		return data.join(emptyStr);
	};

	String.split = function(value, separator, limit) {

		var result = value.split(separator, limit);

		Array.remove(result, '');

		return result;
	};

	String.hyphen2CamelCase = function(value) {

		return generateStringArray(value, hyphenReg, toUpperCase).join(emptyStr);
	};

	String.camelCase2Hyphen = function(value) {

		return generateStringArray(value.replace(upperCaseReg, hyphenRep), hyphenReg, toLowerCase).join(hyphenStr);
	};

	String.dot2CamelCase = function(value) {

		return generateStringArray(value, dotReg, toUpperCase).join(emptyStr);
	};

	String.camelCase2Dot = function(value) {

		var result = generateStringArray(value.replace(upperCaseReg, hyphenRep), hyphenReg, toLowerCase),
			lastIndex = result.length - 1;

		result[lastIndex] = String.capitalize(result[lastIndex]);

		return result.join(dotStr);
	};

	String.urlAppend = function(url, params) {

		var suffix = Object.toQueryString(params);

		if (suffix === '') {

			return url;
		}
		else {

			return url + (url.indexOf('?') === -1 ? '?' : '&') + suffix;
		}
	};

	function generateStringArray(value, splitReg, func) {

		var result = [];

		Array.forEach(value.split(splitReg), func, result);

		return result;
	}

	function toUpperCase(result, value, index) {

		if (index !== 0) {

			value = String.capitalize(value);
		}

		result.push(value);
	}

	function toLowerCase(result, value, index) {

		if (index !== 0) {

			value = value.toLowerCase();
		}

		result.push(value);
	}

}();

/**
 *
 * @author Nicolas Wan
 *
 * JSON API
 *
 * public static Object getPathValue(Object data, String path);
 *
 * public static Object setPathValue(Object data, String path, Mixed value);
 *
 * */

~function() {

	var dotReg = /\./,
		numberReg = /^\d+$/;

	JSON.getPathValue = function(data, path) {

		var names = String.split(path, dotReg),
			i = 0, length = names.length,
			result = data;

		for (; i < length; ++i) {

			result = result[names[i]];

			if (result === null || result === undefined) {

				break;
			}
		}

		return result;
	};

	function setPathValue(data, names, value) {

		var name = names.shift(),
			result;

		if (names.length === 0) {

			data[name] = value;

			return;
		}

		result = data[name];

		if (!Array.isArray(result) && !Object.isObject(result)) {

			if (numberReg.test(names[0])) {

				result = data[name] = [];
			}
			else {

				result = data[name] = {};
			}
		}

		setPathValue(result, names, value);
	}

	JSON.setPathValue = function(data, path, value) {

		setPathValue(data, String.split(path, dotReg), value);

		return data;
	};

}();

/**
 *
 * @author Nicolas Wan
 *
 * Location Extended Properties
 *
 * public property String page;
 *
 * public property Object params;
 *
 * */

~function() {

	var prototype = this,
		pageReg = /\/([^\/]+)$/;

	Object.defineProperties(prototype, {

		page: {

			get: function() {

				return this.href.match(pageReg)[1];
			}
		},

		params: {

			get: function() {

				return Object.fromQueryString(this.search.replace(/^\?/, ''));
			}
		}
	});

}.call(location);

/**
 *
 * @author Nicolas Wan
 *
 * SPAStorage API
 *
 * public property Object data;
 *
 * public property Number index;
 *
 * public property String page;
 *
 * public property Object params;
 *
 * public property Number length;
 *
 * public instance undefined addData(String page [, Object params])
 *
 * */

window.SPAStorage = {};

~function() {

	var prototype = this,
		storage;

	Object.defineProperties(prototype, {

		data: {

			get: function() {

				if (!storage) {

					storage = sessionStorage.getItem(location.page);

					if (storage) {

						storage = JSON.parse(storage);
					}
					else {

						storage = {index: -1, pages: [], params: []};
					}
				}

				return storage;
			}
		},

		index: {

			set: function(value) {

				var me = this, length = me.length,
					storage = me.data;

				if (storage.index === -1) {

					return;
				}

				if (value < 0) {

					storage.index = 0;
				}
				else if (value >= length) {

					storage.index = length - 1;
				}
				else {

					storage.index = value;
				}
			},

			get: function() {

				return this.data.index;
			}
		},

		page: {

			get: function() {

				var storage = this.data;

				return storage.pages[storage.index] || '';
			}
		},

		params: {

			get: function() {

				var storage = this.data;

				return storage.params[storage.index] || {};
			}
		},

		length: {

			get: function() {

				return this.data.pages.length;
			}
		}
	});

	prototype.addData = function(page, params) {

		var storage = this.data, index = storage.index,
			pages = storage.pages, parameters = storage.params,
			length = pages.length;

		pages.splice(index + 1, length - index);

		pages.push(page || '');

		parameters.splice(index + 1, length - index);

		parameters.push(params || {});

		++storage.index;
	};

	window.addEventListener('unload', function() {

		sessionStorage.setItem(location.page, JSON.stringify(prototype.data));
	});

}.call(SPAStorage);

/**
 *
 * @author Nicolas Wan
 *
 * Math API
 *
 * public static Number distance(Number x, Number y);
 *
 * public static Number distance2(Array point1, Array point2);
 *
 * public static Number angle2radian(Number angle);
 *
 * public static Number radian2angle(Number radian);
 *
 * public static Number angle(Number x, Number y);
 *
 * public static Number angle2(Array point1, Array point2);
 *
 * public static Number absAngle(Number angle);
 *
 * */

~function() {

	var abs = Math.abs,
		pow = Math.pow,
		PI = Math.PI;

	Math.distance = function(x, y) {

		return Math.sqrt(pow(abs(x), 2) + pow(abs(y), 2));
	};

	Math.distance2 = function(point1, point2) {

		return Math.distance(point2[0] - point1[0], point2[1] - point1[1]);
	};

	Math.angle2radian = function(angle) {

		return angle * PI / 180;
	};

	Math.radian2angle = function(radian) {

		return radian * 180 / PI;
	};

	Math.angle = function(x, y) {

		return Math.radian2angle(Math.atan2(y, x));
	};

	Math.angle2 = function(point1, point2) {

		return Math.angle(point2[0] - point1[0], point2[1] - point1[1]);
	};

	Math.absAngle = function(angle) {

		var result = angle % 360;

		if (result === 0) {

			return angle <= 0 ? result : 360;
		}

		if (result < 0) {

			result += 360;
		}

		return result;
	};

}();

/**
 *
 * @author Nicolas Wan
 *
 * Math Circle API
 *
 * Web Coordinate
 * ------ rx
 * |
 * |
 * ry
 *
 * Circle Coordinate
 * rx
 * |
 * |
 * ------ ry
 *
 * public static Array circleXY(Number rx, Number ry, Number radius, Number angle [, Number offset]);
 *
 * public static String sector(Number rx, Number ry, Number radius, Number startAngle, Number endAngle [, Number offset]);
 *
 * public static String ring(Number rx, Number ry, Number radius1, Number radius2, Number startAngle, Number endAngle [, Number offset]);
 *
 * */

~function() {

	Math.circleXY = function(rx, ry, radius, angle, offset) {

		var radian = Math.angle2radian(angle + (offset || 0));

		return [
			rx + radius * Math.sin(radian),
			ry - radius * Math.cos(radian)
		];
	};

	Math.sector = function(rx, ry, radius, startAngle, endAngle, offset) {

		var startXY, endXY;

		startAngle = Math.absAngle(startAngle), endAngle = Math.absAngle(endAngle);

		startXY = Math.circleXY(rx, ry, radius, startAngle, offset);

		endXY = Math.circleXY(rx, ry, radius, endAngle, offset);

		return [
			'M', rx, ry,
			'L', startXY[0], startXY[1],
			'A', radius, radius, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 1 : 0, endXY[0], endXY[1],
			'Z'
		].join(' ');
	};

	Math.ring = function(rx, ry, radius1, radius2, startAngle, endAngle, offset) {

		var startXY1, endXY1,
			startXY2, endXY2;

		startAngle = Math.absAngle(startAngle), endAngle = Math.absAngle(endAngle);

		startXY1 = Math.circleXY(rx, ry, radius1, startAngle, offset);

		endXY1 = Math.circleXY(rx, ry, radius1, endAngle, offset);

		startXY2 = Math.circleXY(rx, ry, radius2, startAngle, offset);

		endXY2 = Math.circleXY(rx, ry, radius2, endAngle, offset);

		return [
			'M', startXY1[0], startXY1[1],
			'A', radius1, radius1, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 1 : 0, endXY1[0], endXY1[1],
			'L', endXY2[0], endXY2[1],
			'A', radius2, radius2, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 0 : 1, startXY2[0], startXY2[1],
			'Z'
		].join(' ');
	};

}();

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

/**
 *
 * @author Nicolas Wan
 *
 * Observer Helper API
 *
 * public instance TouchEvent|MouseEvent process(TouchEvent|MouseEvent event [, Boolean isTouchEnd]);
 *
 * */

window.ObserverHelper = {};

~function() {

	this.process = function(event, isTouchEnd) {

		if (Feature.isTouch) {

			var touches = isTouchEnd === true ? event.changedTouches : event.touches,
				touch;

			if (touches.length === 1) {

				touch = touches[0];

				event.pageX2 = touch.pageX;
				event.pageY2 = touch.pageY;
			}
		}
		else {

			event.pageX2 = event.pageX;
			event.pageY2 = event.pageY;
		}

		return event;
	};

}.call(ObserverHelper);

/**
 *
 * @author Nicolas Wan
 *
 * Ajax API
 *
 * public instance undefined request(String url, Object config)
 *
 * */

window.Ajax = {};

~function() {

	this.request = function(url, config) {

		var xhr = new XMLHttpRequest;

		config = config || {};

		if (config.hasOwnProperty('query')) {

			url = String.urlAppend(url, config.query);
		}

		xhr.open(config.method || 'POST', String.urlAppend(url, {
			'_dc': new Date
		}), true);

		if (config.json === true) {

			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		}
		else {

			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		xhr.addEventListener('readystatechange', function() {

			if(xhr.readyState === 4 && xhr.status === 200) {

				if (config.hasOwnProperty('callback')) {

					var result = xhr.responseText;

					try {

						result = JSON.parse(result);
					}
					catch(err) {

					}

					config.callback(result);
				}
			}
		});

		if (config.hasOwnProperty('params')) {

			if (config.json === true) {

				xhr.send(JSON.stringify(config.params));
			}
			else {

				xhr.send(Object.toQueryString(config.params));
			}
		}
		else {

			if (config.json === true) {

				xhr.send(JSON.stringify({}));
			}
			else {

				xhr.send();
			}
		}
	};
}.call(Ajax);

/**
 *
 * @author Nicolas Wan
 *
 * AnimationFrame API
 *
 * public instance undefined stop(String id);
 *
 * public instance String run(Function func, Mixed scope)
 * 
 * */

window.AnimationFrame = {};

~function() {

	var prototype = this,
		ids = {};

	if (!('requestAnimationFrame') in window) {

		window.requestAnimationFrame = window.webkitRequestAnimationFrame;

		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
	}

	prototype.stop = function(id) {

		cancelAnimationFrame(ids[id]);

		delete ids[id];
	};

	prototype.run = function(func, scope) {

		var fn = scope ? func.bind(scope) : func,
			id,

			onAnimationFrameEvent = function() {

				if (fn() !== false) {

					ids[id] = requestAnimationFrame(arguments.callee);
				}
				else {

					prototype.stop(id);
				}
			};

		ids[id = IDGenerator.id()] = requestAnimationFrame(onAnimationFrameEvent);

		return id;
	};

}.call(AnimationFrame);

/**
 * 
 * Reference Code
 *
 * Easing API
 *
 * */

window.Easing = function() {

};

~function() {

	var prototype = this;

	prototype.startValue = 0;

	Object.defineProperties(prototype, {

		'startTime': {

			set: function(value) {

				this.$startTime = value;
			},

			get: function() {

				var me = this;

				return me.$startTime || (me.$startTime = Date.now());
			}
		},

		'callback': {

			set: function(value) {

				this.$func = value;
			},

			get: function() {

				var me = this;

				return me.$func || (me.$func = function() {});
			}
		}
	});

	prototype.setConfig = function(config) {

		var me = this,
			name;

		for (name in config) {

			if (config.hasOwnProperty(name)) {

				me[name] = config[name];
			}
		}
	};

	function run() {

		var me = this,
			ended = me.isEnded();

		me.callback(me.getValue(), ended);

		if (ended) {

			me.reset();

			return false;
		}
	}

	prototype.run = function() {

		var me = this;

		me.$animationFrameId = AnimationFrame.run(run, me);
	};

	prototype.stop = function() {

		var me = this;

		me.reset();

		AnimationFrame.stop(me.$animationFrameId);
	}

	prototype.isEnded = function() {

		return true;
	};

	prototype.getValue = function() {

	};

	prototype.reset = function() {

	};

}.call(Easing.prototype);

/**
 *
 * Reference Code
 *
 * EaseOutEasing API
 *
 * */

window.EaseOutEasing = function() {

};

EaseOutEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	prototype.exponent = 4;
	prototype.duration = 1500;

	Object.defineProperties(prototype, {

		'distance': {

			get: function() {

				var me = this;

				return me.endValue - me.startValue;
			}
		}
	});

	prototype.isEnded = function() {

		var me = this;

		return Date.now() - me.startTime > me.duration;
	};

	prototype.getValue = function() {

		var me = this,
			currentValue = me.startValue + (1 - Math.pow(1 - (Date.now() - me.startTime) / me.duration, me.exponent)) * me.distance;

		if (me.isEnded()) {

			return me.endValue;
		}

		return currentValue;
	};

}.call(EaseOutEasing.prototype);

/**
 *
 * Reference Code
 *
 * BounceEasing API
 *
 * */

window.BounceEasing = function() {

};

BounceEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	prototype.springTension = 0.3;
	prototype.acceleration = 30;
	prototype.startVelocity = 0;

	prototype.getValue = function() {

		var me = this,
			theta = (Date.now() - me.startTime) / me.acceleration;

		return me.startValue - me.startVelocity * theta * Math.pow(Math.E, -me.springTension * theta);
	};

}.call(BounceEasing.prototype);

/*
 *
 * Reference Code
 *
 * MomentumEasing API
 *
 * */

window.MomentumEasing = function() {

};

MomentumEasing.prototype.__proto__ = Easing.prototype;

~function() {

	var prototype = this;

	Object.defineProperties(prototype, {

		'friction': {

			set: function(value) {

				var me = this,
	                theta = Math.log(1 - (value / 10));

	            me.$theta = theta;
	            me.$alpha = theta / me.acceleration;
	            me.$friction = value;
			},

			get: function() {

				return this.$friction;
			}
		},

		'acceleration': {

			set: function(value) {

				var me = this;
	            
	            me.$velocity = me.startVelocity * value;
	            me.$alpha = me.$theta / value;
	            me.$acceleration = value;
			},

			get: function() {

				return this.$acceleration;
			}
		},

		'startVelocity': {

			set: function(value) {

				var me = this;
	            
	            me.$velocity = value * me.acceleration;
			},

			get: function() {

				return this.$velocity;
			}
		},

		'frictionFactor': {

			get: function() {

				var me = this;

	            return Math.exp((Date.now() - me.startTime) * me.$alpha);
			}
		},

		'velocity': {

			get: function() {

				var me = this;
	            
	            return me.frictionFactor * me.startVelocity;
			}
		}
	});

	prototype.$alpha = 0,
	prototype.acceleration = 30,
	prototype.friction = 0,
	prototype.startVelocity = 0;

	prototype.getValue = function() {
	    
	    var me = this ;
	    
	    return me.startValue + me.startVelocity * (1 - me.frictionFactor) / me.$theta;
	};

}.call(MomentumEasing.prototype);

/**
 *
 * Reference Code
 *
 * BoundMomentumEasing API
 *
 * */

window.BoundMomentumEasing = function() {
    
    var me = this ;
    
    me.momentum = new MomentumEasing,
    me.bounce = new BounceEasing;
};

BoundMomentumEasing.prototype.__proto__ = Easing.prototype ;

~function() {

	var proto = this;

	proto.minVelocity = .01,
	proto.minMomentumValue = 0,
	proto.maxMomentumValue = 0;

	proto.setStartTime = function(startTime){
	    
	    var me = this ;
	    
	    me.momentum.startTime = startTime,
	    me.startTime = startTime;
	}

	proto.isEnded = function(){
	    
	    var me = this,
	        momentum = me.momentum;
	    
	    if(!me.isOutOfBound){
	        
	        if(Math.abs(momentum.velocity) < me.minVelocity){
	            
	            return true ;
	        }
	    }
	    
	    if(me.isBouncingBack){
	        
	        if (Math.round(me.bounce.getValue()) === (momentum.startVelocity > 0 ? me.minMomentumValue :  me.maxMomentumValue)){

	            return true ;
	        }
	    }
	    
	    return false ;
	}

	proto.reset = function(){
	    
	    var me = this ;
	    
	    me.lastValue = null;

	    me.isBouncingBack = false;

	    me.isOutOfBound = false;
	}
	    
	proto.getValue = function(){
	    
	    var me = this,
	        momentum = me.momentum,
	        bounce = me.bounce,
	        startVelocity = momentum.startVelocity,
	        direction = startVelocity > 0 ? 1 : -1,
	        minValue = me.minMomentumValue,
	        maxValue = me.maxMomentumValue,
	        boundedValue = (direction == 1) ? minValue : maxValue,
	        lastValue = me.lastValue,
	        value, velocity;
	    
	    if (startVelocity === 0){
	        
	        return me.startValue;
	    }
	    
	    if (!me.isOutOfBound){
	        
	        value = momentum.getValue();
	        velocity = momentum.velocity;
	        
	        if(maxValue === undefined){
	            
	            if(value > minValue){
	                
	                return value ;
	            }
	        }

	        if (value >= minValue && value <= maxValue){
	            
	            return value;
	        }

	        me.isOutOfBound = true;
	 
	        bounce.startTime = Date.now(),
	        bounce.startVelocity = velocity,
	        bounce.startValue = boundedValue;
	    }
	    
	    value = bounce.getValue();

	    if (!me.isEnded()){
	        
	        if (!me.isBouncingBack){
	            
	            if (lastValue !== null){
	                
	                if ((direction == 1 && value < lastValue) || (direction == -1 && value > lastValue)) {
	                    
	                    me.isBouncingBack = true;
	                    
	                }
	            }
	            
	        }
	    }

	    me.lastValue = value;

	    return value;
	}

}.call(BoundMomentumEasing.prototype);

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

/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Selector API
 *
 * public instance Boolean is(String selector);
 *
 * public instance HTMLElement|null findParent(String selector [, HTMLElement stopEl]);
 *
 * */

~function() {

	var prototype = this;

	prototype.is = function(selector) {

		var me = this,
			el = me, parentEl;

		while (parentEl = el.parentElement) {

			if (Array.from(parentEl.querySelectorAll(selector)).indexOf(me) !== -1) {

				return true;
			}

			el = parentEl;
		}

		return false;
	};

	prototype.findParent = function(selector, stopEl) {

		var el = this;

		do {

			if (el.is(selector)) {

				return el;
			}

			if (el === stopEl) {

				break;
			}

			el = el.parentElement;

		} while (el);

		return null;
	};

}.call(HTMLElement.prototype);

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

/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Style API
 *
 * public instance undefined setStyle(String name, String value);
 *
 * public instance String getStyle(String name);
 *
 * public instance String getComputedStyle(String name);
 *
 * public instance Boolean isStyle(String name, String value);
 *
 * */

~function() {

	var prototype = this;

	prototype.setStyle = function(name, value) {

		var style = this.style;

		style.setProperty(Feature.getSupportedPropertyName(style, name), value);
	};

	prototype.getStyle = function(name) {

		var style = this.style;

		return style.getPropertyValue(Feature.getSupportedPropertyName(style, name)) || '';
	};

	prototype.getComputedStyle = function(name) {

		var me = this;

		return getComputedStyle(me, '')[Feature.getSupportedPropertyName(me.style, name)];
	};

	prototype.isStyle = function(name, value) {

		return this.getComputedStyle(name) === value;
	};

}.call(HTMLElement.prototype);

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

/**
 *
 * @author Nicolas Wan
 *
 * HTMLElement Mapping Data API
 *
 * public property Object mappingData
 *
 * */

~function() {

	var prototype = this,
		spaceReg = /\s+/, colonReg = /::/;

	function getTargetElements(el) {

		var result = Array.from(el.querySelectorAll('[data-nicolas-data]')) || [];

		// el.is('[data-nicolas-data]') && result.unshift(el); // HTMLElement.prototype.is, not good performance

		el.hasAttribute('data-nicolas-data') && result.unshift(el);

		return result;
	}

	function processMappingValue(el, data, isSet, mapping) {

		mapping = String.split(mapping, colonReg);

		if (isSet) {

			el[mapping[0]] = JSON.getPathValue(data, mapping[1]) || '';
		}
		else {

			JSON.setPathValue(data, mapping[1], el[mapping[0]] || '');
		}
	}

	function processMappingData(data, isSet, el) {

		Array.forEach(String.split(el.dataset.nicolasData, spaceReg), processMappingValue, el, data, isSet);
	}

	Object.defineProperties(prototype, {

		mappingData: {

			set: function(data) {

				Array.forEach(getTargetElements(this), processMappingData, data, true);
			},

			get: function() {

				var result = {};

				Array.forEach(getTargetElements(this), processMappingData, result, false);

				return result;
			}
		}
	});

}.call(HTMLElement.prototype);

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

/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'tap';
 *
 * */

~function() {

	var maxMoveDistance = 8;

	function onTouchStart(e) {

		var el = this;

		ObserverHelper.process(e);

		el.$nicolasTapStartPoint = [e.pageX2, e.pageY2];

		el.addEventListener('touchmove', onTouchMove);
		el.addEventListener('touchend', onTouchEnd);
	}
	
	function onTouchMove(e) {

		var el = this,
			x, y;

		ObserverHelper.process(e);

		x = e.pageX2, y = e.pageY2;

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			removeEventListeners(el);

			el.dispatchEvent2('tap', e);
		}

		if (Math.distance2(el.$nicolasTapStartPoint, [x, y]) >= maxMoveDistance) {

			removeEventListeners(el);
		}
	}

	function onTouchEnd(e) {

		var el = this;

		removeEventListeners(el);

		el.dispatchEvent2('tap', ObserverHelper.process(e, true));
	}

	function removeEventListeners(el) {

		el.removeEventListener('touchmove', onTouchMove);

		el.removeEventListener('touchend', onTouchEnd);

		delete el.$nicolasTapStartPoint;
	}

	function onClick(e) {

		this.dispatchEvent2('tap', ObserverHelper.process(e));
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'tap') {

			if (Feature.isTouch) {

				el.addEventListener('touchstart', onTouchStart);
			}
			else {

				el.addEventListener('click', onClick);
			}
		}
	});

	window.addEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'tap') {

			if (Feature.isTouch) {

				el.removeEventListener('touchstart', onTouchStart);
			}
			else {

				el.removeEventListener('click', onClick);
			}
		}
	});
}();

/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'dragstart';
 *
 * public event TouchEvent|MouseEvent 'drag';
 *
 * public event TouchEvent|MouseEvent 'dragend';
 * 'dragend' some times does not dispatch on iOS, because of 'touchend' not dispatched, which requires further research;
 *
 * */

~function() {

	var minMoveDistance = 8;

	function onTouchStart(e) {

		var el = this;

		ObserverHelper.process(e);

		el.$nicolasDragStartPoint = [e.pageX2, e.pageY2];

		el.addEventListener('touchmove', onTouchMove);
		el.addEventListener('touchend', onTouchEnd);
	}

	function onTouchMove(e) {

		var el = this,
			x, y;

		ObserverHelper.process(e);

		x = e.pageX2, y = e.pageY2;

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			el.dispatchEvent2('touchend');
		}

		if (Math.distance2([x, y], el.$nicolasDragStartPoint) >= minMoveDistance) {

			removeTouchEventListeners(el);

			onDragStart.call(el, e);
		}
	}

	function onTouchEnd() {

		removeTouchEventListeners(this);
	}

	function removeTouchEventListeners(el) {

		el.removeEventListener('touchmove', onTouchMove);

		el.removeEventListener('touchend', onTouchEnd);

		delete el.$nicolasDragStartPoint;
	}

	function processEventProperties(el, e) {

		var startPoint = el.$nicolasDragStartPoint,
			previousPoint = el.$nicolasDragPreviousPoint,
			x = e.pageX2, y = e.pageY2;

		e.deltaX = x - startPoint[0];
		e.deltaY = y - startPoint[1];

		e.deltaX2 = x - previousPoint[0];
		e.deltaY2 = y - previousPoint[1];

		e.$nicolasPreviousTime = el.$nicolasDragPreviousTime;
	}

	function onDragStart(e) {

		var el = this;

		el.$nicolasDragEvent = e;

		el.dispatchEvent2('dragstart', e);

		el.$nicolasDragStartPoint = [e.pageX2, e.pageY2];
		el.$nicolasDragPreviousPoint = [e.pageX2, e.pageY2];
		el.$nicolasDragPreviousTime = Date.now();

		processEventProperties(el, e);

		el.addEventListener('touchmove', onDrag);
		el.addEventListener('touchend', onDragEnd);		
	}

	function onDrag(e) {

		var el = this,
			x, y, point;

		ObserverHelper.process(e);

		el.$nicolasDragEvent = e;

		x = e.pageX2, y = e.pageY2;

		processEventProperties(el, e);

		if ((y < 0 || x >= screen.width - 2) && OS.isIOS) {

			el.dispatchEvent2('touchend');
		}
		else {

			el.dispatchEvent2('drag', e);

			point = el.$nicolasDragPreviousPoint;
			point[0] = x, point[1] = y;
			el.$nicolasDragPreviousTime = Date.now();
		}
	}

	function onDragEnd() {

		var el = this,
			e = el.$nicolasDragEvent,
			duration = Date.now() - e.$nicolasPreviousTime;

		if (duration > 0 && duration < 50) {

			e.velocityX = e.deltaX2 / duration;
			e.velocityY = e.deltaY2 / duration;
		}
		else {

			e.velocityX = 0;
			e.velocityY = 0;
		}

		removeDragEventListeners(el);

		el.dispatchEvent2('dragend', e);

		delete el.$nicolasDragEvent;
	}

	function removeDragEventListeners(el) {

		el.removeEventListener('touchmove', onDrag);

		el.removeEventListener('touchend', onDragEnd);

		delete el.$nicolasDragStartPoint;

		delete el.$nicolasDragPreviousPoint;

		delete el.$nicolasDragPreviousTime;
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'dragstart' || name === 'drag' || name === 'dragend') {

			if (!el.hasEventListener('dragstart') && !el.hasEventListener('drag') && !el.hasEventListener('dragend')) {

				el.addEventListener('touchstart', onTouchStart);
			}
		}
	});

	window.addEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'dragstart' || name === 'drag' || name === 'dragend') {

			if (!el.hasEventListener('dragstart') && !el.hasEventListener('drag') && !el.hasEventListener('dragend')) {

				el.removeEventListener('touchstart', onTouchStart);
			}
		}
	});

}();

/**
 *
 * @author Nicolas Wan
 *
 * Observer Extended Events
 *
 * public event TouchEvent|MouseEvent 'activatestart';
 *
 * public event TouchEvent|MouseEvent 'activateend';
 *
 * */

~function() {

	var duration = 300;

	function onTouchStart(e) {

		startElementActivation(this, e);
	}

	function onTap(el, e) {

		clearTimeout(el.$nicolasActiveId);

		el.$nicolasActiveId = setTimeout(function() {

			endElementActivation(el, e);

		}, duration);
	}

	function onDragStart(el, e) {

		clearTimeout(el.$nicolasActiveId);

		endElementActivation(el, e);
	}

	function startElementActivation(el, e) {

		if (el.$nicolasActivated !== true) {

			el.$nicolasActivated = true;

			el.dispatchEvent2('activatestart', e);
		}
	}

	function endElementActivation(el, e) {

		if (el.$nicolasActivated === true) {

			el.dispatchEvent2('activateend', e);

			delete el.$nicolasActivated;
		}
	}

	window.addEventListener2('AddExtendedEventListener', function(windowObj, el, name) {

		if (name === 'activatestart' || name === 'activateend') {

			el.addEventListener('touchstart', onTouchStart);

			el.addEventListener2('tap', onTap);

			el.addEventListener2('dragstart', onDragStart);
		}
	});

	window.removeEventListener2('RemoveExtendedEventListener', function(windowObj, el, name) {

		if (name === 'activatestart' || name === 'activateend') {

			el.removeEventListener('touchstart', onTouchStart);

			el.removeEventListener2('tap', onTap);

			el.removeEventListener2('dragstart', onDragStart);
		}
	});

}();

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

window.PickerHelper = {};

~function() {

	var prototype = this,
		weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		weekDays2 = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

	function convertIntegerToDoubleChar(value) {

		value = value.toString();

		return (value.length === 1 ? '0' : '') + value;
	}

	function locate(el, index, data, value, maxValue) {

		var dataPropName = 'data' + index,
			maxScrollValuePropName = 'maxScrollValue' + index,
			scrollValuePropName = 'scrollValue' + index,
			i = 1;

		el[dataPropName] = data;

		el[maxScrollValuePropName] = (maxValue - 1) * 18;

		el[scrollValuePropName] += 1;

		for (; i < maxValue + 1; i += 5) {

			if (value < i + 5) {

				el[scrollValuePropName] += (value - i) * 18;

				break;
			}

			el[scrollValuePropName] += 90;
		}

		el[scrollValuePropName] -= 1;
	}

	prototype.initDateTimePicker = function(config) {

		var pickerEl = config.picker, receiverEl = config.receiver,
			name = config.name || '',
			days = Number(config.days) || 3;

		if (!pickerEl || !receiverEl) {

			return;
		}

		function generateDates(date, now) {

			var result = [], thisDate,
				month, date2, day;

			for (var i = 0; i <= days; ++i) {

				thisDate = new Date(date);

				thisDate.setDate(thisDate.getDate() + i);

				month = thisDate.getMonth() + 1, date2 = thisDate.getDate(), day = thisDate.getDay();

				result.push({
					key: {
						year: thisDate.getFullYear(),
						month: month,
						date: date2,
						day: day
					},
					value: i === 0 ? (date.getDate() === now.getDate() ? '今天' : month + '月' + date2 + '日&nbsp;' + weekDays[day]) : month + '月' + date2 + '日&nbsp;' + weekDays[day]
				});
			}

			return result;
		}

		function generateHours() {

			var result = [];

			for (var i = 0; i < 24; ++i) {

				result.push({
					key: i,
					value: convertIntegerToDoubleChar(i)
				});
			}

			return result;
		}

		function generateMinutes() {

			var result = [];

			for (var i = 0; i < 12; ++i) {

				result.push({
					key: i * 5,
					value: convertIntegerToDoubleChar(i * 5)
				});
			}

			return result;
		}

		var now = new Date, date = new Date(now);

		date.setSeconds(0);

		date.setMinutes(date.getMinutes() + 20);

		date.setMinutes(Math.floor(date.getMinutes() / 10) * 10);

		var minHour = date.getHours(), minMinute = date.getMinutes();

		var dates = generateDates(date, now),
			hours = generateHours(),
			minutes = generateMinutes();

		pickerEl.onRequestData1 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = dates[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		pickerEl.onRequestData2 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = hours[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		pickerEl.onRequestData3 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = minutes[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		locate(pickerEl, 2, pickerEl.onRequestData2(0, 15), minHour + 1, 23 + 1);

		locate(pickerEl, 3, pickerEl.onRequestData3(0, 15), minMinute / 5 + 1, 55 / 5 + 1);

		pickerEl.onValueChange = function(day, hour, minute) {

			var shownHour = hour.key, shownMinute = minute.key,
				shownKey = day.key, shownDate = new Date(shownKey.year, shownKey.month - 1, shownKey.date, shownHour, shownMinute);

			if (shownDate < date) {

				if (shownHour < minHour) {

					pickerEl.value2 = minHour;
				}

				if (shownMinute < minMinute) {

					pickerEl.value3 = minMinute;
				}
			}

			receiverEl[name] = shownKey.year + '年' + shownKey.month + '月' + shownKey.date + '日&nbsp;' + weekDays2[shownKey.day] + '&nbsp;' + hour.value + ':' + minute.value;
		};
	};

}.call(PickerHelper);

function nicolasInitializeComponentViewport(exports) {
	
	
}

~function() {

	window.addEventListener2('ready', function() {

		console.log('Sample Viewport');
	});
}();
