~function() {

	window.addEventListener2('ready', function() {

		var contentEl = document.querySelector('.content'),
			pickerEl = document.querySelector('[data-nicolas-component="Picker"]');

		contentEl.addEventListener2('tap', function() {

			pickerEl.show();
		});

		PickerHelper.initDateTimePicker({
			picker: pickerEl,
			receiver: contentEl,
			name: 'innerHTML',
			days: 7
		});

		pickerEl.run();
	});
}();
