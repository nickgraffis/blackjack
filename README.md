# BlackJack

A♥️ 🃏 Black Jack!

# Demo

<img src="/image/demo.gif">

```
~> npm install -g @nickgraffis/blackjack
~> blackjack
```
# Game Play
- Try to get the highest card total without going over 21.
- 2 - 9 is face value
- ['🃏', '👸', '🤴'] are all 10
- 'A' is 11 or 1 if you bust
- 'A' + ['🃏', '👸', '🤴'] is Black Jack! Automatic winner
- Dealer will not hit past 17
- Tie goes to the house :(

# How it works?
Pretty simple and straight forward, except the recursive design of the computers hand.
```
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
```
