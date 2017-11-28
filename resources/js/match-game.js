var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $myGame = $("#game");
  var myCardValues= MatchGame.generateCardValues();
  MatchGame.renderCards(myCardValues, $myGame);

});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var seqOrderedArray= [];
  for (i=1; i < 9; i++) {
    for (j=0; j < 2; j++){
      seqOrderedArray.push(i);
    }
  }
  var randomlyOrderedArray= [];
  while ( seqOrderedArray.length > 0 ){
    var randomArrayPosition=  Math.floor(Math.random() * (seqOrderedArray.length));
    randomlyOrderedArray.push(seqOrderedArray[randomArrayPosition]);
    seqOrderedArray.splice(randomArrayPosition, 1);
  }
  return randomlyOrderedArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
      var cardColors = [
        'hsl(25, 85%, 65%)',
        'hsl(55, 85%, 65%)',
        'hsl(90, 85%, 65%)',
        'hsl(160, 85%, 65%)',
        'hsl(220, 85%, 65%)',
        'hsl(265, 85%, 65%)',
        'hsl(310, 85%, 65%)',
        'hsl(360, 85%, 65%)'];
      $game.empty();
      $game.data('flippedCards', []);

      for (var w = 0; w < cardValues.length; w++) {
        var valueOfCard= cardValues[w];
      //  console.log("valueOfCard", valueOfCard);
        var data= {
          value: valueOfCard,
          cardIsFlipped: false,
          color: cardColors[valueOfCard - 1]
        };
      //  console.log("data", data);
        var $cardElement= $('<div class="col-xs-3 card"></div>');
        $cardElement.data(data);
        $game.append($cardElement);
      }
      $('.card').click(function() {
        MatchGame.flipCard($(this), $('#game'))
      });
/*
      $cardElement.css('background-color', $cardElement.data('color'))
                  .text($cardElement.data('value'))
                  .data('cardIsFlipped', true);
                  if ($cardElement.data('cardIsFlipped')) {
                    console.log("Card already Flipped");
                  };
      var flippedCardsArray= $game.data('flippedCards');
      flippedCardsArray.push($cardElement);
      console.log("flippedCardsArray[0].data('value')", flippedCardsArray[0].data('value'));
*/
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
    //console.log("$card.data('cardIsFlipped')", $card.data('cardIsFlipped'));
    if ($card.data('cardIsFlipped')) {
      //console.log("Card already Flipped");
      return;
    }
    $card.css('background-color', $card.data('color'))
        .text($card.data('value'))
        .data('cardIsFlipped', true);
    var flippedCardsArray= $game.data('flippedCards');
    //console.log("flippedCardsArray", flippedCardsArray);
    //console.log("$card", $card);
    flippedCardsArray.push($card);
    //console.log("flippedCardsArray[0].data('value')", flippedCardsArray[0].data('value'));
    //console.log("flippedCardsArray.length", flippedCardsArray.length);
    if (flippedCardsArray.length === 2) {
        //console.log("flippedCardsArray[1].data('value')", flippedCardsArray[1].data('value'));

        if (flippedCardsArray[0].data('value') === flippedCardsArray[1].data('value')){
            var matchCss= {
              backgroundColor: 'rgb(153, 153, 153)',
              color: 'rgb(204, 204, 204)'
            };
            flippedCardsArray[0].css(matchCss);
            flippedCardsArray[1].css(matchCss);
        }else {

          var card1= flippedCardsArray[0];
          var card2= flippedCardsArray[1];
          setTimeout(function(){
                card1.css('background-color', 'rgb(32, 64, 86)')
                    .text('')
                    .data('cardIsFlipped', false);
                card2.css('background-color', 'rgb(32, 64, 86)')
                    .text('')
                    .data('cardIsFlipped', false);
          }, 500);
        }

        $game.data('flippedCards', []);
    }
};
