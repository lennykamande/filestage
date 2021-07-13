import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addClearButton: { marginLeft: 5 },
  todoTextField: { width: '50%', padding: 5 },
  
});

const DateFilter = (props)=> {
  const classes = useStyles();

  const dropdownChangeHandler = (event) => {
    const filterDate = new Date(event.target.value)
    const finalDate = filterDate.getFullYear()+'-'+(filterDate.getMonth()+1)+'-'+filterDate.getDate()
    props.onChangeFilter(finalDate.toString());
  };

  const clearDateHandler = (event) => {
    props.onChangeFilter('');
  }

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
                title="dateFilter"
      />
          </Box>
          <Button
          className={classes.addClearButton}
          startIcon={<Icon>clear</Icon>}
          onClick={() => clearDateHandler()}
          title="clearDate"
          data-testid="clearDate"
        >
          Clear
        </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

export default DateFilter;
