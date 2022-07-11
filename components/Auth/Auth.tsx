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
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

const Auth = () => (
  <Container
    maxW="lg"
    py={{ base: "12", md: "24" }}
    px={{ base: "0", sm: "8" }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
            Log in to your account
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
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
          </Stack>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" />
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
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
    <Center mt="25" color="blue" textTransform="uppercase">
      <Link href="/">Home</Link>
    </Center>
  </Container>
);

export default Auth;
