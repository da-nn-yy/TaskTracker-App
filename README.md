# Task Tracker App

A modern, responsive Task Tracker web app built with React, Tailwind CSS, Firebase Authentication, and Vite.

## Features

- Add, edit, and delete tasks
- Track task start and end dates
- Automatic status (In Progress/Completed) based on end date
- Google Sign-In authentication (Firebase)
- Responsive, modern UI with custom color palette (#aff901, #eaf4f4, black)
- User profile display and logout
- Accessible and mobile-friendly

## Screenshots

<p align="center">
  <img src="screenshot1.png" alt="Dashboard" width="300"/>
  <img src="screenshot2.png" alt="Tasks" width="300"/>
  <img src="screenshot3.png" alt="Add Task" width="300"/>
</p>

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project (or use an existing one)
- Enable Google Sign-In in Authentication > Sign-in method
- Copy your Firebase config and add it to a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Usage
- Click **Login** to sign in with Google.
- Add tasks with a title, start date, and end date.
- Edit or delete tasks as needed.
- Status is set automatically based on the end date.
- Log out from the nav bar when finished.

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## License

MIT
