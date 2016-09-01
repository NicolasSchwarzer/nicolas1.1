~function() {

	window.addEventListener2('ready', function() {

		var contentEl = document.querySelector('p.content'),
			searchEl = document.querySelector('div[data-nicolas-component="Search"]');

		searchEl.addEventListener2('searchstart', function() {

			contentEl.innerHTML = '开始搜索';
		});

		searchEl.addEventListener2('search', function(el, value) {

			contentEl.innerHTML = '关键字:&nbsp;' + value;
		});

		searchEl.addEventListener2('searchend', function() {

			contentEl.innerHTML = '取消搜索';
		});
	});
}();
