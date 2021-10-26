import type { NextPage } from "next";
import { Heading, IconButton, useColorMode, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import Header from "./components/Header";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Header />
      <Flex justifyContent="space-around" alignItems="center">
        <IconButton
          aria-label="DarkMode switch"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          isRound={true}
          onClick={toggleColorMode}
        />
        <Settings />
      </Flex>
      <Timer />
    </>
  );
};

export default Home;
