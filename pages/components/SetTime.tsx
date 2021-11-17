import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
type Props = {
  min: number;
  setMin: (num: number) => void;
};
export const SetTime = (props: Props) => {
  return (
    <NumberInput
      onChange={(dummy: string, num: number) => {
        props.setMin(num);
      }}
      value={props.min}
      defaultValue={props.min}
      min={1}
      max={59}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
