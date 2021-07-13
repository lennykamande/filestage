import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Todos from "./Components/Todo/Todos";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Todos />
  </React.StrictMode>,
  document.getElementById("root")
);
