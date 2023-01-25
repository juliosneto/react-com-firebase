import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAO686E9GMHb40KNsz8-NSXf-2cBCo_plU",
    authDomain: "curso-udemy-7a8d9.firebaseapp.com",
    projectId: "curso-udemy-7a8d9",
    storageBucket: "curso-udemy-7a8d9.appspot.com",
    messagingSenderId: "378282097254",
    appId: "1:378282097254:web:dff832bada790673e18ba7",
    measurementId: "G-2FDZ3Y1PCN"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)