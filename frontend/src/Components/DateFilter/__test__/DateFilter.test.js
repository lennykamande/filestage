import { render, fireEvent } from "@testing-library/react";

import DateFilter from "../DateFilter";


it("checkDateFilter", () => {
    const {queryByTitle } = render(<DateFilter />)
    const input = queryByTitle("dateFilter");
    expect(input).toBeTruthy();
});