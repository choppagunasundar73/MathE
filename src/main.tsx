import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ChallengeProvider } from './context/ChallengeContext';
import { initializeChallenge } from './firebase/initializeChallenge';

// Initialize challenges in Firestore
initializeChallenge()
  .then(challengeIds => {
    console.log('Initialized challenges with IDs:', challengeIds);
  })
  .catch(error => {
    console.error('Failed to initialize challenges:', error);
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
