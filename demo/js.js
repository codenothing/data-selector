/*
 * Data Selector [VERSION] - Demo Javascript
 * [DATE]
 * Corey Hart http://www.codenothing.com
 */ 

function clearFocus(){
	$('#list li.focus').removeClass('focus');
}

function runQuery(){
	var query = $('input[name=query]').val();
	clearFocus();
	if ( query ) {
		$('#list li:data('+query+')').addClass('focus');
	}
}

function testClick(str){
	$('input[name=query]').val(str);
	runQuery();
}

function profile(){
	if (! console){
		alert("You don't have firebug installed");
	}else{
		var query = $('input[name=query]').val();
		clearFocus();
		if (! query) {
			return false;
		}
		console.profile(query);
		$('#list li:data('+query+')').addClass('focus');
		console.profileEnd(query);
	}
}

jQuery(function( $ ){
	var tree = {
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

	// Add special comparison function 
	$.dataSelector('typeof', function(data, value){
		return typeof data === value;
	});

	// Attach click handlers to each button
	$('input[name=runQuery]').click( runQuery );
	$('input[name=clearFocus]').click( clearFocus );
	$('input[name=profile]').click( profile );
});
