import React, { useRef, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

//Visuals
import "./css/QuizPage.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";

//svg
import FinishQuizSvg from "../pics/FinishQuizSvg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import  CheckIcon  from "@material-ui/icons/Check";
import  CloseIcon  from "@material-ui/icons/Close";

const QuizPage = ({ firestore }) => {
  const questionRef = firestore.collection("Questions");
  const query = questionRef.orderBy('id', 'desc').limit(3);

  const [questions] = useCollectionDataOnce(query);
  const [count, setCount] = useState(0);
  const score = useRef(0);
  const userAnswers = useRef([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const handleSelection = (e) => {
    score.current =
      e.target.innerText === questions[count].answer
        ? score.current + 1
        : score.current;

    userAnswers.current.push(e.target.innerText);
    console.log(userAnswers.current)
    setCount(count + 1);
  };

  const CreateResults = (value, index) => {
    return (
      <>
      <Grid item xs={12} style={{marginTop:15}}>Q: {value.question}</Grid>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={4}>
          {userAnswers.current[index] === value.answer ? <CheckIcon className="correct-icon"/>:<CloseIcon className="wrong-icon"/>}
        </Grid>
        <Grid item xs={4}>
          {userAnswers.current[index]}
        </Grid>
        <Grid item xs={4}>
          {value.answer}
        </Grid>
      </Grid>
      </>
    );
  };

  if (questions && count < questions.length) {
    return (
      <>
        <Box>
          <Paper style={{padding: 10, background: 'var(--secondary-color)'}}>
          <h2>It's Quiz Time</h2>
          <h2>Question #{count + 1}</h2>
          <h3>{questions[count].question}</h3>
          </Paper>
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
      </>
    );
  } else if (questions && count === questions.length) {
    return (
      <Box>
        <h1>Congrats you finished the quiz</h1>
        {!accordionExpanded && <FinishQuizSvg />}
        <Accordion style={{background: 'var(--secondary-color)'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={(e) => setAccordionExpanded(!accordionExpanded)}
          >
            Lets see how you did!
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} style={{ textAlign: "center" }}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  Result
                </Grid>
                <Grid item xs={4}>
                  Your Answer
                </Grid>
                <Grid item xs={4}>
                  Correct Answer
                </Grid>
              </Grid>
              {questions.map(CreateResults)}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
  return <div>Loading</div>;
};

export default QuizPage;
