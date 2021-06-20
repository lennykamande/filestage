import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from '../UI/ErrorModal';
import {
  Button,
  Icon,
  Paper,
  Box,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({

    addTodoContainer: { padding: 10 },
    todoTextField: { width: '50%', padding: 5 },
    addTodoButton: { marginLeft: 5 }

  });

const NewTodo = (props) =>  {
  const classes = useStyles();

  const [newTodoText, setNewTodoText] = useState("");
  const [enteredDate, setEnteredDate] = useState("2021-06-16")
  const [open, setOpen] = useState("");

  const todoChangeHandler = (event) => {
    setNewTodoText(event.target.value);
  } ;

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) =>{
    // handle errors here
    
    const todoData = {
      text: newTodoText,
      date: new Date(enteredDate)
    }

    props.onSaveChangeHandler(todoData);
    setEnteredDate("2021-06-16");
    setNewTodoText('');

  };

    return (
      <React.Fragment>
      {open && <ErrorModal title={open.title} message={open.message} />}
      <Paper className={classes.addTodoContainer}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <TextField
            label="Todo List"
            value={newTodoText}
            className={classes.todoTextField}
            InputLabelProps={{
              shrink: true,
              }}
            onChange={todoChangeHandler}
          />
          <TextField
              id="date"
              label="Due Date"
              type="date"
              defaultValue={enteredDate}
              className={classes.todoTextField}
              InputLabelProps={{
              shrink: true,
              }}
              onChange={dateChangeHandler}
    />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => submitHandler()}
        >
          Add
        </Button>
      </Box>
    </Paper>
    </React.Fragment>
    );
}

export default NewTodo;