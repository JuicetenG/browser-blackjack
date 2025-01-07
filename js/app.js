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

  if(calculateHandValue(playerHand) === 21 || calculateHandValue(dealerHand) === 21) {
    checkWinner();
    tableDisplayElement.innerText = displayText;
  }
  tableDisplayElement.innerText = displayText;
}

function randomCard() {
  let index = Math.floor(Math.random() * stockPile.length);
  let cardToReturn = stockPile[index];
  stockPile.splice(index, 1);
  return cardToReturn;
}

function playerTurnListeners(e) {
  if(!playerTurn) return;
  if(e.target.id === 'hit-button') {
    playerHand.push(randomCard());
    render();
    if(calculateHandValue(playerHand) > 21 ){
      checkWinner();
      render();
      playerTurn = false;
    }
  } 
  if(e.target.id === 'stand-button') {
    displayText = 'Dealer\'s turn';
    playerTurn = false;
    dealerTurn();
  }
}

function dealerTurn() {
  while(!playerTurn && calculateHandValue(dealerHand) < 17) {
    dealerHand.push(randomCard());
    render();
  }
  if(calculateHandValue(dealerHand) >= 17) {
    checkWinner();
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
  
  if(dealerHandValue === 21) {
    displayText = 'Dealer Wins!';
    return true;
  }
  if(playerHandValue === 21) {
    displayText = 'Player Wins!';
   
  }

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