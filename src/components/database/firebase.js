// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "todo-app-8f0af.firebaseapp.com",
  databaseURL: "https://todo-app-8f0af-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-8f0af",
  storageBucket: "todo-app-8f0af.appspot.com",
  messagingSenderId: "411233764116",
  appId: "1:411233764116:web:cd59284815f307b9877801",
  measurementId: "G-QD81PBGW1V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);