String.standardizeName = function(name) {

	var names = name.split(/\./), value,
		i = 0, length = names.length,
		result = [];

	for (; i < length; ++i) {

		value = names[i].toLowerCase();

		if (i === length - 1) {

			value = value[0].toUpperCase() + value.substr(1);

			result.push(value);
		}
		else {

			result.push(value);
		}
	}

	return result.join('.');
};

String.capitalizeName = function(name) {

	var names = name.split(/\./), value,
		i = 0, length = names.length,
		result = [];

	for (; i < length; ++i) {

		value = names[i];

		result.push(value.charAt(0).toUpperCase() + value.substr(1));
	}

	return result.join('');
};
