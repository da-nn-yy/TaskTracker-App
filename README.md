# Task Tracker App

A modern, responsive Task Tracker web application built using **React**, **Tailwind CSS**, **Firebase Authentication**, and **Vite**, with a **Node.js + Express** backend and **MySQL** database.

The backend and MySQL database can be deployed on [**Render**](https://render.com/).

> ⚠️ This project is still in progress and not yet fully functional.

---

## ✨ Features

### Core Functionality
- ✅ Add, edit, and delete tasks
- 📅 Track task start and end dates
- ⚙️ Auto-set task status (`In Progress` or `Completed`) based on end date

### Authentication
- 🔐 **Google Sign-In**
- ✉️ **Email/Password Registration & Login**
- 🔄 **Password Reset**
- 🛡️ Protected routes
- 👤 User profile management
- 🔄 Automatic redirects (login/dashboard)
- ⏳ Loading states & error handling

### Technical
- 📱 Fully responsive design
- 🎨 Custom color theme (`#aff901`, `#eaf4f4`, `#000`)
- 🌐 REST API for CRUD operations
- 🗃️ MySQL database ready for Render hosting

---

## 🔐 Authentication

- Firebase Authentication
- Users can sign in with Google or Email/Password
- Secure routes using Firebase tokens
- Follow the Firebase setup guide (link to detailed steps if needed)

### Required Environment Variables

Backend:

- `FRONTEND_ORIGINS` or `FRONTEND_URL` should include every deployed frontend origin, separated by commas if needed
- Database variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
- Firebase Admin variables: `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, plus optional related keys

Frontend:

- `VITE_API_BASE_URL`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_STORAGE_BUCKET` and `VITE_FIREBASE_MESSAGING_SENDER_ID` if your Firebase project uses them

---

## ⚙️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Render](https://render.com/)

---

## 🖼️ Screenshots

<p align="center">
  <img src="./frontend/public/Screenshot%202025-08-15%20120945.png" alt="Dashboard" width="200"/>
  <img src="./frontend/public/Screenshot%202025-08-15%20120912.png" alt="Tasks" width="300"/>
  <img src="./frontend/public/Screenshot%202025-08-15%20121010.png" alt="Add Task" width="600"/>
</p>

---

## 📦 Deployment Links

- 🔗 Frontend: Comingsoon
- 🔗 Backend (Render): Commingsoon

---

## 🚀 Render Deployment (Backend + MySQL)

1. Create a **MySQL** service on Render and copy host, port, database, user, and password.
2. Create a **Web Service** on Render from `backend/`.
3. Use build command `npm install` and start command `npm start`.
4. Add backend environment variables from `backend/.env.example` in the Render dashboard.
5. Deploy frontend (Render Static Site or Vercel) and set `VITE_API_BASE_URL` to backend URL.
6. Set `FRONTEND_ORIGINS` on backend to all deployed frontend domains.

Example:

- `VITE_API_BASE_URL=https://your-backend.onrender.com`
- `FRONTEND_ORIGINS=https://your-frontend.onrender.com,https://your-frontend.vercel.app`

---

## 🧑‍💻 Author

- Designed and developed by DANIEL

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
