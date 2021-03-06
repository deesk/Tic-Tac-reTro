console.log("Tic Tac reTro");

var allPatterns = [
  {winningPatterns : [
    [1,2,3] , [4,5,6] , [7,8,9] , [1,4,7] , [2,5,8] , [3,6,9] , [1,5,9] , [3,5,7] ]},
  {patterns : [] , name: "Player One" , score: 0 },
  {patterns : [] , name: "Player Two" , score: 0 }
]
var grid = 3;// used in countMatchedPatterns()
var winPattern = allPatterns[0].winningPatterns;
var playerOne = allPatterns[1];
var playerTwo = allPatterns[2];
var win = false;
var drawScore = 0;

// this adds value form 1 to 9 to all 9 grids
var setPatternToGrid = function (){
  var grid = $('.grid');
    for(var i = 0 ; i < grid.length ; i++){
    grid[i].value = i + 1 ;
  }
}

var playAgainDilogBox = function(player){
  var resetGame = function(){
    playerOne.patterns.splice(0 , playerOne.patterns.length -1 );
    playerOne.patterns.pop();
    playerTwo.patterns.splice(0 , playerTwo.patterns.length -1);
    playerTwo.patterns.pop();
    $('.grid').removeClass('playerOne playerTwo');
    $('.playAgain').remove();
    win = false;
  };
  $('<div>', { class: 'playAgain'}).appendTo('.grid-wrap');
  $('.playAgain').fadeIn();
  $('.playAgain').append('<p>' , $('<button class="playAgain-btn">').html('Play Again'));
  $('.playAgain-btn').on('click' , function(){
    $('.playAgain').fadeOut('slow');
    resetGame();
  });
  if (win === true){
    $('.playAgain > p').html(player.name + ' Wins');
    //adding and updating sore card
    if(playerOne.name === player.name){
      $('.p1Score').html(player.score += 1);
    } else {
      $('.p2Score').html(player.score += 1);
    }
  }else {
    $('.playAgain > p').html('Draw');
    //adding and updating sore card
    $('.drawScore').html(drawScore += 1);
  }
}

var countMatchedPatterns = function(player) {
  var winningScore;
  // w: Winptterns Index & element
  $.each(winPattern, function(wIndex, wElem){
    var count = 0;
    $.each(player.patterns, function(index, element){
      if($.inArray(element,wElem) !== -1){
      // console.log('inA: '+element , wElem)
        count++;
        // console.log("COUNT:" + count);
        if(count === 3){
        // console.log("return "+  count);
          winningScore = count;
        }
      }
    })
  })
  return  winningScore;
}

var checkWinPatternMatch = function(player){
  if(countMatchedPatterns(player) >= 3){
    win = true;
    playAgainDilogBox(player);
  }
}
var draw = function(playerOne, playerTwo, player){
  var  totalPlayersPatterns = playerOne.patterns.length + playerTwo.patterns.length
  if( (totalPlayersPatterns === 9 ) && (win === false)){
    playAgainDilogBox(player);
  }
}

var playGame = function(){
  setPatternToGrid();
  var currentPlayer = playerOne;  //player one first turn

  $('.grid').on('click' , function(event){
    if (win === false){
      var currentGrid = $(this);
    }
    if(currentGrid.hasClass('playerOne') || currentGrid.hasClass('playerTwo')){
      // do nothing as current grid has already been selected
    }else {
      if(currentPlayer === playerOne){
        currentGrid.addClass('playerOne');
        // recording patterns of each player
        currentPlayer.patterns.push(this.value);

        checkWinPatternMatch(currentPlayer);
        draw(playerOne, playerTwo, currentPlayer);

        $('.turn > span').html(currentPlayer.name).removeClass('turnPlayerOne')
        currentPlayer = playerTwo;
        $('.turn > span').html(currentPlayer.name).addClass('turnPlayerTwo');
      }else {
        currentGrid.addClass('playerTwo');
        // recording patterns of each player
        currentPlayer.patterns.push(this.value);

        checkWinPatternMatch(currentPlayer);
        draw(playerOne, playerTwo, currentPlayer);
        $('.turn > span').html(currentPlayer.name).removeClass('turnPlayerTwo')
        currentPlayer = playerOne;
        $('.turn  > span' ).html(currentPlayer.name).addClass('turnPlayerOne');
      }
    }
  })
}

playGame();
