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
import { useRecoilState } from "recoil";
import { timerState } from "../../states/timerState";
import { setting } from "../../states/setting";
import { useState } from "react";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSettingChange, setIsSettingChange] = useRecoilState(setting);
  const [duration, setDuration] = useRecoilState(timerState);
  const [tmpMin, setTmpMin] = useState(duration);
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
              <NumberInput
                onChange={(value) => {
                  if (!isNaN(Number(value))) {
                    setTmpMin(Number(value));
                  }
                }}
                value={tmpMin}
                defaultValue={tmpMin}
                min={1}
                max={59}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput defaultValue={5} min={1} max={59}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput defaultValue={15} min={1} max={59}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
