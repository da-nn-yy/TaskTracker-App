# Task Tracker App - Frontend

## Authentication Setup

This app uses Firebase Authentication for user management. Follow these steps to set up authentication:

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication in the Firebase console
4. Go to Project Settings > General
5. Add a web app to your project

### 2. Enable Authentication Methods

In the Firebase Console > Authentication > Sign-in method:

1. **Google Sign-in**: Enable and configure
2. **Email/Password**: Enable and configure
3. **Password Reset**: Enable

### 3. Environment Variables

Create a `.env.local` file in the frontend directory with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Features

- ✅ Google Sign-in
- ✅ Email/Password Registration & Login
- ✅ Password Reset
- ✅ Protected Routes
- ✅ User Profile Management
- ✅ Automatic Redirects
- ✅ Loading States & Error Handling

### 5. Running the App

```bash
npm install
npm run dev
```

The app will automatically redirect unauthenticated users to the login page and authenticated users to the dashboard.
