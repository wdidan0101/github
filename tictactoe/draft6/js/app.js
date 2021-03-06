

var tictactoeApp = angular.module('tictactoeApp', ["firebase"] );

tictactoeApp.controller('tictactoeController', ['$scope', '$firebase', function($scope, $firebase) {

  var ticTacRef = new Firebase("https://tttwdi.firebaseio.com/games");




  // boolean variables //  
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
    //console.log($scope.board);
    $scope.gamestarted = true;
  }

  ticTacRef.once("value", function(data){
    var games = data.val(); 
    if (games != null) {
      var keys = Object.keys(games);
      var lastKey = keys[keys.length-1];
      lastGame = games[lastKey];
      //Someone is already in the room
      if (lastGame.waiting==true) {
        lastGame = ticTacRef.child(lastKey);
        //Sets the state of the game for when both players have joined
        lastGame.set ( { waiting: false } );
        playerNum = 2;
      } else {
        //You are the first person in the room
        lastGame = ticTacRef.push({ waiting: true});
        playerNum = 1;
      }
    //There are no games logged on Firebase
    } else {
      //You are the first person in the room
      lastGame = ticTacRef.push({ waiting:true});
      playerNum = 1;
    }
    $scope.game = $firebase(lastGame);
  });

  $scope.takeCell = function(row, column) {
    if( $scope.currentPlayer ) {
        $scope.board[row][column] = 'x';
        // if player one wins //
        if( $scope.checkWinner('x') ) {
          console.log('In takeCell function, player 1 wins!');
          $scope.gameOver = true;
        }
    } else {
      $scope.board[row][column] = 'o';
      // if player two wins //
      if( $scope.checkWinner('o') ) {
          console.log('In takeCell function, player 2 wins!');
          $scope.gameOver = true;
      }
    }
    if ($scope.gameOver && $scope.tie) {
      alert("In takeCell function, It's a tie!");
    } else if ( $scope.gameOver) {
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
    if ( $scope.checkTie() ) {
      //console.log("In checkWinner function, it's a tie!");
      return true;
    } else if ( $scope.checkRow(symbol) ) {
      //console.log("In checkWinner function, row win!");
      return true;
    } else if ( $scope.checkColumn(symbol) ) {
      //console.log("In checkWinner function, column win!");
      return true;
    } else if ( $scope.checkDiagonals(symbol) ) {
      console.log("In checkWinner function, diagonal win!");
      return true;
    } else {
      return false;
    }
  }

  $scope.checkTie = function() {
    //console.log('enter checkTie');
    $scope.tie = true;
    for(var i = 0; i < $scope.size; i++) {
      for(var j = 0; j < $scope.size; j++) {
        // if there is an empty cell //
        if ( $scope.board[i][j] == 'e' ) {
          //console.log('there is an empty cell');
          $scope.tie = false;
          return $scope.tie;
        }
      }
    }
    //console.log('there are no empty cells');
    return $scope.tie; 
  }

  $scope.checkArray = function(array, symbol) {
    // assume all characters are same //
    $scope.win = true;
    for (var i = 0; i < $scope.size; i++ ) {
      if( array[i] != symbol) {
        $scope.win = false;
      }
    }
    return $scope.win;
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

  $scope.checkbackwardDiagonal = function(symbol) {
    // check backward diagonal //
    // this part works //
    var temp = [];
    for(var i = 0; i< $scope.size; i++) {
      temp.push($scope.board[i][i]);
    }
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }
  }


  $scope.checkDiagonals = function(symbol) {

    if( $scope.checkbackwardDiagonal(symbol) ){
      return true;
    }

    // check forward diagonal //
    var temp = [];
    var j = $scope.size-1 
    for( var i = 0; i < $scope.size; i++ ) {
        
        console.log("i => "+i);
        console.log("j => "+j);
        console.log("$scope.board[i][j] => "+$scope.board[i][j]);
        temp.push($scope.board[i][j]);

        j--;
    }
    console.log('this is temp');
    console.log(temp);
    if( $scope.checkArray(temp,symbol) ){
      return true;
    }
  }
}]); // end of controller //














































