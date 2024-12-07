import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from '../features/auth/googleAuth'
import { useDispatch } from 'react-redux'
import { setToken } from '../features/auth/authSlice'

const Signin = () => {
  // variable & constants declations
  const dispatch = useDispatch();

  // functions section
  const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;

          dispatch(setToken({token}));
          dispatch()
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  // UI
  return (
    <div>
      <h1>Sign in with Google</h1>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )
}

export default Signin
