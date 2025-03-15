// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTY9i49YXoW7Qsqmc4Pa62xO_BDIK44SM",
  authDomain: "codereview-26a02.firebaseapp.com",
  projectId: "codereview-26a02",
  storageBucket: "codereview-26a02.firebasestorage.app",
  messagingSenderId: "133900908168",
  appId: "1:133900908168:web:cef99a018dc37d1bb8513d",
  measurementId: "G-E465VF2DC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)