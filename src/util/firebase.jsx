// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr6s3a16LdxhcwnmtdVCWXxA6yftXnaFM",
    authDomain: "headquarters-dashboard.firebaseapp.com",
    projectId: "headquarters-dashboard",
    storageBucket: "headquarters-dashboard.appspot.com",
    messagingSenderId: "510609325978",
    appId: "1:510609325978:web:60ad0f3753c44f49c8c423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);