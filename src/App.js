import React from "react";
import "./App.css";
import { Box, Button, Container, Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//My components
import QuizPage from "./components/QuizPage";
import QuizMaker from "./components/QuizMaker";
import { SignIn, SignOut } from "./components/AuthButtons";

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
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      className="App"
    >
      <Router>
        <Box
          bgcolor="#20821e"
          py="30px"
          style={{ width: "80%", minWidth: "300px" }}
        >
          <Switch>
            <Route exact path="/">
              {!user && <SignIn auth={auth} />}
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
                  <QuizMaker user={user} auth={auth} firestore={firestore} />
                </Route>
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </Box>
      </Router>
    </Grid>
  );
}

function OptionsMenu({ user: { displayName } }) {
  return (
    <>
      <h1>Hello {displayName}</h1>
      <Box>
        <SignOut auth={auth} />
      </Box>
      <Box>
        <Link to="/quiz">
          <Button variant="contained" color="primary">
            Quiz Me
          </Button>
        </Link>
      </Box>
      <Box>
        <Link to="/create">
          <Button variant="contained" color="primary">
            Create a Question
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default App;
