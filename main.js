  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-app.js";
  import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-auth.js";

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
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();

  const googleSignIn = document.getElementById("google-btn");
  googleSignIn.addEventListener('click',()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href = "landingpage.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });})