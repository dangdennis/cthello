//**************************//
// ****GLOBAL VARIABLES **** //
//**************************//
var gameSize = 8;
var currentPlayer = 1;
var totalPlayers = 2;
var currentTokenOnBoard = [
	[0,0,0,0,0,0,0,0], // A
	[0,0,0,0,0,0,0,0], // B
	[0,0,0,0,0,0,0,0], // C
	[0,0,0,0,0,0,0,0], // D
	[0,0,0,0,0,0,0,0], // E
	[0,0,0,0,0,0,0,0], // F
	[0,0,0,0,0,0,0,0], // G
	[0,0,0,0,0,0,0,0], // H
];
var legalMoves = ["D2","C3"];



//**************************//
// ****    DOC READY   **** //
//**************************//

$(document).ready(function(){
	createBoard();
	eventHandlers();
	// displayBoard();
})

//**************************//
// **** EVENT HANDLERS **** //
//**************************//

function eventHandlers() {
	$(".square").on("click",function() {
		flipWhite(this);
		flipBlack(this);
		togglePlayer();
	});
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

function createBoard() {
	// Create boardgame itself
	for(var i = 0; i < gameSize; i++){
		// var rowID = String.fromCharCode(65+i);
		var row = $("<div>").addClass("row").attr("row",i);
		$(".main").append(row);
		for(var j = 0; j < gameSize; j++) {
			var square = $("<div>").addClass("square").attr("col",i).attr("col",j).appendTo(row);
		};
	};
	$(".row:nth-child(1)").addClass("topRow");
	//call setInitialCoins;
}

// function createMiddleMarkers()

function setInitialCoins() {

}

// Toggle Players //

function togglePlayer() {
	if (currentPlayer === totalPlayers) {
		currentPlayer = 1;
	}
	else {
		currentPlayer++;
	}
	return currentPlayer;
}

// Flip coins //

function flipWhite(square) {
	if (currentPlayer === 1) {
		$(square).toggleClass("whitePiece");
	}
}

function flipBlack(square) {
	if (currentPlayer === 2) {
		$(square).toggleClass("blackPiece");
	}
}
