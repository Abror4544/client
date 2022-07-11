import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
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
  }
});
