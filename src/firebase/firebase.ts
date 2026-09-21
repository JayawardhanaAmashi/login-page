import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZvYBfQ0XaeYCZnkcxfnXbTJ1b-ZkX6vc",
  authDomain: "login-page-amashi.firebaseapp.com",
  projectId: "login-page-amashi",
  storageBucket: "login-page-amashi.firebasestorage.app",
  messagingSenderId: "467260744935",
  appId: "1:467260744935:web:1a2e5e5cb8b83fdfd0ee42"
};
 


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();