import type { NextPage } from "next";
import { IconButton, useColorMode, Flex, Container } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import { Timer } from "./components/Timer";
import React from "react";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Header />
      <Container>
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="DarkMode switch"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          isRound={true}
          onClick={toggleColorMode}
        />
        <Settings />
      </Flex>
      </Container>
      <Timer />
    </>
  );
};

export default Home;
