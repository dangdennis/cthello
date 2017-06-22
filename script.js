//**************************//
// *** GLOBAL VARIABLES *** //
//**************************//

var gameSize = 8;
var currentPlayer = "w";
var boardModel = createBoard();
var blackScore = null;
var whiteScore = null;
var legalMoves = [];
// Win condition: when no more 0s in boardModel nor valid moves available

//**************************//
// ****   DOC READY    **** //
//**************************//

$(document).ready(function(){
	createBoard();
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
		flipLines();
		endOfTurn();
	});
}

//=================================//
// Completes end of turn sequences //
//=================================//
function endOfTurn() {
	// clearAllVs();
	displayBoard();
	togglePlayer();
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
		$(".main").append(rowView);
		for(var j = 0; j < gameSize; j++) {
			// Model + view SQUARES/COINS
			var coin = new Coin(i,j);
			rowModel.push(coin);
			var square = $("<div>").addClass("square").attr("row",i)
			.attr("col",j).appendTo(rowView);
		};
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
function flipLines() {
    console.log('fliplines function clicked');
    for (var i = 1; i < 2; i++) {
        if ([0,1] === 'none' && [1,0] === 'none' && [-1,0] === 'none' && [0,-1] === 'none') {
            return;
        } else {
            console.log('you found one')
        }
    }
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
function placeCoin(coin, currentPlayer) {
	var i = $(coin).attr("row");
	var j = $(coin).attr("col");
	boardModel[i][j].color = currentPlayer;
}

//***********************************//
// **** Determining Legal Tiles **** //
//***********************************//

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

//===============================================//
// Step 2A: Clears an array of any repeats based on index //
//===============================================//
function uniqueArray(arr) {
	return arr.filter(function(el,position,arr){
		return arr.indexOf(el) == position;
	})
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



//===================================//
// Gets available squares for player //
//   Credit: Matt Denney (3===D~)    //
//===================================//
function getAdjacentSquares(coin) {
    var arr = [];
    var coords = coin.coords;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            // Checks all around the coin except itself
            if (i == 0 && j == 0) {
                continue;
            }
            ;
            // Checks for edges, prevents errors from trying to push
            // squares beyond the array space
            // Basically if row exists here:
            if (boardModel[coords[0] + i]) {
                // If tile exists within that row:
                if (boardModel[coords[0] + i][coords[1] + j]) {
                    // Pushes array of unique empty tiles
                    arr.push(boardModel[coords[0] + i][coords[1] + j]);
                }
            }
        }
    }
    return arr;
}
