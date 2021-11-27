import { useRecoilState } from "recoil";
import { longBreakState } from "../../states/timerState";
import SetTime from "./SetTime";
const LongBreakMin = () => {
  const [min, setMin] = useRecoilState<number>(longBreakState);

  return <SetTime min={min} setMin={setMin} />;
};
export default LongBreakMin;
