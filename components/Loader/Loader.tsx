import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => (
  <Flex position={"absolute"} right="48%" bottom="-30%">
    <Spinner color="green.500" />
  </Flex>
);

export default Loader;
