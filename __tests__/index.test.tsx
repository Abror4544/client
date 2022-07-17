import React from "react";
import {
  render,
  cleanup,
  getByTestId,
  getByPlaceholderText,
  getByText,
  getAllByTestId,
  fireEvent,
  screen,
  getAllByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home, { getServerSideProps } from "../pages/index";
import userEvent from "@testing-library/user-event";
import { FormDataArr } from "../types";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";

const data = [
  { id: "2", title: "Rest", text: "Take care", done: "" },
  { id: "5", title: "Hey", text: "Use it", done: "" },
];
const sessionData = {
  id: 2,
  expires: "2022-08-14T11:05:23.172Z",
  user: {
    name: "Abror",
    email: "corporationsystems7@gmail.com",
  },
};

jest.mock("axios");

afterEach(cleanup);

describe("Home", () => {
  it("Renders without crash", () => {
    render(<Home session={sessionData} todos={data} />);
  });

  it("Correct title", () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const h1 = getByTestId(container, "heading");

    expect(h1.textContent).toBe("Todos");
  });

  it("Correct working input", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const input = getByPlaceholderText(container, "Title");

    await userEvent.type(input, "Let");

    expect(input).toHaveValue("Let");

    expect(input).not.toBeDisabled();
  });

  it("Correct working textarea", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const textarea = getByPlaceholderText(container, "Description");

    await userEvent.type(textarea, "Let");

    expect(textarea).toHaveValue("Let");

    expect(textarea).not.toBeDisabled();
  });

  it("Correct working add button", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const button = getByText(container, "Add +");

    await userEvent.click(button);

    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();
  });

  it("Correct list", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const list = getAllByTestId(container, "todoList");

    expect(list.length).toBe(2);
  });

  it("Edit button", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const btn = getAllByText(container, "Edit");

    fireEvent.click(btn[0]);

    expect(btn).toHaveLength(2);
  });

  it("Edit button functionality", () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    const editBtn = getAllByText(container, "Edit");

    const input = getByTestId(container, "testInput");

    const textarea = getByTestId(container, "testTextarea");

    const button = getByText(container, "Add +");

    fireEvent.click(editBtn[0]);

    expect(button.textContent).toBe("Change");

    expect(input).toHaveValue(data[0].title);

    expect(textarea).toHaveValue(data[0].text);
  });

  it("Delete button", async () => {
    const { container } = render(<Home session={sessionData} todos={data} />);

    expect(getAllByText(container, "X")).toHaveLength(2);
  });

  it("Delete button functionality", async () => {
    const deleteItem = (arr: FormDataArr) => arr.pop();

    const { container, unmount } = render(
      <Home session={sessionData} todos={data} />
    );

    const deleteBtn = getAllByText(container, "X");

    deleteBtn[0]?.addEventListener("click", () => deleteItem(data));

    fireEvent.click(deleteBtn[0]);

    unmount();

    const { rerender } = render(<Home session={sessionData} todos={data} />);

    rerender(<Home session={sessionData} todos={data} />);

    expect(screen.getAllByTestId("todoList")).toHaveLength(1);

    expect(data).toHaveLength(1);
  });

  it("Should return waiting data", async () => {
    const context = {
      params: { id: "/" } as ParsedUrlQuery,
    };

    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    const resCompare = JSON.parse(JSON.stringify(response));

    expect(resCompare.props.todos).toBe(null);
  });
});
