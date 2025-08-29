// Simple animation for progress bar
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.querySelector(".progress-bar");
  setTimeout(() => {
    progressBar.style.width = "60%";
  }, 300);
});

document.addEventListener("DOMContentLoaded", () => {
  // Dashboard → scroll to top
  document.getElementById("dashboard").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

//   document.addEventListener("DOMContentLoaded", function () {
//     // progressbar animation
//   const progressBar = document.querySelector(".progress-bar");
//   setTimeout(() => {
//     progressBar.style.width = "60%";
//   }, 300);
// })
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
