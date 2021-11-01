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
  const [isPlay, setIsPlay] = useState(true);
  const [isPomodoro, setIsPomodoro] = useRecoilState(isPomodoroState);


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
  const handleSetTime = (isPomodoro: boolean, count: number): void => {
    const time = isPomodoro
      ? minDuration
      : count % 4 == 0
      ? longMinBreak
      : minBreak;
    setTime(time);
  };
  const handleEnd = (): void => {
    const newIsPomodoro = toggleIsPomodoro();
    const newCount = handleCountUp(newIsPomodoro);
    const setTime = handleSetTime(newIsPomodoro, newCount);
    console.log("handleend");
  };
  const handleSetIsPlay = (v: boolean): void => {
    setIsPlay(v);
  };
  return (
    <CountdownTimer
      duration={time * 1000} // Convert millisecond to second (time: millisecond)
      handleEnd={handleEnd}
      handleSetIsPlay={handleSetIsPlay}
      isPlay={isPlay}
      isPomodoro={isPomodoro}
    />
  );
};

export default Timer;
