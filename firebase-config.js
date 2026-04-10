// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQiHqUEdUhkdhdTuEFNl_OTQTy1",
  authDomain: "supermart-7d701.firebaseapp.com",
  projectId: "supermart-7d701",
  storageBucket: "supermart-7d701.appspot.com",
  messagingSenderId: "707741186924",
  appId: "1:707741186924:web:bf88b32e140908dsb5bc9",
  measurementId: "G-MLF957Q7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
