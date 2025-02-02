// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import the getAuth function from Firebase
import { getFirestore,collection, addDoc, getDocs } from "firebase/firestore";  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpZsqHMDY23TaYiavcaR6GU-VF6fRG058",
  authDomain: "nepathya-attendance.firebaseapp.com",
  projectId: "nepathya-attendance",
  storageBucket: "nepathya-attendance.firebasestorage.app",
  messagingSenderId: "512988560196",
  appId: "1:512988560196:web:45df8d2bad756295c2f511",
  measurementId: "G-ZDT26YXD6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore, then export them
const auth = getAuth(app);  // This initializes the auth service
const firestore = getFirestore(app);  // This initializes Firestore

export { auth, firestore,collection, addDoc, getDocs };  // Exporting auth and firestore to use in other files
