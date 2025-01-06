let dealerHand;
let playerHand;
let stockPile;

const dealerHandElement = document.querySelector('.dealer-hand');
const playerHandElement = document.querySelector('.player-hand');

document.querySelector('#hit-button').addEventListener('click', () => {
  playerHand.push(randomCard());
  render();
});

const init = () => {
  initStockPile();
  dealerHand = [randomCard(), randomCard()];
  playerHand = [randomCard(), randomCard()];
  render();
};
  
init();

function render() {
  let cardToAppend;
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
}

function randomCard() {
  let index = Math.floor(Math.random() * stockPile.length);
  let cardToReturn = stockPile[index];
  stockPile.splice(index, 1);
  return cardToReturn;
}
