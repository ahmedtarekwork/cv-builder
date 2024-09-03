import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cv-builder-9e701.firebaseapp.com",
  projectId: "cv-builder-9e701",
  storageBucket: "cv-builder-9e701.appspot.com",
  messagingSenderId: "823298337745",
  appId: "1:823298337745:web:7f0626b3b33defdcc3cef0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
