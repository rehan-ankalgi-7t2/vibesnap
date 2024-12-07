// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXOZd50Sb2v2ZkmjbOEQNAbrRwqIoHH6M",
    authDomain: "vibesnap-f16d4.firebaseapp.com",
    projectId: "vibesnap-f16d4",
    storageBucket: "vibesnap-f16d4.firebasestorage.app",
    messagingSenderId: "1095409960751",
    appId: "1:1095409960751:web:02aae4a22a3f54b04c43da",
    measurementId: "G-5V760H12XM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp)
const analytics = getAnalytics(firebaseApp);

export {firebaseStorage}