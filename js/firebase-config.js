/**
 * Digital Grampanchayat - Firebase Configuration & Initialization
 * 
 * Replace the values in `firebaseConfig` below with your actual Firebase project settings
 * obtained from the Firebase Console (https://console.firebase.google.com).
 * 
 * If you do not have Firebase credentials ready yet, the system automatically runs
 * in seamless "Local Cloud Simulation Mode" with full CRUD persistence,
 * allowing instant demonstration for mini-project evaluations!
 */

const firebaseConfig = {
  apiKey: "AIzaSyDEMO-KEY-REPLACE-WITH-YOUR-KEY",
  authDomain: "digital-grampanchayat-demo.firebaseapp.com",
  projectId: "digital-grampanchayat-demo",
  storageBucket: "digital-grampanchayat-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Check if Firebase keys are real or placeholder
const isFirebasePlaceholder = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("DEMO-KEY");

let fbApp = null;
let fbAuth = null;
let fbFirestore = null;
let fbStorage = null;

try {
  if (typeof firebase !== 'undefined' && !isFirebasePlaceholder) {
    fbApp = firebase.initializeApp(firebaseConfig);
    fbAuth = firebase.auth();
    fbFirestore = firebase.firestore();
    fbStorage = firebase.storage();
    console.log("✅ Firebase initialized successfully in LIVE cloud mode.");
  } else {
    console.log("ℹ️ Running in Local High-Fidelity Simulation Mode. Ready for evaluation & demos.");
  }
} catch (e) {
  console.warn("⚠️ Firebase live init failed or using fallback:", e.message);
}

window.FIREBASE_READY = Boolean(fbApp && !isFirebasePlaceholder);
window.fbAuth = fbAuth;
window.fbFirestore = fbFirestore;
window.fbStorage = fbStorage;
