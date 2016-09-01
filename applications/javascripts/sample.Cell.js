~function() {

	window.addEventListener2('ready', function() {

		var cellEl = document.querySelector('#cellEl'),
			startTime, endTime,
			intervalId, intervalTime = 10,
			numReg = /236/;

		function onInterval() {

			if (!numReg.test(cellEl.getComputedStyle('background-color'))) {

				endTime = (new Date).getTime();

				console.log(endTime - startTime);

				clearInterval(intervalId);
			}
		}

		if (OS.isAndroid) {

			cellEl.addEventListener2('tap', function() {

				startTime = (new Date).getTime();

				intervalId = setInterval(onInterval, intervalTime);

				onInterval();
			});
		}
		else {

			console.log('Sample Cell');
		}
	});
}();
