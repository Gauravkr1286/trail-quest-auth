// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUV-8E2w3Td_TyYo52LAvhb2WA9CnVaLY",
  authDomain: "trial-quest-45442.firebaseapp.com",
  projectId: "trial-quest-45442",
  storageBucket: "trial-quest-45442.appspot.com",
  messagingSenderId: "780796401639",
  appId: "1:780796401639:web:b3bfb178ff7450ac3c0f42",
  measurementId: "G-MC6VBKFG01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Show message utility
function showMessage(message, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = message;
    element.style.color = message.includes("success") ? "green" : "red";
    element.style.display = "block";
  } else {
    console.warn(`Element "${elementId}" not found.`);
  }
}

// Sign Up logic
const signUp = document.getElementById("submitSignUp");
signUp?.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = { email, firstName, lastName };
    await setDoc(doc(db, "users", user.uid), userData);
    showMessage("✅ Account created successfully!", "signUpMessage");
    window.location.href = "index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("❌ Email already in use!", "signUpMessage");
    } else {
      showMessage("❌ Signup failed: " + error.message, "signUpMessage");
    }
  }
});

// Sign In logic
const signIn = document.getElementById("submitSignIn");
signIn?.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("✅ Login successful!", "signInMessage");
    window.location.href = "homepage.html";
  } catch (error) {
    if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
      showMessage("❌ Incorrect email or password", "signInMessage");
    } else {
      showMessage("❌ Login failed: " + error.message, "signInMessage");
    }
  }
});
