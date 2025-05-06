import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCwjPQdntA8QywyIAPSROVoPmyQTiuCBI",
    authDomain: "prepwise-b2462.firebaseapp.com",
    projectId: "prepwise-b2462",
    storageBucket: "prepwise-b2462.firebasestorage.app",
    messagingSenderId: "343901868310",
    appId: "1:343901868310:web:ae83ad1bf8c0e58ab48037",
    measurementId: "G-X54C52YBMN"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export  const auth = getAuth(app);
export const db = getFirestore(app);