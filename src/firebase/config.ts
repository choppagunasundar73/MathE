// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkeUCRBzMdDN62w7CwI6IDSVw-q4fDcIs",
  authDomain: "mathe-6947e.firebaseapp.com",
  projectId: "mathe-6947e",
  storageBucket: "mathe-6947e.appspot.com",
  messagingSenderId: "851796651527",
  appId: "1:851796651527:web:c73a2e7b2818928eec84a2",
  measurementId: "G-FXGVPNELPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add scopes for Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Initialize Firestore
const db = getFirestore(app);

export { auth, googleProvider, db };