import { useTimer } from "react-timer-hook";
const Timer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);
  return <TimerUI expiryTimestamp={time as Date}/>;
};

const TimerUI = (
  { expiryTimestamp }: { expiryTimestamp: Date },
) => {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => console.warn("Error : onExpire called"),
  });
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
      <button disabled={isRunning} onClick={resume}>Resume</button>
      <button disabled={!isRunning} onClick={pause}>Pause</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
          pause();
        }}
      >
        Restart
      </button>
    </div>
  );
};
export default Timer;
