import { SettingsIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Grid,
} from "@chakra-ui/react";
import PomodoroMin from "./PomodoroMin";
import LongBreakMin from "./LongBreakMin";
import BreakMin from "./BreakMin";

import Volume from "./Volume";
import MusicUpload from "./MusicUpload";
const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Search database"
        _focus={{ boxShadow: "none" }}
        icon={<SettingsIcon />}
        isRound={true}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box marginBottom="1" textAlign="center">
              Time length (min)
            </Box>
            <Grid marginBottom="1" templateColumns="repeat(3, 1fr)" gap={1}>
              <Box textAlign="center">Pomodoro</Box>
              <Box textAlign="center">Break</Box>
              <Box textAlign="center">Long Break</Box>
            </Grid>
            <Grid marginBottom="1" templateColumns="repeat(3, 1fr)" gap={1}>
              <PomodoroMin />
              <BreakMin />
              <LongBreakMin />
            </Grid>
            <Volume />
            <MusicUpload />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Settings;
