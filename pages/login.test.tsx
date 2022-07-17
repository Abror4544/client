import React from "react";
import { cleanup, render } from "@testing-library/react";
import Login, { getServerSideProps } from "./login";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import "@testing-library/jest-dom";
import { expect } from "@jest/globals";

afterEach(cleanup);

jest.mock("next-auth/react");

describe("Login", () => {
  const csrfToken = "token";
  it("Renders without crash", () => {
    render(<Login csrfToken={csrfToken} />);
  });
  it("Returns waiting data", async () => {
    const context = {
      params: {
        url: "/login",
      } as ParsedUrlQuery,
    };

    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    const resCompare = JSON.parse(JSON.stringify(response));

    expect(resCompare.props.csrfToken).toBeFalsy();
  });
});
