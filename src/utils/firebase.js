// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Tu-API-Key",
  authDomain: "tenerife-trails.firebaseapp.com",
  projectId: "tenerife-trails",
  storageBucket: "tenerife-trails.firebasestorage.app",
  messagingSenderId: "383550379279",
  appId: "1:383550379279:web:c9574cb1b21c34cfe31a7a",
  measurementId: "G-9686SL5XLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(initializeApp);
