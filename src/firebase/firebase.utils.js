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


export const createUserProfileDocument = async (userAuth,additionalData) => {
    // Se não houver usuário, não temos que fazer
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        // Usuário não existe, então criamos..
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(err) {
            console.error('Error creating user ', err.message);
        }
    }

    return userRef;
}

try {
    firebase.initializeApp(config);
} catch(err) {
    console.error(err);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
