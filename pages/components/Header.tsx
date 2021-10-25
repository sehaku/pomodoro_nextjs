import type { NextPage } from "next";
import { Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
const Header: NextPage = () => {
  return (
    <Heading as={"h6"} color={useColorModeValue("red.400", "green")}>
      Hello, nextjs
    </Heading>
  );
};

export default Header;
