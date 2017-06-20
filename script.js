function Game() {
	var self = this
	var gameSize = 8;

	self.initialize = function() {
		$(document).ready(function() {
			self.createBoard();
		})
	};

	self.createBoard = function() {
		for(var i = 0; i < 8; i++){
			var rowID = String.fromCharCode(65+i);
			var row = $("<div>").addClass("row").attr("row" + rowID);
			$("#gameboard").append(row);
			for(var j = 0; j < 8; j++) {
				var id = String.fromCharCode(65 + i);
				var square = $("<div>").addClass("square").attr("id",id);
			};
		};
	};

	self.initialize();
};

var game = Game();
