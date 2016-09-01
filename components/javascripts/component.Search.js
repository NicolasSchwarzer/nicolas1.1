var cardEl = exports.firstElementChild,
	offEl = exports.querySelector('div.nicolas-component-search-off'),
	onEl = exports.querySelector('div.nicolas-component-search-on'),
	formEl = onEl.firstElementChild,
	inputEl = formEl.querySelector('input');

function onWindowTouch(el, e) {

	var target = e.target.findParent('div[data-nicolas-component="Search"]');

	if (target !== exports) {

		inputEl.blur();
	}
}

Object.defineProperties(exports, {

	value: {

		get: function() {

			return inputEl.value;
		}
	}
});

offEl.addEventListener2('tap', function() {

	inputEl.value = '';

	cardEl.activeIndex = 1;

	inputEl.focus();

	exports.dispatchEvent2('searchstart');
});

onEl.addEventListener2('tap', function(el, e) {

	if (e.target.findParent('div.nicolas-component-search-on > div:last-child')) {

		inputEl.value = '';

		inputEl.blur();

		cardEl.activeIndex = 0;

		exports.dispatchEvent2('searchend');
	}
	else {

		inputEl.focus();
	}
});

exports.reset = function() {

	inputEl.value = '';

	inputEl.blur();

	cardEl.activeIndex = 0;
};

window.addEventListener2('tap', onWindowTouch);

window.addEventListener2('dragstart', onWindowTouch);

formEl.addEventListener('submit', function(e) {

	e.preventDefault();

	inputEl.blur();

	exports.dispatchEvent2('search', inputEl.value);
});

inputEl.addEventListener('focus', function() {

	exports.dispatchEvent2('searchfocus');
});
