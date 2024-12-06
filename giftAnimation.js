import { continueBtnHandler } from "./index.js";

export const animateGiftBox = (response) => {
  const boxLid = document.getElementById("boxLid");
  const kuku = document.querySelector(".kuku");
  const confettiContainer = document.getElementById("confetti");

  // Unhide the Gift Box
  document.getElementById("gift-box").classList.remove("hidden");
  document.getElementById("giftSection").classList.remove("hidden");

  let isAnimating = false;

  // Prevent multiple animations from running simultaneously
  if (isAnimating) return;

  isAnimating = true;

  // Reset the lid to its closed position is closed initially
  boxLid.classList.remove("rotated");

  // Set a slight timeout before starting the animation for a better effect
  setTimeout(() => {
    boxLid.classList.toggle("rotated");
    kuku.classList.add("jump");
  }, 50); // Small delay to ensure reset happens before animation starts

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

    // Replace the method here for continue button
    continueBtnHandler(() => {
      console.log(`Continue Button Test`);
    });
  }, 2000); // Adjust timing to fit your animation length
};
