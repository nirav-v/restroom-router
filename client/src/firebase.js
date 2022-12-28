// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA44YNbxWjpIsD6EYd41us4HtYbQAVBIY8",
  authDomain: "restroom-router-6987d.firebaseapp.com",
  projectId: "restroom-router-6987d",
  storageBucket: "restroom-router-6987d.appspot.com",
  messagingSenderId: "371858309538",
  appId: "1:371858309538:web:8c8ab823da60fdcd72b2fb",
  measurementId: "G-CNPK8CY0RB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const analytics = getAnalytics(app);
