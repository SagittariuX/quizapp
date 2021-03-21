import React, {useState} from "react";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui"; //<---- May be problematic
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
} from "@material-ui/core";

const QuizMaker = ({ firestore }) => {
  // const questionRef = firestore.collection("Questions");
  // const query = questionRef.orderBy("id", "desc").limit(1);
  // const [question] = useCollectionData(query); //keeps track of the latest question
  //Need this to set proper id

  const [haveSubmitted, setHaveSubmitted] = useState(false);

  const onSubmit = async(e) => {
    console.log(e);
    // setHaveSubmitted(true);
  };

  const validate = (values) => {
    const errors = {};

    //Check if all fields are filled
    if (!values.question) {
      errors.question = "Required";
    }
    if (!values.choice0) {
      errors.choice0 = "Required";
    }
    if (!values.choice1) {
      errors.choice1 = "Required";
    }
    if (!values.choice2) {
      errors.choice2 = "Required";
    }
    if (!values.choice3) {
      errors.choice3 = "Required";
    }
    if (!values.answer) {
      errors.answer = "Required";
    }

    //Check if choices are distinct
    const distinct = (value, index, self) => self.indexOf(value) === index;

    if (values.choice0 && values.choice1 && values.choice2 && values.choice3) {
      let list = [
        values.choice0,
        values.choice1,
        values.choice2,
        values.choice3,
      ];
      let count = list.filter(distinct).length;
      if (count < 4) {
        errors.choice0 = "Choices need to be unique";
        errors.choice1 = "Choices need to be unique";
        errors.choice2 = "Choices need to be unique";
        errors.choice3 = "Choices need to be unique";
      }

      if (values.answer && !list.includes(values.answer)) {
        errors.answer = "Answer needs to be part of the choices";
      }
    }
    return errors;
  };
  if (true && !haveSubmitted)
    return (
      <>
        <h3>
          Please make your question is related to or about computer science
        </h3>
        <h3>This is just a casual application</h3>
        <h3>Please try to keep the difficulty easy</h3>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, form}) => (
            <form onSubmit={e => handleSubmit(e).then(form.restart)} noValidate>
              <Paper elevation={3} style={{ padding: 10 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="question"
                      label="Enter A Question"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel>Enter 4 Choices</FormLabel>
                      <FormGroup>
                        <Field
                          fullWidth
                          required
                          name="choice0"
                          component={TextField}
                          label="Enter Choice 1"
                        />
                        <Field
                          fullWidth
                          required
                          name="choice1"
                          component={TextField}
                          label="Enter Choice 2"
                        />
                        <Field
                          fullWidth
                          required
                          name="choice2"
                          component={TextField}
                          label="Enter Choice 3"
                        />
                        <Field
                          fullWidth
                          required
                          name="choice3"
                          component={TextField}
                          label="Enter Choice 4"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="answer"
                      label="Enter The Answer"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={form.restart}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </>
    );
  if(true && haveSubmitted)
    return (
      <div>Submitted</div>
    )
  return <div>Loading...</div>;
};

export default QuizMaker;
