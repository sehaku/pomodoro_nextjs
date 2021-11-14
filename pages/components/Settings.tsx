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
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Box,
  Grid,
} from "@chakra-ui/react";
import PomodoroMin from "./PomodoroMin";
import LongBreakMin from "./LongBreakMin";
import BreakMin from "./BreakMin";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSettingChange, setIsSettingChange] = useRecoilState(setting);
  const [duration, setDuration] = useRecoilState(timerState);
  const [breakMin, setBreakMin] = useRecoilState(breakState)
  const [longBreak, setLongBreak] = useRecoilState(longBreakState);

  const [tmpMin, setTmpMin] = useState(duration);
  const [tmpBreakMin, setTmpBreakMin] = useState(breakMin);
  const [tmpLongBreakMin, setTmpLongBreakMin] = useState(longBreak);
  return (
    <>
      <IconButton
        aria-label="Search database"
        _focus={{ boxShadow: "none" }}
        icon={<SettingsIcon />}
        isRound={true}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">Time length (min)</Box>
            <Grid templateColumns="repeat(3, 1fr)">
              <Box textAlign="center">Pomodoro</Box>
              <Box textAlign="center">Break</Box>
              <Box textAlign="center">Long Break</Box>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              <PomodoroMin />
              <BreakMin />
              <LongBreakMin />
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                setIsSettingChange(true);
                setDuration(tmpMin);
                setBreakMin(tmpBreakMin);
                setLongBreak(tmpLongBreakMin);
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Settings;
