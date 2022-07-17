import React from "react";
import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordField } from "./PasswordField";
import { expect } from "@jest/globals";

afterEach(cleanup);

describe("PasswordField", () => {
  it("Renders without crash", () => {
    render(<PasswordField />);
  });

  it("Shows correct icon when click at show password", () => {
    const { container } = render(<PasswordField />);

    const onIcon = getByTestId(container, "on");

    expect(onIcon).toBeInTheDocument();
  });

  it("Shows correct icon when click at show password", () => {
    const { container } = render(<PasswordField />);

    const onIcon = getByTestId(container, "on");

    fireEvent.click(onIcon);

    const offIcon = getByTestId(container, "off");

    expect(offIcon).toBeInTheDocument();
  });

  it("Shows correct icon when click at show password", () => {
    const { container } = render(<PasswordField />);

    const onIcon = getByTestId(container, "on");

    const inputElement = getByTestId(container, "passInp");

    fireEvent.click(onIcon);

    expect(document.activeElement).toBe(inputElement);
  });
});
