// 1. Declare variables (arrays) for two decks of cards.
let deck1 = [];
let deck2 = [];
let deck3 = [];
let deck4 = [];
let cardToRemove;

// 2. Create HTML elements (two <div>s) for the card decks:
  // 1. Deck 1 should display the back of a card with a shadow outline, indicating a larger stack.
  // 2. Deck 2 should display an empty card outline.
// 3. Create cached element references for each of the card decks.
let deck1El = document.querySelector('#deck-1');
let deck2El = document.querySelector('#deck-2');
let deck3El = document.querySelector('#deck-3');
let deck4El = document.querySelector('#deck-4');

// 4. Add an event listener for the "Flip" button.
document.querySelector('#btn').addEventListener('click', () => {
  handleClick(deck1, deck2, deck1El, deck2El);
  console.log(deck2, deck1);
});

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

init();

// 6. Declare a render() function to display a card after it is flipped.
const render = (cardPicked, unflipped, flipped, unflippedEl, flippedEl) => {

  // Removes outline class when first card is picked
  if (flipped.length === 1) {  
    flippedEl.classList.remove("outline");
  }

  // Remove previous picked card from deck2's class list. 
  if (flipped.length > 1) {  
    flippedEl.classList.remove(cardToRemove);
  }

  // Set card to be removed on next click
  cardToRemove = cardPicked;

  // Apply current picked card deck2's class list. For example, if picked card was "h08", the the deck2El would gain the class "h08", which correlates to a background image of the eight of hearts. 
  flippedEl.classList.add(cardPicked) ; 

  // Check which deck has the majority of cards. Once deck2 has more cards, remove shadow from deck1 and apply it to deck2.
  if (flipped.length === 26) {  
    flippedEl.classList.add("shadow");
    unflippedEl.classList.remove("shadow");
  }
	
  // If the deck is empty, add an outline and remove the card back color
  if (unflipped.length === 0) {  
    unflippedEl.classList.add("outline");
    unflippedEl.classList.remove("back-blue");
  }
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