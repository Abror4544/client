import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { expect } from "@jest/globals";

afterEach(cleanup);

describe("ColorModeSwitcher", () => {
  it("Renders without crash", () => {
    render(<ColorModeSwitcher />);
  });
});
