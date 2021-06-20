import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Todos from "./Todo/Todos";
import DateFilter from "./DateFilter/DateFilter"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Todos />
  </React.StrictMode>,
  document.getElementById("root")
);
