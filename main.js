import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/12.2.0/firebase-auth.js";

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
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size':'invisible' }, auth);
window.recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
});

sendCodeBtn.addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = window.recaptchaVerifier;

  if (!/^0\d{9}$/.test(phoneNumber)) {
    error.textContent = "Invalid phone number!";
    return;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, "+27" + phoneNumber.slice(1), appVerifier);
    window.confirmationResult = confirmationResult;
    document.getElementById('verification-section').style.display = 'block';
    error.textContent = "✅ Code sent!";
  } catch (err) {
    console.error(err);
    error.textContent = err.message;
  }
});

verifyCodeBtn.addEventListener('click', async () => {
  const code = document.getElementById('verificationCode').value;
  try {
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;
    console.log("Phone login successful:", user);

    if (isQuizDay()) {
      window.location.href = "quiz.html";
    } else {
      window.location.href = "landingpage.html";
    }
  } catch (err) {
    error.textContent = "Invalid code!";
  }
});
