import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './config';
import { FirebaseError } from '../types/firebase-error';

// Sign in with Google
export const signInWithGoogle = async () => {
  console.log('Starting Google sign-in process...');
  try {
    // Log that we're configuring the provider
    console.log('Configured Google provider, initiating popup...');
    
    // Add prompt parameter to force account selection
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful!');
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    if (typeof error === 'object' && error !== null && 'code' in firebaseError) {
      console.error('Firebase Auth Error:', firebaseError.code, firebaseError.message);
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        return { user: null, error: 'Popup closed by user.' };
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        return { user: null, error: 'Popup already opened.' };
      } else if (firebaseError.code === 'auth/operation-not-allowed') {
        return { user: null, error: 'Email/password accounts not enabled.' };
      } else {
        return { user: null, error: firebaseError.message };
      }
    } else {
      console.error('Unknown error during sign-in:', error);
      return { user: null, error: 'An unknown error occurred during sign-in.' };
    }
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

// Listen to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};