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
const stockPileElement = document.querySelector('#stock-pile');
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
  tableDisplayElement.innerText = 'Player\'s Turn';
  
  appendStockCards();
  dealerHandElement.innerHTML = '';
  dealerHand.forEach((card, index) => {
    let cardToAppend = createDealerDeck(card, index);
    dealerHandElement.appendChild(cardToAppend);
  });

  playerHandElement.innerHTML = '';
  // setTimeout(() => {
    playerHand.forEach((card, index) => {
      let cardToAppend = createPlayerDeck(card, index);
      playerHandElement.appendChild(cardToAppend);
    });
  // }, 400);
  
  dealerScoreElement.innerText = dealerScore;
  playerScoreElement.innerText = playerScore;

  // setTimeout(() => {
  //   playerHand.forEach((card, index) => {
  //     let cardToAppend = createPlayerDeck(card, index);
  //     playerHandElement.appendChild(cardToAppend);
  //   });
  // }, 1500);
  // dealerHandElement.lastChild.classList.remove('back-red');
  // tableDisplayElement.innerText = displayText;
  // playerScoreElement.innerText = playerScore;
  // dealerScoreElement.innerText = dealerScore;
}

function appendStockCards() {
  stockPileElement.innerText = '';
  
  for(let i = 0; i < 4; i++) {
    const stockCard = document.createElement('div');
    stockCard.classList.add('card', 'stock', 'xlarge', 'back-red', 'shadow');
    stockPileElement.appendChild(stockCard);
  }
}

function createDealerDeck(card, index) {
  let cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', card.cardClass);
  // setTimeout(() => {
    cardToAppend.classList.add('fade-in');
  // }, 100);
  if(index === dealerHand.length -1) cardToAppend.classList.add('back-red');
  return cardToAppend;
}

function createPlayerDeck(card, index) {
  let cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', card.cardClass);
  // setTimeout(() => {
    cardToAppend.classList.add('fade-in');
  // }, 100);
  return cardToAppend;
}

function renderPlayerHit() {
  playerHand.push(randomCard());
  let cardToAppend = document.createElement('div');
  cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', playerHand[playerHand.length - 1].cardClass);
  playerHandElement.appendChild(cardToAppend);
  // setTimeout(() => {
    cardToAppend.classList.add('fade-in');
  // }, 200);
}

function renderDealerHit() {
  setTimeout(() => { 
    tableDisplayElement.innerText = 'Dealer\'s turn';
    dealerHand.push(randomCard());
    const newIndex = dealerHand.length - 1;
    const removeIndex = dealerHand.length - 2;
    let cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'xlarge', 'shadow', dealerHand[newIndex].cardClass, 'back-red');
    dealerHandElement.childNodes[removeIndex].classList.remove('back-red');
    dealerHandElement.appendChild(cardToAppend);
    // setTimeout(() => {
      cardToAppend.classList.add('fade-in');
    // }, 200);
  
    dealerTurn();
  }, 400);
}

function renderWinner() {
  dealerHandElement.lastChild.classList.remove('back-red');
  tableDisplayElement.innerText = displayText;
  playerScoreElement.innerText = playerScore;
  dealerScoreElement.innerText = dealerScore;
}

function checkWinConditions() {
  // setTimeout(() => {
    if(calculateHandValue(playerHand) > 21 || calculateHandValue(dealerHand) > 21) {
      compareHands();
      renderWinner();
      playerTurn = false;
      dealerHandElement.lastChild.classList.remove('back-red');
      return;
    }
    if(calculateHandValue(playerHand) === 21 || calculateHandValue(dealerHand) === 21) {
      compareHands();
      renderWinner();
      playerTurn = false;
      dealerHandElement.lastChild.classList.remove('back-red');
    } 
    if(stand === true) {
      compareHands();
      renderWinner();
      dealerHandElement.lastChild.classList.remove('back-red');
    }
  // }, 800);
  // if(compareHands() !== '') {
  //   compareHands();
  //   renderWinner();
  //   playerTurn = false;
  //   dealerHandElement.lastChild.classList.remove('back-red');
  //   return;
  // }
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
    // playerHand.push(randomCard());
    // render();
    renderPlayerHit();
    checkWinConditions();
  } 
  if(e.target.id === 'stand-button') {
    // displayText = 'Dealer\'s turn';
    playerTurn = false;
    // dealerTurn();
    // render();
    dealerTurn();
  }
}

function dealerTurn() {
  stand = true;
  if(calculateHandValue(dealerHand) < 17) {
    renderDealerHit();
  } else checkWinConditions();
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

