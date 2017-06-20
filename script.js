//**************************//
// *** GLOBAL VARIABLES *** //
//**************************//

var gameSize = 8;
var currentPlayer = 1;
var totalPlayers = 2;
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
var legalMoves = ["D2","C3"];



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
		flipWhite(this);
		flipBlack(this);
		togglePlayer();
		displayBoard()
	});
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

function createBoard() {
	// Create boardgame itself
	for(var i = 1; i < gameSize+1; i++){
		// var rowID = String.fromCharCode(65+i);
		var row = $("<div>").addClass("row").attr("row",i);
		$(".main").append(row);
		for(var j = 1; j < gameSize+1; j++) {
			var square = $("<div>").addClass("square").attr("row",i).attr("col",j).appendTo(row);
		};
	};
	$(".row:nth-child(1)").addClass("topRow");
	displayBoard();
}




/////////////////////////////
// Updates view of the game//
/////////////////////////////
function displayBoard() {
	for (var i = 1; i < currentBoard.length; i++){
		for (var j = 1; j < currentBoard[i].length; j++) {
			var currentPiece = "div[row="+ i + "][col=" + j + "]";
			if(currentBoard[i][j] === 'w') {
				$(currentPiece).addClass("whitePiece");
			} else if (currentBoard[i][j] === 'b') {
				$(currentPiece).addClass("blackPiece");
			} else {
				continue;
			}
		}
	}
}
////////////////////
// Toggle Players //
////////////////////
function togglePlayer() {
	if (currentPlayer === totalPlayers) {
		currentPlayer = 1;
	}
	else {
		currentPlayer++;
	}
	return currentPlayer;
}

//////////////////////////////////
// Flip coins on view and model //
//////////////////////////////////
function flipWhite(square) {
	if (currentPlayer === 1) {
		$(square).toggleClass("whitePiece");
		var i = $(square).attr("row");
		var j = $(square).attr("col");
		currentBoard[i][j] = 'w';
	}
}
function flipBlack(square) {
	if (currentPlayer === 2) {
		$(square).toggleClass("blackPiece");
		var i = $(square).attr("row");
		var j = $(square).attr("col");
		currentBoard[i][j] = 'b';
	}
}
