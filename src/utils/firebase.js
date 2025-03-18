// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCa5ywEdMZlg10sgNAiz5CHooI5GUKovA",
  authDomain: "tenerife-trails.firebaseapp.com",
  projectId: "tenerife-trails",
  storageBucket: "tenerife-trails.firebasestorage.app",
  messagingSenderId: "383550379279",
  appId: "1:383550379279:web:c9574cb1b21c34cfe31a7a",
  measurementId: "G-9686SL5XLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app); 