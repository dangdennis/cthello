//**************************//
// *** GLOBAL VARIABLES *** //
//**************************//

var gameSize = 8;
var currentPlayer = "w";
	// MODEL ::: 0 = empty, w = white,player1, b = black,player2
var currentBoard = [
	[0,0,0,0,0,0,0,0,0], // Top Row
	[0,0,0,0,0,0,0,0,0], // A
	[0,0,0,0,0,0,0,0,0], // B
	[0,0,0,0,0,0,0,0,0], // C
	[0,0,0,0,"w","b",0,0,0], // D
	[0,0,0,0,"b","w",0,0,0], // E
	[0,0,0,0,0,0,0,0,0], // F
	[0,0,0,0,0,0,0,0,0], // G
	[0,0,0,0,0,0,0,0,0], // H
];

// Win condition: when no more 0s in currentBoard nor valid moves available

//**************************//
// ****   DOC READY    **** //
//**************************//

$(document).ready(function(){
	createBoard();
	eventHandlers();
})

//**************************//
// **** EVENT HANDLERS **** //
//**************************//

function eventHandlers() {
	$(".square").on("click",function() {
		placeCoin(this,currentPlayer);
		// flipLines();
		endOfTurn();
	});
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

//=====================================//
// Creates the board AND inital tokens //
//=====================================//
function createBoard() {
	for(var i = 1; i < gameSize+1; i++){
		// var rowID = String.fromCharCode(65+i);
		var row = $("<div>").addClass("row").attr("row",i);
		$(".main").append(row);
		for(var j = 1; j < gameSize+1; j++) {
			var square = $("<div>").addClass("square").attr("row",i).attr("col",j).appendTo(row);
		};
	};
	displayBoard();
}

//=====================================//
// Updates player with available moves //
//=====================================//

function getPossiblePlacements(){
	clearAllVs();
	checkRight();
	checkLeft();
	checkUp();
	checkDown();
	checkDiag1();
	checkDiag2();
}

function checkRight() {
	// given currentPlayer,
	debugger;
	if (currentPlayer === 1) { // white coins only
		// check for all currentPlayer coin placements
		for (var i = 1; i < currentBoard.length; i++){
			for (var j = 1; j < currentBoard[i].length; j++){
				if (currentBoard[i][j] === "w"){
					// checkRight();
					// at the current placements, check for any adjacent enemy coins
					// to the right
					// var indexOfYourFirstCoin = currentBoard[i].indexOf(currentBoard[i][j]);
					// console.log("lastindexOf:",indexOfYourFirstCoin);
					for (var k = 1; k < currentBoard[i].length-i; k++) {
						// if there are enemy coins, continue that direction until
						// empty space
						if (currentBoard[i][j+k] === "b"){
							continue;
						} else if (currentBoard[i][j+k] === 0) {
							console.log('we found a valid empty spot', currentBoard[i][j+k]);
							currentBoard[i][j+k] = "v";
						} else {
							break;
						}
					}
				}
			}
							// push location of empty space into legalMoves array
							// remove all click listeners and add only to spaces
							// within legalMoves array
		}
	}
}
// Perhaps split up loops into 4 direction with a function each

//=================================//
// Flips enemy coins when captured //
//=================================//
function flipLines(){

}


//=======================//
// Updates view of board //
//=======================//
function displayBoard() {
	for (var i = 1; i < currentBoard.length; i++){
		for (var j = 1; j < currentBoard[i].length; j++) {
			var currentPiece = "div[row=" + i + "][col=" + j + "]";
			if(currentBoard[i][j] === 'w') {         // "w" = white pieces
				$(currentPiece).addClass("whitePiece");
			} else if (currentBoard[i][j] === 'b') { // "b" = black pieces
				$(currentPiece).addClass("blackPiece");
			} else if (currentBoard[i][j] === 'v') { // "v" = valid moves
				$(currentPiece).addClass("validMove");
			} else {
				continue;
			}
		}
	}
}

//=================================//
// Completes end of turn sequences //
//=================================//
function endOfTurn() {
	// clearAllVs();
	displayBoard();
	togglePlayer();
}

//================//
// Toggle Players //
//================//
function togglePlayer() {
	return currentPlayer = currentPlayer === "w" ? "b" : "w";
}

//==============================//
// Flip coins on view and model //
//==============================//
function placeCoin(square, currentPlayer) {
	var i = $(square).attr("row");
	var j = $(square).attr("col");
	currentBoard[i][j] = currentPlayer;
}
