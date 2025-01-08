let dealerHand;
let playerHand;
let playerChips;
let stockPile;
let playerTurn;
let stand;
let displayText;
let dealerHandValue;
let playerHandValue;
let dealerScore;
let playerScore;

const dealerHandElement = document.querySelector('.dealer-hand');
const playerHandElement = document.querySelector('.player-hand');
const tableDisplayElement = document.querySelector('#table-display');
const tableSidebarElement = document.querySelector('.table-sidebar');
const dealerScoreElement = document.querySelector('.dealer-score');
const playerScoreElement = document.querySelector('.player-score');

const gameButtons = document.querySelectorAll('.game');
const restartButton = document.querySelector('#restart-button');
const newRoundButton = document.querySelector('#new-round-button');

gameButtons.forEach((button) => button.addEventListener('click', playerTurnListeners));
restartButton.addEventListener('click', init);
newRoundButton.addEventListener('click', initNewRound);

function init() {
  initStockPile();
  dealerHand = [randomCard(), randomCard()];
  playerHand = [randomCard(), randomCard()];
  displayText = 'Player\'s turn';
  playerTurn = true;
  stand = false;
  dealerScore = 0;
  playerScore = 0;
  render();
};

init();

function initNewRound() {
  initStockPile();
  dealerHand = [randomCard(), randomCard()];
  playerHand = [randomCard(), randomCard()];
  displayText = 'Player\'s turn';
  playerTurn = true;
  stand = false;
  render();
}

function render() {
  let cardToAppend;
  tableDisplayElement.innerText = 'Player\'s Turn';
  
  dealerHandElement.innerHTML = '';
  dealerHand.forEach((card, index) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card.cardClass);
    dealerHandElement.appendChild(cardToAppend);
    if(index === dealerHand.length -1) cardToAppend.classList.add('back-red');
  });

  playerHandElement.innerHTML = '';
  playerHand.forEach((card) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card.cardClass);
    playerHandElement.appendChild(cardToAppend);
  });

  checkWinConditions();
  tableDisplayElement.innerText = displayText;
  playerScoreElement.innerText = playerScore;
  dealerScoreElement.innerText = dealerScore;
}

function checkWinConditions() {
  if(calculateHandValue(playerHand) > 21 || calculateHandValue(dealerHand) > 21) {
    compareHands();
    playerTurn = false;
    dealerHandElement.lastChild.classList.remove('back-red');
    return;
  }
  if(calculateHandValue(playerHand) === 21 || calculateHandValue(dealerHand) === 21) {
    compareHands();
    playerTurn = false;
    dealerHandElement.lastChild.classList.remove('back-red');
  } 
  if(stand === true) {
    compareHands();
    dealerHandElement.lastChild.classList.remove('back-red');
  }
}

function randomCard() {
  const index = Math.floor(Math.random() * stockPile.length);
  const cardToReturn = stockPile[index];
  stockPile.splice(index, 1);
  return cardToReturn;
}

function playerTurnListeners(e) {
  if(!playerTurn) return;
  if(e.target.id === 'hit-button') {
    playerHand.push(randomCard());
    render();
  } 
  if(e.target.id === 'stand-button') {
    displayText = 'Dealer\'s turn';
    playerTurn = false;
    dealerTurn();
    render();
  }
}

function dealerTurn() {
  while(!playerTurn && calculateHandValue(dealerHand) < 17) {
    dealerHand.push(randomCard());
  } 
  if(calculateHandValue(dealerHand) >= 17) {
    stand = true;
  }
}

//refactor for reduce 
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

function compareHands() {
  let winner = '';
  dealerHandValue = calculateHandValue(dealerHand);
  playerHandValue =  calculateHandValue(playerHand);
  
  if(dealerHandValue === 21 && playerHandValue === 21) {
    displayText === 'It\'s a tie!';
  }
  if(dealerHandValue === 21) {
    displayText = 'Dealer Wins!';
    winner = 'dealer'
  }
  if(playerHandValue === 21) {
    displayText = 'Player Wins!';
    winner = 'player';
  }

  if(playerHandValue > 21) {
    displayText = 'Player busts, Dealer wins!';
    winner = 'dealer';
  } else if (dealerHandValue > 21) {
      displayText = 'Dealer busts, Player wins!';
      winner = 'player';
  } else if (playerHandValue > dealerHandValue) {
      displayText = 'Player wins!';
      winner = 'player';
  } else if (playerHandValue < dealerHandValue) {
      displayText = 'Dealer wins!';
      winner = 'dealer';
  } else {
      displayText = 'It\'s a tie!';
  }

  if(winner === 'player') playerScore++;
  if(winner === 'dealer') dealerScore++;
}

