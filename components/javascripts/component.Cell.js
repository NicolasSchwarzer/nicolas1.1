var backgroundColor = exports.getAttribute('data-nicolas-attr-active-color') || '#ececec',
	originalBackgroundColor = exports.getStyle('background-color');

if (OS.isAndroid) {

	exports.addCls('nicolas-component-cell-active');
}
else {

	exports.addEventListener2('activatestart', function() {

		exports.setStyle('background-color', backgroundColor);
	});

	exports.addEventListener2('activateend', function() {

		exports.setStyle('background-color', originalBackgroundColor);
	});
}
