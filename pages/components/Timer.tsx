import { useRecoilValue } from "recoil";
import { timerState } from "../states/timerState";
import TimerUI from "./TimerUI";

const Timer = () => {
  const time = new Date();
  const minDuration = useRecoilValue(timerState);
  time.setSeconds(time.getSeconds() + minDuration * 60);
  return (
    <TimerUI
      expiryTimestamp={time}
    />
  );
};

export default Timer;
