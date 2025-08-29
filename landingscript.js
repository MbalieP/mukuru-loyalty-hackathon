document.addEventListener("DOMContentLoaded", function () {
  // Progress ring animation
  const currentPoints = 300;
  const maxPoints = 500;
  const percentage = (currentPoints / maxPoints) * 100;
  const progressCircle = document.getElementById("progressCircle");
  const pointsText = document.getElementById("pointsText");
  const progressPercentage = document.getElementById("progressPercentage");

  // Animate the progress ring
  setTimeout(() => {
    progressCircle.style.transform = `rotate(${percentage * 3.6}deg)`;
    pointsText.textContent = currentPoints;
    progressPercentage.textContent = `${Math.round(percentage)}% complete`;
  }, 300);

  // Dashboard → scroll to top
  document.getElementById("dashboard").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Send Money → go to sendmoneypage.html
  document.getElementById("send-money").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "sendmoneypage.html";
  });

  // Rewards → go to rewards.html
  document.getElementById("view-rewards").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "rewards.html";
  });

  document.getElementById("explore-statuses").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "statuses.html";
  });

  // Transaction History → scroll to bottom
  document.getElementById("history").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  // Send Money → go to sendmoneypage.html
  document.getElementById("send-now").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "sendmoneypage.html";
  });
});
