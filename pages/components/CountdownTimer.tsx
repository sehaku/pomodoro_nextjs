import React, { Component } from "react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Countdown, {
  CountdownApi,
  CountdownRenderProps,
  zeroPad,
} from "react-countdown";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

type Props = {
  duration: number;
  handleEnd: () => number;
  handleSetIsRun: (v: boolean) => void;
  handleSetProgress: (v: number) => void;
  isRun: boolean;
  isPomodoro: boolean;
  progress: number;
};
export default class CountdownTimer extends Component<Props, {}> {
  countdownApi: CountdownApi | null = null;
  state = { date: Date.now() + this.props.duration };
  handleStartClick = (): void => {
    console.log("start");
    this.countdownApi && this.countdownApi.start();
    this.props.handleSetIsRun(true);
  };

  handlePauseClick = (): void => {
    console.log("pause");
    this.countdownApi && this.countdownApi.pause();
    this.props.handleSetIsRun(false);
  };

  handleResetClick = (): void => {
    console.log("reset");
    this.setState({ date: Date.now() + this.props.duration });
    this.props.handleSetIsRun(true);
    this.props.handleSetProgress(0);
  };

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  handleEnd = (): void => {
    const duration = this.props.handleEnd();
    this.setState({ date: Date.now() + duration });
    this.props.handleSetProgress(0);
  };
  handleTick = () => {
    console.log("tick");
    this.props.handleSetProgress(this.props.progress + 1000);
  };
  // componentDidUpdate(render){

  // }
  renderer = (render: CountdownRenderProps) => {
    return (
      <Text fontSize="9xl">
        {zeroPad(render.minutes, 2)}:{zeroPad(render.seconds, 2)}
      </Text>
    );
  };
  render() {
    return (
      <Flex alignItems="center" direction="column">
        <CircularProgress
          value={100 - (this.props.progress / this.props.duration) * 100}
          size="2xl"
        >
          <CircularProgressLabel>
            <Countdown
              key={this.state.date}
              ref={this.setRef}
              date={this.state.date}
              autoStart={true}
              onComplete={this.handleEnd}
              onTick={this.handleTick}
              renderer={this.renderer}
            />
          </CircularProgressLabel>
        </CircularProgress>
        <ButtonGroup spacing="3">
          <Button
            display={this.props.isRun ? "none" : ""}
            onClick={this.handleStartClick}
          >
            Start
          </Button>
          <Button
            display={this.props.isRun ? "" : "none"}
            onClick={this.handlePauseClick}
          >
            Pause
          </Button>
          <Button onClick={this.handleResetClick}>Reset</Button>
        </ButtonGroup>
      </Flex>
    );
  }
}
