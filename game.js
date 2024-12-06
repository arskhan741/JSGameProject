// game.js

import { animateGiftBox } from "./giftAnimation.js";

export class GameOutCome {
  constructor(wintext, loseText) {
    this.wintext = wintext;
    this.loseText = loseText;
  }

  ShowResultText(response) {
    console.log(`response = ${response.reward_name}`);

    //response.success = 0;

    if (response.success === 1) {
      // WINNER, Play Box opening animation
      this.showTextResponse(this.wintext);
      this.setButtonStatus("Next", response);
    } else {
      // NOT A WINNER, show lose text
      this.showTextResponse(this.loseText);
      this.setButtonStatus("Try Again", response);
    }
  }

  // Show text based on API Response
  showTextResponse(msg) {
    const textBox = document.getElementById("reward_detail");
    const lootBox = document.getElementById("loot");

    lootBox.textContent = "";
    textBox.textContent = msg;
    lootBox.appendChild(textBox);
  }

  // Button settings according to API Response
  setButtonStatus(btnText, response) {
    const continueBtn = document.getElementById("continue_Btn");

    continueBtn.classList.remove("hidden");
    continueBtn.textContent = btnText;

    if (btnText === "Try Again") {
      continueBtn.addEventListener("click", () => {
        location.reload();
      });
    } else {
      continueBtn.addEventListener("click", () => {
        // Play the animation
        animateGiftBox(response);

        continueBtn.classList.remove("hidden");
        document.getElementById("initial_box").classList.add("hidden");
      });
    }
  }
}
