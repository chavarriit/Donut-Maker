let donutCount = 0;
let autoClickerCount = 0;
let autoClickerCost = 100;

const infoDisplay = document.getElementById("info");
const autoClickerDisplay = document.getElementById("auto-clicker-info");
const donutButton = document.getElementById("donut-button");
const autoClickerButton = document.getElementById("auto-clicker-button");
const resetButton = document.getElementById("reset-button");

let autoClickerInterval;

// Function to format large numbers
function formatNumber(num) {
  return num.toLocaleString();
}

// Update Donut Display when called
function updateDonutDisplay() {
  infoDisplay.textContent = `Donuts: ${formatNumber(donutCount)}`;
}

// Update Auto Clicker Display when called
function updateAutoClickerDisplay() {
  autoClickerDisplay.textContent = `Auto Clickers: ${autoClickerCount} (Cost: ${formatNumber(autoClickerCost)} donuts)`;
}

// Update the Button states when called
function updateButtonStates() {
  autoClickerButton.disabled = donutCount < autoClickerCost;
}

// Add a Donut when button clicked
donutButton.addEventListener("click", () => {
  donutCount += 1;
  updateDonutDisplay();
  updateButtonStates();
});

// Purchase Auto Clicker when button clicked
autoClickerButton.addEventListener("click", () => {
  if (donutCount >= autoClickerCost) {
    donutCount -= autoClickerCost;
    autoClickerCount += 1;
    autoClickerCost = Math.floor(autoClickerCost * 1.1); // Increase cost by 10%
    updateAutoClickerDisplay();
    updateDonutDisplay();
    updateButtonStates();
  }
});

// Activate the auto clickers every 1 second
function activateAutoClickers() {
  if (autoClickerInterval) clearInterval(autoClickerInterval);
  autoClickerInterval = setInterval(() => {
    donutCount += autoClickerCount;
    updateDonutDisplay();
    updateButtonStates();
  }, 1000);
}

// Reset game when reset button is clicked
resetButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset the game?")) {
    donutCount = 0;
    autoClickerCount = 0;
    autoClickerCost = 100;
    updateDonutDisplay();
    updateAutoClickerDisplay();
    updateButtonStates();
    saveGame(); // Ensure the reset state is saved
  }
});

// Save and load game state
function saveGame() {
  localStorage.setItem('donutCount', donutCount);
  localStorage.setItem('autoClickerCount', autoClickerCount);
  localStorage.setItem('autoClickerCost', autoClickerCost);
}

function loadGame() {
  donutCount = parseInt(localStorage.getItem('donutCount')) || 0;
  autoClickerCount = parseInt(localStorage.getItem('autoClickerCount')) || 0;
  autoClickerCost = parseInt(localStorage.getItem('autoClickerCost')) || 100;
  updateDonutDisplay();
  updateAutoClickerDisplay();
  updateButtonStates();
}

// Initialize Game when page is loaded
window.addEventListener('load', () => {
  loadGame();
  activateAutoClickers();
});

// Save the game state before the page unloads
window.addEventListener('beforeunload', saveGame);

// Save the game automatically every 30 seconds
setInterval(saveGame, 30000);