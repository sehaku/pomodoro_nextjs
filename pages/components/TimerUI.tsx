import { Dispatch, SetStateAction, useRef } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  isSettingChange: boolean;
  setIsSettingChange: Dispatch<SetStateAction<boolean>>;
  expiryTimestamp: Date;
};
const TimerUI = (props: Props) => {
  const expiryTimestamp = props.expiryTimestamp;
  const duration = useRef(300);
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => console.warn("Error : onExpire called"),
    });
  if (props.isSettingChange === true) {
    props.setIsSettingChange(false);
    console.log("true");
    duration.current = 500;
    // restart(time);
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
          time.setSeconds(time.getSeconds() + duration.current);
          restart(time);
          pause();
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
