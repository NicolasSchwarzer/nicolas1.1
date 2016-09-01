var isReady = false,
	isError = (function() {

		var sliderEls = exports.children, el,
			i = 0, length = sliderEls.length,
			pages = [], page;

		for (; i < length; ++i) {

			el = sliderEls[i];

			if (el.dataset.nicolasComponent !== "spa.Slider") {

				alert('Error: 组件\'spa.Pages\'的子节点必须是组件\'spa.Slider\'');

				return true;
			}

			page = el.dataset.nicolasAttrPage;

			if (!page) {

				alert('Error: 组件\'spa.Slider\'必须指定属性\'data-nicolas-attr-page\'');

				return true;
			}

			Array.push(pages, page);
		}

		if (length === 0) {

			alert('Error: 组件\'spa.Pages\'必须要有子节点');

			return true;
		}

		if (pages.length < length) {

			alert('Error: 组件\'spa.Slider\'的属性\'data-nicolas-attr-page\'不能重复');

			return true;
		}

		return false;

	})();

if (isError) {

	return;
}

function getPageEl(page) {

	return exports.querySelector('div[data-nicolas-component="spa.Pages"] > div[data-nicolas-component="spa.Slider"][data-nicolas-attr-page="' + page + '"]');
}

exports.href = function(page, params) {

	var currentPageEl = getPageEl(SPAStorage.page),
		targetPageEl = getPageEl(page);

	if (isReady && targetPageEl) {

		SPAStorage.addData(page, params);

		history.pushState({index: SPAStorage.index}, '', location.page);

		if (currentPageEl === targetPageEl) {

			currentPageEl.onHide(currentPageEl.containerEl);

			targetPageEl.onShow(targetPageEl.containerEl, SPAStorage.params);
		}
		else {

			targetPageEl.onShow(targetPageEl.containerEl, SPAStorage.params);

			targetPageEl.show();

			currentPageEl.hide();
		}
	}
};

exports.back = function() {

	if (!isReady || SPAStorage.index === 0) {

		return;
	}

	history.back();
};

exports.forward = function() {

	if (!isReady || SPAStorage.index === SPAStorage.length - 1) {

		return;
	}

	history.forward();
};

exports.go = function(distance) {

	if (!isReady) {

		return;
	}

	var index = SPAStorage.index, length = SPAStorage.length,
		result;

	distance = parseInt(distance) || 0;

	result = index + distance;

	if (result < 0) {

		distance = -index;
	}
	else if (result >= length) {

		distance = length - 1 - index;
	}

	history.go(distance);
};

exports.run = function() {

	if (!isReady) {

		~function() {

			var pageEl = getPageEl(SPAStorage.page);

			if (SPAStorage.index === -1) {

				pageEl = exports.firstElementChild;

				SPAStorage.addData(pageEl.page);

				history.replaceState({index: SPAStorage.index}, '', location.page);
			}

			pageEl.onShow(pageEl.containerEl, SPAStorage.params);

			pageEl.up2();

		}();

		window.addEventListener('popstate', function(e) {

			var index = e.state.index, isForward = index > SPAStorage.index,
				currentPageEl = getPageEl(SPAStorage.page), targetPageEl;

			SPAStorage.index = index;

			targetPageEl = getPageEl(SPAStorage.page);

			if (currentPageEl === targetPageEl) {

				currentPageEl.onHide(currentPageEl.containerEl);

				targetPageEl.onShow(targetPageEl.containerEl, SPAStorage.params);
			}
			else {

				targetPageEl.onShow(targetPageEl.containerEl, SPAStorage.params);

				targetPageEl.show(isForward);

				currentPageEl.hide(isForward);
			}
		});

		isReady = true;
	}
};
