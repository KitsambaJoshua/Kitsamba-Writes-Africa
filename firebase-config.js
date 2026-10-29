// Firebase configuration for Kitsamba Writes Africa
// Public client-side settings. Never put service-account private keys here.
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app-check.js";
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
// Initialize App Check before Firebase services. This is the public reCAPTCHA site key.
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6LdvpAUuAAAAAJviR9KkiD_dc3Uz9XYBIfD-UAhc"),
  isTokenAutoRefreshEnabled: true
});
export const auth = getAuth(app);
export const db = getFirestore(app);
