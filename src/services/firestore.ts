// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPZpoi2-mMwkYegKGBw0lijGbXDkUc3uM",
  authDomain: "fireplay-a798a.firebaseapp.com",
  projectId: "fireplay-a798a",
  storageBucket: "fireplay-a798a.appspot.com",
  messagingSenderId: "79213948793",
  appId: "1:79213948793:web:0503cfcd47e41ae0dc89a8",
  measurementId: "G-DMS2328FMD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
