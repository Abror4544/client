/* eslint-disable prettier/prettier */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorModeSwitcher from "./ColorModeSwitcher";

afterEach(cleanup);

describe("ColorModeSwitcher", () => {
  it("Renders without crash", () => {
    render(<ColorModeSwitcher />);
  });
});
