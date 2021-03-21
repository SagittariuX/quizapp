import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";

function SignIn({auth}) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      Sign In With A Google Account
    </Button>
  );
}

function AnonSignIn({auth}){
  const signInAnon = () => {
    firebase.auth().signInAnonymously()
    .then((res) => console.log('Welcome Guest'))
    .catch((err) => console.log("error" , err))
  }
  return (
    <Button variant="contained" onClick={signInAnon}>
      Sign In As Guest
    </Button>
  );
}

function SignOut({ auth }) {
  return (
    auth.currentUser && (
      <Button
        className="sign-out-btn"
        variant="contained"
        color="secondary"
        onClick={() => auth.signOut()}
      >
        Sign Out/Switch Account
      </Button>
    )
  );
};

export { SignIn, SignOut , AnonSignIn};
