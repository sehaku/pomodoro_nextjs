import { useRecoilState } from "recoil";
import { timerState } from "../../states/timerState";
import { SetTime } from "./SetTime";
export const PomodoroMin = () => {
  const [min, setMin] = useRecoilState<number>(timerState);

  return <SetTime min={min} setMin={setMin} />;
};
