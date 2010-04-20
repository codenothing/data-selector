/*
 * Data Selector [VERSION] - Test Suite
 * [DATE]
 * Corey Hart http://www.codenothing.com
 */ 
(function( $, window, testarr ){

// Number of list objects to add for loop testing (Alter for your liking)
var listObjects = 100, console = window.console;

// Run selection test
function runTests( str, compare ){
	// Data Result String
	var parsestr = str.replace(/>/g, "&gt;").replace(/</g, "&lt;"), 
		html = "<tr><td>"+parsestr+"</td><td>["+compare+"]</td>",
		matched = [];

	// Remove Focus
	$('#list li.focus').removeClass('focus');

	// Firebug Logging
	if ( console ) {
		console.time( str );
	}

	$('#list li:data(' + str + ')').addClass('focus');

	if ( console ) {
		console.timeEnd( str );
	}

	// Run Comparrisons
	resultstr = comparison( compare ) ? "<b style='color:green;'>Passed</b></td>" : "<b style='color:red;'>Failed</b>";
	$('#list li').each(function( i, val ){
		if ( $(this).hasClass('focus') ) {
			matched.push(i);
		}
	});

	// Add to table list
	$('#results').append(
		html +
		"<td>[" + matched + "]</td><td>" + resultstr + "</td>" + 
		"<td><input type='button' value='Profile' onClick=\"profile('" + str + "')\"</td>"
	);
}

// Check array of elements passed match the selector results
function comparison( arr ){
	// Check matches
	for ( var i in arr ) {
		if ( arr.hasOwnProperty(i) && ! $('#list li:eq(' + arr[i] + ')').hasClass('focus')) {
			return false;
		}
	}
	
	// Passed all tests, ensure comparrison matches length
	return arr.length == $('#list li.focus').length;
}


// Profiling
function profile( str ){
	if ( ! console ){
		alert("You don't have firebug installed");
	} else {
		console.profile( str );
		$('#list li:data(' + str + ')');
		console.profileEnd( str );
	}
}

// Attach data to list
$(function(){
	// Object tree for data storage
	var str = [], i, l, tree = {
		lvl1: {
			lvl2: {
				fin: 22
			}
		}
	};

	// Add Data
	$('#list li:odd').data('odd', true);
	$('#list li:even').data('even', true);
	$('#list li:eq(1)').data('noval', true);
	$('#list li:eq(2)').data('singleval', 'testcase').data('falseval', false);
	$('#list li:eq(3)').data('tree', tree);

	// Add more list objects for loop testing
	if ( console ) {
		console.log('Selections run across '+(listObjects+4)+' elements');
	}

	for ( i = -1, l = listObjects; ++i < listObjects; ) {
		str.push('<li>No Data Element</li>');
	}

	$('#list').append(str.join(''));

	// Run the tests
	for ( i in testarr ) {
		if ( testarr.hasOwnProperty(i) ) {
			runTests(testarr[i][0], testarr[i][1]);
		}
	}
});

})( jQuery, window, testarr );
