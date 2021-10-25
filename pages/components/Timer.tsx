import { SettingsIcon } from "@chakra-ui/icons";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useTimer } from "react-timer-hook";
import TimerUI from "./TimerUI"

type Props = {
  isSettingChange: boolean;
  setIsSettingChange: Dispatch<SetStateAction<boolean>>;
};
const Timer = (props: Props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);
  return (
    <TimerUI
      expiryTimestamp={time}
      isSettingChange={props.isSettingChange}
      setIsSettingChange={props.setIsSettingChange}
    />
  );
};

export default Timer;
