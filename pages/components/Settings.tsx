import type { NextPage } from "next";
import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const Settings: NextPage = () => {
  return (
    <>
      <IconButton
        aria-label="Search database"
        _focus={{ boxShadow: "none" }}
        icon={<SettingsIcon w={100} h={100} />}
        w={100}
        h={100}
        p={10}
        display={"flex"}
        ml={"auto"}
      />
    </>
  );
};
export default Settings;
