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
  const [enteredDate, setEnteredDate] = useState("2021-06-24")
  const [open, setOpen] = useState("");

  //get input from user
  const todoChangeHandler = (event) => {
    setNewTodoText(event.target.value);
  } ;

  //get the date chosen by user 
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const getDate = (dateChange) =>{
    
  }
  // handle the submission by a user
  const submitHandler = (event) =>{
    // handle errors and show the user when text is empty or when date is null  
    if (newTodoText.trim().length === 0 || enteredDate.trim().length === 0) {
      setOpen({
        title: 'Invalid input',
        message: 'Task and date (pick a date) cannot be empty.',
      });
      return;
    }
    
    const dueDate = new Date(enteredDate)
    const finalDate = dueDate.getFullYear()+'-'+(dueDate.getMonth()+1)+'-'+dueDate.getDate()
    const todoData = {
      text: newTodoText,
      date: finalDate.toString()
    }

    //submit user input to todo for handling
    props.onSaveChangeHandler(todoData);
    const defaultDate = new Date();
    const finalDefault = defaultDate.getFullYear()+'-'+('0' + (defaultDate.getMonth()+1)).slice(-2)+'-'+('0' + defaultDate.getDate()).slice(-2);
    setEnteredDate(finalDefault);
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
            inputProps={{ "data-testid": "todo-input" }}
            InputLabelProps={{
              shrink: true,
              }}
            onChange={todoChangeHandler}
            title="addTodoField"
          />
          <TextField
              id="date"
              label="Due Date"
              type="date"
              value={enteredDate}
              className={classes.todoTextField}
              inputProps={{ "data-testid" : "todo-date-input"}}
              InputLabelProps={{
              shrink: true,
              }}
              onChange={dateChangeHandler}
              title="addDateField"
    />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => submitHandler()}
          title="addTodos"
          data-testid="addTodos"
        >
          Add
        </Button>
      </Box>
    </Paper>
    </React.Fragment>
    );
}

export default NewTodo;