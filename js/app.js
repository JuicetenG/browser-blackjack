// 1. Declare variables (arrays) for two decks of cards.
let dealerHand;
let playerHand;
let stockPile;

// 3. Create cached element references for each of the card decks.
const dealerHandElement = document.querySelector('.dealer-hand');
const playerHandElement = document.querySelector('.player-hand');

// 4. Add an event listener for the "Flip" button.
// document.querySelector('#btn').addEventListener('click', () => {
//   handleClick(deck1, deck2, deck1El, deck2El);
//   console.log(deck2, deck1);
// });

// document.querySelector('#btn-2').addEventListener('click', () => {
//   handleClick(deck3, deck4, deck3El, deck4El);
//   console.log(deck4, deck3);
// });
  
  
// document.querySelector('#btn-2').addEventListener('click', handleClick);

// 5. Write an initialization function that assigns 52 cards" to deck 1, then invoke it.
// const init = () => {
  // deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
  //   "hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
  //   "cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
  //   "sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
  // };
const init = () => {
  stockPile = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
    "hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
    "cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
    "sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

  dealerHand = [stockPile.splice(randomCard(), 1), stockPile.splice(randomCard(), 1)];
  playerHand = [stockPile.splice(randomCard(), 1), stockPile.splice(randomCard(), 1)];
};
  
init();
console.log(dealerHand, playerHand, stockPile);
// 6. Declare a render() function to display a card after it is flipped.
function render() {
  let cardToAppend;
  dealerHand.forEach((card) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card);
    dealerHandElement.appendChild(cardToAppend);
  });

  playerHand.forEach((card) => {
    cardToAppend = document.createElement('div');
    cardToAppend.classList.add('card', 'dealt', 'large', card);
    playerHandElement.appendChild(cardToAppend);
  })
}

render();
function randomCard() {
  return Math.floor(Math.random() * stockPile.length);
}

// 7. Stub up a handleClick() function for the event listener to call.
// Function to handle a button click:
function handleClick(unflipped, flipped, unflippedEl, flippedEl) {
  // Used to prevent error on click when no cards are left in deck 1 
  if (unflipped.length > 0) {  

    // Randomly select number from total cards remaining
    let randomIdx = Math.floor(Math.random() * unflipped.length);

    // We use splice and the random index to remove a random card 
    // from the deck. Then, we assign that card to a variable. 
    let cardPicked = unflipped.splice(randomIdx, 1)[0];

    // Add the picked card to deck 2
    flipped.push(cardPicked);

    // Pass the picked card to the render function to display
    render(cardPicked, unflipped, flipped, unflippedEl, flippedEl);
  }
}
  // 1. Select a random card from deck 1.
  // 2. Remove the card from deck 1.
  // 3. Add the card to deck 2.
  // 4. Call the render() function and pass the card to it.

// 8. Within the render() function (situated above handleClick()):
  // 1. After the first card is picked, remove the outline on deck 2.
  // 2. Add the class name to display the card picked on deck 2.
  // 3. When half of the cards are flipped, move the shadow from deck 1 to deck 2.
  // 4. When the final card is picked, add an outline to deck 1.