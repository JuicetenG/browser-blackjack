//global variables
let dealerHand;
let playerHand;
let stockPile;
let playerTurn;
let stand;
let displayText;
let dealerHandValue;
let playerHandValue;
let dealerScore;
let playerScore;

//cached DOM elements
const dealerHandElement = document.querySelector('.dealer-hand');
const playerHandElement = document.querySelector('.player-hand');
const tableDisplayElement = document.querySelector('#table-display');
const stockPileElement = document.querySelector('#stock-pile');
const tableSidebarElement = document.querySelector('.table-sidebar');
const dealerScoreElement = document.querySelector('.dealer-score');
const playerScoreElement = document.querySelector('.player-score');

const gameButtons = document.querySelectorAll('.game');
const restartButton = document.querySelector('#restart-button');
const newRoundButton = document.querySelector('#new-round-button');

//initializes when page loads or when user clears scores
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

//initializes a new round and keeps scores
function initNewRound() {
  initStockPile();
  dealerHand = [randomCard(), randomCard()];
  playerHand = [randomCard(), randomCard()];
  displayText = 'Player\'s turn';
  playerTurn = true;
  stand = false;
  render();
}

//renders on page load or new round start
function render() {
  tableDisplayElement.innerText = 'Player\'s Turn';
  appendStockCards();

  dealerHandElement.innerHTML = '';
  dealerHand.forEach((card, index) => {
    let cardToAppend = createDealerDeck(card, index);
    dealerHandElement.appendChild(cardToAppend);
  });

  playerHandElement.innerHTML = '';
    playerHand.forEach((card) => {
      let cardToAppend = createPlayerDeck(card);
      playerHandElement.appendChild(cardToAppend);
    });

  setTimeout(() => {
    checkWinConditions();
  }, 200);
  dealerScoreElement.innerText = dealerScore;
  playerScoreElement.innerText = playerScore;
}

//add event listeners
gameButtons.forEach((button) => button.addEventListener('click', playerTurnListeners));
restartButton.addEventListener('click', init);
newRoundButton.addEventListener('click', initNewRound);

//event listener function
function playerTurnListeners(e) {
  if(!playerTurn) return;
  if(e.target.id === 'hit-button') {
    renderPlayerHit();
    checkWinConditions();
  } 
  if(e.target.id === 'stand-button') {
    playerTurn = false;
    dealerTurn();
  }
}

//functions for rendering cards to the DOM
function appendStockCards() {
  stockPileElement.innerText = '';
  for(let i = 0; i < 4; i++) {
    const stockCard = document.createElement('div');
    stockCard.classList.add('card', 'stock', 'xlarge', 'back-red', 'shadow');
    stockPileElement.appendChild(stockCard);
  }
}

function createDealerDeck(card, index) {
  const cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', card.cardClass);
  if(index === dealerHand.length -1) cardToAppend.classList.add('back-red');
  return cardToAppend;
}

function createPlayerDeck(card) {
  const cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', card.cardClass);
  return cardToAppend;
}

//functions to render when the player and dealer draw cards
function renderPlayerHit() {
  playerHand.push(randomCard());
  const cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', playerHand[playerHand.length - 1].cardClass);
  playerHandElement.appendChild(cardToAppend);
}

function renderDealerHit() {
  tableDisplayElement.innerText = 'Dealer\'s turn';
  cardFlip();
  dealerHand.push(randomCard());
  const newIndex = dealerHand.length - 1;
  const cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', dealerHand[newIndex].cardClass, 'back-red');
  dealerHandElement.appendChild(cardToAppend);
  dealerTurn();
}

//render win message
function renderWinner() {
  setTimeout(() => {
    cardFlip();
    tableDisplayElement.innerText = displayText;
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;
  }, 400);
}

//called when user selects stand
function dealerTurn() {
  stand = true;
  if(calculateHandValue(dealerHand) < 17) {
    setTimeout(() => {
      renderDealerHit();
    }, 400);
  } else checkWinConditions();
}

//removes back of card and applies class for flip animation
function cardFlip() {
  dealerHandElement.lastChild.classList.remove('back-red');
  dealerHandElement.lastChild.classList.add('flip');
}

//returns a random card to the the function is used with
function randomCard() {
  const index = Math.floor(Math.random() * stockPile.length);
  const cardToReturn = stockPile[index];
  stockPile.splice(index, 1);
  return cardToReturn;
}

//calculates hand value
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

//checks to see if there is a bust, 21, or if the user stood and the hands are compared
function checkWinConditions() {
  if(calculateHandValue(playerHand) > 21 || calculateHandValue(dealerHand) > 21) {
    compareHands();
    renderWinner();
    playerTurn = false;
    return;
  }
  if(calculateHandValue(playerHand) === 21 || calculateHandValue(dealerHand) === 21) {
    compareHands();
    renderWinner();
    playerTurn = false;
    return;
  } 
  if(stand === true) {
    compareHands();
    renderWinner();
  }
}

//compared hands and increments winner's score
function compareHands() {
  let winner = '';
  dealerHandValue = calculateHandValue(dealerHand);
  playerHandValue =  calculateHandValue(playerHand);

  if(dealerHandValue === 21 && playerHandValue === 21) {
    displayText === 'It\'s a tie!';
    winner = 'tie'
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
      winner = 'tie';
  }

  if(winner === 'player') playerScore++;
  if(winner === 'dealer') dealerScore++;
}

//rules button stuff
const rulesButton = document.querySelector('#rules-button');
const rulesElement = document.querySelector('.rules');
rulesButton.addEventListener('click', () => {
  rulesElement.style.display = 'block';
  document.querySelector('.table').style.opacity = "0";
});

const owlCaveButton = document.querySelector('.owl-cave-button');
owlCaveButton.addEventListener('click', () => {
  rulesElement.style.display = 'none';
  document.querySelector('.table').style.opacity = "0.98";
});
