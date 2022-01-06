import UserActionTypes from './user.types';


// Login com Google
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

// Login com email
export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

// Success and failure
export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

// Persistencia
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

// signOut
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});
