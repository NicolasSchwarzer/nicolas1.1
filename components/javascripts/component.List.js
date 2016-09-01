var pageSize = parseInt(exports.getAttribute('data-nicolas-attr-pre-generate-count')) || 10,
	limit = parseInt(exports.getAttribute('data-nicolas-attr-limit')) || 50,
	page = 0, start = 0, baseScrollHeight = 0, lineHeight = 0,
	resetTimes = 0, bufferTimeOut, bufferTime = 300,
	fadeOutTimeOut, fadeOutTime = 700,
	topPageEl = exports.querySelector('div.nicolas-component-list-page'), bottomPageEl,
	currentPageEl = topPageEl, scrollerEl = exports.firstElementChild,
	containerEl = topPageEl.parentElement.parentElement, loaderEl,
	poolData = [],
	onRequestData, onSaveItemDataToElement, onClearItemElementData,
	emptyFunc = function() {};

function clearItemElement(el) {

	el.addCls('nicolas-component-list-item-hidden');

	exports.onClearItemElementData(el);
}

function clearPageElement(el) {

	Array.forEach(el.children, clearItemElement);
}

function initPageElement(el) {

	var pageData;

	Object.defineProperties(el, {

		data: {

			set: function(data) {

				var me = this, els = me.children,
					i = 0, length = els.length, dataLength = data.length,
					el, value;

				clearPageElement(me);

				pageData = [];

				for (; i < length; ++i) {

					if (i === dataLength) {

						break;
					}

					value = data[i];

					if (value === undefined) {

						continue;
					}

					el = els[i];

					exports.onSaveItemDataToElement(value, el, i, length, data);

					el.removeCls('nicolas-component-list-item-hidden');

					pageData.push(value);
				}

				if (pageData.length > 0) {

					me.removeCls('nicolas-component-list-page-hidden');
				}
				else {

					me.addCls('nicolas-component-list-page-hidden');
				}
			},

			get: function() {

				return pageData || [];
			}
		},

		height2: {

			get: function() {

				return this.data.length * lineHeight;
			}
		}
	});
}

function swap(el) {

	return el === topPageEl ? bottomPageEl : topPageEl;
}

function onFadeOutTimeOut() {

	scrollerEl.addEventListener2('scroll', onScroll);

	loaderEl && loaderEl.hide();

	exports.unlock();
}

function onBufferTimeOut() {

	topPageEl.addCls('nicolas-component-list-page-fade-out');

	bottomPageEl.addCls('nicolas-component-list-page-fade-out');

	loaderEl && loaderEl.addCls('nicolas-component-list-page-fade-out');

	fadeOutTimeOut = setTimeout(onFadeOutTimeOut, fadeOutTime);
}

function insertData(data) {

	var me = this, helperData,
		start = me.start, limit = me.limit,
		deltaLength = start * limit - poolData.length;

	if (me.resetTimes < resetTimes) {

		return;
	}

	if (deltaLength > 0) {

		poolData = poolData.concat(new Array(deltaLength)).concat(data.slice(0, limit));
	}
	else if (deltaLength == 0) {

		poolData = poolData.concat(data.slice(0, limit));
	}
	else {

		helperData = data.slice(0, limit);

		Array.prototype.splice.apply(poolData, [start * limit, helperData.length].concat(helperData));
	}

	if (start === 0) {

		topPageEl.data = poolData.slice(0, pageSize);

		bottomPageEl.data = poolData.slice(pageSize, pageSize * 2);

		scrollerEl.scrollHeight2 = topPageEl.height2 + bottomPageEl.height2;

		bufferTimeOut = setTimeout(onBufferTimeOut, bufferTime);
	}
}

function requestData() {

	if ((page + 1) * pageSize >= start * limit / 2) {

		exports.onRequestData(start, limit, insertData.bind({
			start: start,
			limit: limit,
			resetTimes: resetTimes
		}));

		++start;
	}
}

function onScroll(el, value, lastValue) {

	var pageEl, pageHeight,
		currentPageHeight;

	if (value >= lastValue) {

		currentPageHeight = currentPageEl.height2;

		if (value - baseScrollHeight >= currentPageHeight - containerEl.clientHeight) {

			pageEl = swap(currentPageEl);

			if (pageEl.height2 === 0) {

				pageEl.data = poolData.slice((page + 1) * pageSize, (page + 2) * pageSize);

				scrollerEl.scrollHeight2 = baseScrollHeight + currentPageHeight + pageEl.height2;
			}
		}
		
		if (value - baseScrollHeight >= currentPageHeight) {

			pageEl = swap(currentPageEl);

			pageHeight = pageEl.height2;

			if (pageHeight === 0) {

				return;
			}

			baseScrollHeight += currentPageHeight;

			currentPageEl.translateY += currentPageHeight + pageHeight;

			currentPageEl.data = poolData.slice((page + 2) * pageSize, (page + 3) * pageSize);

			++page;

			scrollerEl.scrollHeight2 = baseScrollHeight + pageHeight + currentPageEl.height2;

			currentPageEl = pageEl;

			requestData();
		}
	}
	else {

		if (value < baseScrollHeight) {

			if (page === 0) {

				return;
			}

			pageEl = swap(currentPageEl);

			--page;

			pageEl.data = poolData.slice(page * pageSize, (page + 1) * pageSize);

			pageHeight = pageEl.height2;

			baseScrollHeight -= pageHeight;

			pageEl.translateY -= currentPageEl.height2 + pageHeight;

			currentPageEl = pageEl;
		}
	}
}

~function() {

	var docFrag = document.createDocumentFragment(),
		i = 1, el = topPageEl.firstElementChild;

	loaderEl = el.querySelector('div.nicolas-component-list-item > [data-nicolas-attr-list-loader]');

	if (loaderEl) {

		containerEl.appendChild(loaderEl);
	}

	for (; i < pageSize; ++i) {

		docFrag.appendChild(el.cloneNode(true));
	}

	topPageEl.appendChild(docFrag);

	bottomPageEl = topPageEl.parentElement.appendChild(topPageEl.cloneNode(true));
}();

initPageElement(topPageEl);

initPageElement(bottomPageEl);

Object.defineProperties(exports, {

	onSaveItemDataToElement: {

		set: function(func) {

			if (func instanceof Function) {

				onSaveItemDataToElement = func;
			}
		},

		get: function() {

			return onSaveItemDataToElement || emptyFunc;
		}
	},

	onClearItemElementData: {

		set: function(func) {

			if (func instanceof Function) {

				onClearItemElementData = func;
			}
		},

		get: function() {

			return onClearItemElementData || emptyFunc;
		}
	},

	onRequestData: {

		set: function(func) {

			if (func instanceof Function) {

				onRequestData = func;
			}
		},

		get: function() {

			return onRequestData || emptyFunc;
		}
	},

	data: {

		get: function() {

			return poolData;
		}
	},

	locked: {

		get: function() {

			return scrollerEl.locked;
		}
	}
});

exports.stop = function() {

	scrollerEl.stop();
};

exports.lock = function() {

	scrollerEl.lock();
};

exports.unlock = function() {

	scrollerEl.unlock();
};

exports.reset = function() {

	++resetTimes;

	bufferTimeOut && clearTimeout(bufferTimeOut);

	fadeOutTimeOut && clearTimeout(fadeOutTimeOut);

	scrollerEl.removeEventListener2('scroll', onScroll);

	scrollerEl.reset();

	this.lock();

	topPageEl.removeCls('nicolas-component-list-page-fade-out');

	bottomPageEl.removeCls('nicolas-component-list-page-fade-out');

	loaderEl && loaderEl.hide();

	topPageEl.data = [], bottomPageEl.data = [];

	topPageEl.translateY = 0, bottomPageEl.translateY = 0;

	currentPageEl = topPageEl;

	page = 0, start = 0, baseScrollHeight = 0;

	poolData.length = 0;

	scrollerEl.scrollHeight2 = 0;
};

exports.run = function() {

	if (loaderEl) {

		loaderEl.removeCls('nicolas-component-list-page-fade-out');

		loaderEl.show();
	}

	requestData();
};

exports.addEventListener2('tap', function(el, e) {

	if (e.target.findParent('div.nicolas-component-list-item')) {

		exports.lock();

		exports.unlock();
	}
});

exports.addEventListener2('ready', function() {

	exports.lock();

	lineHeight = Number(topPageEl.firstElementChild.getComputedStyle('height').replace(/px$/, ''));
});
