/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { IToken } from "../../pages/login";
import { PasswordField } from "../PasswordField/PasswordField";

const Auth = (csrfToken: IToken) => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Login</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form
            action="http://localhost:3000/api/auth/callback/credentials"
            method="POST"
          >
            <Input type="hidden" name="csrfToken" value={csrfToken.csrfToken} />

            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="username"
                    required
                    autoComplete="off"
                  />
                </FormControl>
              </Stack>
              <Stack spacing="5">
                <PasswordField />
              </Stack>
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
