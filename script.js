// Simple animation for progress bar
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.querySelector(".progress-bar");
  setTimeout(() => {
    progressBar.style.width = "60%";
  }, 300);
});
