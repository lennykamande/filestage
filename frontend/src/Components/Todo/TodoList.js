import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles({
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

  
const TodoList = (props) =>{
  const classes = useStyles();

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

      return (
      <div>
        <DragDropContext onDragEnd={props.onDragEnd}>
        {props.todos.length > 0 && (   
        <Paper className={classes.todosContainer}>
          <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
          <Box display="flex" flexDirection="column" alignItems="stretch"
          >
            {props.todos.map(({ id, text, date, completed}, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
              <Box
                key={id}
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.todoContainer}
              >
                <Checkbox
                  checked={completed}
                  onChange={() => props.toggleTodoCompleted(id)}
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
                  onClick={() => props.deleteTodo(id)}
                >
                  Delete
                </Button>
              </Box>
              </div>
              )}
              </Draggable>
            ))}
          </Box>
          {provided.placeholder}
            </div>
          )}
        </Droppable>
        </Paper>
        )}
      </DragDropContext>  
     </div> 
    )
}

export default TodoList;