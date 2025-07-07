import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './config';

// Sign in with Google
export const signInWithGoogle = async () => {
  console.log('Starting Google sign-in process...');
  try {
    // Log that we're configuring the provider
    console.log('Configured Google provider, initiating popup...');
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful!');
    return { user: result.user, error: null };
  } catch (error: any) {
    // Enhanced error logging
    console.error('Popup error details: ');
    console.error(`- Code: ${error.code}`);
    console.error(`- Message: ${error.message}`);
    
    // Check for specific error types
    if (error.code === 'auth/popup-blocked') {
      console.error('The popup was blocked by the browser. Please allow popups for this site.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      console.error('The popup was closed by the user before completing the sign-in.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      console.error('Multiple popup requests were triggered. Only the latest one will be processed.');
    } else if (error.code === 'auth/configuration-not-found') {
      console.error('Firebase configuration issue. Please check your Firebase project settings in the Firebase console.');
    }
    
    return { user: null, error };
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