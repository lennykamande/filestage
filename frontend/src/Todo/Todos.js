import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NewTodo from "./NewTodo";
import DateFilter from "../DateFilter/DateFilter";
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
  todosContainer: { marginTop: 10, padding: 10 },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});

function Todos() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
      console.log(todos);
  }, [setTodos]);

  function filterToDo(date) {
    fetch("http://localhost:3030", {
      headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
    body: JSON.stringify({ date }),
  })
  
    .then((response) => response.json())
    .then((todo) => setTodos([...todos, todo]));
   
}

  function addTodo(todoData) {
    fetch("http://localhost:3030/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ text: todoData.text, date: todoData.date }),
    })
    
      .then((response) => response.json())
      .then((todo) => setTodos([...todos, todo]));
     
  }
  
  function toggleTodoCompleted(id) {
    fetch(`http://localhost:3030/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed,
      }),
    }).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    fetch(`http://localhost:3030/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  }

  return (
    <Container maxWidth="md">
      <DateFilter />
      <Typography variant="h3" component="h1" gutterBottom>
        Todos
      </Typography>
      <NewTodo onSaveChangeHandler={addTodo}/>
      {todos.length > 0 && (
        <Paper className={classes.todosContainer}>
          <Box display="flex" flexDirection="column" alignItems="stretch">
            {todos.map(({ id, text, date, completed }) => (
              <Box
                key={id}
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.todoContainer}
              >
                <Checkbox
                  checked={completed}
                  onChange={() => toggleTodoCompleted(id)}
                ></Checkbox>
                <Box flexGrow={1}>
                  <Typography
                    className={completed ? classes.todoTextCompleted : ""}
                    variant="body1"
                  >
                    {text}
              
                  </Typography>
                  <Typography
                    className={completed ? classes.todoTextCompleted : ""}
                    variant="body1"
                  >
                    {date}
              
                  </Typography>
                </Box>
                <Button
                  className={classes.deleteTodo}
                  startIcon={<Icon>delete</Icon>}
                  onClick={() => deleteTodo(id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Todos;
