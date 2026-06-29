// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

window.signOut = signOut;

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCgO3cahh5Q0DxETWMxAZhDB8-kGnXW93U",
  authDomain: "caffeine-care.firebaseapp.com",
  projectId: "caffeine-care",
  storageBucket: "caffeine-care.firebasestorage.app",
  messagingSenderId: "579804259480",
  appId: "1:579804259480:web:7382cf3d4347a5961c9ced",
  measurementId: "G-ENXCYBD1SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// ทำให้ไฟล์อื่นเรียกใช้ได้
window.auth = auth;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.sendPasswordResetEmail = sendPasswordResetEmail;
window.onAuthStateChanged = onAuthStateChanged;

console.log("Firebase Connected ✅");
