/*
 * Data Selector [VERSION]
 * [DATE]
 * Corey Hart http://www.codenothing.com
 */
jQuery(function( $ ) {
	// Create local copy of the console object for creation if not defined
	var console = window.console || {};

	// Force each method used in the sandbox onto the console object
	$.each( [ 'log', 'info', 'time', 'timeEnd', 'profile', 'profileEnd' ], function( i, method ){
		if ( ! console.hasOwnProperty( method ) ) {
			console[ method ] = method !== 'profile' ? $.noop : function(){
				alert('Firebug needs to be installed');
			};
		}
	});

	// Cache elements as to limit timing affect as much as possible
	var $enviorment = $('#enviorment'), $elems = $enviorment.children('div'), $table = $('table');

	// Add Data
	$elems.filter(':odd').data('odd', true);
	$elems.filter(':even').data('even', true);
	$elems.filter(':eq(1)').data('noval', true).data('oneval', 1).data('thousandval', 1000);
	$elems.filter(':eq(2)').data('singleval', 'testcase').data('falseval', false).data('zeroval', 0);
	$elems.filter(':eq(3)').data('tree', {
		lvl1: {
			lvl2: {
				fin: 22
			}
		}
	});

	// Add elements to give better time comparison
	for ( var i = -1; ++i < Sandbox.elems; ) {
		$enviorment.append('<div/>');
	}

	// Reset the elems cache to account for all enviorment divs
	$elems = $enviorment.children('div');

	// User Profiling
	$table.delegate( 'button', 'click', function(){
		var data = $.data( this, 'Data' );

		if ( data && data.filter ) {
			console.info('Filtering Through ' + $elems.length + ' Elements');
			console.profile( data.filter );
			$elems.filter( ':data(' + data.filter + ')' );
			console.profileEnd( data.filter );
		}
	});

	// Small comparison function
	function check( parts ) {
		var i = -1, l = parts.length;

		for ( ; ++i < l; ) {
			if ( ! $elems.eq( parts[i] ).hasClass('focus') ) {
				return false;
			}
		}

		// Make sure the number of elements found match the number of suggested elements
		return $elems.filter('.focus').length === l;
	}

	// Run through each isolated test and display results
	$.each( Sandbox.env, function( i, parts ){
		var filter = parts[0], compare = parts[1], match = [], pass;

		// Run test by attaching classes to each element, wrapped in a timer for display
		console.time( filter );
		$elems.removeClass('focus').filter(':data(' + filter + ')').addClass('focus');
		console.timeEnd( filter );

		// Find comparrison
		pass = check( compare );

		// Build the matched array
		$elems.each(function( i, val ){
			if ( $(this).hasClass('focus') ) {
				match.push(i);
			}
		});

		// Display Results
		$([
			"<tr>",
			"<td><button>Profile</button></td>",
			"<td>" + filter + "</td>",
			"<td>" + compare + "</td>",
			"<td>" + match + "</td>",
			"<td>" + ( pass ? "<b style='color:green;'>PASS<b>" : "<b style='color:red;'>FAIL</b>" ) + "</td>",
			"</tr>"
		].join(''))
		// Attach result data for profiling
		.appendTo( $table ).find('button').data( 'Data', {
			filter: filter,
			compare: compare,
			match: match,
			pass: pass
		});
	});
});
