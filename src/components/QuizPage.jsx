import React from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore' 


const QuizPage = ({ user, auth, firestore }) => {
  
  const questionRef = firestore.collection('Questions');
  const query = questionRef.limit(10);

  const [questions, loading, error] = useCollectionData(query);
  
  
  return (
    <div>
      <SignOut auth={auth} />
      <div>Quiz Page</div>
      {error && console.log(error)}
      {loading && console.log(loading)}
      {questions && console.log(questions)}
    </div>
  );
};

const SignOut = ({ auth }) => {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out/Switch Account</button>
    )
  );
};

export default QuizPage;
