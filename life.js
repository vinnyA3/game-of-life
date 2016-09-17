(function() {
	// Game takes in a seed that serves as the initial state
	var _  = self.Life = function(seed) {
		this.seed = seed;
		this.height = seed.length // Number of rows
		this.width = seed[0].length // Number of Columns ( Len of sub arr in 2D arr)
	}

	_.prototype = {
		//Debugging
		toString: function() {
			// return shallow copy of the seed arr and convert to a string
			return this.seed.slice().map(function(row) {
				return row.slice().join(' ');
			}).join('\n'); // separate each row with a new line
		}
	}
})();

var Game = new Life([
	[0,0,0,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,0,0,0]
]);

// Debug: log out the seed converted to a string depiction of the grid
console.log(Game.toString());
