import { useTimer } from "react-timer-hook";
import { useRecoilState, useRecoilValue } from "recoil";
import { timerState } from "../../states/timerState";
import { setting } from "../../states/setting";
import { useEffect, useState } from "react";
import { isPomodoroState } from "../../states/pomodoro";
import { pomodoroCount } from "../../states/count";

type Props = {
  expiryTimestamp: Date;
};
const TimerUI = (props: Props) => {
  const expiryTimestamp = props.expiryTimestamp;
  const minDuration = useRecoilValue(timerState);
  const [isSettingChange, setIsSettingChange] = useRecoilState(setting);
  const [isPomodoro, setIsPomodoro] = useRecoilState(isPomodoroState);
  const [count, setCount] = useRecoilState(pomodoroCount);
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      // autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        const newCur = !isPomodoro;
        const newCnt = isPomodoro ? count + 1 : count;
        setIsPomodoro(newCur);
        setCount(newCnt);
        const time = new Date();
        time.setSeconds(
          newCur
            ? time.getSeconds() + minDuration * 60
            : newCnt % 4 == 0
            ? time.getSeconds() + 3 * 60
            : time.getSeconds() + 2 * 60
        );
        restart(time);
      },
    });
  if (isSettingChange === true) {
    setIsSettingChange(false);
    console.log("true");
  }
  return (
    // TODO : chakra-ui style needs to be applied.
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{ fontSize: "100px" }}>
        <span style={{ display: hours === 0 ? "none" : "" }}>
          {hours.toString().padStart(2, "0")}:
        </span>
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{seconds.toString().padStart(2, "0")}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button style={{ display: isRunning ? "none" : "" }} onClick={resume}>
        Resume
      </button>
      <button style={{ display: isRunning ? "" : "none" }} onClick={pause}>
        Pause
      </button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + minDuration * 60);
          restart(time);
        }}
      >
        Restart
      </button>
    </div>
  );
};
function _restart(time: Date) {
  return time;
}
export default TimerUI;
