// game.js

import { getAPIResponse } from "./APIresponse.js";

//==================================== Game Initialization ======================================//

export class GameInitializer {
  constructor(
    waitingText,
    winText,
    loseText,
    gameDivElementName,
    gameContinueEvent
  ) {
    this.waitingText = waitingText;
    this.winText = winText;
    this.loseText = loseText;
    this.gameDivElementName = gameDivElementName;
    this.gameContinueEvent = gameContinueEvent;

    this.gameOutCome = new GameOutCome(winText, loseText, gameContinueEvent);
    this.box = null;
    this.responseCalledOnce = false;
    this.gameDivElement = null;
  }

  initialize() {
    // Find the Game div element
    this.gameDivElement = document.getElementById(this.gameDivElementName);

    if (!this.gameDivElement) {
      // If element with ID "this.gameDivElementName" is not found, try to get it by class
      this.gameDivElement = document.getElementsByClassName(
        this.gameDivElementName
      )[0];
    }

    if (!this.gameDivElement) {
      // If still null, log an error
      console.error("Game div not found. Please check the name.");
      return;
    }

    // Hide the start button and unhide the game
    document.getElementById("startGameBtnHolder")?.classList.add("hidden");

    // Add HTML and styles dynamically
    this.addHTMLToDivElement();
    this.addStyles();

    // Assign waiting text
    document.getElementById("plsWait").textContent = this.waitingText;

    // Get the gift box element
    this.box = document.getElementById("box");

    // Add event listener to the box
    this.box.addEventListener("click", this.handleBoxClick.bind(this));

    // Hide additional UI elements
    document.getElementById("gift-box").classList.add("hidden");
    document.getElementById("continueSection").classList.add("hidden");

    // Add Event listener to Claim rewards/Next button
    const nextBtn = this.gameDivElement.querySelector("#nextBtn");
    nextBtn.addEventListener("click", this.gameContinueEvent);
  }

  addHTMLToDivElement() {
    if (!this.gameDivElement) {
      console.error("Provided gameDivElement is null or undefined.");
      return;
    }

    this.gameDivElement.innerHTML = `
        <div class="Game" id="gameHolder">
          <div class="container" id="initial_box">
            <div class="box" id="box">
              <div class="front">🎁</div>
              <div class="back" id="loot">
                <div id="plsWait">🎉 Looting Please Wait . . .!</div>
                <div id="reward_detail"></div>
              </div>
              <div class="left"></div>
              <div class="right"></div>
              <div class="top"></div>
              <div class="bottom"></div>
              <div id="btnHolder">
                <button id="continue_Btn" class="hidden">Continue</button>
              </div>
            </div>
          </div>
          <div id="giftSection" class="giftContainer hidden">
            <div id="rewardDetails" class="hidden">
              <div id="rewardName"></div>
            </div>
            <br />
            <div class="app">
              <div class="img-container" id="gift-box">
                <img class="kuku" src="https://www.mp-staging.co.uk/master/booking/images/jump-character.png" alt="kuku" />
                <button class="box1" id="animateButton">
                  <img src="https://www.mp-staging.co.uk/master/booking/images/box.png" alt="box" />
                </button>
                <img class="lid" id="boxLid" src="https://www.mp-staging.co.uk/master/booking/images/box-lid.png" alt="box-lid" />
              </div>
              <div id="confetti"></div>
            </div>
            <div id="continueSection">
              <div id="continueText">
                <br />
                <button id="nextBtn">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
  }

  addStyles() {
    const style = document.createElement("style");
    style.textContent = `
          

  #plsWait {
    color: #4682b4;
    word-wrap: break-word;
    white-space: normal;
    text-align: left;
    font-size: large;
    /* background: red; */
    width: 120px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .box {
    width: 150px;
    height: 150px;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    cursor: pointer;
    /* Centering */
    transform: translate(-50%, -50%);
    position: absolute;
    top: 45%;
    left: 50%;
  }

  #btnHolder {
    top: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    /* background: red; */
  }

  #continue_Btn {
    transform: scaleX(-1);
    position: relative;
    scale: 1.2;
    background: #e3ffcc;
    border-radius: 15px;
  }

  #continue_Btn {
    cursor: pointer;
  }

  .front,
  .back,
  .left,
  .right,
  .top,
  .bottom {
    position: absolute;
    width: 150px;
    height: 150px;
    background: #8b4513;
    border: 2px solid #654321;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    scale: 1.25;
  }

  .front {
    background: #d2b48c;
    transform: translateZ(75px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
  }

  .back {
    background: #deb887;
    transform: rotateY(180deg) translateZ(75px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    opacity: 0;
    transform-origin: center;
  }

  .left {
    transform: rotateY(90deg) translateZ(75px);
  }

  .right {
    transform: rotateY(-90deg) translateZ(75px);
  }

  .top {
    transform: rotateX(-90deg) translateZ(75px);
  }

  .bottom {
    transform: rotateX(90deg) translateZ(75px);
  }

  .box.open {
    transform: rotateX(0deg) rotateY(180deg) translate(50%, -50%);
  }

  .box.open .back {
    opacity: 1;
  }

  #reward_detail {
    color: #4682b4;
    word-wrap: break-word;
    white-space: normal;
    width: fit-content;
    scale: 75%;
  }

  .hidden {
    display: none !important;
  }

  /* =================Gift box animation Start================= */

  .app {
    font-family: sans-serif;
    text-align: center;
    position: relative;
    height: 100vh;
  }

  .img-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -79%);
  }

  .box1 {
    background: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
  }

  .kuku {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
    z-index: -1;
  }

  .lid {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 5.8em;
    transition: transform 2s;
  }

  .jump {
    animation: jump 1s infinite alternate;
  }

  .rotated {
    transform: rotate(145deg) translate(-70%, -170px);
  }

  @keyframes wiggle {
    10%,
    90% {
      transform: translate(-50%) translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate(-50%) translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate(-50%) translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate(-50%) translate3d(4px, 0, 0);
    }
  }

  @keyframes jump {
    from {
      bottom: 0;
    }
    to {
      bottom: 10em;
    }
  }

  @keyframes lidJump {
    0% {
      transform: rotate(0deg) translateY(0);
    }
    30% {
      transform: rotate(10deg) translateY(-10px);
    }
    60% {
      transform: rotate(-5deg) translateY(5px);
    }
    100% {
      transform: rotate(0deg) translateY(0);
    }
  }

  /* =================Gift box animation END================= */

  .giftContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 400px;
    max-width: 400px;
  }

  #rewardName {
    text-align: center;
    font-weight: bold;
    font-size: larger;
    margin-top: 8%;
  }

  #gift-box {
    margin-left: 80px;
    margin-top: 10%;
  }

  #continueText {
    text-align: center;
    font-size: x-large;
    margin-top: -15%;
  }

  #nextBtn {
    scale: 150%;
    background: #deccff;
    border: 1px solid black;
    border-radius: 15px;
    margin-top: 8%;
  }

  #nextBtn:hover {
    cursor: pointer;
  }

  /* =================New Requirment Initialize Game================= */

  .Game {
    display: flex;
    justify-content: center;
  }

  #startGameBtn {
    scale: 150%;
    background: #deccff;
    border: 1px solid black;
    border-radius: 15px;
  }

  #startGameBtnHolder {
    width: 100%;
    display: flex;
    justify-content: center;
    /* background-color: red; */
  }

  #startGameBtn:hover {
    cursor: pointer;
  }`;
    document.head.appendChild(style);
  }

  async handleBoxClick() {
    if (this.responseCalledOnce) {
      return;
    }

    this.responseCalledOnce = true;

    // Remove the click event listener to prevent duplicate clicks
    this.box.removeEventListener("click", this.handleBoxClick.bind(this));

    // Replace with dynamic retrieval if needed
    this.box.classList.toggle("open");

    const response = await getAPIResponse();

    // Add a delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show game outcome based on response
    this.gameOutCome.ShowResultText(response);
  }
}

//==================================== Game out come class ======================================//
export class GameOutCome {
  constructor(wintext, loseText, gameContinueEvent) {
    this.wintext = wintext;
    this.loseText = loseText;
    this.gameContinueEvent = gameContinueEvent;
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

//==================================== Gift Animation ======================================//

const animateGiftBox = (response) => {
  const boxLid = document.getElementById("boxLid");
  const kuku = document.querySelector(".kuku");
  const confettiContainer = document.getElementById("confetti");

  // Unhide the Gift Box
  document.getElementById("gift-box").classList.remove("hidden");
  document.getElementById("giftSection").classList.remove("hidden");

  let isAnimating = false;

  // Prevent multiple animations from running simultaneously.
  if (isAnimating) return;

  isAnimating = true;

  // Reset the lid to its closed position is closed initially
  boxLid.classList.remove("rotated");

  // Small delay to ensure reset happens before animation starts
  setTimeout(() => {
    boxLid.classList.toggle("rotated");
    kuku.classList.add("jump");
  }, 50);

  // Reset the animation state after a timeout
  setTimeout(() => {
    kuku.classList.remove("jump"); // Keep the lid open
    isAnimating = false; // Allow further calls to animateGiftBox

    // Show Continue section
    document.getElementById("continueSection").classList.remove("hidden");

    // Show Reward section
    document.getElementById("rewardDetails").classList.remove("hidden");

    // Update won reward name
    document.getElementById(
      "rewardName"
    ).textContent = `You Won: ${response.reward_name}`;

    // Show Reward section
    const continueTextDiv = document.getElementById("continueText");

    // Clear previous text while keeping the button
    continueTextDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        continueTextDiv.removeChild(node);
      }
    });

    // Create a new text node with the reward detail
    const newText = document.createTextNode(response.reward_detail);
    continueTextDiv.insertBefore(newText, continueTextDiv.firstChild);
  }, 2000); // Adjust timing to fit your animation length
};

//==================================== Gift Animation End ======================================//
