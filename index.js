// Index.js
import { GameOutCome } from "./game.js";

const gameDiv = document.getElementById("gameHolder");
// Hide the game initially
gameDiv.classList.add("hidden");

// Add event listener to start game button
document.getElementById("startGameBtn").addEventListener("click", function () {
  InitiliazeGame(
    "🎉 Looting Please Wait . . .!",
    "Congragulations You Won! 😃",
    "Better Luck Next Time! 😟"
  );
});

// function used to initialize game
function InitiliazeGame(waitingText, winText, loseText) {
  // Hide the start button and unhide the game
  gameDiv.classList.remove("hidden");
  document.getElementById("startGameBtnHolder").classList.add("hidden");

  // create a new instance of gameOutCome Class
  const gameOutCome = new GameOutCome(winText, loseText);

  document.getElementById("plsWait").textContent = waitingText;

  // Gift icon to click and start the game
  const box = document.getElementById("box");

  // Add the event listener
  box.addEventListener("click", handleClick);

  // Hide the gift box and Next section
  document.getElementById("gift-box").classList.add("hidden");
  document.getElementById("continueSection").classList.add("hidden");

  // function called when you click on box.
  async function handleClick() {
    // Remove the event listener
    box.removeEventListener("click", handleClick);

    // Replace with dynamic retrieval if needed
    const token = "22aa99d8c8aba6fd3866766f33b6d8146e3892ec";

    box.classList.toggle("open");

    // Send the required API Parameters. I am testing it with default values
    const requestData = {
      userIdentifier: "abc123",
      promoId: 613,
      fixtureId: 14486,
    };

    const response = await getData(token, requestData);

    // Add a 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Send the response on game intialization
    gameOutCome.ShowResultText(response);
  }
}

// function to get API response regarding game out come.
async function getData(token, requestData) {
  const url = `https://mp-staging.co.uk/master/api/rewards/api/rewards/${requestData.userIdentifier}/${requestData.promoId}/${requestData.fixtureId}/22aa99d8c8aba6fd3866766f33b6d8146e3892ec`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Userid: 1,
        Apikey: "EUvvT*7_9J!VS4-99mE%$K6x$Qk",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return error.message;
  }
}

// Use this function to add the call to Continue Button
export const continueBtnHandler = (callback) => {
  document.getElementById("nextBtn").addEventListener("click", callback);
};
