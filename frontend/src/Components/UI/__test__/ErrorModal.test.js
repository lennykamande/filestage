import { render, fireEvent } from "@testing-library/react";

import ErrorModal from "../ErrorModal";

it("checkMountErrorModal", () => {
    const {getByTestId } = render(<ErrorModal title="New Test" message="You have an error"/>)
    const h2 = getByTestId("id-message");
    expect(h2).toBeTruthy();
});