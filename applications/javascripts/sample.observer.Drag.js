~function() {

	window.addEventListener2('ready', function() {

		window.addEventListener2('dragstart', function(el, e) {

			console.log('Drag Start:');

			console.log(String.join('pageX2: ', e.pageX2, '; pageY2: ', e.pageY2, ';'));
		});

		window.addEventListener2('drag', function(el, e) {

			console.log('Drag:');

			console.log(String.join('deltaX: ', e.deltaX, '; deltaY: ', e.deltaY, ';'));

			console.log(String.join('deltaX2: ', e.deltaX2, '; deltaY2: ', e.deltaY2, ';'));
		});

		window.addEventListener2('dragend', function(el, e) {

			console.log('Drag End:');

			console.log(String.join('velocityX: ', e.velocityX, '; velocityY: ', e.velocityY, ';'));
		});
	});
}();
