/*
 * Data Selector [VERSION] - Demo Javascript
 * [DATE]
 * Corey Hart http://www.codenothing.com
 */ 
jQuery(function( $ ){
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

	// Cache enviorment
	var $list = $('#list li'), 
		$query = $('input[name=query]'),
		$run = $('input[name=runQuery]'),
		$clear = $('input[name=clearFocus]'),
		$profile = $('input[name=profile]'),
		$codeStr = $('code span span');

	// Add Data
	$list.filter(':odd').data('odd', true);
	$list.filter(':even').data('even', true);
	$list.filter(':eq(1)').data('noval', true);
	$list.filter(':eq(2)').data('singleval', 'testcase').data('falseval', false);
	$list.filter(':eq(3)').data('tree', {
		lvl1: {
			lvl2: {
				fin: 22
			}
		}
	});

	// Add special comparison function 
	$.dataSelector( 'typeof', function( data, value ){
		return typeof data == value;
	});

	// Running the query
	$run.click(function(){
		$clear.click();

		var query = $query.val();
		if ( query ) {
			$codeStr.html( query )
			$list.filter( ':data(' + query + ')' ).addClass( 'focus' );
		}
	});

	// Clearing the list items
	$clear.click(function(){
		$list.filter('.focus').removeClass('focus');
	});

	// Profiling the query
	$profile.click(function(){
		$clear.click();

		var query = $query.val();
		if ( ! query ) {
			return false;
		}

		console.profile( query );
		$list.filter( ':data(' + query + ')' ).addClass( 'focus' );
		console.profileEnd( query );
	});
	
	// Runing examples provided
	$('#test-examples').delegate( 'a', 'click', function(){
		$query.val( this.getAttribute('data-test') );
		$run.click();
	});
});
