~function() {

	window.addEventListener2('ready', function() {

		var loaderEl = document.querySelector('#loaderEl');

		function onRender() {

			console.log(loaderEl.diameter, loaderEl.borderWidth, loaderEl.color, loaderEl.borderColor);
		}

		window.addEventListener('resize', onRender);

		onRender();
	});
}();
