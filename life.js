(function() {
	// Game takes in a seed that serves as the initial state
	var _  = self.Life = function(seed) {
		this.height = seed.length // Number of rows
		this.width = seed[0].length // Number of Columns ( Len of sub arr in 2D arr)
    // boards - prevBoard serves as previous game board
		this.prevBoard = [];
		this.board = cloneArray(seed);
	}

	_.prototype = {
		toString: function() {
			//Debugging: Convert 2D board arr to string grid representation
			return this.board.map(function(row) {
				return row.join(' ');
			}).join('\n');
		}
	}

	// Helpers
	// ** cloneArray only works on 2D arrays **
	function cloneArray(arr) {
		// return shallow copy of the seed arr and convert to a string
		return arr.slice().map(function(row) {
			return row.slice();
		});
	}

})();

var Game = new Life([
	[0,0,0,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,0,0,0]
]);

console.log(Game.toString());
