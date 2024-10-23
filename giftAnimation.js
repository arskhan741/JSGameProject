export const animateGiftBox = (response) => {
  const boxLid = document.getElementById("boxLid");
  const kuku = document.querySelector(".kuku");
  const confettiContainer = document.getElementById("confetti");

  // Show the gift box initially if it was hidden
  document.getElementById("gift-box").classList.remove("hidden");

  let isAnimating = false;

  // Prevent multiple animations from running simultaneously
  if (isAnimating) return;

  isAnimating = true;
  boxLid.classList.add("rotated");
  kuku.classList.add("jump");

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
