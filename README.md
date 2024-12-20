
CONSTANTS AND VARIABLES
//define an array to hold the deck of cards as objects 
//define a constant array that holds the players to keep track of current player, player hands, and scoring

CACHE VARIABLES
//define variables for all buttons on the page (rules, game options, wager amounts, theme changes)
//define const for the table where cards and game info and options will be displayed
//define variables for the display ares of the deck, dealer hand, and the player hand
//define a variable where information about the game state will be displayed (player turn, round results)

EVENT LISTENERS
//add event listeners to buttons outside the table and call the relevant function
//add event listener to the table that listens for click even and calls function based on the event target information

INITIALIZATION
//shuffle the card deck on initialization 
//set the dealer and player object to blank values

RENDER
//call function that updates all DOM variables to display starting game state
//shuffle and display card deck
//in the initial render, prompt user to select a wager to start the game 

GAMEPLAY
//once user has selected a wager, 1 at a time to player and dealer until they each have 2
//if player already has 21, check dealer hand to see if there is a tie or if player won
  //display all cards
  //if there is no tie
    //add wager to player total chips property
    //display that the round was won
    //go back to wager selection
  //if there is a tie
    //display that there was a tie
    //go back to wager selection
//else if player did not start with 21
  //they must select hit or stand to continue the game  
  //if a user hits, add card from the shuffled deck to the player hand 
    //check the total value of players hand
    //if player hand is valued over 21, the round is lost
      //subtract the wager amount from the player objects total chips property
      //display that the round was lost
      //go back to wager selection screen
    //else if the user hits and gets 21, checks if there is a tie with player and dealer hands
      //if there is no tie 
        //add wager amount to player total chips property 
        //display that the user won 
        //go back to wager selection screen
      //else if there is a tie 
        //display that there was a tie
        //go back to wager selection screen
    //else if user is still under 21, player must select hit or stand again 
      //follow logic for hit or stand based on choice

  //if the user stands, player turns are swapped
    //display that it is the dealers turn
    //if dealer has 21 exactly
      //display that the user lost
      //subtract the wager amount from the player objects total chips property
      //go back to wager selection screen 
    //else if the dealer hand is under 16, they must draw a card
      //if dealer hand is 21 after draw
        //display that the user lost
        //subtract wager amount from player objects total chips property
        //go back to wager selection screen
      //else if the dealer hand is 17 or greater after draw
        //the dealer stands, player turns swap
        //display to the user that it is their turn and wait for them to select game option
        //play hit or stand logic again based on user choice
        
//above logic will be looped until player runs out of chips, restarts game, or quits



