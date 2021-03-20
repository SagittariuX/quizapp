import React from 'react';
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

const QuizMaker = ({ firestore }) => {
  const questionRef = firestore.collection("Questions");
  const query = questionRef.orderBy('id','desc').limit(1);

  const [question] = useCollectionData(query);





    return ( <div>Loading...</div> );
}
 
export default QuizMaker;