import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { signInSuccess,signInFailure, signOutSuccess,signOutFailure, signUpSuccess,signUpFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';


// Função auxiliar que será usada desde ambos processos de login
export function* getSnapshotFromUserAuth( user, additionalData ) {
    try {
        const userRef = yield call( createUserProfileDocument, user, additionalData );
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id:userSnapshot.id, ...userSnapshot.data() }));
    } catch (err) {
        yield put(signInFailure(err));
    }
}

// Sagas de Google
export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest( UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle );
}


// Sagas de email
export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest( UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail );
}


// Sagas de persistencia
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        // Se não temos usuário, não há mais o que fazer aqui..
        if(!userAuth) return;
        // Se temos um usuário, então vamos simular o processo de login
        yield getSnapshotFromUserAuth(userAuth);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* onCheckUserSession() {
    yield takeLatest( UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated );
}


// Sagas para Signout
export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err));
    }
}
export function* onSignOutStart() {
    yield takeLatest( UserActionTypes.SIGN_OUT_START, signOut );
}


// Sagas para SignUp
export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword( email, password );
        yield put(signUpSuccess({ user, additionalData: { displayName }}));
    } catch (err) {
        yield put(signUpFailure(err));
    }
}

export function* onSignUpStart() {
    yield takeLatest( UserActionTypes.SIGN_UP_START, signUp );
}

// Estas aqui são para fazer login automaticamente após signUp
export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest( UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp );
}


// Juntamos todas as sagas para facilitar a chamada
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}