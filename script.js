//**************************//
// ****GLOBAL VARIABLES **** //
//**************************//
var gameSize = 8;
var currentPlayer = 1;
var totalPlayers = 2;

//**************************//
// ****    DOC READY   **** //
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
	});
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

function createBoard() {
	for(var i = 0; i < gameSize; i++){
		// var rowID = String.fromCharCode(65+i);
		var row = $("<div>").addClass("row").attr("row",i);
		$(".main").append(row);
		for(var j = 0; j < gameSize; j++) {
			var square = $("<div>").addClass("square").attr("column",j).appendTo(row);
		};
	};
	//call CreateMiddleMarkers();
}

// function createMiddleMarkers()

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


// function generateCards(){
// 	// One loop per row of cards //
// 	for(var i=0;i<numberOfCards;i++) {
// 		// ***** div.cardContainer -> div.card -> div.front + div.back -> img ***** //
// 		var cardContainer = $("<div>").addClass("cardContainer").appendTo(".row");
// 		var newCard = $("<div>").addClass("card").appendTo(cardContainer);
// 		var newBack = $("<div>").addClass("back").appendTo(newCard);
// 		var newBackImg = $("<img>").attr("id", obj.id).css('background-image', 'url(' + obj.url + ')').appendTo(newBack);
// 		var newFront = $("<div>").addClass("front").appendTo(newCard);
// 		var newFrontImg = $("<img>").attr("src", "pictures/legend_cardback.png").appendTo(newFront);
// 	}
// }
