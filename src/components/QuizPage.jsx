import React, { useEffect, useRef, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

//Visuals
import "./css/QuizPage.css";
import { Box, Button, ButtonGroup } from "@material-ui/core";

const QuizPage = ({ firestore }) => {
  const questionRef = firestore.collection("Questions");
  const query = questionRef.limit(10);

  const [questions] = useCollectionDataOnce(query);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelection = (e) => {
    setCount(count + 1);
    setScore(
      e.target.innerText === questions[count].answer ? score + 1 : score
    );
  };

  return (
    <div>
      {questions && (
        <Box mt="20px">
          <div>It's Quiz Time</div>
          <div>Question #{count + 1}</div>
          <div>{questions[count].question}</div>
          {questions[count].choices.map((choice, index) => (
            <Box key={index}>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="primary"
                onClick={handleSelection}
              >
                {choice}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default QuizPage;
