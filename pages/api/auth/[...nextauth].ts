import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "helloworld@next.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        // db look up
        if (
          credentials?.username === "a@a.com" &&
          credentials?.password === process.env.SECRET
        ) {
          return {
            id: 2,
            name: "Abror",
            email: "corporationsystems7@gmail.com",
          };
        }

        //login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
});

/* interface ICredentials {
  username: string | undefined;
  password: string | undefined;
}

interface IUsername {
  label: string | undefined;
  type: string | undefined;
  placeholder: string;
}

interface IPassword {
  label: string | undefined;
  password: string | undefined;
}

interface ICommonCredentials {
  username: IUsername;
  password: IPassword;
}

const isCorrectCredentials = (credentials: ICredentials) =>
  credentials.username === process.env.USERNAME &&
  credentials.password === process.env.PASSWORD;

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Abror" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        if (isCorrectCredentials(credentials)) {
          const user = { id: 1, name: "Admin" };
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options); */
