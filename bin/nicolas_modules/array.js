Array.forEach = function(data, func) {

	var i = 0, length = data.length,
		args = Array.from(arguments),
		start;

	args.splice(0, 2);
	args.splice(start = args.length, 0, 1, 2, 3);

	for (; i < length; ++i) {

		args[start] = data[i];
		args[start + 1] = i;
		args[start + 2] = data;

		func.apply(undefined, args);
	}
};
