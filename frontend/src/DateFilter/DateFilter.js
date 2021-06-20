import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todoTextField: { width: '50%', padding: 5 },
  
});

const DateFilter = (props)=> {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
      console.log(todos);
  }, [setTodos]);

  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  }; 

  return (
      <React.Fragment>
      <Typography variant="h3" component="h1" gutterBottom>
        Filter
      </Typography>
      <Paper className={classes.addTodoContainer}>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}>
          <TextField
                id="fromDate"
                label="Due Date"
                fullWidth
                type="date"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={dropdownChangeHandler}
      />
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

export default DateFilter;
