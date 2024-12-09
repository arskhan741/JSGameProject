// Index.js
import { GameInitializer } from "./game.js";

// Add event listener to start game button
document.getElementById("startGameBtn").addEventListener("click", function () {
  // Create a event listener for continue button, (Dummy event for demonstration only)
  const continueButtonEvent = () => {
    console.log("Test continue button");
  };

  // Create a new instance of game initializer
  const gameIntializer = new GameInitializer(
    "🎉 Looting Please Wait . . .!",
    "Congragulations You Won! 😃",
    "Better Luck Next Time! 😟",
    document.getElementById("GameContainer"),
    continueButtonEvent
  );

  gameIntializer.initialize();
});
