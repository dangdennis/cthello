//**************************//
// *** GLOBAL VARIABLES *** //
//**************************//

var gameSize = 8;
var currentPlayer = "w";
var boardModel;
var legalMoves = [];
// Win condition: when no more 0s in boardModel nor valid moves available

//**************************//
// ****   DOC READY    **** //
//**************************//

$(document).ready(function(){
	boardModel = createBoard();
	displayBoard();
	eventHandlers();
});


//=================================//
// Welcome Page Modal & Close Page //
//=================================//

// var modal = document.querySelector('#myModal');
// var span = document.querySelector('.close')[0];
//
// function welcome_page() {
// 	modal.style.display = "block";
// }
//
// function close() {
// 	modal.style.display = 'none';
// }

//**************************//
// **** EVENT HANDLERS **** //
//**************************//

function eventHandlers() {
	$(".square").on("click",function() {
		placeCoin(this,currentPlayer);
		displayBoard();
		togglePlayer();
	});
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

//=====================================//
// Create board and sets initial tokens //
//=====================================//
function createBoard() {
	// Two things happening: model and view of board
	// are both created at the same time. Sorry
	var boardModel = [];
	for(var i = 0; i < gameSize; i++){
		// Model + view ROWS
		var rowModel = [];
		var rowView = $("<div>").addClass("row").attr("row",i);
		var rowSquares = [];
		for(var j = 0; j < gameSize; j++) {
			// Model + view SQUARES/COINS
			var coin = new Coin(i,j);
			rowModel.push(coin);
			var square = $("<div>").addClass("square").attr("row",i).attr("col",j);
			square[0].coinObject = coin;
			coin.domElement = square;
			square.text("x:"+i+",y: "+j);
			rowSquares.push(square);
		};
		rowView.append(rowSquares);
		$(".main").append(rowView);
		boardModel.push(rowModel);
	};
	boardModel[3][3].color = "w";
	boardModel[3][4].color = "b";
	boardModel[4][3].color = "b";
	boardModel[4][4].color = "w";
	return boardModel;
}

//==============//
// Creates coin //
//==============//
function Coin(x,y){
	this.coords = [x,y];
	this.color = "none";
}

//=======================//
// Updates view of board //
//=======================//
function displayBoard() {
	for (var i = 0; i < boardModel.length; i++){
		for (var j = 0; j < boardModel[i].length; j++) {
			var CurrentCoin = "div[row=" + i + "][col=" + j + "]";
			$(CurrentCoin).removeClass('whitePiece blackPiece');
			if(boardModel[i][j].color === 'w') {         // "w" = white pieces
				$(CurrentCoin).addClass("whitePiece");
			} else if (boardModel[i][j].color === 'b') { // "b" = black pieces
				$(CurrentCoin).addClass("blackPiece");
			} else if (boardModel[i][j].color === 'v') { // "v" = valid moves
				$(CurrentCoin).addClass("validMove");
			} else {
				continue;
			}
		}
	}
}


//=================================//
// Flips enemy coins when captured //
//=================================//

function flipLine(arr) {
	for (var i = 0; i < arr.length; i++) {
		markSquare(arr[i][0],arr[i][1]);
	};
}
function markSquare(x,y){
	boardModel[x][y].color = currentPlayer;
}

//================//
// Toggle Players //
//================//
function togglePlayer() {
	return currentPlayer = currentPlayer === "w" ? "b" : "w";
}

//=====================//
// Flip coins on model //
//=====================//
function placeCoin(coinElement, currentPlayer) {
	var i = $(coinElement).attr("row");
	var j = $(coinElement).attr("col");
	getAdjacentSquares(coinElement.coinObject);
	//checkLegalSquares(i,j);
	// boardModel[i][j].color = currentPlayer;
}

//***********************************//
// **** Determining Legal Tiles **** //
//***********************************//

function checkLegalSquares(x,y) {
	test1 = getOccupiedSquares();
	test2 = getOpenAdjacentSquares(test1);
	test3 = getSquaresNextToEnemy(test2,currentPlayer);
	console.log(test3);
	test4 = getLegalSquares(test3);
}

//=====================================//
// Step 1: Get array of occupied tiles //
//=====================================//
function getOccupiedSquares(){
	var occupiedSquaresArr = [];
	for(var i = 0; i < boardModel.length; i++) {
		for (var j = 0; j < boardModel[i].length; j++) {
			if (boardModel[i][j].color === "w" || boardModel[i][j].color === "b" ) {
				occupiedSquaresArr.push(boardModel[i][j]);
			}
		}
	}
	return occupiedSquaresArr;
}

//=================================================================//
// Step 2: Use array of occupied tiles to get adjacent open tiles; //
//=================================================================//
function getOpenAdjacentSquares(arr) {
	var openAdjacentSquares = [];
	for(var i = 0; i < arr.length; i++) {
		var adjacentSquares = getAdjacentSquares(arr[i]);
		for(var j = 0; j < adjacentSquares.length; j++) {
			if (adjacentSquares[j].color === "none") {
				openAdjacentSquares.push(adjacentSquares[j]);
			}
		}
	}
	uniqueArray(openAdjacentSquares);
	return openAdjacentSquares;
}

//======================================//
// Step 2A: Clears the adjacent-squares //
// array of any repeats based on index  //
//======================================//
function uniqueArray(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i+1; j < arr.length; j++) {
			if (arr[i].coords[0] === arr[j].coords[0] &&
				arr[i].coords[1] === arr[j].coords[1]){
				arr.splice(j,1);
			}
		}
	}
}

//====================================================//
// Step 3: Find open squares next to enemy tiles only //
//====================================================//
function getSquaresNextToEnemy(arr,currentPlayer) {
	var enemyColor = currentPlayer === "w" ? "b" : "w";
	console.log("enemy color",enemyColor);
	var nextToEnemySquares = [];
	for (var i = 0; i < arr.length; i++) {
		var adjacentSquares = getAdjacentSquares(arr[i]);
		for (var j = 0; j < adjacentSquares.length; j++) {
			if(adjacentSquares[j].color === enemyColor) {
				nextToEnemySquares.push(arr[i]);
			} else {
				continue;
			}
		}
	}
	uniqueArray(nextToEnemySquares);
	return nextToEnemySquares;
}



function getLegalSquares(arr) {
	var legalSquares = [];
	for (var i = 0; i < arr.length; i++) {
		var adjacentSquares = getAdjacentSquares(arr[i]);
		for (var j = 0; j < adjacentSquares.length; j++) {
			var coordz = adjacentSquares[i].coords;
			getSquareInDirection(coordz, i, j, currentPlayer, legalSquares)
		}
	}
	return legalSquares;
}
//
// //====================================================//
// // Step 3: Find open squares next to enemy tiles only //
// //====================================================//
// function getSquaresNextToEnemy(arr,currentPlayer) {
//     var enemyColor = currentPlayer === "w" ? "b" : "w";
//     console.log("enemy color",enemyColor);
//     var nextToEnemySquares = [];
//     for (var i = 0; i < arr.length; i++) {
//         var coords = arr[i].coords;
//         for (var i = -1; i < 2; i++) {
//
//
//         }
//     }
//     return nextToEnemySquares
// }

// if enemy, keep going in that directoin
// if my color, addClass 'valid' to initial tile
// return
// else if empty spot, stop checking in that direction
// but still check other


//==================================================//
// Step 4: Determine actual legal moves down a line //
//==================================================//

// if enemy, keep going in that direction
// if my color, addClass 'valid' to initial tile
// return
// else if empty spot, stop checking in that direction
// but still check other


//==============================================//
// Step 5: Add Event Listeners to Legal Squares //
//==============================================//
	// while also removing all other click event listeners

//===================================//
// Gets available squares for player //
//===================================//

function getAdjacentSquares(coin) {
	var arr = [];
	var coords = coin.coords;
	var vectors = [
		{xDif: -1, yDif: 0},  //check left
		{xDif: 1, yDif: 0},    //right
		{xDif: 0, yDif: -1},   //up
		{xDif: 0, yDif: 1},    //down
		{xDif: -1, yDif: 1},    //upleft
		{xDif: 1, yDif: 1},   //down right
		{xDif: -1, yDif: 1},   //down left
		{xDif: 1, yDif: -1}   //up right
	];
	for (var vectorIndex = 0; vectorIndex < vectors.length; vectorIndex++) {
		var result = getSquareInDirection(coords, vectors[vectorIndex].xDif, vectors[vectorIndex].yDif, currentPlayer, arr, false);
		if(result){
			//add coin to current position
			markSquare(coords[0],coords[1]);
			flipLine(arr);
		}
	}
	// if (arr.length > 0) {
	// 	for (var i = 0; i < arr.length; i++) {
	// 		// arr[i] = [3x,5y]
	// 		boardModel[arr[i][0]][arr[i][1]].color = currentPlayer;
	// 	};
	// }
	return arr;
}
//==================================================//
// Step 4: Determine actual legal moves down a line //
//==================================================//


function getSquareInDirection(coords, xDif, yDif, currentPlayer, targetArray, isValid) {
	var enemyColor = currentPlayer === "w" ? "b" : "w";
	var next = [];
	next[0] = coords[0] + xDif;
	next[1] = coords[1] + yDif;
	$(".tempHighlight").removeClass("tempHighlight");
	boardModel[next[0]][next[1]].domElement.addClass('tempHighlight');
	if (boardModel[coords[0]] !== undefined) {
			if (boardModel[next[0]][next[1]].color === enemyColor) {
				isValid = true;
				targetArray.push(next);
				return getSquareInDirection(next, xDif, yDif, currentPlayer, targetArray, isValid);
			}
			else if (boardModel[next[0]][next[1]].color === 'none' ||
				boardModel[next[0]][next[1]].color === undefined) {
				return false;
			} else if(boardModel[next[0]][next[1]].color === currentPlayer) {
				return isValid;
		    }

		}


	}

	function gameEnds() {

	}