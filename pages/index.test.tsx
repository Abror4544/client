import {
  render,
  cleanup,
  getByRole,
  getByTestId,
  getByPlaceholderText,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("Home", () => {
  const data = [{ id: "2", title: "Rest", text: "Take care" }];
  it("Renders without crash", () => {
    render(<Home todos={data} />);
  });

  it("Correct title", () => {
    const { container } = render(<Home todos={data} />);

    const h1 = getByTestId(container, "heading");

    expect(h1.textContent).toBe("Todos");
  });

  it("Correct working input", async () => {
    const { container } = render(<Home todos={data} />);

    const input = getByPlaceholderText(container, "Title");

    await userEvent.type(input, "Let");

    expect(input).toHaveValue("Let");
  });

});
