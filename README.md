# Task Tracker App

A modern, responsive Task Tracker web application built using **React**, **Tailwind CSS**, **Firebase Authentication**, and **Vite**, with a **Node.js + Express** backend and **MySQL** database.

The backend is deployed on [**Render**](https://render.com/), and the MySQL database is hosted on [**Railway**](https://railway.app/).

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
- 🗃️ MySQL database with Railway hosting

---

## 🔐 Authentication

- Firebase Authentication
- Users can sign in with Google or Email/Password
- Secure routes using Firebase tokens
- Follow the Firebase setup guide (link to detailed steps if needed)

### Required Environment Variables

Backend:

- `FRONTEND_ORIGINS` or `FRONTEND_URL` should include every deployed frontend origin, separated by commas if needed

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
- [Railway](https://railway.app/)
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

## 🧑‍💻 Author

- Designed and developed by DANIEL

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
