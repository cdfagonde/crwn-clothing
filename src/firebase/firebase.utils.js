import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC89GAF1ligBQVilVJwxrhE1mKA_1ZxyvQ",
    authDomain: "crwn-clothing-db-9cde8.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-9cde8.firebaseio.com",
    projectId: "crwn-clothing-db-9cde8",
    storageBucket: "crwn-clothing-db-9cde8.appspot.com",
    messagingSenderId: "149323906675",
    appId: "1:149323906675:web:d26ef24a7557590ab63406"
    // measurementId: "G-4HJKZQ9GM5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
