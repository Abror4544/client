import { Box, Container, Flex, Text } from "@chakra-ui/react";
import ColorModeSwitcher from "../ColorModeSwitcher/ColorModeSwitcher";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <Box as="header">
      <Container maxW="container.lg">
        <Flex alignItems="center" justifyContent="space-between">
          <ColorModeSwitcher justify-self="flex-end" />
          <Text fontSize="lg">{session?.user?.name}</Text>
          {session ? (
            <Text cursor="pointer" onClick={() => signOut()} fontSize="lg">
              Logout
            </Text>
          ) : (
            <Text
              cursor="pointer"
              onClick={() => router.push("/api/auth/signin")}
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
