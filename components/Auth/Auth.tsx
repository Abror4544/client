import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";
import type { GetServerSideProps } from "next";

interface ISessionProps {
  id: number;
  name: string;
  email: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const Auth = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    signIn();
  };

  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Login
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="username">Email</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    required
                    autoComplete="off"
                  />
                </FormControl>
              </Stack>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" required />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
              </HStack>
              <Stack spacing="6">
                <Button
                  bg="blue"
                  color="white"
                  _hover={{
                    background: "cadetblue",
                  }}
                  variant="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
              <Text aria-live="assertive"></Text>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Center mt="25" color="blue" textTransform="uppercase">
        <Link href="/">Home</Link>
      </Center>
    </Container>
  );
};

export default Auth;
