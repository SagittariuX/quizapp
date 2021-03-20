import React from "react";
import "./App.css";
import { Box, Button, Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

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
    <Container className="App" maxWidth="sm">
      <Router>
        <Box bgcolor="#20821e" py="30px" style={{ minHeight: "100vh" }}>
          <Switch>
            <Route exact path="/">
              {!user && <SignIn />}
              {user && <OptionsMenu user={user} />}
            </Route>
            {/* Protected Routes */}
            {user ? (
              <>
                <Route path="/quiz">
                  {!user ? (
                    <div>Please Sign In</div>
                  ) : (
                    <QuizPage user={user} auth={auth} firestore={firestore} />
                  )}
                </Route>
                <Route path="/create">
                  <div>create</div>
                </Route>{" "}
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </Box>
      </Router>
    </Container>
  );
}

function SignIn() {
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

function OptionsMenu({ user: { displayName } }) {
  return (
    <>
      <div>{displayName}</div>
      <Link to="/quiz">
        <Button variant="contained" color="primary">
          Quiz Me
        </Button>
      </Link>
    </>
  );
}

export default App;
