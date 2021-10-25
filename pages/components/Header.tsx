import { Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

const Header = () => {
  return (
    <Heading textAlign="center" as={"h6"}>
      Pomodoro Timer
    </Heading>
  );
};

export default Header;
