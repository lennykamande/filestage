import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NewTodo from "./NewTodo";
import DateFilter from "../DateFilter/DateFilter";
import TodoList from "./TodoList";
import {
  Container,
  Typography,
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
  const [filterDate, setFilterDate] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3030/")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [setTodos]);

  // a function that will help us reorder the list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  // the function that will run when the dragging is over
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newList = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(newList);
  };

  // a function that will help us get the date selected to filter
  const filterChangeHandler = (selectedDate) => {
    setFilterDate(selectedDate);
  };

  // a function to filter through the date chosen or if none
  const filteredData = todos.filter( todo =>{
    //if selectedYear length is less that 1 get inital state
    if (filterDate < 1)
    {
      return todos;
    }
    else{
      return todo.date == filterDate;
    }
    
  });

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
      
      <DateFilter onChangeFilter={filterChangeHandler}/>
      <Typography variant="h3" component="h1" gutterBottom title="testTodo">
        Todos
      </Typography>
      <NewTodo onSaveChangeHandler={addTodo}/>
      <TodoList todos={filteredData} completeTodo={toggleTodoCompleted} deleteTodo={deleteTodo} onDragEnd={onDragEnd}/>
    </Container>
  );
}

export default Todos;
