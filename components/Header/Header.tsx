import React from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import ColorModeSwitcher from "../ColorModeSwitcher/ColorModeSwitcher";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface IUser {
  name: string;
  email: string;
}

interface IProps {
  user: IUser;
  expires: string;
  id: number;
}

export interface ISession {
  session: IProps | null;
}

const Header = (session: ISession) => {
  const router = useRouter();

  return (
    <Box as="header">
      <Container maxW="container.lg">
        <Flex alignItems="center" justifyContent="space-between">
          <ColorModeSwitcher justify-self="flex-end" />
          <Text data-testid="name" fontSize="lg">
            {session?.session?.user?.name}
          </Text>
          {session.session ? (
            <Text
              data-testid="logstatus"
              cursor="pointer"
              onClick={() => signOut()}
              fontSize="lg"
            >
              Logout
            </Text>
          ) : (
            <Text
              data-testid="logstatus"
              cursor="pointer"
              onClick={() => router.push("/login")}
              fontSize="lg"
            >
              Sign in
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
