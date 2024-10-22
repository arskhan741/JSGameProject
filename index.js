import { GameOutCome } from "./game.js";

const gameOutCome = new GameOutCome();
const box = document.getElementById("box");

// Hide the gift box and Next section
document.getElementById("gift-box").classList.add("hidden");
document.getElementById("continueSection").classList.add("hidden");

async function getData(token) {
  const url =
    "https://mp-staging.co.uk/master/api/rewards/api/rewards/abc123/613/14486/22aa99d8c8aba6fd3866766f33b6d8146e3892ec";

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
    console.error("Error:", error); // More detailed logging
    return error.message;
  }
}

const handleClick = async () => {
  box.removeEventListener("click", handleClick); // Remove the event listener

  const token = "22aa99d8c8aba6fd3866766f33b6d8146e3892ec"; // Replace with dynamic retrieval if needed

  box.classList.toggle("open");

  const response = await getData(token);

  console.log(response);

  // console.log(`response = ${response.reward_name}`);

  gameOutCome.ShowResultText(response);
};

box.addEventListener("click", handleClick); // Add the event listener
