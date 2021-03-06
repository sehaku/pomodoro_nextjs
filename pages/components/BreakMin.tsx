import { useRecoilState } from "recoil";
import { breakState } from "../../states/timerState";
import SetTime from "./SetTime";
const BreakMin = () => {
  const [min, setMin] = useRecoilState<number>(breakState);

  return <SetTime min={min} setMin={setMin} />;
};
export default BreakMin;
