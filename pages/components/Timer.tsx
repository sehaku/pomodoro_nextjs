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
import ReactHowler from "react-howler";
import {
  fileTypeState,
  usrMusicSrcState,
  volumeState,
} from "../../states/usrMusic";
import { useInterval } from "@chakra-ui/hooks";
const Timer = () => {
  const minDuration = useRecoilValue<number>(timerState);
  const minBreak = useRecoilValue<number>(breakState);
  const minLongBreak = useRecoilValue<number>(longBreakState);
  const fileType = useRecoilValue<string>(fileTypeState);
  const usrMusicSrc = useRecoilValue<string>(usrMusicSrcState);
  const volume = useRecoilValue<number>(volumeState);
  const [musicName, setMusicName] = useState<string>(usrMusicSrc);
  const [time, setTime] = useRecoilState<number>(curTypeTime);
  const [count, setCount] = useRecoilState<number>(pomodoroCount);

  const [isRun, setIsRun] = useState<boolean>(false);
  const [isPomodoro, setIsPomodoro] = useRecoilState<boolean>(isPomodoroState);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  let player: ReactHowler | null = null;
  useEffect(() => {
    setMusicName(usrMusicSrc);
  }, [usrMusicSrc]);
  useInterval(() => {
    if (player && player.seek() >= 10.0) {
      player.seek(0); // seek to 0ms of the alarm music
      setIsPlaying(false); // Stop the timer alarm
    }
  }, 100);
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
      ? minLongBreak // isPomodoro=false && count % 4 == 0
      : minBreak; // isPomodoro=false && count % 4 != 0
    setTime(time);
    return time;
  };

  const handleEnd = (): number => {
    setIsPlaying(true); // Start the timer alarm.
    const newCount = handleCountUp(isPomodoro);
    const newIsPomodoro = toggleIsPomodoro();
    const time = handleSetTime(newIsPomodoro, newCount);
    return time * 1000 * 60; // Convert millisecond to minutes (time: millisecond)
  };
  const handleReset = (): number => {
    const time = handleSetTime(isPomodoro, count);
    return time * 1000 * 60; // Convert millisecond to minutes (time: millisecond)
  };

  /**
   * Set the timer is running or not.
   * @param {boolean} v Is the timer running or not
   */
  const handleSetIsRun = (v: boolean): void => {
    setIsRun(v);
  };
  return (
    <>
      <ReactHowler
        src={musicName}
        playing={isPlaying}
        format={[fileType]}
        volume={volume * 0.01}
        ref={(ref) => (player = ref)}
      />
      <CountdownTimer
        duration={time * 1000 * 60} // Convert millisecond to minutes (time: millisecond)
        handleEnd={handleEnd}
        handleReset={handleReset}
        handleSetIsRun={handleSetIsRun}
        isRun={isRun}
        isPomodoro={isPomodoro}
      />
    </>
  );
};
export default Timer;
