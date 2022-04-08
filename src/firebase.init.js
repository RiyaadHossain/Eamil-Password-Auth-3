// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCscz_6VjpokgdBniUg7Eyb-THrOxjf9Ic",
  authDomain: "email-password-auth-3.firebaseapp.com",
  projectId: "email-password-auth-3",
  storageBucket: "email-password-auth-3.appspot.com",
  messagingSenderId: "987812496992",
  appId: "1:987812496992:web:f4b1c16e31f3097f8c2505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app