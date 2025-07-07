# Math-E Learning Platform

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