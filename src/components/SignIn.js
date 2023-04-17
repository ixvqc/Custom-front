import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase'

function SignIn() {
    const signInWithGoogle = () => {
        signInWithPopup(auth,provider)
    };
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}

export default SignIn;