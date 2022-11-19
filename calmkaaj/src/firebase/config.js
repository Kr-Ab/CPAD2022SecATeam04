// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0phmcHmdXPYLam7dzE58248pX3kk5kD8",
  authDomain: "calmkaaj-62dff.firebaseapp.com",
  projectId: "calmkaaj-62dff",
  storageBucket: "calmkaaj-62dff.appspot.com",
  messagingSenderId: "610886258731",
  appId: "1:610886258731:web:5e38171af1000af06a9a6e",
  measurementId: "G-P7LJ6N5L7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }