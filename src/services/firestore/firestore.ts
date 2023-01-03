// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import {
  FIRE_BOARD_COLLECTION_NAME,
  FIRE_CUSTOM_DATA_COLLECTION_NAME,
  FIRE_SHOWS_COLLECTION_NAME,
} from "./fire_const";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlPbyir7v9kkR4AqX4rm_fg5BIP1NVdWM",
  authDomain: "showbiz-da803.firebaseapp.com",
  projectId: "showbiz-da803",
  storageBucket: "showbiz-da803.appspot.com",
  messagingSenderId: "1035155877953",
  appId: "1:1035155877953:web:9acadacc7720585021d6c0",
  measurementId: "G-GXZJKNX8R8",
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const fireDb = getFirestore(fireApp);
const showsCollection = collection(fireDb, FIRE_SHOWS_COLLECTION_NAME);
const customDataCollection = collection(
  fireDb,
  FIRE_CUSTOM_DATA_COLLECTION_NAME
);
const boardCollection = collection(fireDb, FIRE_BOARD_COLLECTION_NAME);
export {
  fireApp,
  fireDb,
  showsCollection,
  customDataCollection,
  boardCollection,
};
