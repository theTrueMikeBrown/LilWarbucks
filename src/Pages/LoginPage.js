import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export function LoginPage() {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  return (
  <div>
    {
          !isLoaded(auth)
          ? <span>Loading...</span>
          : <StyledFirebaseAuth
            uiConfig={{
              signInFlow: 'popup',
              signInSuccessUrl: '/signedIn',
              signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
              callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                  firebase.handleRedirectResult(authResult).then(()=> {
                  });
                  return false;
                },
              },
            }}
            firebaseAuth={firebase.auth()}
              />
        }    
  </div>
  )
}
