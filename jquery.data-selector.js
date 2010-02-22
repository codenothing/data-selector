/**
 * Data Selector 1.0
 * August 27, 2009
 * Corey Hart http://www.codenothing.com
 *
 * Inspiration from Pim Jager @ http://jqueryplugins.blogspot.com/search/label/jQuery%20plugin
 * Credit RegExp trick to James Padolsey @ http://james.padolsey.com/javascript/extending-jquerys-selector-capabilities/
 */ 
;(function($){
 	// Globals
	var undefined, name, value, condition, original, eqIndex, cache = {}, special = {};

	// Move parsing to global, so it only runs once
	function parseQuery(query){
		// Store original query for comparrison
		original = query;

		// Use cached results if possible
		if (cache[original]){
			name = cache[original].name;
			value = cache[original].value;
			condition = cache[original].condition;
			eqIndex = cache[original].eqIndex;
			return true;
		}

		// Find the first instance of equal sign
		// for name=val operations
		eqIndex = query.indexOf('=');
		if (eqIndex !== -1){
			name = query.substring(0, eqIndex);
			value = query.substring(eqIndex+1)||null;
		}else{
			name = query;
			value = null;
		}

		// Store condition (not required) for comparrison
		condition = name.charAt(name.length-1);

		// If condition is passed, remove it from name string
		if (condition == '!' || condition == '^' || condition == '$' || condition == '*' || condition == '<' || condition == '>' || condition == '~')
			name = name.substring(0, name.length-1);
		// Check for special comparrison function
		else if (condition == ']'){
			condition = /\[(.*?)\]$/.exec(name)[1];
			name = name.replace(/\[(.*?)\]$/, '');
		}

		// If >= or <= is passed, add to condition
		if (value && (condition == '<' || condition == '>') && value.charAt(0) === '='){
			value = value.substring(1);
			condition = condition + '=';
		}
		// If regex condition passed, store regex into the value var
		else if (condition == '~')
			value = new RegExp(value.substr(1, value.lastIndexOf('/')-1), value.split('/').pop());

		// Expand name to allow for multiple levels
		name = name.split('.');

		// Cache Results
		cache[original] = {
			name: name,
			value: value,
			condition: condition,
			eqIndex: eqIndex
		};
	}

	// Attach data expression to the filter system
	$.expr[':'].data = function(elem, index, params, group){
		// If element doesn't exist, or no query string was provided, return false
		if (elem === undefined || ! params[3] || params[3] == '')
			return false;
		// Run parsing if new query
		else if (original !== params[3])
			parseQuery(params[3]);

		// Grab bottom most level data
		var data;
		for (var i in name)
			if ((data = data === undefined ? $(elem).data(name[i]) : data[name[i]]) === undefined)
				return false;

		// No comparrison passed, just looking for existance
		// (which was found at this point)
		if (eqIndex === -1)
			return true;

		// Check condition type
		switch (condition){
			// Not equal to
			case '!': return data.toString() !== value;
			// Starts with
			case '^': return data.toString().indexOf(value) == 0;
			// Ends with
			case '$': return data.toString().substr(data.length - value.length) === value;
			// Contains
			case '*': return data.toString().indexOf(value) != -1;
			// Greater Than (or equal to)
			case '>': return data > value;
			case '>=': return data >= value;
			// Less Than (or equal to)
			case '<': return data < value;
			case '<=': return data <= value;
			// Regex Matching
			case '~': return value.test(data.toString());
			// Defaults to either special user defined function, or simple '=' comparison
			default: return special[condition] ? special[condition].call(elem, data, value, index, params, group) : data.toString() === value;
		}
	};

	// Give developers ability to attach their own
	// special data comparison function
	$.dataSelector = function(o, fn){
		if (typeof o !== 'object')
			special[o] = fn;
		else
			$.extend(special, o||{});
	};
})(jQuery);
