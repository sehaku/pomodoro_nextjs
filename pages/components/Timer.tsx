import { useRecoilState, useRecoilValue } from "recoil";
import CountdownTimer from "./CountdownTimer";
import {
  breakState,
  longBreakState,
  timerState,
  curTypeTime,
} from "../../states/timerState";
import { isPomodoroState } from "../../states/pomodoro";
import { pomodoroCount } from "../../states/count";
import { useState } from "react";
const Timer = () => {
  const minDuration = useRecoilValue(timerState);
  const minBreak = useRecoilValue(breakState);
  const longMinBreak = useRecoilValue(longBreakState);
  const [time, setTime] = useRecoilState(curTypeTime);
  const [count, setCount] = useRecoilState(pomodoroCount);
  const [isRun, setIsRun] = useState(true);
  const [isPomodoro, setIsPomodoro] = useRecoilState(isPomodoroState);
  const [progress, setProgress] = useState(0);
  const toggleIsPomodoro = (): boolean => {
    const newIsPomodoro = !isPomodoro;
    setIsPomodoro(newIsPomodoro);
    return newIsPomodoro;
  };

  /**
   * If isPomodoro equals true, The timer count up the number of repeats.
   * @param {boolean} isPomodoro
   * @returns {number} New number of repeats of the timer
   */
  const handleCountUp = (isPomodoro: boolean): number => {
    const newCnt = isPomodoro ? count + 1 : count;
    setCount(newCnt);
    return newCnt;
  };

  const handleSetTime = (isPomodoro: boolean, count: number): number => {
    const time = isPomodoro
      ? minDuration // isPomodoro=true
      : count % 4 == 0 // isPomodoro=false
      ? longMinBreak // count % 4 == 0
      : minBreak; // count % 4 != 0
    console.log(
      "minDuration",
      minDuration,
      "minBreak",
      minBreak,
      "longMinBreak",
      longMinBreak
    );
    console.log(time, isPomodoro);
    setTime(time);
    return time;
  };
  const handleSetProgress = (v: number) => {
    setProgress(v);
  };
  const handleEnd = (): number => {
    console.log(isPomodoro ? "pomodoro" : "not pomodoro");
    const newCount = handleCountUp(isPomodoro);
    const newIsPomodoro = toggleIsPomodoro();
    console.log(newIsPomodoro ? "newpomodoro" : "not newpomodoro");
    const time = handleSetTime(newIsPomodoro, newCount);
    return time * 1000; // Convert millisecond to second (time: millisecond)
  };

  /**
   * Set the timer is running or not.
   * @param {boolean} v Is the timer running or not
   */
  const handleSetIsRun = (v: boolean): void => {
    setIsRun(v);
  };
  return (
    <CountdownTimer
      duration={time * 1000} // Convert millisecond to second (time: millisecond)
      handleEnd={handleEnd}
      handleSetProgress={handleSetProgress}
      handleSetIsRun={handleSetIsRun}
      isRun={isRun}
      isPomodoro={isPomodoro}
      progress={progress}
    />
  );
};

export default Timer;
