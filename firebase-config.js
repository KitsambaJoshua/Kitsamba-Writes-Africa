// Firebase configuration for Kitsamba Writes Africa
// Public client-side settings. Never put service-account private keys here.
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyB1ahoK14-qgqFzqd2szzMGCgqK_o0k1GE",
  authDomain: "kitsamba-writes-ug-2026.firebaseapp.com",
  projectId: "kitsamba-writes-ug-2026",
  storageBucket: "kitsamba-writes-ug-2026.firebasestorage.app",
  messagingSenderId: "426323932964",
  appId: "1:426323932964:web:f60a57659c219eb03be5b1",
  measurementId: "G-E51BKWGZHW"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
