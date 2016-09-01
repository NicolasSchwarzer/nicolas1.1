~function() {

	window.addEventListener2('ready', function() {

		window.addEventListener2('tap', function(el, e) {

			console.log(String.join('pageX2: ', e.pageX2, '; pageY2: ', e.pageY2, ';'));
		});
	});
}();
