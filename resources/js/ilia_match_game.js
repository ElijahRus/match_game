function generateCardValues() {
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
//var cardValues= generateCardValues();
for (var i = 0; i < cardValues.length; i++) {
  $game.html('<div class="col-xs-3 card"></div>');
}


generateCardValues();
MatchGameTests.runTests();
var cardValues= generateCardValues();
