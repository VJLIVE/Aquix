// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCePkU3XCBz3F1EOHqDhrXChGOETiJLYNk",
  authDomain: "aquix-testing-2.firebaseapp.com",
  projectId: "aquix-testing-2",
  storageBucket: "aquix-testing-2.appspot.com",
  messagingSenderId: "69561819046",
  appId: "1:69561819046:web:9d6be8a27faaab468af967"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app); // Export Firestore

export default app;