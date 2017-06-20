var gameSize = 8;

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
	$(".square").on("click",flipWhite);
}

function flipWhite() {
	$(this).toggleClass("whitePiece");
}

function blackWhite() {
	$(this).toggleClass("blackPiece");
}

//**************************//
// **** GAME FUNCTIONS **** //
//**************************//

function createBoard() {
	for(var i = 0; i < gameSize; i++){
		var rowID = String.fromCharCode(65+i);
		var row = $("<div>").addClass("row").attr("id",rowID);
		$(".main").append(row);
		for(var j = 0; j < gameSize; j++) {
			var idNum = "" + rowID + j;
			var square = $("<div>").addClass("square").attr("id",idNum).appendTo(row);
		};
	};
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
