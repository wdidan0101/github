/*
Site URL: https://tttwdi.firebaseapp.com, or use firebase open
Hosting Dashboard: https://firebase.com/account then view the hosting section of your app
*/

var tictactoeApp = angular.module('tictactoeApp', ["firebase"] );
tictactoeApp.controller('tictactoeController', ['$scope', '$firebase', function($scope, $firebase) {

  
  function initializeBoard() {
    $scope.data.board = [];
    $scope.data.currentPlayer = true;
    $scope.data.gameOver = false;
    $scope.data.tie = false;
    $scope.data.gamestarted = false;
    $scope.data.size = 3;
  }

//==============================================================//
//==============================================================//
  
  // FIREBASE SETUP //
  var ticTacRef = new Firebase("https://tttstarwars.firebaseio.com/games"); //javascript firebase library
    //initializes firebase
  //get db object
  var sync = $firebase(ticTacRef); // sets up angularfire with firebase
                                    //angular fire is the glue between firebse and ajs
  var db = sync.$asObject(); // grabs everything in database and saves it as a js object

  // For 3-way data bindings, bind it to the scope instead
  //when its loaded
  db.$bindTo($scope, "data").then( function() { //binds db to your $scope.data
    if (!$scope.data.board) {
      initializeBoard();
    }
    if ( $scope.data.gameOver ) {
      initializeBoard();
    }
  });
  // END FIREBASE SETUP //

  $scope.currentPlayer = true;

  // reset the board //
  $scope.reset = function(size) {
    $scope.data.board = [];
    $scope.data.currentPlayer = true;
    $scope.data.gameOver = false;
    $scope.data.tie = false;
    $scope.data.gamestarted = false;
    //location.reload();
  }

  // make the board //
  $scope.makeBoard = function(size) {
  var tempBoard = [];

    for (var i = 0; i < size; i++) {
      var temp = [];
      for (var j = 0; j < size; j++) {
        temp.push('e');
      }
      tempBoard.push(temp);
    }
    $scope.data.board = tempBoard;
    //console.log($scope.data.board);
    $scope.data.gamestarted = true;
  }

  $scope.takeCell = function(row, column) {
    if( $scope.currentPlayer ) {
        $scope.data.board[row][column] = 'x';
        // if player one wins //
        if( $scope.checkWinner('x') ) {
          console.log('In takeCell function, player 1 wins!');
          $scope.data.gameOver = true;
        }
    } else {
      $scope.data.board[row][column] = 'o';
      // if player two wins //
      if( $scope.checkWinner('o') ) {
          console.log('In takeCell function, player 2 wins!');
          $scope.data.gameOver = true;
      }
    }
    if ($scope.data.gameOver && $scope.data.tie) {
      alert("It's a tie!");
    } else if ( $scope.data.gameOver) {
      if ( $scope.currentPlayer ) {
        alert("Player 1 wins!");
      } else {
        alert("Player 2 wins!");
      }
    }
    $scope.currentPlayer = !$scope.currentPlayer;
  }
  $scope.checkWinner = function(symbol) {
    // check for diagonals //
    
    if ( $scope.checkRow(symbol) ) {
      //console.log("In checkWinner function, row win!");
      return true;
    } else if ( $scope.checkColumn(symbol) ) {
      //console.log("In checkWinner function, column win!");
      return true;
    } else if ( $scope.checkDiagonals(symbol) ) {
      console.log("In checkWinner function, diagonal win!");
      return true;
    } else if ( $scope.checkTie() ) {
      //console.log("In checkWinner function, it's a tie!");
      return true;
    }
    else {
      return false;
    }
  }
  $scope.checkTie = function() {
    //console.log('enter checkTie');
    $scope.data.tie = true;
    for(var i = 0; i < $scope.data.size; i++) {
      for(var j = 0; j < $scope.data.size; j++) {
        // if there is an empty cell //
        if ( $scope.data.board[i][j] == 'e' ) {
          //console.log('there is an empty cell');
          $scope.data.tie = false;
          return $scope.data.tie;
        }
      }
    }
    //console.log('there are no empty cells');
    return $scope.data.tie; 
  }
  $scope.checkArray = function(array, symbol) {
    // assume all characters are same //
    $scope.win = true;
    for (var i = 0; i < $scope.data.size; i++ ) {
      if( array[i] != symbol) {
        $scope.win = false;
      }
    }
    return $scope.win;
  }
  $scope.checkRow = function(symbol) {
    // check for rows //
    var temp = [];
    for(var i = 0; i< $scope.data.size; i++) {
      for(var j = 0; j< $scope.data.size; j++) {
        temp.push($scope.data.board[i][j]);
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
    for(var i = 0; i< $scope.data.size; i++) {
      for(var j = 0; j< $scope.data.size; j++) {
        temp.push($scope.data.board[j][i]);
      }
      if( $scope.checkArray(temp,symbol) ) {
          return true;
      } 
      temp = [];
    }
  }
  $scope.checkbackwardDiagonal = function(symbol) {
    // check backward diagonal //
    // this part works //
    var temp = [];
    for(var i = 0; i< $scope.data.size; i++) {
      temp.push($scope.data.board[i][i]);
    }
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }
  }
  $scope.checkforwardDiagonal = function(symbol) {
    // check forward diagonal //
    var temp = [];
    var j = $scope.data.size-1 
    for( var i = 0; i < $scope.data.size; i++ ) {
        
        console.log("i => "+i);
        console.log("j => "+j);
        console.log("$scope.data.board[i][j] => "+$scope.data.board[i][j]);
        temp.push($scope.data.board[i][j]);

        j--;
    }
    console.log('this is temp');
    console.log(temp);
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }
  }
  $scope.checkDiagonals = function(symbol) {
    if( $scope.checkbackwardDiagonal(symbol) ){
      return true;
    }
    if( $scope.checkforwardDiagonal(symbol) ){
      return true;
    }
  }
}]); // end of controller //






























