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
