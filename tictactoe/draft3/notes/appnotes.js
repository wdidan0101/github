

angular.module('tic-tac-toe', []).controller('gameCtrl', ['$scope', function($scope) {

  // SETTING A DEFAULT SYMBOL //
  $scope.defaultSymbol = '-';

  // SETTING DEFAULT BOARD SIZE //
  $scope.size = 3;

  // SETTING DEFAULT PLAYER NAMES //
  $scope.players = ['Player 1', 'Player 2'];

  // WIN COUNTER FOR PLAYERS //
  $scope.playerwins = [0, 0];

  $scope.currentPlayer = $scope.players[0];
    
  $scope.currentSymbol = function() {
    if ($scope.currentPlayer == $scope.players[0]) {
     return 'X';
    } else {
      return 'O';
    }
  };

  // FUNCTION TO CHANGE THE CURRENT PLAYER //
  var changeCurrentPlayer = function() {
    if ($scope.end != true) {
      if ($scope.currentPlayer == $scope.players[0]) {
        $scope.currentPlayer = $scope.players[1];
      } else {
        $scope.currentPlayer = $scope.players[0];
      }
    }
  };

  // BOARD CREATION //
  $scope.createBoard = function(size, symbol) {
    // CREATE A TIC TAC TOE BOARD USING THE ARGUMENT SIZE FOR WIDTH AND HEIGHT //
    // IF SIZE IS NOT SET, USE A 3 BY 3 BOARD //

    // RESET THE GAME //
    $scope.end = false;
    $scope.tie = false;

    if (size == null) {
      size = 3;
    }
    if (symbol == null) {
      symbol = '-';
    }
    $scope.board = []; // SET BOARD VARIABLE TO AN EMPTY ARRAY //
    for(var i = 0; i < size; ++i) {
      var temp = []; // SET TEMP TO AN EMPTY ARRAY //
      for(var j = 0; j < size; ++j) {
        temp.push(symbol); // SET FIELD TO PASSED IN SYMBOL //
      }
      $scope.board.push(temp); // SET THE ROW //
    }
    $scope.boardcreated = true;
    $scope.defaultSymbol = symbol;
  };

  $scope.takefield = function(x, y, symbol) {
    // TAKE THE FIELD //
    $scope.board[x][y] = symbol;
    console.log($scope.currentPlayer + ' taking ' + x + ' ' + y);
    
    /*
    // CHECK FOR WINNING CONDITIONS //
    for(var i=0; (i != modes.length && $scope.end != true); i++) {
      checkboard(modes[i]);
    } */

    // CHANGE PLAYER IF NOT GAME OVER //
    if ($scope.end != true) {
      changeCurrentPlayer();
    }
  };
  
}]);
