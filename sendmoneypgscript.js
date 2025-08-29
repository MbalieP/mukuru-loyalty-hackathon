document.addEventListener("DOMContentLoaded", () => {
  // Dashboard → go to landingpage.html
  document.getElementById("home").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "landingpage.html";
  });

  document.getElementById("explore-statuses").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "statuses.html";
  });

  // Transaction History → scroll to bottom
  document.getElementById("history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "landingpage.html";
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

  // Send Money → go to sendmoneypage.html
  document.getElementById("send-now").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "sendmoneypage.html";
  });
});

// Current user balance (in Rands)
const userBalance = 2450.0;
let currentPoints = 300;

// Get form and UI elements
const form = document.getElementById("sendMoneyForm");
const amountInput = document.getElementById("amount");
const plane = document.getElementById("plane");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const successRecipient = document.getElementById("successRecipient");
const successAmount = document.getElementById("successAmount");
const pointsEarned = document.getElementById("pointsEarned");
const errorDetails = document.getElementById("errorDetails");
const sendButton = document.getElementById("sendButton");

// Function to animate the plane around the world
function animateTransaction() {
  plane.style.transition = "none";
  plane.style.transform = "translate(-50%, -50%) rotate(0deg)";

  setTimeout(() => {
    plane.style.transition = "transform 5s linear";
    plane.style.transform = "translate(-50%, -50%) rotate(360deg)";
  }, 100);
}

// Function to calculate points earned (1 point per R100)
function calculatePoints(amount) {
  return Math.floor(amount / 100);
}

// Function to reset the form
function resetForm() {
  form.reset();
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
  plane.style.transform = "translate(-50%, -50%)";
  sendButton.disabled = false;
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const recipientName = document.getElementById("recipientName").value;
  const amount = parseFloat(amountInput.value);

  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    errorDetails.textContent = "Please enter a valid amount.";
    errorMessage.style.display = "block";
    successMessage.style.display = "none";
    return;
  }

  // Check if user has sufficient balance
  if (amount > userBalance) {
    errorDetails.textContent =
      "Insufficient balance to complete this transaction.";
    errorMessage.style.display = "block";
    successMessage.style.display = "none";
    return;
  }

  // Disable send button during processing
  sendButton.disabled = true;

  // Animate the transaction
  animateTransaction();

  // Calculate points earned
  const earnedPoints = calculatePoints(amount);
  currentPoints += earnedPoints;

  // Show success message after animation
  setTimeout(() => {
    successRecipient.textContent = recipientName;
    successAmount.textContent = "R " + amount.toFixed(2);
    pointsEarned.textContent =
      "Earned " + earnedPoints + " points! Total: " + currentPoints + " points";

    successMessage.style.display = "block";
    errorMessage.style.display = "none";
  }, 5000);

  
});

