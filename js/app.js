let dealerHand;
let playerHand;
let playerChips;
let stockPile;
let playerTurn;
let displayText;
let dealerHandValue;
let playerHandValue;

const dealerHandElement = document.querySelector('.dealer-hand');
const playerHandElement = document.querySelector('.player-hand');
const tableDisplayElement = document.querySelector('#table-display');
const tableSidebarElement = document.querySelector('.table-sidebar');
const gameButtons = document.querySelectorAll('.game');
const restartButton = document.querySelector('#restart-button');

gameButtons.forEach((button) => button.addEventListener('click', playerTurnListeners));
restartButton.addEventListener('click', init);

function init() {
  initStockPile();
  dealerHand = [randomCard(), randomCard()];
  playerHand = [randomCard(), randomCard()];
  // playerHand = [stockPile[13], stockPile[12]];
  // dealerHand= [stockPile[1], stockPile[0]];
  displayText = 'Player\'s turn';
  playerTurn = true;
  render();
};

init();

function render() {
  let cardToAppend;
  tableDisplayElement.innerText = 'Player\'s Turn';
  
  dealerHandElement.innerHTML = '';
  dealerHand.forEach((card) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card.cardClass);
    dealerHandElement.appendChild(cardToAppend);
  });

  playerHandElement.innerHTML = '';
  playerHand.forEach((card) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card.cardClass);
    playerHandElement.appendChild(cardToAppend);
  });

  if(playerTurn) tableDisplayElement.innerText = displayText;
  if(checkWinner() === true) tableDisplayElement.innerText = displayText;
}

function randomCard() {
  let index = Math.floor(Math.random() * stockPile.length);
  let cardToReturn = stockPile[index];
  stockPile.splice(index, 1);
  return cardToReturn;
}

// function restartGame() {
//   if(checkWinner() === true) {
//     init();
//   } else return;
// }

function playerTurnListeners(e) {
  if(!playerTurn) return;
  if(checkWinner() === true) return;
  if(e.target.id === 'hit-button') {
    playerHand.push(randomCard());
    render();
    console.log(game.calculateHandValue(playerHand));
  } 
  if(e.target.id === 'stand-button') {
    displayText = 'Dealer\'s turn';
    playerTurn = false;
    dealerTurn();
    render();
    if(checkStandWin() === true) {
      render();
      playerTurn = false;
    };
  }
}

function dealerTurn() {
  while(!playerTurn && calculateHandValue(dealerHand) < 17) {
    dealerHand.push(randomCard());
    render();
  }
  if(calculateHandValue(dealerHand) >= 17) {
    displayText = 'Player\'s turn, dealer cannot hit';
    playerTurn = true;
    render();
  }
}

function calculateHandValue(hand) {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    total += card.value;
    if(card.value === 11) aces += 1;
  });

  if(aces > 0 && total > 21){
    total -= 10;
    aces -= 1;
  }

  return total;
}

function checkWinner() {
  dealerHandValue = calculateHandValue(dealerHand);
  playerHandValue =  calculateHandValue(playerHand);
    
  if(playerHandValue < 21 && dealerHandValue < 21) return false;
 
  if(playerHandValue > 21) {
    displayText = 'Player busts, Dealer wins!';
    return true;
  } else if (dealerHandValue > 21) {
      displayText = 'Dealer busts, Player wins!';
      return true;
  } else if (playerHandValue > dealerHandValue) {
      displayText = 'Player wins!';
      return true;
  } else if (playerHandValue < dealerHandValue) {
      displayText = 'Dealer wins!';
      return true;
  } else {
      displayText = 'It\'s a tie!';
      return true;
  }
}

function checkStandWin() {
  dealerHandValue = calculateHandValue(dealerHand);
  playerHandValue = calculateHandValue(playerHand); 

  if(dealerHandValue >= 17) {
    if(playerHandValue < dealerHandValue) {
      displayText = 'Dealer wins!';
      return true;
    }
    if(playerHandValue > dealerHandValue) {
      displayText = 'Player wins!';
      return true;
    }
    if(playerHandValue === dealerHandValue) {
      displayText = 'It\'s a tie!'
      return true;
    }
  } 
}
