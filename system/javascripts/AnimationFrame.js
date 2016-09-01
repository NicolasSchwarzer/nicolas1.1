/**
 *
 * @author Nicolas Wan
 *
 * AnimationFrame API
 *
 * public instance undefined stop(String id);
 *
 * public instance String run(Function func, Mixed scope)
 * 
 * */

window.AnimationFrame = {};

~function() {

	var prototype = this,
		ids = {};

	if (!('requestAnimationFrame') in window) {

		window.requestAnimationFrame = window.webkitRequestAnimationFrame;

		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
	}

	prototype.stop = function(id) {

		cancelAnimationFrame(ids[id]);

		delete ids[id];
	};

	prototype.run = function(func, scope) {

		var fn = scope ? func.bind(scope) : func,
			id,

			onAnimationFrameEvent = function() {

				if (fn() !== false) {

					ids[id] = requestAnimationFrame(arguments.callee);
				}
				else {

					prototype.stop(id);
				}
			};

		ids[id = IDGenerator.id()] = requestAnimationFrame(onAnimationFrameEvent);

		return id;
	};

}.call(AnimationFrame);
