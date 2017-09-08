$(document).ready(() => {
	const game = new Game();
});

function Game() {
	var self = this;

	var boardModel;
	var gameSize = 8;
	var currentPlayer = "w";
	var remainingSpaces = 64;
	var countWhite = 0;
	var countBlack = 0;

	self.init = function() {
		boardModel = self.createBoard();
		self.displayBoard();
		self.eventHandlers();
	};

	self.eventHandlers = function() {
		$(".square").on("click", function() {
			self.placeCoin(this, currentPlayer);
			self.displayBoard();
			// self.getScores();
			self.togglePlayer();
		});
	};

	self.createBoard = function() {
		// Two things happening: model and view of board
		// are both created at the same time. Sorry
		var boardModel = [];
		for (var i = 0; i < gameSize; i++) {
			// Model + view ROWS
			var rowModel = [];
			var rowSquares = [];
			var rowView = $("<div>").addClass("gameboard-row").attr("row", i);
			for (var j = 0; j < gameSize; j++) {
				// Model + view SQUARES/COINS
				var coin = new Coin(i, j);
				rowModel.push(coin);
				var square = $("<div>")
					.addClass("square")
					.attr("row", i)
					.attr("col", j);
				square[0].coinObject = coin;
				coin.domElement = square;
				rowSquares.push(square);
			}
			rowView.append(rowSquares);
			$(".gameboard").append(rowView);
			boardModel.push(rowModel);
		}
		boardModel[3][3].color = "w";
		boardModel[3][4].color = "b";
		boardModel[4][3].color = "b";
		boardModel[4][4].color = "w";
		return boardModel;
	};

	self.displayBoard = function() {
		for (var i = 0; i < boardModel.length; i++) {
			for (var j = 0; j < boardModel[i].length; j++) {
				var CurrentCoin = "div[row=" + i + "][col=" + j + "]";
				$(CurrentCoin).removeClass("whitePiece blackPiece");
				if (boardModel[i][j].color === "w") {
					// "w" = white pieces
					$(CurrentCoin).addClass("whitePiece animated flipInX");
				} else if (boardModel[i][j].color === "b") {
					// "b" = black pieces
					$(CurrentCoin).addClass("blackPiece animated flipInX");
				} else if (boardModel[i][j].color === "v") {
					// "v" = valid moves
					$(CurrentCoin).addClass("validMove");
				} else {
					continue;
				}
			}
		}
	};

	self.getScores = function() {
		for (var i = 0; i < boardModel.length; i++) {
			for (var j = 0; i < boardModel[i].length; j++) {
				if (boardModel[i][j] === "w") {
					countWhite++;
					remainingSpaces--;
					$(".player-score--one").text(countWhite);
				} else if (boardModel[i][j] === "b") {
					countBlack++;
					remainingSpaces--;
					$(".player-score--two").text(countBlack);
				}
			}
		}
	};

	self.getAdjacentSquares = function(coin) {
		var arr = [];
		var coords = coin.coords;
		var vectors = [
			{ xDif: 0, yDif: -1 }, //left
			{ xDif: 0, yDif: 1 }, //right
			{ xDif: -1, yDif: 0 }, //up
			{ xDif: 1, yDif: 0 }, //down
			{ xDif: -1, yDif: -1 }, //left up
			{ xDif: 1, yDif: 1 }, //right down
			{ xDif: 1, yDif: -1 }, //left down
			{ xDif: -1, yDif: 1 } //right up
		];
		for (var vectorIndex = 0; vectorIndex < vectors.length; vectorIndex++) {
			var result = self.getSquareInDirection(
				coords,
				vectors[vectorIndex].xDif,
				vectors[vectorIndex].yDif,
				currentPlayer,
				arr,
				false
			);
			if (result) {
				//add coin to current position
				self.markSquare(coords[0], coords[1]);
				self.flipLine(arr);
			}
		}
		return arr;
	};

	self.getSquareInDirection = function(
		coords,
		xDif,
		yDif,
		currentPlayer,
		targetArray,
		isValid
	) {
		var enemyColor = currentPlayer === "w" ? "b" : "w";
		var next = [];
		next[0] = coords[0] + xDif;
		next[1] = coords[1] + yDif;
		if (
			boardModel[next[0]] !== undefined &&
			boardModel[next[1]] !== undefined
		) {
			if (boardModel[next[0]][next[1]].color === enemyColor) {
				isValid = true;
				if (
					boardModel[next[0] + xDif] !== undefined &&
					boardModel[next[1] + yDif] !== undefined
				) {
					if (
						boardModel[next[0] + xDif][next[1] + yDif].color ===
							currentPlayer ||
						boardModel[next[0] + xDif][next[1] + yDif].color === enemyColor
					) {
						targetArray.push(next);
					}
				}
				return self.getSquareInDirection(
					next,
					xDif,
					yDif,
					currentPlayer,
					targetArray,
					isValid
				);
			} else if (
				boardModel[next[0]][next[1]].color === "" ||
				boardModel[next[0]][next[1]].color === undefined
			) {
				targetArr = [];
				return false;
			} else if (boardModel[next[0]][next[1]].color === currentPlayer) {
				return isValid;
			}
		}
	};

	self.flipLine = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			self.markSquare(arr[i][0], arr[i][1]);
		}
	};

	self.markSquare = function(x, y) {
		boardModel[x][y].color = currentPlayer;
	};

	self.placeCoin = function(coinElement, currentPlayer) {
		var i = $(coinElement).attr("row");
		var j = $(coinElement).attr("col");
		self.getAdjacentSquares(coinElement.coinObject);
	};

	self.togglePlayer = function() {
		return (currentPlayer = currentPlayer === "w" ? "b" : "w");
	};

	self.init();
}

function Coin(x, y) {
	this.coords = [x, y];
	this.color = "";
}
