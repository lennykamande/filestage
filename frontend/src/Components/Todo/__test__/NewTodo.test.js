import { render, fireEvent } from "@testing-library/react";
import { shallow } from 'enzyme';
import NewTodo from "../NewTodo";

//check if button renders
it("a user should be able to see the add button", () => {
    const {queryByTitle } = render(<NewTodo />)
    const btn  = queryByTitle("addTodos");
    expect(btn).toBeTruthy();
});

//check textbox
it("a user should be able to enter a new todo task", () => {
    const {queryByTitle} = render(<NewTodo />);
    const input = queryByTitle("addTodoField");
    expect(input).toBeTruthy();
});

//check dateInput
it("a user should be able to enter a new todo task date", () => {
    const {queryByTitle} = render(<NewTodo />);
    const input = queryByTitle("addDateField");
    expect(input).toBeTruthy();
});

//check that you can't add empty input
describe("a user is able to change the todo", () => {
    it("onchange", () => {
        const {queryByTestId} = render(<NewTodo />);
        const input = queryByTestId("todo-input");
        fireEvent.change(input, { target: {value: "new todo"} });
        expect(input.value).toBe("new todo");
    })
});

describe("a user is able to change the due date", () => {
    it("onchange", () => {
        const {queryByTestId} = render(<NewTodo />);
        const input = queryByTestId("todo-date-input");
        fireEvent.change(input, { target: {value: "2021-07-01"} });
        expect(input.value).toBe("2021-07-01");
    })
});

it("a user is able to submit when form is filled out", () => {
    const submitHandler = jest.spyOn(NewTodo.prototype, 'onSaveChangeHandler');
    const { getByTestId, rerender } = render(<NewTodo />);
    const todoValue = getByTestId("todo-input");
    const dateValue = getByTestId("todo-date-input");
    const submitButton = getByTestId("addTodos");
    const newTodo = "New Todo Test";
    const newDate = "2021-07-01"
    fireEvent.change(todoValue, { target: { value: newTodo } });
    fireEvent.change(dateValue, {target: {value: newDate }});
    fireEvent.click(submitButton);
    expect(todoValue).toEqual(newTodo);
    expect(dateValue).toEqual(newDate);
    expect(submitHandler).toHaveBeenCalled();
    rerender(<NewTodo />);
    expect(todoValue).toBe("");
    expect(todoValue).toBe("2021-06-16");
  });

//check if add method was fired