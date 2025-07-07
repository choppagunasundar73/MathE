# Math-E Learning Platform

## Firebase Setup

### Firestore Security Rules

The application uses Firebase Firestore for data storage. To deploy the security rules, follow these steps:

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init

# Deploy only Firestore rules
firebase deploy --only firestore:rules
```

The current security rules in `firestore.rules` allow full read/write access for development purposes. Make sure to implement proper security rules before deploying to production.

## Troubleshooting

### Firebase Permission Issues

If you encounter Firebase permission errors like `FirebaseError: Missing or insufficient permissions`, make sure:

1. You have deployed the Firestore security rules
2. You are signed in with a user that has appropriate permissions
3. The Firebase project is correctly configured in `src/firebase/config.ts`

### Start Challenge Button Not Working

If the Start Challenge button makes the website unresponsive:

1. Check the browser console for any errors
2. Verify that the Firebase configuration is correct
3. Make sure Firestore security rules allow the necessary operations
4. Ensure you're signed in with a valid user account

## Google Sign-In Authentication Setup

This project uses Firebase for Google Sign-In authentication. Follow these steps to set up your Firebase project:

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name and follow the setup steps
4. Once your project is created, click "Continue"

### 2. Register Your Web App

1. In the Firebase console, click the web icon (</>) to add a web app
2. Enter a nickname for your app (e.g., "Math-E Web")
3. Check the box for "Also set up Firebase Hosting" if you plan to deploy your app with Firebase
4. Click "Register app"

### 3. Add Firebase SDK Configuration

1. After registering your app, you'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

2. Copy this configuration object
3. Open the file `src/firebase/config.ts` in your project
4. Replace the placeholder configuration with your actual Firebase configuration

### 4. Enable Google Authentication

1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click on the "Sign-in method" tab
3. Click on "Google" in the list of providers
4. Toggle the "Enable" switch to on
5. Enter your support email
6. Click "Save"

### 5. Run Your Application

```bash
npm run dev
```

Your application should now have Google Sign-In functionality working!

## Features

- Google Sign-In Authentication
- User profile display
- Sign-out functionality
- Persistent authentication state

## Project Structure

- `src/firebase/` - Firebase configuration and authentication services
- `src/context/` - React context for authentication state management
- `src/components/` - React components including authentication UI

## Technologies Used

- React
- TypeScript
- Firebase Authentication
- Tailwind CSS