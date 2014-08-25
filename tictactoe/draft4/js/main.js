var tictactoeApp = angular.module('tictactoeApp', [] );

tictactoeApp.controller('tictactoeController', ['$scope', function($scope) {
  
  // boolean variables //  
  $scope.start = false;
  $scope.size = 3;
  $scope.currentPlayer = true;

  $scope.board = []; // SET BOARD VARIABLE TO AN EMPTY ARRAY //

  // make the board //
  $scope.makeBoard = function(size) {
    for (var i = 0; i < size; i++) {
      var temp = [];
      for (var j = 0; j < size; j++) {
        temp.push('e');
      }
      $scope.board.push(temp);
    }
    console.log($scope.board);
  }

  $scope.takeCell = function(row, column) {
    if($scope.currentPlayer) {
        $scope.board[row][column] = 'x';
        $scope.checkWinner('x');
    } else {
      $scope.board[row][column] = 'o';
      $scope.checkWinner('o');
    }
    $scope.currentPlayer = !$scope.currentPlayer;
  }

  $scope.checkWinner = function(symbol) {
    // check for rows //
    $scope.winGame = true;
    for(var i = 0; i< size; i++) {
      for(var j = 0; j< size; j++) {
          if($scope.board[i][j] != symbol){
            $scope.winGame = false;
          }
      }
    }
    if($scope.winGame == true) {
      
    }
  }


}]); // end of controller //














































