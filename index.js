// Index.js
import { GameInitializer } from "./game.js";

// Create a event listener for continue button, (Dummy event for demonstration only)
const continueButtonEvent = () => {
  console.log("Test continue button");
};

// Get the div in which you want to initialize game
const gameDiv = document.getElementById("GameContainer");

// Create a new instance of the GameInitializer with required parameters
const gameIntializer = new GameInitializer(
  "🎉 Looting Please Wait . . .!", // Loading message displayed during game load
  "Congratulations You Won! 😃", // Text displayed when the user wins
  "Better Luck Next Time! 😟", // Text displayed when the user loses
  "GameContainer", // The div element where the game will render
  continueButtonEvent // Event listener for the continue button, pass your custom event function here
);

gameIntializer.initialize();
