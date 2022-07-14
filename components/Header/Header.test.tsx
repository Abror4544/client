/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

afterEach(cleanup);

const session = {
  expires: "2022-08-13T10:59:16.064Z",
  id: 2,
  user: {
    email: "corporationsystems7@gmail.com",
    name: "Abror",
  },
};

describe("Header", () => {
  it("Renders without crash", () => {
    render(<Header session={session} />);
  });

  it("Shows correct name", () => {
    const { container } = render(<Header session={session} />);

    const title = getByTestId(container, "name");

    expect(title.textContent).toBe(session.user.name);
  });

  it("Shows correct logout status", () => {
    const { container } = render(<Header session={session} />);

    const logStatus = getByTestId(container, "logstatus");

    expect(logStatus.textContent).toBe("Logout");
  });

  it("Shows correct login status", () => {
    const { container } = render(<Header session={null} />);

    const logStatus = getByTestId(container, "logstatus");

    expect(logStatus.textContent).toBe("Sign in");
  });

  it("Shows color mode switcher icon", () => {
    const { container } = render(<Header session={session} />);

    const icon = getByTestId(container, "switchBtn");

    expect(icon).toBeInTheDocument();
  });

  it("Sign out when clicked logout label", () => {
    const { container } = render(<Header session={session} />);

    const logoutLabel = getByTestId(container, "logstatus");

    fireEvent.click(logoutLabel);

    expect(signOut).toHaveBeenCalled();
  });

  it("Send to login page when clicked sign in label", async () => {
    const push = jest.fn();

    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      push,
    }));

    const { container } = render(<Header session={null} />);

    const loginLabel = getByTestId(container, "logstatus");

    fireEvent.click(loginLabel);

    expect(push).toHaveBeenCalledWith("/login");
  });
});
