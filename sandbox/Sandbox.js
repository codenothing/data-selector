/*
 * Data Selector [VERSION]
 * [DATE]
 * Corey Hart http://www.codenothing.com
 */
var Sandbox = {
	// Number of test elements that should be added for speed comparison
	elems: 0,

	/**
	 * To add another entry of testing, just follow the format below
	 *
	 * [ 'string to test within the :data() filter', [array of elements that should match] ]
	 */ 
	env: [
		// Even odd testing
		[ 'odd', [1, 3] ],
		[ 'even', [0, 2] ],
		// Boolean testing
		[ 'noval=true', [1] ],
		[ 'noval=14', [] ],
		[ 'noval=1', [] ],
		[ 'falseval===false', [2] ],
		[ 'falseval===0', [] ],
		// String Testing (Non-regex)
		[ 'singleval^=test', [2] ],
		[ 'singleval$=case', [2] ],
		[ 'singleval*=stca', [2] ],
		[ 'singleval^=test', [2] ],
		[ 'singleval!=testcase', [] ],
		[ 'singleval!=case', [2] ],
		// Int equal to testing
		[ 'tree.lvl1.lvl2.fin=22', [3] ],
		[ 'tree.lvl1.lvl2.fin=21', [] ],
		// Greater/Less than testing
		[ 'tree.lvl1.lvl2.fin>=21', [3] ],
		[ 'tree.lvl1.lvl2.fin<=23', [3] ],
		[ 'tree.lvl1.lvl2.fin<=22', [] ],
		[ 'tree.lvl1.lvl2.fin>=22', [] ],
		// Greater/Less than or equal too testing
		[ 'tree.lvl1.lvl2.fin>==22', [3] ],
		[ 'tree.lvl1.lvl2.fin>==23', [] ],
		[ 'tree.lvl1.lvl2.fin<==22', [3] ],
		[ 'tree.lvl1.lvl2.fin<==21', [] ],
		// Regex Testing
		[ 'singleval~=/^[a-z]+$/i', [2] ],


		// Last element Sanity Check
		[ 'Sanity Check', [] ]
	]
};
