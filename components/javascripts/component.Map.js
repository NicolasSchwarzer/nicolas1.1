var geolocation = navigator.geolocation,
	map = new BMap.Map(exports.querySelector('.nicolas-component-map-body'));

if (Feature.isTouch) {

	geolocation.getCurrentPosition(function(pos) {

		var coords = pos.coords;

		map.centerAndZoom(new BMap.Point(coords.longitude, coords.latitude), 16);
	});
}
else {

	map.centerAndZoom(new BMap.Point(121.4, 31.2), 16);
}

map.addControl(new BMap.GeolocationControl());

map.setCurrentCity('上海');

map.enableScrollWheelZoom(true);

exports.search = function(value) {

	var local = new BMap.LocalSearch(map, {
		renderOptions: {
			map: map
		}
	});

	local.search(value);
};
