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
    // console.log(snapShot.data());

    // Só parsa teste
    // const collectionRef = firestore.collection('users');
    // const collectionSnapshot = await collectionRef.get();
    // console.log({ collection: collectionSnapshot.docs.map( doc => doc.data() ) });

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

// Função para carregar todos os elementos de SHOP_DATA
export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);

    // Esse processo batch permite simular uma transação.

    // O primeiro será barrer todos os objetos e criar cada um dos documentos..
    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();   // Não especificamos chave, portanto firebase criará automaticamente o key
        // const newDocRef = collectionRef.doc(obj.title);   // Desta forma criariamos o objeto usando o título como key
        
        batch.set(newDocRef,obj);
    });

    // Com os documentos criados, mandaremos nosso batch inteiro e de uma única vez..
    return await batch.commit();
}


try {
    // firebase.initializeApp(config);
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
     } else {
        firebase.app(); // if already initialized, use that one
     }
} catch(err) {
    console.error(err);
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
