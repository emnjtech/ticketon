import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDJ1SYECd92-xX45zhloapUlY9fz-Cuy7k",
    authDomain: "dbticketon.firebaseapp.com",
    projectId: "dbticketon",
    storageBucket: "dbticketon.appspot.com",
    messagingSenderId: "313714699191",
    appId: "1:313714699191:web:27c163f0e5cf1e9d351632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();