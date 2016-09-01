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
