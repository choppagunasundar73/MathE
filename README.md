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

### Firestore Indexes

The application requires specific Firestore indexes for queries to work properly. To deploy the indexes, follow these steps:

```bash
# Deploy Firestore indexes
./deploy-indexes.sh

# Or manually with Firebase CLI
firebase deploy --only firestore:indexes
```

The required indexes are defined in `firestore.indexes.json`. If you encounter errors about missing indexes, make sure to deploy the indexes using the commands above.

## Troubleshooting

### Firebase Permission Issues

If you encounter Firebase permission errors like `FirebaseError: Missing or insufficient permissions`, make sure:

1. You have deployed the Firestore security rules
2. You are signed in with a user that has appropriate permissions
3. The Firebase project is correctly configured in `src/firebase/config.ts`

### Missing Index Errors

If you see errors like `FirebaseError: The query requires an index`, follow these steps:

1. Deploy the Firestore indexes using the provided script: `./deploy-indexes.sh`
2. Alternatively, you can click on the URL in the error message to create the index directly in the Firebase console
3. Wait a few minutes for the indexes to be created and become active

#### Common Index Issues

- **Leaderboard Query Index**: The application requires a composite index for the `challengeAttempts` collection with fields `challengeId`, `score` (descending), `timeSpent` (ascending), and `__name__` (ascending). This is needed for the leaderboard functionality.

- **User Best Attempt Index**: Queries for user's best attempts require an index on `userId`, `challengeId`, `score` (descending), and `timeSpent` (ascending).

If you encounter index errors, check the error message for the specific index URL and either:

1. Add the index to `firestore.indexes.json` and deploy using `./deploy-indexes.sh`
2. Click the URL in the error message to create the index directly in the Firebase console

### ERR_BLOCKED_BY_CLIENT Errors

If you see `net::ERR_BLOCKED_BY_CLIENT` errors in the console:

1. This is typically caused by ad blockers or privacy extensions blocking Firebase connections
2. Temporarily disable any ad blockers or privacy extensions
3. Add exceptions for your development domain in your ad blocker settings

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