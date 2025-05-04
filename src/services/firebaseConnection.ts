import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZzSL9kOSof4CCFyNG5bFLQ7sIraWyFXs",
  authDomain: "taskmanager-af038.firebaseapp.com",
  projectId: "taskmanager-af038",
  storageBucket: "taskmanager-af038.firebasestorage.app",
  messagingSenderId: "508124660042",
  appId: "1:508124660042:web:59ee7cd1703c42df7fc1b3",
  measurementId: "G-FNZ8TRV80Q",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
