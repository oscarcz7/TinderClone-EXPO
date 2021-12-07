
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMxqdx73QCE3oT4B71gX32HuxvtKzZkbQ",
  authDomain: "udlamatch-cf081.firebaseapp.com",
  projectId: "udlamatch-cf081",
  storageBucket: "udlamatch-cf081.appspot.com",
  messagingSenderId: "698223115909",
  appId: "1:698223115909:web:d59981aa4ef9960c6bb3ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
export { auth, db, storage };