import Head from "next/head";
import Auth from "../components/Auth/Auth";

const Login = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div>
        <Auth />
      </div>
    </>
  );
};

export default Login;
