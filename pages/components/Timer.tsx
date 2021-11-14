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
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { usrMusicState, volumeState } from "../../states/usrMusic";
const Timer = () => {
  const volume = useRecoilValue<number>(volumeState);
  const minDuration = useRecoilValue(timerState);
  const minBreak = useRecoilValue(breakState);
  const longMinBreak = useRecoilValue(longBreakState);
  const usrMusic = useRecoilValue(usrMusicState);
  const [time, setTime] = useRecoilState(curTypeTime);
  const [count, setCount] = useRecoilState(pomodoroCount);

  const [isRun, setIsRun] = useState(false);
  const [isPomodoro, setIsPomodoro] = useRecoilState(isPomodoroState);

  const [play] = useSound("music.mp3", {
    interrupt: true,
    volume: volume * 0.01,
  });
  useEffect(() => {
    if (usrMusic) {
      usrMusic.volume = volume * 0.01;
    }
  }, [usrMusic, volume]);

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
      : count % 4 == 0
      ? longMinBreak // isPomodoro=false && count % 4 == 0
      : minBreak; // isPomodoro=false && count % 4 != 0
    console.log(
      "minDuration",
      minDuration,
      "minBreak",
      minBreak,
      "longMinBreak",
      longMinBreak
    );
    setTime(time);
    return time;
  };

  const handleEnd = (): number => {
    console.log(volume);
    if (usrMusic) {
      usrMusic?.pause();
      usrMusic.currentTime = 0;
      usrMusic.play();
    } else {
      play(); // Start the timer alarm.
    }
    const newCount = handleCountUp(isPomodoro);
    const newIsPomodoro = toggleIsPomodoro();
    const time = handleSetTime(newIsPomodoro, newCount);
    return time * 1000; // Convert millisecond to second (time: millisecond)
  };
  const handleReset = (): number => {
    const time = handleSetTime(isPomodoro, count);
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
      handleReset={handleReset}
      handleSetIsRun={handleSetIsRun}
      isRun={isRun}
      isPomodoro={isPomodoro}
    />
  );
};

export default Timer;
