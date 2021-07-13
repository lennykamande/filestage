import { render, fireEvent } from "@testing-library/react";

import Todos from "../Todos";
import React from "react";
import ReactDOM from "react-dom";


it("a user should be able to see the application without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Todos />, div);
  ReactDOM.unmountComponentAtNode(div);
});