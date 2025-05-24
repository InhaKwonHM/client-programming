// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClyUMk4Su8RaY4ZD8_BXibO9vodYMMQ04",
  authDomain: "client-programming-6ea59.firebaseapp.com",
  projectId: "client-programming-6ea59",
  storageBucket: "client-programming-6ea59.firebasestorage.app",
  messagingSenderId: "452423798632",
  appId: "1:452423798632:web:049f48e15e40c6c76d90dd",
  measurementId: "G-131VQQV8YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);