/* eslint-disable prettier/prettier */
import React from "react";
import Head from "next/head";
import Auth from "../components/Auth/Auth";
import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next";

export interface IToken {
  csrfToken: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

const Login = (csrfToken: IToken) => {
  console.log(csrfToken);

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div>
        <Auth csrfToken={csrfToken.csrfToken} />
      </div>
    </>
  );
};

export default Login;
