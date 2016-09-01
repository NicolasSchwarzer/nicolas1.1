window.PickerHelper = {};

~function() {

	var prototype = this,
		weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		weekDays2 = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

	function convertIntegerToDoubleChar(value) {

		value = value.toString();

		return (value.length === 1 ? '0' : '') + value;
	}

	function locate(el, index, data, value, maxValue) {

		var dataPropName = 'data' + index,
			maxScrollValuePropName = 'maxScrollValue' + index,
			scrollValuePropName = 'scrollValue' + index,
			i = 1;

		el[dataPropName] = data;

		el[maxScrollValuePropName] = (maxValue - 1) * 18;

		el[scrollValuePropName] += 1;

		for (; i < maxValue + 1; i += 5) {

			if (value < i + 5) {

				el[scrollValuePropName] += (value - i) * 18;

				break;
			}

			el[scrollValuePropName] += 90;
		}

		el[scrollValuePropName] -= 1;
	}

	prototype.initDateTimePicker = function(config) {

		var pickerEl = config.picker, receiverEl = config.receiver,
			name = config.name || '',
			days = Number(config.days) || 3;

		if (!pickerEl || !receiverEl) {

			return;
		}

		function generateDates(date, now) {

			var result = [], thisDate,
				month, date2, day;

			for (var i = 0; i <= days; ++i) {

				thisDate = new Date(date);

				thisDate.setDate(thisDate.getDate() + i);

				month = thisDate.getMonth() + 1, date2 = thisDate.getDate(), day = thisDate.getDay();

				result.push({
					key: {
						year: thisDate.getFullYear(),
						month: month,
						date: date2,
						day: day
					},
					value: i === 0 ? (date.getDate() === now.getDate() ? '今天' : month + '月' + date2 + '日&nbsp;' + weekDays[day]) : month + '月' + date2 + '日&nbsp;' + weekDays[day]
				});
			}

			return result;
		}

		function generateHours() {

			var result = [];

			for (var i = 0; i < 24; ++i) {

				result.push({
					key: i,
					value: convertIntegerToDoubleChar(i)
				});
			}

			return result;
		}

		function generateMinutes() {

			var result = [];

			for (var i = 0; i < 12; ++i) {

				result.push({
					key: i * 5,
					value: convertIntegerToDoubleChar(i * 5)
				});
			}

			return result;
		}

		var now = new Date, date = new Date(now);

		date.setSeconds(0);

		date.setMinutes(date.getMinutes() + 20);

		date.setMinutes(Math.floor(date.getMinutes() / 10) * 10);

		var minHour = date.getHours(), minMinute = date.getMinutes();

		var dates = generateDates(date, now),
			hours = generateHours(),
			minutes = generateMinutes();

		pickerEl.onRequestData1 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = dates[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		pickerEl.onRequestData2 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = hours[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		pickerEl.onRequestData3 = function(start, limit) {

			var result = [], item;

			for (var i = start * limit; i < limit; ++i) {

				item = minutes[i];

				if (item) {

					result.push(item);
				}
				else {

					break;
				}
			}

			return result;
		};

		locate(pickerEl, 2, pickerEl.onRequestData2(0, 15), minHour + 1, 23 + 1);

		locate(pickerEl, 3, pickerEl.onRequestData3(0, 15), minMinute / 5 + 1, 55 / 5 + 1);

		pickerEl.onValueChange = function(day, hour, minute) {

			var shownHour = hour.key, shownMinute = minute.key,
				shownKey = day.key, shownDate = new Date(shownKey.year, shownKey.month - 1, shownKey.date, shownHour, shownMinute);

			if (shownDate < date) {

				if (shownHour < minHour) {

					pickerEl.value2 = minHour;
				}

				if (shownMinute < minMinute) {

					pickerEl.value3 = minMinute;
				}
			}

			receiverEl[name] = shownKey.year + '年' + shownKey.month + '月' + shownKey.date + '日&nbsp;' + weekDays2[shownKey.day] + '&nbsp;' + hour.value + ':' + minute.value;
		};
	};

}.call(PickerHelper);
