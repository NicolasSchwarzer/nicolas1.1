/**
 *
 * @author Nicolas Wan
 *
 * Function API
 *
 * public instance Function bind([Mixed scope [, Mixed param1 [, ...[, Mixed paramN]]]]);
 *
 * */

~function() {

	var prototype = Function.prototype;

	if (!('bind' in prototype)) {

		prototype.bind = function(scope) {

			var me = this,
				args = Array.from(arguments).slice(1);

			if (scope === undefined || scope === null) {

				scope = window;
			}

			return function() {

				var extendedArgs = Array.from(arguments);

				extendedArgs.unshift(0);

				extendedArgs.unshift(args.length);

				Array.prototype.splice.apply(args, extendedArgs);

				me.apply(scope, args);
			};
		};
	}

}();
