// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfF17SkUQr5Ukea-NYipLKZVMc0lgOO_E",
  authDomain: "tasktrackerapp-79186.firebaseapp.com",
  projectId: "tasktrackerapp-79186",
  storageBucket: "tasktrackerapp-79186.firebasestorage.app",
  messagingSenderId: "188547322744",
  appId: "1:188547322744:web:ac1e4b5219dc4faab5ee8d",
  measurementId: "G-ED52SHR13S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();