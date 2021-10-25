import type { NextPage } from "next";
import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const Settings: NextPage = () => {
  return (
    <>
      <IconButton
        aria-label="Search database"
        _focus={{ boxShadow: "none" }}
        icon={<SettingsIcon/>}
      />
    </>
  );
};
export default Settings;
