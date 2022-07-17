import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Auth from "./Auth";
import { expect } from "@jest/globals";

afterEach(cleanup);

describe("Auth", () => {
  it("Renders without crash", () => {
    render(<Auth csrfToken="" />);
  });
});
