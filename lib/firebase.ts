// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// firestroe
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbbe2-HWJGvo4yhP2GZEu6cARGRJ3C5fQ",
  authDomain: "kira-social.firebaseapp.com",
  projectId: "kira-social",
  storageBucket: "kira-social.appspot.com",
  messagingSenderId: "841553789341",
  appId: "1:841553789341:web:db477a479a8b21fbc22f74",
  measurementId: "G-22XX202XDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
