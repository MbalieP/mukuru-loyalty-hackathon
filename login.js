const MAX_ATTEMPTS = 5;
let attemptCount = 0;

const form = document.getElementById("loginForm");
const error = document.getElementById("error");

// Password constraints
function isValidPassword(password) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
}

// Cellphone validation
function isValidCellphone(cell) {
    const regex = /^0\d{9}$/;
    return regex.test(cell);
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (attemptCount >= MAX_ATTEMPTS) {
        error.textContent = "🚫 Maximum login attempts reached. Please try later.";
        return;
    }

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const cellphone = document.getElementById("cellphone").value;

    if (!isValidPassword(password)) {
        error.textContent = "Password must be 8+ chars, include number & special char.";
        return;
    }

    if (!isValidCellphone(cellphone)) {
        error.textContent = "Cellphone must be 10 digits and start with 0.";
        return;
    }

    // Send login attempt to Python backend
    try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, cellphone })
        });

        const data = await response.json();

        if (data.status === "success") {
            alert(`✅ Welcome ${username}!`);
            attemptCount = 0;
            window.location.href = "landingpage.html";
        } else if (data.status === "suspicious") {
            error.textContent = "⚠️ Suspicious login detected! Admin notified.";
            attemptCount = 0; // reset attempts after anomaly
        } else {
            attemptCount++;
            error.textContent = `Invalid login. Attempts left: ${data.attempts_left}`;
        }
    } catch (error) {
        error.textContent = "Can't connect to the server.";
    }
});
