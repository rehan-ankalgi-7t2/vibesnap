import { Button } from '@mui/material'
import React from 'react'
// import { provider } from '../features/auth/googleAuth'
import { useDispatch } from 'react-redux'
import { setToken } from '../features/auth/authSlice'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseApp } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/user/userSlice'
import { createNewUser } from '../features/user/userActions'
// import { firebaseAuth } from '../services/firebase'

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider;

const Signin = () => {
  // variable & constants declations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // functions section
  const signInWithGoogle = async () => {

      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;

          // create new user in the database
          createNewUser(result.user);

          dispatch(setToken({token}));
          dispatch(setUser({user}));

          navigate("/feed")
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.error(errorMessage)
          // const email = error.customData.email;
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
