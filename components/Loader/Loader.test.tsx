import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "./Loader";
import { expect } from "@jest/globals";

afterEach(cleanup);

describe("Loader", () => {
  it("Renders without crash", () => {
    render(<Loader />);
  });
});
