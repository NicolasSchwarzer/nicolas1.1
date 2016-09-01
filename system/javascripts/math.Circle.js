/**
 *
 * @author Nicolas Wan
 *
 * Math Circle API
 *
 * Web Coordinate
 * ------ rx
 * |
 * |
 * ry
 *
 * Circle Coordinate
 * rx
 * |
 * |
 * ------ ry
 *
 * public static Array circleXY(Number rx, Number ry, Number radius, Number angle [, Number offset]);
 *
 * public static String sector(Number rx, Number ry, Number radius, Number startAngle, Number endAngle [, Number offset]);
 *
 * public static String ring(Number rx, Number ry, Number radius1, Number radius2, Number startAngle, Number endAngle [, Number offset]);
 *
 * */

~function() {

	Math.circleXY = function(rx, ry, radius, angle, offset) {

		var radian = Math.angle2radian(angle + (offset || 0));

		return [
			rx + radius * Math.sin(radian),
			ry - radius * Math.cos(radian)
		];
	};

	Math.sector = function(rx, ry, radius, startAngle, endAngle, offset) {

		var startXY, endXY;

		startAngle = Math.absAngle(startAngle), endAngle = Math.absAngle(endAngle);

		startXY = Math.circleXY(rx, ry, radius, startAngle, offset);

		endXY = Math.circleXY(rx, ry, radius, endAngle, offset);

		return [
			'M', rx, ry,
			'L', startXY[0], startXY[1],
			'A', radius, radius, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 1 : 0, endXY[0], endXY[1],
			'Z'
		].join(' ');
	};

	Math.ring = function(rx, ry, radius1, radius2, startAngle, endAngle, offset) {

		var startXY1, endXY1,
			startXY2, endXY2;

		startAngle = Math.absAngle(startAngle), endAngle = Math.absAngle(endAngle);

		startXY1 = Math.circleXY(rx, ry, radius1, startAngle, offset);

		endXY1 = Math.circleXY(rx, ry, radius1, endAngle, offset);

		startXY2 = Math.circleXY(rx, ry, radius2, startAngle, offset);

		endXY2 = Math.circleXY(rx, ry, radius2, endAngle, offset);

		return [
			'M', startXY1[0], startXY1[1],
			'A', radius1, radius1, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 1 : 0, endXY1[0], endXY1[1],
			'L', endXY2[0], endXY2[1],
			'A', radius2, radius2, 0, Math.abs(startAngle - endAngle) >= 180 ? 1 : 0, startAngle < endAngle ? 0 : 1, startXY2[0], startXY2[1],
			'Z'
		].join(' ');
	};

}();
