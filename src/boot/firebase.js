// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUGrt5pshID-PLs9GI5xo0104jVrfzFTY",
  authDomain: "trackersap-acabc.firebaseapp.com",
  projectId: "trackersap-acabc",
  storageBucket: "trackersap-acabc.appspot.com",
  messagingSenderId: "440639161701",
  appId: "1:440639161701:web:671e4f2fae47c44b40cd8c",
  measurementId: "G-8R4366C47V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();
const marcaDeTiempo = firebase.firestore.fieldValue.serverTimesTamp;
export { db, marcaDeTiempo };
