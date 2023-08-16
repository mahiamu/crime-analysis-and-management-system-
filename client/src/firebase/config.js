// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHdQOmmj_zGorjbyrsIF7B3E6XBdlKkio",
    authDomain: "analysis-ae2ff.firebaseapp.com",
    projectId: "analysis-ae2ff",
    storageBucket: "analysis-ae2ff.appspot.com",
    messagingSenderId: "20152875870",
    appId: "1:20152875870:web:a01c294aa7d858056eadcf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();