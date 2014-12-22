

var tictactoeApp = angular.module('tictactoeApp', ["firebase"] );

tictactoeApp.controller('tictactoeController', ['$scope', '$firebase', function($scope, $firebase) {
  
  /*
  $scope.cells = ["","","","","","","","",""];
  $scope.cells2 = {cells: ["x","o","x","x","o","","","",""]};

  //sets up the lower level driver to talk to firebase
  // $firebase = angularfire, driver for firebase
  // Firebase = firebase
  // var ref = $firebase(new Firebase("https://orange123.firebaseio.com/"));


var ref = $firebase( new Firebase("https://tttwdi.firebaseio.com");
ref.$bind($scope,"cells2");

$scope.$watch('cells2', function(){
console.log('Hello!');
}); */

  // boolean variables //  
  $scope.start = false;
  $scope.size = 3;
  $scope.currentPlayer = true;
  $scope.gameOver = false;

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
    if( $scope.currentPlayer ) {
        $scope.board[row][column] = 'x';
        // if player one wins //
        if( $scope.checkWinner('x') ) {
          $scope.gameOver = true;
        }
    } else {
      $scope.board[row][column] = 'o';
      // if player two wins //
      if( $scope.checkWinner('o') ) {
          $scope.gameOver = true;
      }
    }
    if ($scope.gameOver && $scope.tie) {
      alert("It's a tie!");
    } else if ( $scope.gameOver) {
      if ( $scope.currentPlayer ) {
        alert("Player 1 wins!");
      } else {
        alert("Player 2 wins!");
      }
    }
    $scope.currentPlayer = !$scope.currentPlayer;
  }

  $scope.checkArray = function(array, symbol) {
    $scope.win = true;
    for (var i = 0; i < $scope.size; i++ ) {
      if( array[i] != symbol) {
        $scope.win = false;
      }
    }
    return $scope.endGame;
  }

  $scope.checkRow = function(symbol) {
    // check for rows //
    var temp = [];
    for(var i = 0; i< $scope.size; i++) {
      for(var j = 0; j< $scope.size; j++) {
        temp.push($scope.board[i][j]);
      }
      if( $scope.checkArray(temp,symbol) ) {
          return true;
      } 
      temp = [];
    }
  }

  $scope.checkColumn = function(symbol) {
    // check for columns //
    var temp = [];
    for(var i = 0; i< $scope.size; i++) {
      for(var j = 0; j< $scope.size; j++) {
        temp.push($scope.board[j][i]);
      }
      if( $scope.checkArray(temp,symbol) ) {
          return true;
      } 
      temp = [];
    }
  }

  $scope.checkDiagonals = function(symbol) {
    
    // check backward diagonal //
    var temp = [];
    for(var i = 0; i< $scope.size; i++) {
      temp.push($scope.board[i][i]);
    }
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }

    // check forward diagonal //
    temp = [];
    for( var i = 0; i< $scope.size; i++ ) {
      for( var j = $scope.size-1; j >= 0; j-- ) {
        temp.push($scope.board[j][i]);
      }
    }
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }
  }

  $scope.checkTie = function() {
    $scope.tie = true;
    for(var i = 0; i< $scope.size; i++) {
      for(var j = 0; j< $scope.size; j++) {
        if ( $scope.board[i][j] == 'e' ) {
          $scope.tie = false;
        }
      }
    }
    return $scope.tie;
  }

  $scope.checkWinner = function(symbol) {
    // check for diagonals //
    if ( $scope.checkRow(symbol) ) {
      return true;
    }
    if ( $scope.checkColumn(symbol) ) {
      return true;
    }
    if ( $scope.checkDiagonals(symbol) ) {
      return true;
    }
    if ( $scope.checkTie ) {
      return true;
    }
  }

}]); // end of controller //














































