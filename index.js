//TODO : Provide option to split cards? Or is that only for betting?
//TODO : Keep score and add money?

/* Pull in readline */
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

/* Get random integer up to max */
function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomPoints() {
  var points = randomInt(11);
  if (points == 9) {
    return 11;
  } else if (points == 10) {
    return 10;
  } else {
    return points + 2;
  }
}

function dealCard(card, suit) {
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'A', 'FACE'];
  var faceCards = ['🃏', '👸', '🤴'];
  if (cards[card] === 'FACE') {
    var displayCard = faceCards[randomInt(3)];
  } else if (card == 11) {
    var displayCard = cards[9];
  } else {
    var displayCard = cards[card - 2];
  }
  var suits = ['♥️', '♣️', '♠️', '♦️'];

  return displayCard + '\xa0' + suits[suit];
}

var computerHand = [];
var computerTurn = 0;
var computerAsyncHand = function() {
  if (computerTurn < 2) {
    computerHand.push(randomPoints());
    computerTurn++;
    computerHand.push(randomPoints());
    computerTurn++;
    console.log(dealCard(computerHand[0], randomInt(4)));
    console.log(dealCard(computerHand[1], randomInt(4)));
    console.log(computerHand.reduce((a, b) => a + b, 0));
    sleep(1000);
  }
  if (computerHand.includes(11)) {
    var Ace = computerHand.indexOf(11);
    computerHand[Ace] = 1;
    console.log('Dealer score is now ' + computerHand.reduce((a, b) => a + b, 0) + ', using the A as a 1!');
  }
  if (computerHand.reduce((a, b) => a + b, 0) > 17) {
    //Game Over
    return;
  } else {
    computerHand.push(randomPoints());
    computerTurn++;
    console.log(dealCard(computerHand[computerTurn - 1], randomInt(4)));
    console.log(computerHand.reduce((a, b) => a + b, 0));
  }
  sleep(1000);
  computerAsyncHand();
}

var userHand = [];
var userTurn = 0;
var recursiveAsyncReadLine = function() {
  if (userTurn < 2) {
    userHand.push(randomPoints());
    userTurn++;
    userHand.push(randomPoints());
    userTurn++;
    console.log(dealCard(userHand[0], randomInt(4)));
    console.log(dealCard(userHand[1], randomInt(4)));
    console.log(userHand.reduce((a, b) => a + b, 0));
    if (userHand.reduce((a, b) => a + b, 0) == 21 && userHand.includes(11)) {
      console.log('🍗🍗🍗 Winner, winner, chicken dinner!');
      readline.close();
      process.exit();
    }
  }
  if (userHand.reduce((a, b) => a + b, 0) > 21) {
    if (userHand.includes(11)) {
      var Ace = userHand.indexOf(11);
      userHand[Ace] = 1;
      console.log('Score is now ' + userHand.reduce((a, b) => a + b, 0) + ', guessing you want your A to be 1 now! 🤷');
    } else {
      console.log('😫 BUST!');
      readline.close();
      process.exit();
    }
  }
  readline.question('Hit me? Stay? \n >', userResponse => {
    if (userResponse.toLowerCase() == 'hit me' || userResponse.toLowerCase() == 'hit') {
      userHand.push(randomPoints());
      userTurn++;
      console.log(dealCard(userHand[userTurn - 1], randomInt(4)));
      console.log(userHand.reduce((a, b) => a + b, 0));
    } else if (userResponse.toLowerCase() == 'exit') {
      readline.close();
      process.exit();
    } else if (userResponse.toLowerCase() == 'stay') {
      var computerTotal = computerAsyncHand();
      if (computerHand.reduce((a, b) => a + b, 0) > 21) {
        console.log('🎉 You win!');
        readline.close();
        process.exit();
      } else if (computerHand.reduce((a, b) => a + b, 0) > userHand.reduce((a, b) => a + b, 0)) {
        console.log('😿 You lose!');
        readline.close();
        process.exit();
      } else if ( computerHand.reduce((a, b) => a + b, 0) == userHand.reduce((a, b) => a + b, 0)) {
        console.log('👹 You lose, tie goes to the house!');
        readline.close();
        process.exit();
      } else {
        console.log('🎉 You win!');
        readline.close();
        process.exit();
      }
    } else {
      console.log('😤 I\m a dealer, not a mind reader...what do you want?')
    }
    recursiveAsyncReadLine();
  });
}
recursiveAsyncReadLine(); //Begin readline function
