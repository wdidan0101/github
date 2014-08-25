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

  // MODES FOR WINNING CONDITIONS //
  var modes = ['rows', 'cols', 'tlbr', 'trbl', 'tie'];

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

    // CHECK FOR WINNING CONDITIONS //
    for(var i=0; (i != modes.length && $scope.end != true); i++) {
      checkboard(modes[i]);
    }

    // CHANGE PLAYER IF NOT GAME OVER //
    if ($scope.end != true) {
      changeCurrentPlayer();
    }
  };

  // test them!!!
  var checkboard = function(mode, r, c) {
    if (mode == 'tie') {
      console.log('checking for a tie');
      for(var i = 0; i != $scope.board.length; ++i) {
        for(var k = 0; k != $scope.board.length; ++k) {
          if ($scope.board[i][k] == $scope.defaultSymbol) {
            return false;
          }
        }
      }
      $scope.end = true;
      $scope.tie = true;
      $scope.boardcreated = false; // resetting the game board
      return true;
    }

    // initial values
    if (r == null) {
      r = 0;
    }
    if ((c == null) && (mode != 'trbl')) {
      c = 0;
    }
    if (mode == null) {
      mode = 'rows';
    }

    if (mode == 'rows') {
      next_field_equal = [r, c+1];
      next_field_not_equal = [r+1, 0];
      x = r;
      y = c;
    }
    else if (mode == 'cols') {
      next_field_equal = [r+1, c];
      next_field_not_equal = [0, c+1];
      x = c;
      y = r;
    }
    else if (mode == 'tlbr') {
      y = r;
      next_field_equal = [r+1, c+1];
    }
    else if (mode == 'trbl') {
      if (c == null) { c = $scope.board.length - 1; }
      y = r;
      next_field_equal = [r+1, c-1];
    }

    // tell me what you do
    console.log('checking row ' + r + ', column ' + c + ', mode ' + mode);

    if (y <= $scope.board.length - 2) {
      if (($scope.board[r][c] == $scope.board[next_field_equal[0]][next_field_equal[1]]) &&  ($scope.board[r][c] != $scope.defaultSymbol)){
        checkboard(mode, next_field_equal[0], next_field_equal[1])
      }
      else if ((mode != 'tlbr') && (mode != 'trbl')) {
        if (x != $scope.board.length - 1) {
          // next row/col
          checkboard(mode, next_field_not_equal[0], next_field_not_equal[1]);
        }
      }
    }
    else if (y == $scope.board.length - 1) {
      // if you've reached the last element in the array, you win!
      console.log('you win! (' + mode + ')');
      $scope.end = true;
      if ($scope.currentPlayer == $scope.players[0]) { // todo: refactoring
        $scope.playerwins[0] += 1;
      } else {
        $scope.playerwins[1] += 1;
      }
      $scope.boardcreated = false; // resetting the game board
    }
  };
}]);
