import React from "react";
import {
  render,
  cleanup,
  getByTestId,
  getByPlaceholderText,
  getByText,
  getAllByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home, { getServerSideProps } from "./index";
import userEvent from "@testing-library/user-event";
import type { GetServerSideProps } from "next/types";

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

    expect(input).not.toBeDisabled();
  });

  it("Correct working textarea", async () => {
    const { container } = render(<Home todos={data} />);

    const textarea = getByPlaceholderText(container, "Description");

    await userEvent.type(textarea, "Let");

    expect(textarea).toHaveValue("Let");

    expect(textarea).not.toBeDisabled();
  });

  it("Correct working button", async () => {
    const { container } = render(<Home todos={data} />);

    const button = getByText(container, "Add +");

    await userEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  /* it("Correct list", async () => {
    const { container } = render(<Home todos={data} />);

    jest.setTimeout(20000);

    const mockData = await getServerSideProps<GetServerSideProps>({});
    console.log(mockData);

    const list = getAllByTestId(container, "todoList");

    expect(list.length).toBe(1);
  }); */

  it("Edit button", async () => {
    const { container } = render(<Home todos={data} />);

    expect(getByText(container, "Edit")).toBeInTheDocument();
  });

  it("Delete button", async () => {
    const { container } = render(<Home todos={data} />);

    expect(getByText(container, "X")).toBeInTheDocument();
  });
});
