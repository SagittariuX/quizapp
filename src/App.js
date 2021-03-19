import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//My components
import QuizPage from "./components/QuizPage.jsx";

//Firebase sdk
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

if (!firebase.apps.length)
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSENGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  });

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {!user && <SignIn />}
      {!user ? (
        <div>Please Sign In</div>
      ) : (
        <QuizPage user={user} auth={auth} firestore={firestore} />
      )}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle}>Sign In With A Google Account</button>
  );
}

export default App;
