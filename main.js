console.log("main.js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-app.js";
        import { 
        getAuth, 
        GoogleAuthProvider, 
        signInWithPopup, 
        signInWithPhoneNumber,
        RecaptchaVerifier
        } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-auth.js"


document.addEventListener("DOMContentLoaded", () => {
        ;

        // Firebase config
        const firebaseConfig = {
        apiKey: "AIzaSyDDnLnqwQ2HCB2xAkDMmhRcjgPmxw9Z5Kw",
        authDomain: "login-cb1a0.firebaseapp.com",
        projectId: "login-cb1a0",
        storageBucket: "login-cb1a0.firebasestorage.app",
        messagingSenderId: "839787955416",
        appId: "1:839787955416:web:7390a18d448aadf34483ad"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        auth.languageCode = 'en';
        const provider = new GoogleAuthProvider();

        const googleBtn = document.getElementById("google-btn");
        const error = document.getElementById("error");
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        const verifyCodeBtn = document.getElementById('verifyCodeBtn');

        console.log("googleBtn:", googleBtn);
        console.log("sendCodeBtn:", sendCodeBtn);
        console.log("verifyCodeBtn:", verifyCodeBtn);


        // -------- Helper: Check if today is the 29th --------
        function isQuizDay() {
        const today = new Date();
        return today.getDate() === 29;
        }

        // -------- Google Login --------
        googleBtn.addEventListener("click", () => {
        signInWithPopup(auth, provider)
        .then((result) => {
        const user = result.user;
        console.log("Google user:", user);

        // Redirect
        if (isQuizDay()) {
        window.location.href = "quiz.html";
        } else {
        window.location.href = "landingpage.html";
        }
        })
        .catch((err) => {
        console.error(err);
        error.textContent = err.message;
        });
        });

// -------- Phone Login --------
window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
  'recaptcha-container',   // must match your <div id="recaptcha-container"></div>
  {
    size: 'normal',
    callback: (response) => {
      console.log("reCAPTCHA solved:", response);
    }
  },

);
window.recaptchaVerifier.render().then(widgetId => {
  console.log("reCAPTCHA widget ID:", widgetId);
});


sendCodeBtn.addEventListener('click', async () => {
   
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const appVerifier = window.recaptchaVerifier;

  if (!/^0\d{9}$/.test(phoneNumber)) {
    error.textContent = "❌ Invalid phone number!";
    return;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      "+27" + phoneNumber.slice(1),  // e.g. 0812345678 → +27812345678
      appVerifier
    );
    
    console.log("SMS sent");
    window.confirmationResult = confirmationResult;
    document.getElementById('verification-section').style.display = 'block';
    error.textContent = "✅ Code sent! Check SMS.";
  } catch (err) {
    console.error(err);
    error.textContent = "Error: " + err.message;
  }
});

verifyCodeBtn.addEventListener('click', async () => {
  const code = document.getElementById('verificationCode').value.trim();
  try {
    const result = await window.confirmationResult.confirm(code);
    console.log("Phone login successful", result.user);

    // Redirect based on date
    if (isQuizDay()) {
      window.location.href = "quiz.html";
    } else {
      window.location.href = "landingpage.html";
    }
  } catch (err) {
    console.error(err);
    error.textContent = "❌ Invalid code!";
  }
});
})
