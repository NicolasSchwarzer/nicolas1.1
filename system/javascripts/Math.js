/**
 *
 * @author Nicolas Wan
 *
 * Math API
 *
 * public static Number distance(Number x, Number y);
 *
 * public static Number distance2(Array point1, Array point2);
 *
 * public static Number angle2radian(Number angle);
 *
 * public static Number radian2angle(Number radian);
 *
 * public static Number angle(Number x, Number y);
 *
 * public static Number angle2(Array point1, Array point2);
 *
 * public static Number absAngle(Number angle);
 *
 * */

~function() {

	var abs = Math.abs,
		pow = Math.pow,
		PI = Math.PI;

	Math.distance = function(x, y) {

		return Math.sqrt(pow(abs(x), 2) + pow(abs(y), 2));
	};

	Math.distance2 = function(point1, point2) {

		return Math.distance(point2[0] - point1[0], point2[1] - point1[1]);
	};

	Math.angle2radian = function(angle) {

		return angle * PI / 180;
	};

	Math.radian2angle = function(radian) {

		return radian * 180 / PI;
	};

	Math.angle = function(x, y) {

		return Math.radian2angle(Math.atan2(y, x));
	};

	Math.angle2 = function(point1, point2) {

		return Math.angle(point2[0] - point1[0], point2[1] - point1[1]);
	};

	Math.absAngle = function(angle) {

		var result = angle % 360;

		if (result === 0) {

			return angle <= 0 ? result : 360;
		}

		if (result < 0) {

			result += 360;
		}

		return result;
	};

}();
