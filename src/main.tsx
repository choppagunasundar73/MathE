import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ChallengeProvider } from './context/ChallengeContext';
import { initializeChallenge } from './firebase/initializeChallenge';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Initialize challenges in Firestore after authentication - but only once
let challengesInitialized = false;
onAuthStateChanged(auth, (user) => {
  if (user && !challengesInitialized) {
    // User is signed in, initialize challenges
    challengesInitialized = true; // Set flag to prevent multiple initializations
    initializeChallenge()
      .then(challengeIds => {
        console.log('Initialized challenges with IDs:', challengeIds);
      })
      .catch(error => {
        console.error('Failed to initialize challenges:', error);
        challengesInitialized = false; // Reset flag if initialization fails
      });
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChallengeProvider>
        <App />
      </ChallengeProvider>
    </AuthProvider>
  </StrictMode>
);
