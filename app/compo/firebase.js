// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Phone Auth with reCAPTCHA
const setupRecaptcha = (container) => {
  const recaptchaVerifier = new RecaptchaVerifier(container, {
    size: "invisible",  // You can also use 'normal' for visible reCAPTCHA
    callback: (response) => {
      console.log("reCAPTCHA verified:", response);
    },
  }, auth);
  return recaptchaVerifier;
};

// Ensure analytics only runs in the browser
const analytics = typeof window !== "undefined" ? await isSupported().then((yes) => (yes ? getAnalytics(app) : null)) : null;

// Export Firebase utilities and configurations
export { app, auth, db, storage, analytics, googleProvider, signInWithPopup, signInWithPhoneNumber, setupRecaptcha };
