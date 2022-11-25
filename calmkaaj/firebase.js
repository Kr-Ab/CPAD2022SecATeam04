
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0phmcHmdXPYLam7dzE58248pX3kk5kD8",
    authDomain: "calmkaaj-62dff.firebaseapp.com",
    projectId: "calmkaaj-62dff",
    databaseURL: 'https://your-database-name.firebaseio.com',
    storageBucket: "calmkaaj-62dff.appspot.com",
    messagingSenderId: "610886258731",
    appId: "1:610886258731:web:5e38171af1000af06a9a6e",
    measurementId: "G-P7LJ6N5L7C"
  };

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig )
} else {
    app = firebase.app()
}

export default app;

// const db = firebase.firestore();
// const auth = firebase.auth();