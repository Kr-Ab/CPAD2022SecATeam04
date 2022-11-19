import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0phmcHmdXPYLam7dzE58248pX3kk5kD8",
  authDomain: "calmkaaj-62dff.firebaseapp.com",
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: "calmkaaj-62dff",
  storageBucket: "calmkaaj-62dff.appspot.com",
  messagingSenderId: "610886258731",
  appId: "1:610886258731:web:5e38171af1000af06a9a6e",
  measurementId: "G-P7LJ6N5L7C"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };