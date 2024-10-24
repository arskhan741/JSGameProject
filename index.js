import { GameOutCome } from "./game.js";

//console.log(`cookie = ${document.cookie}`);

const gameOutCome = new GameOutCome();
const box = document.getElementById("box");

// Hide the gift box and Next section
document.getElementById("gift-box").classList.add("hidden");
document.getElementById("continueSection").classList.add("hidden");

async function getData(token, requestData) {
  const url = `https://mp-staging.co.uk/master/api/rewards/api/rewards/${requestData.userIdentifier}/${requestData.promoId}/${requestData.fixtureId}/22aa99d8c8aba6fd3866766f33b6d8146e3892ec`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Userid: 1,
        Apikey: "EUvvT*7_9J!VS4-99mE%$K6x$Qk",
        // "Authorization": `Bearer ${token}`, // If applicable
        //"api.url": url,
        // "api.userId": "sbFULeNZAr24",
        // "api.key": "EUvvT*7_9J!VS4-99mE%$K6x$Qk",
        // "api.partyId": "abc123",
        // "api.promoId": "613",
        // "api.fixtureId": 14486,
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

const handleClick = async () => {
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

  gameOutCome.ShowResultText(response);
};

// Add the event listener
box.addEventListener("click", handleClick);

// Use this function to add the call to Continue Button
export const continueBtnHandler = (callback) => {
  document.getElementById("nextBtn").addEventListener("click", callback);
};
