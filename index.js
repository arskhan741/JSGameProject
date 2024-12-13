// Index.js
import { GameInitializer } from "./game.js";
import { initializeApiParameters } from "./APIresponse.js";

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

sendAPIParameters();
gameIntializer.initialize();

// Initialize API Parameters
function sendAPIParameters() {
  //Send the required token
  const token = "22aa99d8c8aba6fd3866766f33b6d8146e3892ec";

  // Send the required API Parameters
  const requestData = {
    userIdentifier: "abc123",
    promoId: 613,
    fixtureId: 14486,
  };

  const url = `https://mp-staging.co.uk/master/api/rewards/api/rewards/${requestData.userIdentifier}/${requestData.promoId}/${requestData.fixtureId}/${token}`;

  const userId = 1;
  const apiKey = "EUvvT*7_9J!VS4-99mE%$K6x$Qk";

  initializeApiParameters(token, url, userId, apiKey);
}
