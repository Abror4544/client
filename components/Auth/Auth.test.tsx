import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Auth from "./Auth";

afterEach(cleanup);

describe("Auth", () => {
  it("Renders without crash", () => {
    render(<Auth csrfToken="" />);
  });
});
