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
		next: function() {
			this.prevBoard = cloneArray(this.board);
			for(var y = 0; y < this.height; ++y) {
				for(var x = 0; x < this.width; ++x) {
					var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
					// Debug
					console.log(y, x, ': ', neighbors);
				}
			}
		},
		aliveNeighbors: function(arr, x, y) {
			// If the previous or next row does not exist, set to an empty array
			var prevRow = arr[y-1] || [];
			var nextRow = arr[y+1] || [];
			// Run through the board and count the number of alive neighbors (1)
			return [
				prevRow[x-1], prevRow[x], prevRow[x+1],
				arr[y][x-1], arr[y][x+1],
				nextRow[x-1], nextRow[x], nextRow[x+1]
			].reduce(function(prev, cur) {
				// Total the neighbors.  If we have an undefined value (row/col does not
				// exist), convert undefined to false using logical bool ops, and convert
				// that to a number with unary op. Else add 1
				return prev + +!!cur;
			},0);
		},
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
Game.next();
